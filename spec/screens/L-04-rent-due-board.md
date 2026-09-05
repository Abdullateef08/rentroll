# L-04 · Rent due board

## Meta

| | |
|---|---|
| **Route** | `/rent` · `/rent?month=2026-02&status=overdue` |
| **Access** | Signed in |
| **Purpose** | See who has paid, and act on who has not, **without leaving the screen**. |
| **Arrives from** | Sidebar, `L03-CRD-DUES`, `L03-CRD-COLLECTED` |
| **Leads to** | L-05 detail panel · S-01 composer · S-02 payment sheet · P-01 receipt |
| **Build phase** | 4 |

## Layout

Page header with month selector · summary strip · filter row · data table. **On mobile
the table becomes stacked cards.**

```
Rent · February 2026                                        [ Export ]
 ◄  February 2026  ►
────────────────────────────────────────────────────────────────────
 Expected ₹2,46,000   Collected ₹2,10,000   Outstanding ₹36,000
────────────────────────────────────────────────────────────────────
 [ All | Pending | Overdue | Paid ]              [ Property ▾ ]
────────────────────────────────────────────────────────────────────
 UNIT   TENANT      RENT      DUE DATE      STATUS       ACTIONS
 1A     R. Sharma   16,000    05 Feb 2026   [Paid]       [🖨]
 1B     A. Iyer     16,000    05 Feb 2026   [Paid]       [🖨]
 2A     M. Desai    18,000    05 Feb 2026   [5 days late]  Remind  Mark paid
 4C     S. Khan     18,000    05 Feb 2026   [18 days late] Remind  Mark paid
```

## Components

| ID | Type | Content and behaviour |
|---|---|---|
| `L04-SEL-MONTH` | Month stepper | Back arrow · "February 2026" · forward arrow. **Forward is disabled beyond the current month.** |
| `L04-STRIP-SUMMARY` | Summary strip | Three figures: expected, collected, outstanding. **Updates with the filter.** |
| `L04-SEG-FILTER` | Segmented choice | All · Pending · Overdue · Paid. Default **All**. Reflected in the URL. |
| `L04-SEL-PROPERTY` | Dropdown | **Hidden when the landlord has one property.** |
| `L04-TBL-RENT` | Data table | Columns: Unit · Tenant · Rent · Due date · Status · Actions |
| `L04-CHP-STATUS` | Status chip | Paid (`success`) · Due (`neutral`) · *n* days late (`warning` at 1–9, `danger` at 10+) |
| `L04-BTN-REMIND` | Quiet button | "Remind" — **shown only when unpaid** |
| `L04-BTN-MARKPAID` | Quiet button | "Mark paid" — **shown only when unpaid** |
| `L04-BTN-RECEIPT` | Icon button | Print icon — **shown only when paid** |
| `L04-BTN-EXPORT` | Secondary button | "Export" in the page header |

> OPEN-18 — `Due (neutral)` here contradicts the token table, which assigns `warning` to
> "due soon".

## Interactions

| Trigger | Result |
|---|---|
| `L04-ROW` | Opens L-05 detail panel for that rent entry |
| `L04-BTN-REMIND` | Opens **S-01 pre-loaded with the escalation level matching days overdue**. Stops row-click propagation. |
| `L04-BTN-MARKPAID` | Opens a small **inline form in the row**: amount received (pre-filled with rent due), date received (defaults today), payment reference (optional). Confirm → row flips to Paid → **receipt number is generated** → toast `Payment recorded. Receipt RR-0847 created.` with an **Undo that reverses it for 10 seconds**. |
| `L04-BTN-RECEIPT` | Opens **P-01 in a new tab** |
| `L04-BTN-EXPORT` | Downloads a **CSV of the current filtered view**. File named `rent-2026-02.csv`. Toast confirms. |
| `L04-SEG-FILTER` | Filters the table **without a page reload** and updates the URL so the view can be shared or bookmarked |
| `L04-SEL-MONTH` | Loads that month; updates the URL `month` parameter |

> OPEN-06 — The toast lives 4 seconds (foundations §2.3) but its Undo is specified as
> reversing for 10.

## States

| State | Display |
|---|---|
| Loading | Skeleton table rows matching the real layout |
| Empty, no units | `Add a unit and this month's rent will appear here.` + **Add unit** |
| Empty, all paid | `Everything is paid for February. Nice.` (month is the selected month) |
| Rent rows not generated | Banner: `This month's rent rows have not been created.` with a button to create them now |
| Under 640px | Stacked cards, key fields only, tap opens L-05 full-screen |

## Rules and edge cases

- **Part payment.** If the amount received is less than the rent due, the row shows
  `Part paid — ₹4,000 pending` and **remains in the Pending filter**. A receipt is issued
  for the amount actually received.
- **Vacant units** do not appear at all for months in which they had no tenant.
- **Mid-month move-in.** The first month's row is created with the **pro-rata** amount,
  and the row shows a small "pro-rata" note. The landlord can edit the amount before
  marking paid (via `L05-BTN-EDIT`).
- **Rent rows are created on the 1st.** If that job did not run, the board shows the
  banner above with a button to create them now.
- **Marking paid twice is impossible** — the button is replaced the moment the state
  changes.
- Forward month navigation is disabled beyond the current month; past months remain
  browsable.

> OPEN-14 — Part payment implies several payments and several receipts against one rent
> entry, but the rent entry carries a single `amount paid` and a single `receipt number`.
> Whether the second part-payment issues a second receipt, and how both are stored, is
> undecided.

> OPEN-15 — The pro-rata calculation method is not specified (actual days, 30-day
> convention, or landlord-entered).

> OPEN-16 — The due date column has no specified source. Nothing says whether it comes
> from the unit, the agreement, or a global setting.

> OPEN-24 — The product scope lists "issue **and send** the receipt" as a rent-board
> capability. This screen specifies only the print icon. No send-receipt path exists on
> any screen.
