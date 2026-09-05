# P-02 · Settlement statement

## Meta

| | |
|---|---|
| **Type** | Print view |
| **Opened from** | `L13-BTN-PRINT` |
| **Purpose** | The document that turns a deposit argument into a signature. |
| **Build phase** | 7 |

## Contents

| Element | Source |
|---|---|
| Tenancy dates | Agreement start and end |
| Deposit held | `L13-SEC-DEPOSIT` |
| **Each deduction with reason and thumbnail** | `L13-TBL-DEDUCTIONS` |
| Total | Sum of deductions |
| **Balance refundable or owed** | `L13-SEC-BALANCE` |
| **Space for both signatures** | Landlord and tenant |
| Landlord name and logo | `L15-FLD-RECEIPTNAME`, `L15-UPL-LOGO` |

## Rules

- A separate page with no navigation, no buttons and a white background, opened in a new
  tab with the print dialog triggered on load. Do not hide the app's interface with print
  styles.
- **Every deduction prints with its written reason.** A deduction cannot exist without
  one (L-13).
- A deduction's photo prints as a thumbnail when present. A deduction without a photo is
  allowed and prints without one.
- **If deductions exceed the deposit**, the balance prints as an amount **owed by the
  tenant** and the statement wording changes accordingly.
- **Once the settlement is marked settled, the statement is read-only. Corrections
  require a new statement that references the first** — so the print view must be able to
  render a superseding statement that names the one it replaces.
- The statement is filed under documents (L-14) when the settlement is marked settled.
- Phase-7 acceptance: deductions pull from repair history **with photos attached**.

This is the second of the two places money reaches a tenant (cross-cutting §1.2), and
the whole point of the screen behind it: *a clear statement that explains each deduction
turns an argument into a signature.*
