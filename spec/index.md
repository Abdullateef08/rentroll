# RentRoll — Implementation Specification

Version 1.0 · derived from **RentRoll — Product Scope Document v1.0** and **RentRoll — UI/UX Specification v1.0** (Future Agents).

This tree is the working source of truth for implementation. It is written so that
several agents can build different parts of RentRoll in parallel without reading the
original PDFs.

---

## 1. How this tree is organised

| File | Holds | Read it when |
|---|---|---|
| [`index.md`](index.md) (this file) | Navigation, ID scheme, screen map, coverage matrix, open-question index | Always first |
| [`product.md`](product.md) | Product architecture: purpose, users, journeys, modules, information architecture, rent lifecycle, assistant policy, connections, domain entities, scope boundaries, success metrics | You need to know *why* something exists or *what the data means* |
| [`foundations.md`](foundations.md) | Design tokens, component library, global navigation, responsive rules | You are building UI of any kind |
| [`cross-cutting.md`](cross-cutting.md) | Rules that bind every screen: the two inviolable rules, message catalogue, empty states, loading, permission boundaries, accessibility floor, formatting conventions, the twelve connections as behaviours | You are building anything that talks, fails, loads, or checks permission |
| [`screens/`](screens/) | One file per screen, panel, shared component and print view | You are building that screen |
| [`open-questions.md`](open-questions.md) | Every contradiction and undecided point, with a stable `OPEN-nn` id | Before you invent an answer |
| [`traceability.md`](traceability.md) | Every requirement in both source documents mapped to its home in this tree | You are checking nothing was dropped |

**Rule for agents:** do not silently resolve a contradiction. If your ticket runs into
one, it already has an `OPEN-nn` id — reference that id in your PR and implement the
option the ticket names. If it has no id, add one to `open-questions.md`.

---

## 2. Identifier scheme

Every screen, component and element carries a stable ID. Use these IDs in tickets,
branch names, commit messages, `data-testid` attributes and QA notes, so a bug can be
traced back to a line in this tree.

| Pattern | Example | Meaning |
|---|---|---|
| `L-nn` | `L-03` | Landlord screen. Requires sign-in. |
| `T-nn` | `T-01` | Tenant screen. Public link, no sign-in. |
| `S-nn` | `S-02` | Shared component used on several screens. |
| `P-nn` | `P-01` | Print view. |
| `Lnn-TYPE-NAME` | `L04-BTN-REMIND` | A specific element on a specific screen. |
| `OPEN-nn` | `OPEN-07` | An unresolved contradiction or undecided point. |

**Element types (from the source):** `BTN` button · `LNK` link · `FLD` input field ·
`SEL` dropdown · `CHK` checkbox · `TAB` tab · `ROW` table or list row · `CRD` card ·
`MOD` modal · `TST` toast · `CHP` chip or badge.

**Additional element types** used by this tree where the source named elements without
a listed type: `HDR` header · `SEC` section block · `TBL` table · `TML` timeline ·
`LST` list · `GAL` gallery · `CHT` chart · `SEG` segmented choice · `STRIP` summary
strip · `COL` board column · `UPL` uploader · `IMG` image · `ZONE` drop zone ·
`THUMB` thumbnail · `ERR` inline error.

Element IDs are contract. Renaming one is a breaking change to QA.

---

## 3. Screen map

### Landlord · signed in

| ID | Screen | Route | File |
|---|---|---|---|
| L-01 | Sign in | `/signin`, `/signup`, `/reset` | [L-01](screens/L-01-sign-in.md) |
| L-02 | First-run setup | `/setup` | [L-02](screens/L-02-first-run-setup.md) |
| L-03 | Portfolio dashboard · **the hub** | `/` | [L-03](screens/L-03-portfolio-dashboard.md) |
| L-04 | Rent due board | `/rent` | [L-04](screens/L-04-rent-due-board.md) |
| L-05 | Rent detail panel | `/rent/:entryId` | [L-05](screens/L-05-rent-detail-panel.md) |
| L-06 | Maintenance board | `/maintenance` | [L-06](screens/L-06-maintenance-board.md) |
| L-07 | Request detail panel | `/maintenance/:requestId` | [L-07](screens/L-07-request-detail-panel.md) |
| L-08 | Unit register | `/units` | [L-08](screens/L-08-unit-register.md) |
| L-09 | Unit detail | `/units/:unitId` | [L-09](screens/L-09-unit-detail.md) |
| L-10 | Tenant list | `/tenants` | [L-10](screens/L-10-tenant-list.md) |
| L-11 | Tenant detail | `/tenants/:tenantId` | [L-11](screens/L-11-tenant-detail.md) |
| L-12 | Agreement tracker | `/agreements` | [L-12](screens/L-12-agreement-tracker.md) |
| L-13 | Deposit and settlement | `/deposits`, `/deposits/:tenantId` | [L-13](screens/L-13-deposit-settlement.md) |
| L-14 | Documents and exports | `/documents` | [L-14](screens/L-14-documents-exports.md) |
| L-15 | Settings | `/settings` | [L-15](screens/L-15-settings.md) |

