# RentRoll — Foundations and Design System

Derived from **RentRoll — UI/UX Specification v1.0**, Part A. This is phase-1 work:
every component here must exist in isolation, with all its states, before screens are
built.

---

## 1. Design tokens

### 1.1 Colour

| Token | Value | Used for |
|---|---|---|
| `ink` | `#14202B` | Headings, primary text, numbers on cards |
| `body` | `#3C4A57` | Body copy, table cells |
| `muted` | `#7C8B99` | Labels, helper text, placeholders, timestamps |
| `line` | `#E2E8ED` | Borders, dividers, table rules |
| `canvas` | `#F6F8FA` | Page background |
| `surface` | `#FFFFFF` | Cards, panels, table background |
| `primary` | `#1B3A5C` | Primary buttons, active nav, links |
| `primary-soft` | `#DCE7F0` | Selected rows, active tab background |
| `success` | `#1E7A4D` | Paid status, confirmations |
| `warning` | `#B4761A` | Due soon, expiring, 1–9 days late |
| `danger` | `#B3352C` | Overdue 10+ days, urgent requests, destructive actions |
| `neutral` | `#8A98A5` | Vacant, closed, archived |

**Status colour is never the only signal.** Every status chip carries a text label as
well as a colour, so the board is readable in print, in greyscale, and by anyone with
colour vision deficiency.

> OPEN-18 — The token table assigns `warning` to "due soon", but L-04 specifies the
> unpaid-and-not-yet-late chip as **Due (neutral)**. Either the token description is
> loose or L-04 is wrong.

### 1.2 Type scale

One typeface throughout. Numbers in tables and money columns use **tabular figures** so
digits align vertically.

| Token | Size / weight | Used for |
|---|---|---|
| `display` | 28px / 600 | Dashboard headline numbers only |
| `h1` | 20px / 600 | Page title |
| `h2` | 16px / 600 | Card and panel titles |
| `body` | 14px / 400 | Default text, table cells, form values |
| `small` | 13px / 400 | Helper text, secondary detail |
| `label` | 11px / 600, uppercase, 0.6px tracking | Field labels, column headers, stat captions |

### 1.3 Spacing, radius, elevation

| Token | Value | Rule |
|---|---|---|
| `space-1 … space-6` | 4, 8, 12, 16, 24, 32px | **Nothing outside this scale.** Card padding is 16px on mobile, 24px on desktop. |
| `radius-sm` | 6px | Buttons, inputs, chips |
| `radius-md` | 10px | Cards, panels, modals |
| `shadow-1` | `0 1px 2px rgba(20,32,43,.06)` | Cards at rest |
| `shadow-2` | `0 8px 24px rgba(20,32,43,.12)` | Modals, drawers, dropdown menus |

---

## 2. Component library

Build these once. Every screen refers to them by name.

### 2.1 Buttons

| Variant | Appearance | Use for | Notes |
|---|---|---|---|
| **Primary** | Solid `primary`, white text | The one main action on a screen | Maximum one per screen region |
| **Secondary** | White, `primary` border and text | Supporting actions | Any number |
| **Quiet** | No border, `body` text, hover fill | Row-level actions, cancel | Used inside tables |
| **Danger** | White, `danger` border and text | Delete, remove, end tenancy | Always behind a confirm dialog |
| **Icon** | 32×32, icon only | Call, copy, share, print | Must carry a tooltip and an accessible label |

**Heights:** 40px default · 32px compact in table rows · **48px on tenant screens**
(touch targets).

**Behaviour rules:**

- Disabled buttons show a tooltip explaining why.
- A button that triggers a network call shows an **inline spinner** and becomes
  non-interactive until it resolves — **never a full-page block**.

### 2.2 Form fields

| Component | Behaviour |
|---|---|
| **Text field** | Label above, helper text below. Error replaces helper text in `danger` colour. **Validates on blur, not on keystroke.** |
| **Money field** | Prefixed `₹`, digits only, thousands separators shown as the user types, **no decimals**. |
| **Phone field** | Prefixed `+91`, accepts 10 digits, strips spaces and dashes on save. |
| **Date field** | Native date picker. Displays as `DD MMM YYYY` everywhere in the product. |
| **Dropdown** | Native select on mobile. Always has a placeholder that is not a valid choice. |
| **Segmented choice** | 2–4 options shown as adjacent buttons. Used for urgency and status filters. |
| **Photo uploader** | See [S-04](screens/S-04-photo-uploader.md). |
| **Text area** | Auto-grows to 8 lines then scrolls. Character counter appears past 400 characters. |

### 2.3 Display components

| Component | Definition |
|---|---|
| **Stat card** | Uppercase label, `display`-size number, optional comparison line. Clickable when it has a destination — **the whole card is the target, not just the number**. |
| **Status chip** | Rounded pill, coloured background at 12% opacity, text in the full colour. **Always includes a word.** |
| **Data table** | Sticky header, sortable columns marked with an arrow, row hover fill, 48px rows. Row click opens the detail panel; **buttons inside the row stop the click from propagating**. |
| **Detail panel** | Slides in from the right, 480px wide on desktop, full screen on mobile. Closes on Escape, on backdrop click, and on the close button. **Warns before closing if a field has unsaved edits.** |
| **Timeline** | Vertical list of events, newest first, each with an icon, a line of text and a timestamp. Used for request history and reminder history. |
| **Empty state** | One line explaining what would appear here, and the button that creates the first one. **Never just "No data".** |
| **Toast** | Bottom-centre, 4 seconds, one line, optional Undo. **Never used for errors that need a decision.** |
| **Confirm dialog** | Title as a question, one line of consequence, cancel plus a labelled action button. The action button says what it does — "Delete unit", never "OK". |

