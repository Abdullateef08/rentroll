# L-12 · Agreement tracker

> **The highest-value screen in the product, and it is almost entirely a sorted list.**

## Meta

| | |
|---|---|
| **Route** | `/agreements` |
| **Access** | Signed in |
| **Purpose** | Make sure nothing expires unnoticed. |
| **Arrives from** | Sidebar, `L03-CRD-EXPIRING` (90-day filter applied), `L03-ROW-ATTENTION` (agreements) |
| **Leads to** | S-01 (renewal draft), a calendar file |
| **Build phase** | 6 |

## Layout

Page header · summary strip · window filter · data table sorted by days remaining
ascending.

```
Agreements
 3 agreements ending in the next 90 days · ₹54,000 monthly rent at stake
 [ 30 days | 60 days | 90 days | All ]
──────────────────────────────────────────────────────────────────────────
 UNIT  TENANT     ENDS ON       DAYS   CURRENT   ESC%   SUGGESTED  ACTIONS
 3B    A. Iyer    28 Feb 2026   [22]   16,000    [8%]   17,280     Notice 📅 Renew
 1A    R. Sharma  15 Apr 2026   [68]   16,000    [8%]   17,280     Notice 📅 Renew
```

## Components

| ID | Type | Content and behaviour |
|---|---|---|
| `L12-STRIP-TOTAL` | Summary strip | `3 agreements ending in the next 90 days · ₹54,000 monthly rent at stake` |
| `L12-SEG-WINDOW` | Segmented choice | 30 days · 60 days · 90 days · All. **Default 90.** |
| `L12-TBL-AGREEMENTS` | Data table | Unit · Tenant · Ends on · Days remaining · Current rent · Suggested new rent · Actions. **Sorted by days remaining, ascending.** |
| `L12-CHP-COUNTDOWN` | Status chip | Under 30 days `danger` · 30–60 `warning` · 60–90 `neutral` |
| `L12-FLD-ESCALATION` | Inline field | Percentage, **defaults to the value in settings**. Changing it **recalculates the suggested rent in the same row, live**. |
| `L12-BTN-NOTICE` | Quiet button | "Send renewal notice" |
| `L12-BTN-CALENDAR` | Icon button | "Add to calendar" |
| `L12-BTN-RENEW` | Quiet button | "Record renewal" |

## Interactions

| Trigger | Result |
|---|---|
| `L12-BTN-NOTICE` | Opens S-01 with a **renewal draft containing the current rent, the new rent, and the effective date** |
| `L12-BTN-CALENDAR` | Downloads a **calendar file containing the expiry date with a reminder 30 days before**. Toast: `Added — open the file to save it to your calendar.` |
| `L12-BTN-RENEW` | **Inline form: new start date, new end date, new rent.** On save the agreement dates update, **the row leaves the list**, and **future rent rows use the new amount**. |
| `L12-FLD-ESCALATION` | Recalculates that row's suggested rent live; does not persist to settings |
| `L12-SEG-WINDOW` | Filters the list; default 90 |

## States

| State | Display |
|---|---|
| Loading | Skeleton table rows |
| Empty (within window) | `Nothing expiring in the next 90 days.` + **Switch to All** |
| **Already expired** | Appears **at the top in `danger` colour** with `Expired 14 days ago`, and **stays there until renewed or the tenancy is ended. It is never hidden.** |
| Arrived from L-03 | 90-day window pre-selected |

## Rules

- An agreement that has already expired appears at the top in `danger` with
  "Expired *n* days ago" and stays there until renewed or the tenancy is ended. **It is
  never hidden.**
- **Rent changes take effect from the new start date. Rows already generated for earlier
  months are not altered.**
- Expiry warnings are raised at **90, 60 and 30 days** (product scope). The dashboard
  surfaces the 30-day and 90-day bands; the 60-day band exists in the chip colouring.
- Suggested new rent = current rent increased by the escalation percentage.

> OPEN-26 — The default escalation percentage has no stated value, and no rounding rule
> is given for the suggested rent (the example above assumes none).

> OPEN-22 — The scope document lists "record a notice served" as a capability of this
> module. No control here sets a tenant's notice status.

> OPEN-08 — The renewal draft is drafted by "the app", but the scope document restricts
> the assistant to three places, none of which is renewal notices.

> OPEN-09 — Connection 9 lists "the notice period ending", "a scheduled vendor visit"
> and "a rent due date" as calendar entries. Only agreement expiry has a control.
