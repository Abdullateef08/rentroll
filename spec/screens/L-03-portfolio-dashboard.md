# L-03 · Portfolio dashboard

The hub. The only screen that routes to everywhere else.

## Meta

| | |
|---|---|
| **Route** | `/` |
| **Access** | Signed in |
| **Purpose** | Answer one question in five seconds: **is anything wrong today?** Everything on this screen is either a number or a problem with a fix button next to it. |
| **Arrives from** | L-01, L-02, the sidebar, the app logo |
| **Leads to** | L-04, L-06, L-12, and directly into S-01 |
| **Build phase** | 6 |

## Layout

Top to bottom: page header · four stat cards in a row · income chart · Needs attention
list. **Nothing else. Resist adding a second chart.**

```
RentRoll                                                        Account
────────────────────────────────────────────────────────────────────────
 OCCUPIED       COLLECTED       DUES           EXPIRING
 12 / 14        ₹2,10,000       ₹36,000        3
 2 vacant       vs last month   across 2 units within 90 days
────────────────────────────────────────────────────────────────────────
 INCOME, LAST 6 MONTHS
 ▁ ▃ ▅ ▄ ▆ ▇
────────────────────────────────────────────────────────────────────────
 NEEDS ATTENTION
 ⚠ 4C · rent 18 days overdue                    [18d late]  [ Remind ]
 ⚠ 1B · geyser leaking, urgent                  [Urgent]    [ Open   ]
 ⚠ 3B · agreement ends in 22 days               [22 days]   [ Open   ]
 ⚠ 2A · rent 5 days overdue                     [5d late]   [ Remind ]
```

Under 640px the stat cards go two per row (foundations §4).

## Components

| ID | Type | Content and behaviour |
|---|---|---|
| `L03-CRD-OCCUPANCY` | Stat card | Label "Occupied". Value "12 / 14". Sub-line "2 vacant". |
| `L03-CRD-COLLECTED` | Stat card | Label "Collected this month". Value in ₹. Sub-line compares to last month. |
| `L03-CRD-DUES` | Stat card | Label "Outstanding". Value in ₹, **`danger` colour when above zero**. Sub-line "across 2 units". |
| `L03-CRD-EXPIRING` | Stat card | Label "Agreements expiring". Value = count within 90 days. **`warning` colour when above zero.** |
| `L03-CHT-INCOME` | Bar chart | Rent collected per month, last six months. Hover shows the exact figure. **No legend, no axis clutter.** |
| `L03-LST-ATTENTION` | List | Merged and sorted list of everything needing action — see ordering below. |
| `L03-ROW-ATTENTION` | List row | Icon · unit number · one-line description · status chip · **one** action button |

The whole stat card is the click target, not just the number (foundations §2.3).

## Interactions

| Trigger | Result |
|---|---|
| `L03-CRD-DUES` | Route to L-04 with the **Overdue** filter already applied |
| `L03-CRD-EXPIRING` | Route to L-12 with the **90-day** filter applied |
| `L03-CRD-OCCUPANCY` | Route to L-08 **filtered to vacant units** |
| `L03-CRD-COLLECTED` | Route to L-04 for the current month, no filter |
| `L03-ROW-ATTENTION` | Route to the relevant detail — rent rows to L-05, requests to L-07, agreements to L-12 |
| Row action **"Remind"** | Opens **S-01 directly, without navigating away**. Closing S-01 returns to the dashboard with the row refreshed. |
| Row action **"Open"** | Opens the relevant detail panel over the dashboard |

Row buttons stop the row-click from propagating (cross-cutting §8.1).

## Needs attention — what appears and in what order

| Order | Item | Condition |
|---|---|---|
| 1 | Urgent maintenance request | Urgency = urgent and status is not closed |
| 2 | Rent overdue 10+ days | Unpaid and past due by 10 or more days |
| 3 | Agreement expiring within 30 days | Agreement end date minus today ≤ 30 |
| 4 | Rent overdue 1–9 days | Unpaid and past due |
| 5 | Open maintenance request | Any other open request, oldest first |
| 6 | Agreement expiring within 90 days | Agreement end date minus today ≤ 90 |

> OPEN-19 — Rank 4's condition as written ("unpaid and past due") also matches rank 2.
> Read it as **1–9 days** overdue; the condition column is loose. Rank 6 has the same
> shape against rank 3 and should be read as **31–90 days**.

Within a rank, the source specifies ordering only for rank 5 (oldest first). Use the
same rule — oldest first — for the others.

## States

| State | Display |
|---|---|
| **Loading** | Skeleton shapes in place of the four cards and six list rows. **Never a full-page spinner.** |
| **Nothing wrong** | The Needs attention card shows `Nothing needs your attention today.` with a tick icon. **This is a deliberate reward state, not an empty state.** |
| **No data at all** | Only reachable if L-02 was skipped. Shows `Add your first property to see your dashboard` with a button to L-08. |
| **Load failure** | **Card-level:** each card shows a retry link. One failed card does not blank the page. |

> OPEN-05 — The "no data at all" state may be unreachable given L-02's gate; see L-02.
> The button it offers goes to L-08, which adds units rather than properties — see
> `OPEN-04`.

## Rules

- Four stat cards, one chart, one list. No additions.
- Every row in Needs attention carries exactly one action button.
- The dashboard is read-only apart from the row actions; nothing is edited here.
- `L03-CRD-DUES` and `L03-CRD-EXPIRING` change colour on threshold, but the number is
  always shown with its label (colour is never the only signal — foundations §1.1).

> OPEN-32 — The source wireframe renders collected rent as `2.1L`; this screen's
> component table says "Value in ₹". Decide whether stat cards abbreviate to lakh.
