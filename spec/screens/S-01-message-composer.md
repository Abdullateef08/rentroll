# S-01 · Message composer

> **The single place where every outgoing message is reviewed and sent. This component
> is where the "nothing sends by itself" rule is enforced in code.**

## Meta

| | |
|---|---|
| **Type** | Modal, **560px on desktop, full screen on mobile** |
| **Opened from** | L-03, L-04, L-05, L-07, L-12, L-13 |
| **Purpose** | Review, edit and hand off every message the landlord sends. |
| **Build phase** | 5 |

## Layout

```
┌──────────────────────────────────────────────┐
│ Message to Suresh Khan · Flat 4C           × │  S01-HDR
│ [Rent] [18 days overdue] [Level 3 of 3]      │  S01-CHP-CONTEXT
├──────────────────────────────────────────────┤
│ [ Gentle | Direct | Formal ]                 │  S01-SEG-TONE
│ ┌──────────────────────────────────────────┐ │
│ │ Dear Mr Khan, the rent for February…     │ │  S01-FLD-MESSAGE
│ │                                          │ │  editable, auto-grows
│ └──────────────────────────────────────────┘ │
│ [x] Include a payment link                   │  S01-CHK-PAYLINK
│ Write it differently                         │  S01-BTN-REGENERATE
├──────────────────────────────────────────────┤
│ [ Open in WhatsApp ]  [ Copy ]               │
│ Email instead                        Cancel  │
└──────────────────────────────────────────────┘
```

## Components

| ID | Type | Content and behaviour |
|---|---|---|
| `S01-HDR` | Modal header | "Message to Suresh Khan · Flat 4C" |
| `S01-CHP-CONTEXT` | Chip row | Context reminder — e.g. `Rent · 18 days overdue · Level 3 of 3` |
| `S01-SEG-TONE` | Segmented choice | **Gentle · Direct · Formal. Pre-selected by days overdue. Changing it regenerates the draft.** |
| `S01-FLD-MESSAGE` | Text area | The drafted message, **fully editable**. Auto-grows. **This is a normal editable field, not a preview.** |
| `S01-CHK-PAYLINK` | Checkbox | "Include a payment link" — **ticked by default for rent messages, absent for others** |
| `S01-BTN-REGENERATE` | Quiet button | "Write it differently" — requests a new draft, **keeping any edits in a restorable state** |
| `S01-BTN-WHATSAPP` | Primary button | "Open in WhatsApp" |
| `S01-BTN-COPY` | Secondary button | "Copy" |
| `S01-BTN-EMAIL` | Quiet button | "Email instead" — **only when an email address exists** |
| `S01-BTN-CANCEL` | Quiet button | "Cancel" |

## Interactions

| Trigger | Result |
|---|---|
| **Modal opens** | Draft is requested and **a skeleton shows in the text area for up to 4 seconds**. If it does not arrive, **a plain template appears** with a quiet note: `Wrote this from a template — edit as needed.` **The composer is never blocked by the assistant.** |
| `S01-BTN-WHATSAPP` | Opens WhatsApp **in a new tab** with the current text pre-filled → **the modal switches to a second state: `Did you send it?` with Yes and Not yet. Only "Yes" writes the reminder to the timeline.** |
| `S01-BTN-COPY` | Copies to clipboard, toast confirms, **and the same `Did you send it?` prompt appears** |
| `S01-BTN-EMAIL` | Opens the email app with subject and body ready; same send-confirmation step |
| `S01-SEG-TONE` | Regenerates the draft. **If the message has been edited, warn before regenerating: `This will replace your edits.`** |
| `S01-BTN-REGENERATE` | New draft; prior edits remain restorable |
| `S01-BTN-CANCEL` | **Closes with no record written.** If edited, confirm first. |
| `S01-CHK-PAYLINK` | Adds or removes the payment link in the message body |

## The second state — "Did you send it?"

> **The "Did you send it?" step is not optional.** The app hands the message to
> WhatsApp; **it cannot know whether the landlord actually pressed send there. Recording
> a reminder that was never sent would corrupt the escalation history and produce a wrong
> tone next time.**

| Answer | Result |
|---|---|
| **Yes** | Writes a reminder record: level, sent-on timestamp, method (whatsapp / copy / email). Toast `Reminder recorded on the tenant's history.` Closes. |
| **Not yet** | Writes nothing. Returns to the composer or closes without a record. |

## States

| State | Display |
|---|---|
| Draft loading | Skeleton lines inside `S01-FLD-MESSAGE`, 4-second ceiling |
| Template fallback | Plain template plus the quiet note; all controls active |
| Edited | Regenerate and cancel both confirm first |
| Send confirmation | Second modal state with Yes / Not yet |
| No email on record | `S01-BTN-EMAIL` absent, not disabled |

## Message contexts

| Opened from | Context | Tone selector | Payment link | Recipient |
|---|---|---|---|---|
| L-03 row "Remind" | Rent reminder | Yes, pre-selected by days overdue | Ticked by default | Tenant |
| L-04 `L04-BTN-REMIND` | Rent reminder | Yes | Ticked by default | Tenant |
| L-05 `L05-BTN-REMIND` | Rent reminder | Yes | Ticked by default | Tenant |
| L-07 `L07-BTN-DISPATCH` | Vendor job: the problem, the unit's address, the tenant's phone, a Maps link | See `OPEN-09` | Absent | **Vendor's number, not the tenant's** |
| L-07 `L07-BTN-UPDATETENANT` | Status update built from **status and category only** | See `OPEN-09` | Absent | Tenant |
| L-12 `L12-BTN-NOTICE` | Renewal: current rent, new rent, effective date | See `OPEN-09` | Absent | Tenant |
| L-13 `L13-BTN-SEND` | Settlement summary | See `OPEN-09` | Absent | Tenant |
| S-02 `S02-BTN-SENDLINK` | Payment link already embedded | n/a | Embedded | Tenant |

## Rules

- **No message ever leaves the system without the landlord pressing send.** This
  component never dispatches; it hands off to WhatsApp, email or the clipboard.
- The tone segmented choice reflects the reminder ladder's three fixed levels; the day
  numbers behind the pre-selection come from `L15-TBL-LADDER`.
- **The tenant update draft never mentions cost or vendor rates** (cross-cutting §1.2).
- Modal traps focus, returns focus to the trigger on close, closes on Escape
  (cross-cutting §6).
- Clipboard writes must be called directly from the click handler, never after an
  `await` (S-03).

> OPEN-08 — Whether the assistant writes the vendor, tenant-update, renewal and
> settlement drafts, or whether those are fixed templates, is unresolved. The scope
> document restricts the assistant to reminders, request sorting and settlement
> statements.

> OPEN-09 — The tone selector is specified only in terms of days overdue. Whether it
> appears at all on vendor, renewal and status-update messages is not stated.
