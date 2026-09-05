# L-13 · Deposit and settlement

> **Turn a potential argument into a document. This screen exists to be printed.**

## Meta

| | |
|---|---|
| **Route** | `/deposits` (list) · `/deposits/:tenantId` (settlement) |
| **Access** | Signed in |
| **Purpose** | Show every deposit held, and build the settlement statement for a departing tenant. |
| **Arrives from** | Sidebar, `L11-BTN-ENDTENANCY` (with the tenant selected) |
| **Leads to** | P-02 · S-01 |
| **Build phase** | 7 |

## Layout

**`/deposits`** — a table of every deposit currently held, with the total at the top.

**`/deposits/:tenantId`** — the settlement page:

```
Settlement · M. Desai · Flat 2A
────────────────────────────────────────────────────────
 Deposit held      ₹36,000        L13-SEC-DEPOSIT
 Date received     05 Feb 2024
 Agreement         05 Feb 2024 – 04 Feb 2026
────────────────────────────────────────────────────────
 DEDUCTIONS                    [ Pull from repair history ]
 Description   Reason              Amount    Photo
 Geyser repair Damaged by tenant   1,200     [img]   ×
 Deep clean    Beyond normal wear  2,500     —       ×
 + Add deduction
────────────────────────────────────────────────────────
 Deposit held  ₹36,000
 Deductions   −₹3,700
 REFUND DUE    ₹32,300                L13-SEC-BALANCE
────────────────────────────────────────────────────────
 [ Prepare settlement statement ]  [ Print ]  [ Send ]  [ Mark settled ]
```

## Components

| ID | Type | Content and behaviour |
|---|---|---|
| `L13-TBL-HELD` | Data table | Every deposit currently held: **unit, tenant, amount, since when. Total at the top.** |
| `L13-SEC-DEPOSIT` | Key-value block | On the settlement page: **amount held, date received, agreement reference** |
| `L13-TBL-DEDUCTIONS` | Editable table | Each row: **description · reason · amount · photo**. Add and remove rows. |
| `L13-BTN-FROMREQUESTS` | Secondary button | "Pull from repair history" — **lists this tenancy's requests with costs and lets the landlord tick the ones to deduct, carrying their photos across** |
| `L13-SEC-BALANCE` | Calculation block | **Deposit held − total deductions = refund due. Large, unmissable.** |
| `L13-BTN-GENERATE` | Primary button | "Prepare settlement statement" |
| `L13-BTN-PRINT` | Secondary button | Opens **P-02** |
| `L13-BTN-SEND` | Secondary button | Opens **S-01 with the settlement summary** |
| `L13-BTN-CLOSE` | Primary button | "Mark settled" → **confirm** → **tenancy closes, unit becomes vacant, statement is filed under documents** |

Two primary buttons appear on this screen (`L13-BTN-GENERATE` and `L13-BTN-CLOSE`).
They belong to different screen regions — the statement block and the closing action —
which satisfies the "maximum one primary per screen region" rule (foundations §2.1).

## Interactions

| Trigger | Result |
|---|---|
| `L13-TBL-HELD` row click | Opens that tenancy's settlement page |
| `L13-BTN-FROMREQUESTS` | Modal listing this tenancy's requests with their costs; ticking one adds a deduction row **carrying its photos across** |
| Add / remove deduction row | Recalculates `L13-SEC-BALANCE` live |
| `L13-BTN-GENERATE` | Assistant turns the deposit amount, the deductions and their reasons into a written statement (product.md §10) |
| `L13-BTN-PRINT` | Opens P-02 in a new tab with the print dialog triggered on load |
| `L13-BTN-SEND` | Opens S-01 with the settlement summary |
| `L13-BTN-CLOSE` | Confirm dialog → tenancy closes → **unit becomes vacant** → **the tenant's unit link stops working** → statement is filed under documents (L-14) |

## States

| State | Display |
|---|---|
| Loading | Skeleton table |
| Empty (`/deposits`) | `Deposits appear here once you add tenants.` + **Add tenant** |
| Deductions exceed deposit | Balance shows as **an amount owed by the tenant, in `danger` colour**, and **the statement wording changes accordingly** |
| Deduction missing a reason | Cannot be saved |
| Deduction missing a photo | **Warning shown, but allowed** |
| Settled | The statement is **read-only** |

## Rules

- **A deduction without a written reason cannot be saved.**
- **A deduction without a photo shows a warning but is allowed**, since not everything is
  photographable.
- **If deductions exceed the deposit**, the balance shows as an amount owed by the
  tenant, in `danger` colour, and the statement wording changes accordingly.
- **Once marked settled, the statement becomes read-only. Corrections require a new
  statement that references the first.**
- Marking settled has three side effects that must happen together: tenancy closes, unit
  becomes vacant, statement is filed under documents.
- This is one of the two places where money is shown to a tenant (cross-cutting §1.2) —
  the settlement statement they receive lists every deduction and its photo.
