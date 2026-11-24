# Master Message Library: "Thông điệp hôm nay"

This folder is the official source of the daily messages on the home page.
Each `batch-XX.json` file is kept **exactly as the editorial team delivered it**.
The website never rewrites the content. Editorial rules (current version: v1.3; older versions are in git history) are in
[`EDITORIAL_GUIDELINES.md`](./EDITORIAL_GUIDELINES.md).

## How the site uses it

| Field | On the website |
|---|---|
| `publish_date` | The record is shown on that date (Vietnam time, UTC+7). It is shown only on that date and never repeats. |
| `title`, `message` | Shown as written. |
| `closing_line` | Shown in italics under the message, if it isn't `null`. It is also included when someone shares the message. |
| `status` | Only `approved` and `published` are put into the site. `draft` never reaches readers. |
| `editorial_note`, `status`, `visual_direction` | Never sent to the browser. |
| `category`, `mood`, `content_type`, `related_episode_id`, `special_day` | Kept and carried through for later features. They are not shown yet. |

If a date has no approved record, the "Thông điệp hôm nay" section is hidden that day.
If one date has more than one record, the site shows `special_day` first, then
`episode_message`, then `daily_message`.

## Adding a batch

1. Drop the new file here as `batch-02.json`, `batch-03.json` and so on. All `*.json` files are read, and no code change is needed.
2. Rebuild and deploy (`npm run build:pages`, then push `gh-pages`).

The build checks every record and **stops with a clear error** in these cases:
- a field is missing or has the wrong type;
- the date is invalid;
- `message_id` is not `LP-DM-YYYYMMDD` or does not match `publish_date`;
- `content_type` or `status` has an unknown value;
- the same `message_id` appears twice in any batch.

A category outside the guidelines list only prints a warning.

## Approving

Change `"status": "draft"` to `"approved"` (or `"published"`) for each
record, then rebuild and deploy. Since the site is static, a change in
status goes live on the next deploy.

## Reviewing drafts locally

```bash
DAILY_MESSAGES_PREVIEW_DRAFTS=1 npm run dev
```

This shows drafts too, for review only. Never deploy a build made with this flag.
