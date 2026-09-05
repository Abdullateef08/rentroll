# L-05 · Rent detail panel

## Meta

| | |
|---|---|
| **Route** | `/rent/:entryId` — **opens as a panel over L-04** |
| **Access** | Signed in |
| **Purpose** | Everything about one month's rent for one unit, **including the full reminder history**. |
| **Arrives from** | `L04-ROW`, `L03-ROW-ATTENTION` (rent rows) |
| **Leads to** | S-01, S-02, P-01 |
| **Build phase** | 4 |

## Layout

Detail panel: 480px wide on desktop, full screen on mobile. Over 1024px it opens
alongside rather than over content (foundations §4). Closes on Escape, backdrop click
and the close button; warns before closing if a field has unsaved edits.

```
┌─────────────────────────────────────────┐
│ Flat 2A · February 2026   [5 days late] ×│  L05-HDR
├─────────────────────────────────────────┤
│ Rent due          ₹18,000                │  L05-SEC-AMOUNT
│ Amount paid       —                      │
│ Due date          05 Feb 2026            │
│ Date paid         —                      │
│ Payment reference —                      │
│ Receipt number    —                      │
├─────────────────────────────────────────┤
│ M. Desai   +91 98xxx xxxxx   [call][msg][copy] │  L05-SEC-TENANT
├─────────────────────────────────────────┤
│ ● 10 Feb  Direct reminder sent, WhatsApp │  L05-TML-REMINDERS
│ ● 08 Feb  Call logged — promised to pay  │
│ ● 03 Feb  Gentle reminder sent, WhatsApp │
├─────────────────────────────────────────┤
│ [ Send reminder ] [Payment link] [Mark paid] │
│ Log a call   Edit amount                 │
└─────────────────────────────────────────┘
```

## Components

| ID | Type | Content and behaviour |
|---|---|---|
| `L05-HDR` | Panel header | "Flat 2A · February 2026" · status chip · close button |
| `L05-SEC-AMOUNT` | Key-value block | Rent due · amount paid · due date · date paid · payment reference · receipt number |
| `L05-SEC-TENANT` | Contact block | Tenant name, phone, with **call, message and copy** icon buttons |
| `L05-TML-REMINDERS` | Timeline | Every reminder sent, its level, when, by which method; **plus any logged calls** |
| `L05-BTN-REMIND` | Primary button | "Send reminder" |
| `L05-BTN-PAYLINK` | Secondary button | "Payment link" |
| `L05-BTN-MARKPAID` | Secondary button | "Mark paid" |
| `L05-BTN-LOGCALL` | Quiet button | "Log a call" |
| `L05-BTN-EDIT` | Quiet button | "Edit amount" — for pro-rata or agreed adjustments. **Any edit is recorded on the timeline with the old and new value.** |

## Interactions

| Trigger | Result |
|---|---|
| `L05-BTN-REMIND` | Opens S-01 **at the correct escalation level** |
| `L05-BTN-PAYLINK` | Opens S-02 with the **outstanding** amount pre-filled |
| `L05-BTN-MARKPAID` | Same inline mark-paid form as `L04-BTN-MARKPAID` |
| `L05-BTN-LOGCALL` | Opens a **two-field form**: outcome (dropdown: promised to pay / no answer / disputed / other) and a note. **Saves to the timeline as a reminder record with method `call`.** |
| Call icon in `L05-SEC-TENANT` | Dials. **On return to the tab, a prompt appears: `Log this call?`** — accepting opens the same form as above. |
| Message icon in `L05-SEC-TENANT` | Opens S-01 |
| Copy icon in `L05-SEC-TENANT` | Copies the phone number; `Copied.` toast (S-03 behaviour) |
| `L05-BTN-EDIT` | Inline amount edit; on save writes a timeline entry carrying old and new value |

## States

| State | Display |
|---|---|
| Loading | Skeleton lines inside the panel |
| Paid | Amount, date paid, reference and receipt number populated; `L05-BTN-REMIND` and `L05-BTN-MARKPAID` no longer apply |
| No reminders yet | Timeline shows the row creation only |
| Unsaved edit + close attempt | Warn before closing (foundations §2.3) |

## Rules

- The timeline is the **audit record for escalation**. A reminder appears here only after
  the landlord confirms "Yes" in S-01's "Did you send it?" step (cross-cutting §1.1).
- A logged call is stored as a REMINDER with method `call` and the note in `call notes`.
- Editing the amount never rewrites history; it appends.
- The escalation level offered by `L05-BTN-REMIND` is derived from **days overdue**, not
  from how many reminders were already sent.

> OPEN-25 — This route is specified as "opens as a panel over L-04". What happens on a
> direct visit or a page refresh at `/rent/:entryId` — whether L-04 renders behind it —
> is not stated.

> OPEN-07 — "The correct escalation level" is defined by the 3/10/20 ladder, whose days
> are editable in L-15 while the chip thresholds on L-04 are fixed at 1–9 / 10+.
