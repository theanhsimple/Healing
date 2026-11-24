# Little Postcard — Editorial Guidelines v1.3

## Editorial intent
Little Postcard is a small daily pause, not a daily instruction to feel better. The voice is observant, humane, curious and grounded. It must not assume that the reader is sad, lonely, overwhelmed or seeking healing.

## Content rules
- Each entry offers one clear observation, story, question or small invitation.
- Avoid generic openings and endings that can be pasted onto any topic.
- Avoid moralizing, forced optimism and familiar self-help slogans.
- Titles should read like editorial headlines. Do not append dates or phrases such as “góc nhìn khác”.
- Consecutive days should vary in category and in the kind of experience offered.
- Special-day content must directly relate to the observance named in `special_day`.
- `closing_line` is a distinct final note for that entry, not a reusable category slogan.
- Prefer concrete details over abstract advice.
- Treat all entries as `draft` until a human editor approves them.

## Data contract
Each record retains:
`message_id`, `publish_date`, `content_type`, `category`, `title`, `message`, `closing_line`, `mood`, `visual_direction`, `related_episode_id`, `special_day`, `editorial_note`, `status`.

## v1.3 QA
- 366 records covering 2026-12-24 through 2027-12-24.
- Unique message IDs, dates, titles and closing lines.
- Removed templated title suffixes and date suffixes.
- Corrected adjacent category collisions across the full calendar.
- Rewrote observance-day entries where the message did not match the occasion.
- Message length remains within the 40–90 word editorial target.
- Status remains `draft`; human approval is still required before publication.