Routes for L-14 and L-15 are not given in the source; the values above are inferred
from the sidebar labels. See `OPEN-25`.

### Tenant · link only, no sign-in

| ID | Screen | Route | File |
|---|---|---|---|
| T-01 | Report a problem · **the entry point** | `/u/:unitToken` | [T-01](screens/T-01-report-a-problem.md) |
| T-02 | Submitted confirmation | not specified — `OPEN-03` | [T-02](screens/T-02-submitted-confirmation.md) |
| T-03 | My reports and their status | not specified — `OPEN-03` | [T-03](screens/T-03-my-reports.md) |
| T-04 | My unit and landlord contact | not specified — `OPEN-03` | [T-04](screens/T-04-my-unit.md) |
| T-05 | My receipts | not specified — `OPEN-03` | [T-05](screens/T-05-my-receipts.md) |

### Shared components

| ID | Component | File |
|---|---|---|
| S-01 | Message composer | [S-01](screens/S-01-message-composer.md) |
| S-02 | Payment sheet | [S-02](screens/S-02-payment-sheet.md) |
| S-03 | Share and copy menu | [S-03](screens/S-03-share-copy-menu.md) |
| S-04 | Photo uploader | [S-04](screens/S-04-photo-uploader.md) |

### Print views

| ID | View | File |
|---|---|---|
| P-01 | Rent receipt | [P-01](screens/P-01-rent-receipt.md) |
| P-02 | Settlement statement | [P-02](screens/P-02-settlement-statement.md) |
| P-03 | Door QR card | [P-03](screens/P-03-door-qr-card.md) |

> OPEN-01 — The source disagrees with itself on these counts (cover page says 14
> landlord screens and 6 shared components; the screen map enumerates 15 and 4; its
> caption says fifteen and four). This tree implements **15 landlord screens, 5 tenant
> screens, 4 shared components, 3 print views**, which is what the source actually
> enumerates. See [`open-questions.md`](open-questions.md).

---

## 4. Screen relationship map

```
L-01 Sign in
  ├─ no property? ──> L-02 First-run setup ──> L-03
  └─ has property? ─> L-03 Portfolio dashboard   <-- the only hub
        ├─ L03-CRD-DUES ──────> L-04 (filter = overdue)
        ├─ L03-CRD-COLLECTED ─> L-04 (current month, no filter)
        ├─ L03-CRD-EXPIRING ──> L-12 (window = 90)
        ├─ L03-CRD-OCCUPANCY ─> L-08 (filtered to vacant)
        └─ L03-ROW-ATTENTION ─> L-05 | L-07 | L-12, or opens S-01 in place

Sidebar, always available: L-03 L-04 L-06 L-08 L-10 L-12 L-13 L-14 · L-15 at the bottom

L-04 Rent board ──row──> L-05 panel ──> S-01, S-02, P-01
L-06 Maintenance ─card─> L-07 panel ──> S-01 (vendor / tenant), S-02
L-08 Units ───────row──> L-09 full page ──> S-03, P-03
L-10 Tenants ─────row──> L-11 ──End tenancy──> L-13 ──> P-02, S-01
L-12 Agreements ────────> S-01 (renewal draft), calendar file
L-14 Documents and exports · L-15 Settings

T-01 /u/:unitToken ──submit──> T-02 ──> T-03
                     └─ T-04, T-05 have no defined entry point — OPEN-03
```

---

## 5. Build order

Taken from the source build tracker (UI/UX Part F). Nothing in a later phase blocks
anything in an earlier one, so this order can be followed straight through.

