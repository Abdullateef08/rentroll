# P-01 · Rent receipt

## Meta

| | |
|---|---|
| **Type** | Print view |
| **Opened from** | `L04-BTN-RECEIPT` (new tab), `T05-BTN-PRINT` |
| **Purpose** | The numbered proof of payment the tenant gets every time, without asking. |
| **Build phase** | 4 |

## Contents

| Element | Source |
|---|---|
| Landlord name and logo | `L15-FLD-RECEIPTNAME`, `L15-UPL-LOGO` |
| Receipt number | Generated on mark-paid, e.g. `RR-0847` |
| Tenant | Rent entry's tenant |
| Unit | Unit number and property name |
| Month | e.g. February 2026 |
| **Amount in figures and words** | Amount actually received |
| Date received | From the mark-paid form |
| Payment reference | Optional, from the mark-paid form |
| **Payment QR** | S-02 payload for this landlord |
| **A signature line** | Blank, for the landlord |

## Rules

- **A separate page with no navigation, no buttons and a white background, opened in a
  new tab with the print dialog triggered on load.**
- **Do not attempt to hide the app's own interface with print styles.** The print view is
  its own page.
- Amount is shown **in figures and in words** — the words form is what makes the receipt
  usable as proof.
- Prints cleanly to A4 with the landlord's branding (phase-4 acceptance).
- The receipt reflects **the amount actually received**, which for a part payment is less
  than the rent due (L-04).
- Money is shown here even though this is tenant-reachable: this is the documented
  exception to the money-privacy rule (cross-cutting §1.2).

> OPEN-30 — Reached from T-05, this page is opened with a unit token rather than a
> landlord session. The authorisation rule, and which receipts a token may open, is not
> specified.

> OPEN-14 — With part payments, several receipts can exist for one rent entry, but the
> rent entry carries a single receipt number.

> OPEN-35 — A payment QR on a receipt for money already received has no explained
> purpose.

> OPEN-17 — The receipt-number format `RR-0847` is shown but the sequence is not defined:
> per landlord or global, and whether it resets by financial year. Note that mark-paid can
> be undone within 10 seconds, which affects sequence gaps.
