# T-05 · My receipts

## Meta

| | |
|---|---|
| **Route** | Not specified in the source — see `OPEN-03` |
| **Access** | Holder of the unit link. No sign-in. |
| **Purpose** | Give the tenant proof of rent paid, on hand, without asking anyone. |
| **Arrives from** | Nothing specified — see `OPEN-03` |
| **Leads to** | P-01 |
| **Build phase** | 6 |

## Components and interactions

| ID | Type | Content · what happens |
|---|---|---|
| `T05-LST-RECEIPTS` | List | **Month · amount · receipt number · a print button each** |
| `T05-BTN-PRINT` | Icon button | **Opens P-01 for that receipt** |

## States

| State | Display |
|---|---|
| Loading | Skeleton list rows |
| Empty | `Receipts appear here once your landlord records a payment.` **No action offered.** |
| Invalid or dead link | `This link is not valid. Please ask your landlord for your unit link.` |

## Rules

- **This screen is the documented exception to "money stays private".** Receipts on T-05
  **do** show amounts, *because those are the tenant's own payments and the receipt is
  the point.*
- The exception is narrow. This screen shows **only** amounts actually received against
  this tenancy. It never shows: what is outstanding, what is due next, what any month was
  expected to be, repair costs, deposit deductions in progress, or anything about another
  unit or tenant.
- Current tenancy only, matching T-03.
- Icon buttons carry an accessible label and a tooltip (cross-cutting §6). The print icon
  is 48×48px on this tenant screen.

> OPEN-30 — P-01 is opened here with a unit token rather than a landlord session. The
> authorisation model for a print view reached that way, and which receipts a token may
> open, is not specified.

> OPEN-03 — No route is specified and no screen links here.