| Phase | Ref | Ticket | Done when |
|---|---|---|---|
| 1 | foundations §1, §2 | Design tokens and component library | Every component in foundations §2 exists in isolation with all its states |
| 1 | foundations §3, §4 | App shell, navigation, responsive rules | Sidebar, bottom bar and breakpoints behave as specified |
| 1 | L-01 | Sign in, sign up, password reset | All three flows, plus the five-attempt delay |
| 2 | L-08, L-09 | Unit register and unit detail | Units can be created, listed and opened; tokens generated |
| 2 | L-10, L-11 | Tenant list and detail | A tenant can be attached to a unit with agreement dates |
| 2 | L-02 | First-run setup | A new account reaches a populated dashboard without help |
| 3 | T-01, T-02 | Tenant report form and confirmation | A request submitted from a phone appears in the database |
| 3 | S-04 | Photo uploader with compression | A 6MB photo uploads in under 5 seconds on a normal connection |
| 3 | L-06, L-07 | Maintenance board and request detail | Full lifecycle from New to Done, with cost captured |
| 4 | L-04 | Rent due board | Rows generated monthly; filters, statuses and mark-paid all work |
| 4 | L-05 | Rent detail panel with reminder history | Timeline shows every reminder and logged call |
| 4 | P-01 | Rent receipt print view | Prints cleanly to A4 with the landlord's branding |
| 5 | S-01 | Message composer with the three tones | Draft arrives, is editable, and the send-confirmation step records correctly |
| 5 | S-02 | Payment sheet, link and QR | A phone opens the payment app with the right amount; desktop shows the QR |
| 5 | S-03 | Share and copy across all screens | Desktop fallback verified; no broken share icons |
| 6 | L-03 | Portfolio dashboard | All four cards route correctly; Needs attention sorted as specified |
| 6 | L-12 | Agreement tracker with calendar file | Countdowns correct; the calendar file opens in a real calendar app |
| 6 | T-03, T-04, T-05 | Tenant status, unit and receipt pages | Verified against every test in cross-cutting §5 |
| 7 | L-13, P-02 | Deposit settlement and its statement | Deductions pull from repair history with photos attached |
| 7 | L-14, L-15 | Exports, documents and settings | All four CSVs open correctly in Excel with the rupee symbol intact |
| 7 | P-03 | Door QR cards | Four to a page, scannable from print |
| 8 | cross-cutting §2–§4 | Message, empty and loading state pass | Every state in the tables exists and matches the wording |
| 8 | cross-cutting §5 | Permission boundary testing | All seven tests pass |
| 8 | cross-cutting §6 | Accessibility pass | Keyboard-only run through every screen completes |

**A note on order, from the source:** the tenant form is built in phase 3, before the
rent board. That is deliberate — it is the screen most likely to be judged by a real
user, it is the smallest, and having real requests in the system makes every later
screen easier to build against.

---

## 6. Coverage matrix

Both source documents, section by section, and where each landed. Requirement-level
mapping is in [`traceability.md`](traceability.md).

### Product Scope Document v1.0

| § | Section | Home |
|---|---|---|
| 1 | Executive summary | product.md §1 |
| 2 | The problem we are solving | product.md §2 |
| 3 | Product vision and design principles | product.md §3 |
| 4 | Who uses the product | product.md §4 |
| 5 | User journey map (Diagram 1) | product.md §5 |
| 6 | What the product does — the eight modules | product.md §6 |
| 7 | Screen wireframes (Diagram 4) | screens/L-03, L-04, T-01 — Layout sections |
| 8 | Information architecture (Diagram 5) | product.md §7 |
| 9 | User flow diagram (Diagram 2) | product.md §8; index.md §4 |
| 10 | Rent lifecycle flowchart (Diagram 3) | product.md §9 |
| 11 | Where the assistant helps | product.md §10; cross-cutting.md §1.1 |
| 12 | The twelve connections | product.md §11; cross-cutting.md §7 |
| 13 | System architecture (Diagram 6) | product.md §12 |
| 14 | Data flow diagram (Diagram 7) | product.md §13 |
| 15 | Entity relationship diagram (Diagram 8) | product.md §14 |
| 16 | Scope — included, excluded, later | product.md §15 |
| 17 | How this makes life easier | product.md §16 |
| 18 | How we will measure success | product.md §17 |

### UI/UX Specification v1.0

