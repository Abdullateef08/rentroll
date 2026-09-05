# L-09 · Unit detail

## Meta

| | |
|---|---|
| **Route** | `/units/:unitId` — **a full page, not a panel, because it holds a lot** |
| **Access** | Signed in |
| **Purpose** | The unit's whole life: who lives there, what it earns, what it has cost, what it looked like at move-in. |
| **Arrives from** | `L08-TBL-UNITS` row click |
| **Leads to** | S-03 (share/copy), S-04 (photo upload), P-03 (QR), the tenant form, Maps |
| **Build phase** | 2 |

## Layout

Header with unit identity and status · **four tabs**: Overview · Rent history ·
Maintenance history · Photos & documents.

```
Flat 2A · Kulkarni Apartments          [Occupied]
[copy] [share] [QR] [map]                       [ Add tenant ]
────────────────────────────────────────────────────────────
 Overview | Rent history | Maintenance history | Photos & documents
────────────────────────────────────────────────────────────
```

## Components

| ID | Type | Content and behaviour |
|---|---|---|
| `L09-TAB-OVERVIEW` | Tab | Rent, deposit, current tenant card, **the unit's reporting link with copy and share buttons**, lifetime figures: **total rent collected, total maintenance spend, net** |
| `L09-TAB-RENT` | Tab | **Every month, every tenant, ever.** Paid or not, and how much. |
| `L09-TAB-MAINT` | Tab | Every request against this unit, with cost. A repeated category shows a quiet note: `Plumbing reported 4 times in 12 months.` |
| `L09-TAB-PHOTOS` | Tab | **Move-in condition photos grouped by tenancy**, plus repair photos, plus documents |
| `L09-BTN-COPYLINK` | Icon button | Copies the unit's tenant link to the clipboard |
| `L09-BTN-SHARELINK` | Icon button | Opens the device share sheet; **on desktop falls back to copy** |
| `L09-BTN-QR` | Icon button | Shows the unit QR **in a modal with a print option** |
| `L09-BTN-MAP` | Icon button | Opens the property address in Maps **in a new tab** |
| `L09-BTN-ADDTENANT` | Primary button | **Visible only when vacant.** Opens the tenant form. |

## Interactions

| Trigger | Result |
|---|---|
| Tab click | Switches tab; tab state should be reflected in the URL so a tab can be linked |
| `L09-BTN-COPYLINK` | Clipboard write **called directly from the click handler**, `Copied.` toast, icon becomes a tick for 2 seconds (S-03) |
| `L09-BTN-SHARELINK` | Device share sheet where available, copy fallback on desktop. **Never a broken share icon.** |
| `L09-BTN-QR` | Modal with the QR and a print option → P-03 |
| `L09-BTN-MAP` | New tab with the property address in Maps |
| `L09-BTN-ADDTENANT` | Opens the tenant form; on save the unit becomes Occupied and a new tenancy starts |
| Photo added on `L09-TAB-PHOTOS` | S-04 behaviour, up to 10 photos |

## States

| State | Display |
|---|---|
| Loading | Skeleton header and tab content |
| Vacant | `L09-BTN-ADDTENANT` visible; current-tenant card replaced by a prompt |
| Occupied | `L09-BTN-ADDTENANT` hidden |
| No lifetime data yet | Lifetime figures show zero rather than being hidden |
| No move-in photos | Photos tab shows an empty state prompting condition photos — this feeds the settlement feature |

## Rules

- **The lifetime figures on the Overview tab are the quiet insight in this product.**
  "This unit earned ₹2.1 lakh and cost ₹34,000 last year" is a fact most landlords have
  never seen for a single flat. **Give it space.**
- History belongs to the unit, not the person: rent entries, requests and photos survive
  a change of tenant (product.md §14).
- Condition photos are grouped **by tenancy**, which requires a tenancy record distinct
  from the tenant.
- The repeated-category note on `L09-TAB-MAINT` is a quiet observation, not an alert. No
  badge, no notification.
- Move-in photo coverage is a tracked success measure; the empty state should encourage
  it rather than merely report absence.

> OPEN-23 — This is the only screen carrying "share the unit link", although the product
> scope lists it as a Tenant record capability (L-10/L-11).
