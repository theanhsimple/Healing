#!/usr/bin/env bash
# Mix a podcast episode: cleaned voice over a music bed.
#
#   scripts/mix-podcast.sh <voice> <music> <out.mp3> [title] [track] [cover.jpg]
#
# Sound: a calm, blended podcast.
#   - voice leads, but the music stays present: ~11-12 dB under the voice
#     while speaking, and it "breathes" — ducking under each phrase and
#     rising a little in the pauses (side-chain ducking keyed by the voice)
#   - the voice gets a soft room reverb (scripts/assets/room-ir.wav) so it
#     sits in the same space as the piano instead of on top of it
#   - music-only intro (fade in), music swells back after the last word,
#     then fades out
#   - final loudness -16 LUFS integrated, true peak <= -1.5 dBTP
# (Episode 01 v1 used a fixed bed 18 dB under the voice; it sounded too
# separated — the voice was "on top" of a barely audible track.)
# Requires ffmpeg and python3. Intermediate files go to a temp directory.
set -euo pipefail

VOICE=${1:?voice file}
MUSIC=${2:?music file}
OUT=${3:?output .mp3}
TITLE=${4:-"Những điều nhỏ bé"}
TRACK=${5:-1}
COVER=${6:-}

INTRO=8          # seconds of music before the voice starts
OUTRO_HOLD=10    # seconds of music after the voice ends, before the fade
FADE_OUT=8       # final fade-out length
BED_DB=-5        # music base level during the voice section (before ducking)
DUCK_RATIO=2     # how strongly the voice pushes the music down while speaking
INTRO_DB=0       # music level when it plays alone, relative to the voice
REVERB_DB=-17    # level of the voice's room reverb (wet), relative to the dry voice
TARGET=-16       # integrated loudness (LUFS)

TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

# Two-pass EBU R128 normalisation to an exact integrated loudness.
loudnorm2() { # in out target extra-args...
  local in=$1 out=$2 target=$3; shift 3
  local stats
  stats=$(ffmpeg -hide_banner -nostats -i "$in" -af "loudnorm=I=$target:TP=-1.5:LRA=11:print_format=json" -f null - 2>&1 | sed -n '/^{/,/^}/p')
  local mi mtp mlra mth off
  mi=$(python3 -c 'import json,sys;print(json.loads(sys.stdin.read())["input_i"])' <<<"$stats")
  mtp=$(python3 -c 'import json,sys;print(json.loads(sys.stdin.read())["input_tp"])' <<<"$stats")
  mlra=$(python3 -c 'import json,sys;print(json.loads(sys.stdin.read())["input_lra"])' <<<"$stats")
  mth=$(python3 -c 'import json,sys;print(json.loads(sys.stdin.read())["input_thresh"])' <<<"$stats")
  off=$(python3 -c 'import json,sys;print(json.loads(sys.stdin.read())["target_offset"])' <<<"$stats")
  ffmpeg -v error -y -i "$in" -af "loudnorm=I=$target:TP=-1.5:LRA=11:measured_I=$mi:measured_TP=$mtp:measured_LRA=$mlra:measured_thresh=$mth:offset=$off:linear=true" "$@" "$out"
}

echo "1/4 Cleaning voice…"
# high-pass rumble, adaptive FFT noise reduction, gentle de-mud / presence EQ,
# then a soft expander that lowers room tone between phrases by up to 14 dB.
# No compressor: phone voice memos are already compressed, and compressing
# again lifts the room tone. Tuned on episode 01: pauses -32 -> -42 dBFS,
# speech level and clarity preserved.
ffmpeg -v error -y -i "$VOICE" -ac 1 -ar 48000 -af "\
highpass=f=80,\
afftdn=nr=14:nf=-38:tn=1,\
equalizer=f=220:t=q:w=1.1:g=-2,\
equalizer=f=4200:t=q:w=1.4:g=-1.5,\
treble=g=-1:f=9000,\
agate=threshold=0.05:ratio=3:range=0.2:attack=5:release=250:knee=3" \
  "$TMP/voice_clean.wav"
loudnorm2 "$TMP/voice_clean.wav" "$TMP/voice.wav" "$TARGET" -ar 48000 -ac 1

VOICE_LEN=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$TMP/voice.wav")
TOTAL=$(python3 -c "print(round($INTRO+$VOICE_LEN+$OUTRO_HOLD+$FADE_OUT,3))")

echo "2/4 Preparing music bed (${TOTAL}s)…"
# trim the track's trailing silence, then loop it with 4 s crossfades
MUSIC_END=$(ffmpeg -hide_banner -nostats -i "$MUSIC" -af silencedetect=noise=-45dB:d=0.5 -f null - 2>&1 \
  | grep -oE "silence_start: [0-9.]+" | tail -1 | awk '{print $2}')