| § | Section | Home |
|---|---|---|
| — | How to read this document | index.md §2; cross-cutting.md §1 |
| A1 | Design tokens | foundations.md §1 |
| A2 | Component library | foundations.md §2 |
| A3 | Global navigation | foundations.md §3 |
| A4 | Responsive rules | foundations.md §4 |
| — | Screen map | index.md §3 |
| B | Landlord screens L-01…L-15 | screens/L-*.md |
| C | Tenant screens T-01…T-05 | screens/T-*.md |
| D | Shared components and print views | screens/S-*.md, screens/P-*.md |
| E1 | Every message the system shows | cross-cutting.md §2 |
| E2 | Empty states | cross-cutting.md §3 |
| E3 | Loading | cross-cutting.md §4 |
| E4 | Permissions — the boundary tests | cross-cutting.md §5 |
| E5 | Accessibility floor | cross-cutting.md §6 |
| F | Build tracker | index.md §5 |

---

## 7. Open questions index

35 items. Full text, severity and affected screens in
[`open-questions.md`](open-questions.md).

| ID | One line | Severity |
|---|---|---|
| OPEN-01 | Screen and component counts disagree between cover, map and caption | Note |
| OPEN-02 | Tenant page count stated as three, four and five in different places | Note |
| OPEN-03 | Routes for T-02…T-05 undefined, and no way to reach T-04/T-05 | Blocking |
| OPEN-04 | No screen creates a second property | Blocking |
| OPEN-05 | The L-03 "no data at all" state may be unreachable | Should decide |
| OPEN-06 | Toast lives 4s but the mark-paid Undo window is 10s | Should decide |
| OPEN-07 | Editable reminder ladder vs hard-coded 1–9 / 10+ thresholds | Blocking |
| OPEN-08 | Assistant scope: "three places only" vs S-01 drafting vendor, renewal and status messages | Blocking |
| OPEN-09 | Tone selector applicability on non-rent messages | Should decide |
| OPEN-10 | Vendor: first-class entity or free text? | Should decide |
| OPEN-11 | Promised print views that do not exist (monthly statement, agreement summary) | Should decide |
| OPEN-12 | Late fee referenced by connection 1 but no feature anywhere | Should decide |
| OPEN-13 | Vacancy-sharing connections vs "listing vacant flats" being out of scope | Note |
| OPEN-14 | Part payment vs a single amount-paid and receipt number per rent entry | Blocking |
| OPEN-15 | Pro-rata calculation method unspecified | Blocking |
| OPEN-16 | Rent due date source and default unspecified | Blocking |
| OPEN-17 | Receipt and request numbering format and sequence scope unspecified | Should decide |
| OPEN-18 | "Due" chip is neutral on L-04 but the token table gives "due soon" to warning | Note |
| OPEN-19 | Needs-attention rank 4 condition overlaps rank 2 | Should decide |
| OPEN-20 | Offline wording differs between T-01 and the message catalogue | Note |
| OPEN-21 | Rent lifecycle has no terminal state after day 20; no agreement-clause field | Should decide |
| OPEN-22 | "Record a notice served" has no control on L-12 | Should decide |
| OPEN-23 | "Share the unit link" is a tenant-record capability but only exists on L-09 | Note |
| OPEN-24 | "Issue and send the receipt" from the rent board — L-04 only prints | Should decide |
| OPEN-25 | Direct navigation to panel routes, and the routes for L-14/L-15, are unspecified | Should decide |
| OPEN-26 | Default escalation percentage and rounding of the suggested rent unspecified | Should decide |
| OPEN-27 | "Trusted device" undefined for the 30-day session | Note |
| OPEN-28 | Timezone and the definition of "today" unspecified | Blocking |
| OPEN-29 | The eight modules and the eight IA sections are different sets; Settings is in neither | Note |
| OPEN-30 | Access control for P-01 when opened from a tenant token | Blocking |
| OPEN-31 | Invisible bot check mechanism unspecified | Should decide |
| OPEN-32 | Lakh abbreviation on stat cards vs plain rupee values | Note |
| OPEN-33 | Offline tenant submission implies a queue; mechanism unspecified | Should decide |
| OPEN-34 | Landlord status "New" vs tenant-facing "Received" mapping never stated | Note |
| OPEN-35 | Payment QR printed on a receipt for rent already paid | Note |
