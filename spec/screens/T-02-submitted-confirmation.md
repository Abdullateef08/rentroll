# T-02 · Submitted confirmation

## Meta

| | |
|---|---|
| **Route** | Not specified in the source — see `OPEN-03` |
| **Access** | Reached after a successful submission on T-01. No sign-in. |
| **Purpose** | Confirm the report landed, give it a number, and **get the tenant to save the link**. |
| **Arrives from** | T-01 |
| **Leads to** | T-03 · back to T-01 |
| **Build phase** | 3 |

## Components and interactions

| ID | Type | Content · what happens |
|---|---|---|
| `T02-SEC-CONFIRM` | Confirmation block | Tick icon · `Reported. Your request number is R-0412.` · `Your landlord has been notified.` |
| `T02-SEC-SUMMARY` | Summary block | **What they reported, so they can see it was captured correctly** |
| `T02-BTN-TRACK` | Primary button | "Check the status" → **T-03** |
| `T02-BTN-SAVE` | Secondary button | "Save this link" → **opens the device share sheet so they can bookmark or message it to themselves. On desktop, copies to clipboard with a toast.** |
| `T02-BTN-ANOTHER` | Quiet button | "Report something else" → **back to T-01, blank** |

## States

| State | Display |
|---|---|
| Default | Full-screen confirmation. This message is classified as **Full screen — T-02** in the message catalogue, not a toast. |
| Share sheet unavailable (desktop) | `T02-BTN-SAVE` copies the link and shows the `Copied.` toast (S-03 fallback) |

## Rules

- **`T02-BTN-SAVE` is more important than it looks.** A tenant who loses the link phones
  the landlord instead. **This is the one moment they are guaranteed to be looking at
  the screen, so this is where we ask them to keep it.** Give it real prominence; do not
  demote it to a text link.
- The link saved is the **unit link** (`/u/:unitToken`), not a link to this confirmation.
- `Your landlord has been notified.` must be true in the sense the tenant means it: the
  request appears on the landlord's board immediately. **It does not mean a message was
  sent** — nothing sends by itself (cross-cutting §1.1). Do not add a claim beyond this
  wording.
- No money, no other units (cross-cutting §1.2).
- Buttons are 48px tall; touch targets at least 48×48px.

> OPEN-03 — This screen has no specified route. It also cannot be returned to: a tenant
> who reloads or comes back later has only their unit link, which lands on T-01.