> OPEN-06 — Toasts live 4 seconds, but the mark-paid toast on L-04 carries "an Undo that
> reverses it for 10 seconds". Either that toast is an exception with a longer life, or
> the undo window outlives the toast that offers it.

### 2.4 Component inventory for phase 1

An agent building phase 1 must ship all of these, each with default, hover, focus,
active, disabled, loading and error states where applicable:

Buttons ×5 variants ×3 heights · Text field · Money field · Phone field · Date field ·
Dropdown · Segmented choice · Text area · Photo uploader (S-04) · Stat card ·
Status chip (success / warning / danger / neutral / muted) · Data table (with sticky
header, sort, hover, row-click, stacked-card mode) · Detail panel · Timeline ·
Empty state · Toast (with and without Undo) · Confirm dialog · Skeleton shapes ·
Banner · Modal shell.

---

## 3. Global navigation

| Region | Contents and behaviour |
|---|---|
| **Sidebar** (desktop) | Fixed 220px. Logo, then: **Dashboard · Rent · Maintenance · Units · Tenants · Agreements · Deposits · Documents**. Settings and account sit at the bottom. Active item has `primary-soft` background and a 3px left bar. |
| **Bottom bar** (mobile) | **Five items only: Dashboard · Rent · Maintenance · Units · More.** "More" opens a sheet with the rest. |
| **Page header** | Title on the left, primary action on the right, filters on the row beneath. **Persists while the table scrolls.** |
| **Global search** | Not in version one. Filters on each board cover the need. |

Sidebar item → screen mapping:

| Label | Screen |
|---|---|
| Dashboard | L-03 |
| Rent | L-04 |
| Maintenance | L-06 |
| Units | L-08 |
| Tenants | L-10 |
| Agreements | L-12 |
| Deposits | L-13 |
| Documents | L-14 |
| Settings (bottom) | L-15 |

**Tenant screens have no navigation at all** — no sidebar, no menu, no links to anything
except the tenant's own pages.

> OPEN-02 / OPEN-03 — The source says "the tenant's own three pages" while specifying
> five tenant screens, and gives a route only for T-01. With no navigation and only one
> link out of T-01 (to T-03), T-04 and T-05 are unreachable as specified.

---

## 4. Responsive rules

| Breakpoint | Behaviour |
|---|---|
| **Under 640px** | Data tables become **stacked cards** — one card per row, key fields only, tap to open the detail panel full-screen. Bottom navigation bar. Stat cards go two per row. |
| **640–1024px** | Sidebar collapses to icons. Tables keep three columns plus actions. |
| **Over 1024px** | Full sidebar, full tables, detail panel opens **alongside** rather than over content. |

**Tenant screens are designed mobile-first and are never tested on desktop only.**
Minimum touch target on tenant screens is **48×48px**.

Screen-specific responsive overrides:

- **L-06** maintenance board: four columns on desktop become a single list with a status
  filter under 640px, because horizontal scrolling boards are unusable on a phone.
- **S-01** message composer: 560px modal on desktop, full screen on mobile.
- **Detail panels** (L-05, L-07): 480px on desktop, full screen on mobile.
- **T-01** submit button is sticky at the bottom of the viewport on mobile.

---

## 5. Formatting conventions

Collected from across the source so every screen formats the same way.

| Thing | Format | Source |
|---|---|---|
| Money | `₹` prefix, thousands separators, **no decimals** | Money field |
| Money alignment | Tabular figures, right-aligned in tables | Type scale |
| Date display | `DD MMM YYYY` everywhere | Date field |
| Month display | `February 2026` | L-04, L-05 |
| Month in a URL / filename | `2026-02` | L-04 |
| Phone | `+91` prefix, 10 digits, stored stripped of spaces and dashes | Phone field |
| Receipt number | `RR-0847` | L-04, E1 |
| Request number | `R-0412` | T-02 |
| Export filename | `rent-2026-02.csv` | L-04 |
| Lateness | "n days late" as a chip | L-04 |

> OPEN-32 — The scope document's dashboard wireframe shows collected rent as `2.1L`
> (lakh abbreviation) while L-03 specifies "Value in ₹". Whether stat cards abbreviate
> large amounts is undecided; tables clearly do not.

> OPEN-17 — Both number formats are shown but neither sequence is defined: whether
> numbering is per landlord or global, whether it resets per financial year, and what
> happens to the sequence when a payment is undone within the 10-second window.

---

## 6. Accessibility floor

Repeated here because it constrains component construction; the QA form of these rules
is in [`cross-cutting.md`](cross-cutting.md) §6.

- Every control reachable and operable by keyboard, with a **visible focus ring**. Tab
  order follows reading order.
- Text contrast at least **4.5:1**; status chips are tested against their tinted
  backgrounds specifically.
- Icon-only buttons carry an accessible label **and** a visible tooltip on hover.
- Form errors are announced, and the label is programmatically tied to its field.
- Detail panels and modals **trap focus**, return it to the trigger on close, and close
  on Escape.
- Status is never carried by colour alone — every chip has a word.
- Photo thumbnails carry meaningful alternative text, **not the file name**.
