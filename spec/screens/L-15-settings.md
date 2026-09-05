# L-15 · Settings

The source presents L-14 and L-15 on one page; they are split here because they are
separate screens with separate sidebar entries.

## Meta

| | |
|---|---|
| **Route** | `/settings` — inferred from the sidebar; the source gives no route (`OPEN-25`) |
| **Access** | Signed in |
| **Purpose** | The handful of values the rest of the product reads. |
| **Arrives from** | Sidebar (bottom, with account), the missing-UPI prompt in S-02, the missing-accountant-email prompt in L-14 |
| **Leads to** | Nothing; other screens read these values |
| **Build phase** | 7 |

## Components

| ID | Type | Content and behaviour |
|---|---|---|
| `L15-FLD-UPI` | Text field | **UPI ID used in every payment link and QR** |
| `L15-FLD-RECEIPTNAME` | Text field | **Name printed on receipts and statements** |
| `L15-UPL-LOGO` | Photo uploader | **Optional logo for print views** |
| `L15-FLD-ESCDEFAULT` | Text field | **Default rent escalation percentage** |
| `L15-TBL-LADDER` | Editable table | **The reminder ladder: day 3 gentle, day 10 direct, day 20 formal. Days are editable; the three levels are fixed.** |
| `L15-FLD-CAEMAIL` | Text field | **Accountant's email**, used by `L14-BTN-EMAILCA` |

## Who reads each setting

| Setting | Read by |
|---|---|
| `L15-FLD-UPI` | S-02 (payment link and QR), P-01 (QR on the receipt), any payment message from S-01 |
| `L15-FLD-RECEIPTNAME` | P-01, P-02 |
| `L15-UPL-LOGO` | P-01, P-02, P-03, and the `T01-HDR` header |
| `L15-FLD-ESCDEFAULT` | `L12-FLD-ESCALATION` default |
| `L15-TBL-LADDER` | S-01 tone pre-selection, L-05 escalation level, L-04 reminder level |
| `L15-FLD-CAEMAIL` | `L14-BTN-EMAILCA` |

## States

| State | Display |
|---|---|
| Loading | Skeleton fields |
| Saving | Field-level save with an inline spinner; validation on blur, not on keystroke |
| Save failure | `Could not save. Your changes are still here — try again.` inline above the form |
| UPI empty | Allowed. Payment features prompt to add it rather than being hidden. |

## Rules

- `L15-FLD-UPI` is validated for **shape (`name@handle`) but not verified** — the same
  rule as `L02-FLD-UPI`. Leaving it empty is allowed; payment features then prompt.
- `L15-FLD-RECEIPTNAME` defaults to the account name.
- `L15-UPL-LOGO` follows S-04 behaviour.
- `L15-FLD-ESCDEFAULT` is only a default. Changing it does not alter agreements already
  renewed, and `L12-FLD-ESCALATION` overrides it per row without writing back here.
- `L15-TBL-LADDER` edits the **days only**. The three levels — gentle, direct, formal —
  are fixed, because the assistant's tone contract depends on them.

> OPEN-07 — Editing the ladder days does not obviously move the status thresholds on
> L-04 (`warning` at 1–9 days, `danger` at 10+) or the dashboard's "rent overdue 10+
> days" attention rank. Decide whether those derive from the ladder or stay fixed.

> OPEN-26 — No default value is given for the escalation percentage.

Account and password management sit in this region of the sidebar ("Settings and account
sit at the bottom") but are not specified beyond L-01's password rules.
