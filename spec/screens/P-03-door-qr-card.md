# P-03 · Door QR card

## Meta

| | |
|---|---|
| **Type** | Print view |
| **Opened from** | `L08-BTN-PRINTQR` (one card per selected unit), `L09-BTN-QR` (modal → print) |
| **Purpose** | Put the unit's reporting link on a sticker inside the flat door, so the tenant never has to find the link. |
| **Build phase** | 7 |

## Contents

| Element | Source |
|---|---|
| Unit number | Unit |
| Property name | Property |
| **The QR** | Encodes `/u/:unitToken` |
| One line: `Scan to report a problem` | Fixed copy |
| **Landlord's phone as a fallback** | Landlord |

**Sized four to an A4 page.**

## Rules

- A separate page with no navigation, no buttons and a white background, opened in a new
  tab with the print dialog triggered on load. Do not hide the app's interface with print
  styles.
- **The QR encodes the token URL, never the unit number** — the unit number is printed as
  human-readable text on the card, but `/u/2A` must not exist (cross-cutting §5).
- Bulk printing prints **one card per selected unit** from `L08-CHK-SELECT`.
- Phase-7 acceptance: **four to a page, scannable from print.** Test with an actual
  printout at the intended size, not on screen.
- The landlord's phone is on the card deliberately: some things need a phone call, and a
  card with only a QR fails the tenant whose camera will not scan.

## Where these cards are used

From connection 11: a sticker inside the flat door · the welcome sheet handed over at
move-in · a notice board in the building.

Card stock and adhesive are outside the product's scope; the page must simply cut cleanly
at four to an A4 sheet.
