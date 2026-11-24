# LITTLE POSTCARD
## Editorial Guidelines · Master Library v1.2

### Purpose
Little Postcard sends one small observation, story, discovery or invitation each day. It should make readers notice something, not tell them how they must feel.

### Voice
- Vietnamese that sounds natural when read aloud.
- Warm, observant, thoughtful and grounded.
- Prefer concrete details over abstract motivational language.
- Vary sentence rhythm and content form.
- Allow curiosity, humour, wonder and ordinary pleasure alongside reflective topics.

### Avoid
- Generic motivational quotes and repeated healing clichés.
- Assuming every reader is sad, lonely, heartbroken or in need of advice.
- Moralizing, preaching or forcing a grand conclusion.
- Invented facts or unverified historical claims.
- Rewriting a message only by swapping synonyms.

### Content categories
A Quiet Mind; The Art of Living; Nature Notes; The World of Art; Little Journeys; Human Stories; Time & Memory; Music & Sound; Creative Life; Small Joys; Relationships & Connections; Change & New Beginnings; Science & Curiosity; Philosophy & Perspective; Tomorrow & Possibility.

### Data fields
message_id, publish_date, content_type, category, title, message, closing_line, mood, visual_direction, related_episode_id, special_day, editorial_note, status.

### Length and closing line
- `message`: 40–90 whitespace-separated words.
- `closing_line`: populate for consistency with Batch 01. It should add a small afterthought or invitation, not repeat the last sentence.
- A closing line should sound natural and should not become a compulsory slogan.

### Special days
- Lunar and movable dates must be checked against a reliable Vietnamese lunar calendar and official announcements.
- Keep the event label in `special_day`; use `content_type = special_day` when the message is specifically written for that occasion.
- Do not assume every reader celebrates in the same way or has the same family circumstances.
- For history and remembrance days, use respectful, fact-based language and avoid turning the day into generic inspiration.

### Episode messages
Only set `related_episode_id` when episode information is confirmed. On release days, the daily message should connect to the episode while remaining useful to readers who have not listened.

### Publishing
- All imported records remain `draft` until reviewed.
- Do not display `editorial_note` or `status` to end users.
- Compare each daily message with the actual episode release calendar.
- Verify factual claims in science, history, culture and geography.
- Check for semantic duplication, not only identical titles.

### Quality checklist
1. Is there a specific observation or idea?
2. Is the wording natural when read aloud?
3. Is it distinct from recent messages in meaning?
4. Does it avoid prescribing emotions?
5. Does the closing line add something rather than repeat?
6. Is the visual direction appropriate?
7. Are factual claims and dates verified?

### Batch 02 revision note
Version 1.2 shortens the 27 messages previously over 90 words, fills all 366 closing_line fields, and adds dedicated editorial messages for key Vietnamese dates in 2027. All records remain drafts.