MUSIC_LEN=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$MUSIC")
[ -n "$MUSIC_END" ] && python3 -c "import sys;sys.exit(0 if $MUSIC_END>$MUSIC_LEN-3 else 1)" || MUSIC_END=$MUSIC_LEN
ffmpeg -v error -y -i "$MUSIC" -t "$MUSIC_END" -ar 48000 -ac 2 "$TMP/m1.wav"
COPIES=$(python3 -c "import math;print(max(1,math.ceil(($TOTAL+4)/($MUSIC_END-4))))")
cp "$TMP/m1.wav" "$TMP/music_loop.wav"
for _ in $(seq 2 "$COPIES"); do
  ffmpeg -v error -y -i "$TMP/music_loop.wav" -i "$TMP/m1.wav" -filter_complex "acrossfade=d=4:c1=tri:c2=tri" "$TMP/next.wav"
  mv "$TMP/next.wav" "$TMP/music_loop.wav"
done
ffmpeg -v error -y -i "$TMP/music_loop.wav" -t "$TOTAL" "$TMP/music_cut.wav"
loudnorm2 "$TMP/music_cut.wav" "$TMP/music_norm.wav" "$TARGET" -ar 48000 -ac 2

echo "3/4 Mixing…"
# music gain envelope (dB relative to the voice), linear ramps between points
T0=$INTRO; T1=$(python3 -c "print($INTRO+$VOICE_LEN)")
ENV=$(python3 - "$T0" "$T1" "$TOTAL" "$INTRO_DB" "$BED_DB" "$FADE_OUT" <<'PY'
import sys
t0,t1,total,intro,bed,fade=map(float,sys.argv[1:])
pts=[(0,-60),(2.5,intro),(t0-1.5,intro),(t0+1.5,bed),(t1+0.3,bed),(t1+3.5,intro),(total-fade,intro),(total,-60)]
expr=str(pts[-1][1])
for (a,ga),(b,gb) in reversed(list(zip(pts,pts[1:]))):
    expr=f"if(lt(t,{b:.3f}),{ga}+({gb}-({ga}))*(t-{a:.3f})/({b-a:.3f}),{expr})"
print(f"pow(10,({expr})/20)")
PY
)
IR="$(dirname "$0")/assets/room-ir.wav"
ffmpeg -v error -y -i "$TMP/voice.wav" -i "$TMP/music_norm.wav" -i "$IR" -filter_complex "\
[0:a]adelay=$((INTRO*1000)):all=1,apad,asplit=3[vdry][vrev][vkey];\
[vdry]pan=stereo|c0=c0|c1=c0[dry];\
[vrev]pan=stereo|c0=c0|c1=c0[vrs];\
[vrs][2:a]afir=dry=0:wet=1:irgain=1,lowpass=f=6000,volume=${REVERB_DB}dB[wet];\
[dry][wet]amix=inputs=2:normalize=0[voice];\
[vkey]pan=stereo|c0=c0|c1=c0[key];\
[1:a]volume='$ENV':eval=frame[bed];\
[bed][key]sidechaincompress=threshold=0.1:ratio=$DUCK_RATIO:attack=120:release=900:knee=4:makeup=1[m];\
[voice][m]amix=inputs=2:duration=longest:normalize=0,atrim=0:$TOTAL[mix]" \
  -map "[mix]" "$TMP/mix.wav"
loudnorm2 "$TMP/mix.wav" "$TMP/master.wav" "$TARGET" -ar 44100

echo "4/4 Encoding MP3…"
COVER_ARGS=()
[ -n "$COVER" ] && COVER_ARGS=(-i "$COVER" -map 1:v -c:v mjpeg -disposition:v attached_pic -metadata:s:v title="Cover")
ffmpeg -v error -y -i "$TMP/master.wav" "${COVER_ARGS[@]}" -map 0:a -c:a libmp3lame -b:a 128k -id3v2_version 3 \
  -metadata title="$TITLE" -metadata artist="Những điều nhỏ bé" \
  -metadata album="The Little Postcard Project" -metadata track="$TRACK" -metadata genre="Podcast" \
  "$OUT"

# keep stems for level checks when MIX_DEBUG_DIR is set
if [ -n "${MIX_DEBUG_DIR:-}" ]; then
  mkdir -p "$MIX_DEBUG_DIR"
  cp "$TMP/voice.wav" "$TMP/music_norm.wav" "$TMP/mix.wav" "$MIX_DEBUG_DIR/"
  # music exactly as it sits in the mix (envelope + ducking), for level checks
  ffmpeg -v error -y -i "$TMP/voice.wav" -i "$TMP/music_norm.wav" -filter_complex "\
[0:a]adelay=$((INTRO*1000)):all=1,apad,pan=stereo|c0=c0|c1=c0[key];\
[1:a]volume='$ENV':eval=frame[bed];\
[bed][key]sidechaincompress=threshold=0.1:ratio=$DUCK_RATIO:attack=120:release=900:knee=4:makeup=1,atrim=0:$TOTAL[m]" \
    -map "[m]" "$MIX_DEBUG_DIR/music_in_mix.wav"
  echo "$ENV" > "$MIX_DEBUG_DIR/envelope.txt"
fi
echo "Done: $OUT ($(python3 -c "print(round($TOTAL))")s)"
