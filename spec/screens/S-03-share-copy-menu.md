# S-03 · Share and copy menu

## Meta

| | |
|---|---|
| **Type** | Icon buttons, used inline wherever something is shareable or copyable |
| **Used on** | L-05, L-09, L-11, L-14, T-02, and anywhere a drafted message, unit link, UPI ID or receipt number appears |
| **Purpose** | Hand a piece of text or a link to whatever the user already uses, with an honest desktop fallback. |
| **Build phase** | 5 |

## Components and interactions

| ID | Type | Content · what happens |
|---|---|---|
| `S03-BTN-SHARE` | Icon button | **Uses the device share sheet where available; falls back to copy with a toast on desktop. Never shows a broken share icon.** |
| `S03-BTN-COPY` | Icon button | **Copies, then the icon changes to a tick for 2 seconds. Must be called directly from the click — never after an `await`.** |

## Rules

- **The clipboard write must happen synchronously inside the click handler.** Browsers
  refuse a clipboard write that follows an `await`, so fetch or compute the text *before*
  the click, or copy a value already in hand.
- **Never render a share icon that cannot share.** Feature-detect first; if the device
  has no share sheet, render the copy affordance instead.
- Copy confirms twice: the `Copied.` toast (2 seconds, cross-cutting §2) and the icon
  tick (2 seconds).
- Both are icon buttons: 32×32 on landlord screens, **48×48 on tenant screens**, each
  carrying an accessible label and a visible tooltip (cross-cutting §6).

## What gets shared or copied

| Content | Where |
|---|---|
| A drafted message | S-01 |
| A unit's link | L-09, T-02 |
| The landlord's UPI ID | L-15, S-02 |
| A receipt number | L-04, L-05, P-01 |
| A new tenant's unit link | L-09 |
| A receipt passed to someone | L-14, T-05 |
| Vacancy details for a broker | see `OPEN-13` |
| A phone number | L-05, L-11 |
| A document | L-11, L-14 |

> OPEN-13 — Connection 8 lists "sharing vacancy details with a broker" as a use of Share,
> but no vacancy-details view exists and public listing of vacant units is explicitly out
> of scope.
