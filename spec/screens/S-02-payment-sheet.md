# S-02 · Payment sheet

## Meta

| | |
|---|---|
| **Type** | Sheet / modal |
| **Opened from** | `L04-BTN-REMIND` flow, `L05-BTN-PAYLINK`, `L07-CHK-TENANTLIABLE` → "Send payment request" |
| **Purpose** | Produce a payment hand-off — a link, a QR, or a message carrying one — for an exact amount. |
| **Build phase** | 5 |

## Components and interactions

| ID | Type | Content · what happens |
|---|---|---|
| `S02-FLD-AMOUNT` | Money field | **Pre-filled with the outstanding amount, editable** |
| `S02-FLD-NOTE` | Text field | Pre-filled `Rent Feb 2026 — Flat 2A`. **Appears in the tenant's payment app.** |
| `S02-IMG-QR` | QR image | **Regenerates whenever the amount changes. Large enough to scan from a laptop screen.** |
| `S02-BTN-PAY` | Primary button | "Open payment app" — **works on the tenant's phone; on desktop it is disabled with a tooltip: `Scan the code with your phone instead.`** |
| `S02-BTN-COPYLINK` | Secondary button | **Copies the payment link so it can be pasted into any message** |
| `S02-BTN-SENDLINK` | Secondary button | **Opens S-01 with the payment link already embedded** |
| `S02-BTN-DOWNLOADQR` | Quiet button | **Saves the QR as an image** |

## States

| State | Display |
|---|---|
| Default | Amount and note pre-filled, QR rendered |
| Amount changed | QR regenerates immediately |
| **No UPI ID saved** | **The sheet shows a prompt with a link to L-15 rather than a broken QR** |
| Desktop | `S02-BTN-PAY` disabled with the tooltip above; the QR is the primary path |

## Rules

- **The sheet never claims payment has been received. Marking paid is always a separate,
  deliberate act by the landlord.** Nothing on this sheet changes a rent entry's status.
- If no UPI ID is saved, prompt with a link to L-15; never render a broken QR.
- The QR and the link encode the same UPI payload: the landlord's UPI ID, the exact
  amount, and the note.
- The note text reaches the tenant's payment app, so it is written for them, not for
  internal reference.
- Payment reasons this sheet serves (connection 1): monthly rent from a reminder ·
  deposit at move-in · a repair the tenant is liable for · a late fee.

> OPEN-12 — "A late fee" is named as a payment reason but no late-fee feature, field or
> calculation exists anywhere in the product.

> OPEN-35 — Connection 2 says the payment QR is "printed on every receipt", and P-01
> includes one. A receipt is issued for money already received, so what that QR is for is
> not explained.
