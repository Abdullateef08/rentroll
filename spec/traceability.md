# Traceability

Every requirement in the two source documents, and where it lives in this tree. Use this
to verify nothing was lost in conversion, and to find the spec home of anything you read
in the original PDFs.

Legend: **✓** requirement is fully specified here · **OPEN-nn** requirement is carried
here but contradicted or incomplete in the source.

---

## Part 1 · Product Scope Document v1.0

### §1 Executive summary

| Requirement | Home | |
|---|---|---|
| Web app for landlords and tenants; landlord signs in, tenant opens a link | product.md §1 | ✓ |
| Built for landlords with 5–50 units; PG and co-living operators | product.md §1 | ✓ |
| One record for every unit, held for years | product.md §1, §14; L-09 | ✓ |
| Dates tracked by the app, not by memory | product.md §1, §9; L-12 | ✓ |
| A link for the tenant — no account, no password, no install | T-01; cross-cutting §5 | ✓ |
| Everything drafted, sent by the landlord in one tap | S-01; cross-cutting §1.1 | ✓ |

### §2 The problem

| Requirement | Home | |
|---|---|---|
| Six landlord pain points | product.md §2 | ✓ |
| Four tenant pain points | product.md §2 | ✓ |
| The shared-record insight | product.md §2 | ✓ |

### §3 Vision and design principles

| Requirement | Home | |
|---|---|---|
| The tenant never signs up | product.md §3; T-01 | ✓ |
| Nothing sends by itself | cross-cutting §1.1; S-01 | ✓ |
| Money stays private | cross-cutting §1.2; T-04, T-05 | ✓ |
| Dates are the product | product.md §9; L-04, L-12 | ✓ |
| Evidence, always | S-04; L-07, L-09, L-13 | ✓ |
| One tap to act | L-03, L-04, L-06 | ✓ |

### §4 Who uses the product

| Requirement | Home | |
|---|---|---|
| Landlord vs tenant comparison table | product.md §4 | ✓ |
| Landlord → properties → units → tenants cardinality | product.md §4, §14 | ✓ |
| Every tenant gets their own unit link | L-09; T-01 | ✓ |

### §5 User journey map (Diagram 1)

| Requirement | Home | |
|---|---|---|
| Six stages with landlord / tenant / app / result columns | product.md §5 | ✓ |
| Welcome message with unit link and QR at move-in | product.md §5; connection 3, 11 | ✓ |
| Tenant confirms renewal or gives notice | product.md §5 | OPEN-22 |

### §6 The eight modules

| Requirement | Home | |
|---|---|---|
| Portfolio dashboard | L-03 | ✓ |
| Rent due board | L-04, L-05, P-01 | OPEN-24 |
| Tenant request portal (landlord can do nothing) | T-01…T-05 | ✓ |
| Maintenance board | L-06, L-07 | ✓ |
| Unit register | L-08, L-09, P-03 | ✓ |
| Tenant record | L-10, L-11 | OPEN-23 |
| Agreement tracker | L-12 | OPEN-22 |
| Deposit and settlement | L-13, P-02 | ✓ |
| Deliberately-not list | product.md §6, §15 | ✓ |

### §7 Screen wireframes (Diagram 4)

| Requirement | Home | |
|---|---|---|
| A · Portfolio dashboard layout | L-03 Layout | OPEN-32 |
| B · Rent due board layout, drafted reminder with three actions | L-04 Layout | ✓ |
| C · Tenant page: one short form, no sign-in, no money | T-01 Layout | ✓ |

### §8 Information architecture (Diagram 5)

| Requirement | Home | |
|---|---|---|
| Eight landlord sections, four tenant pages, one shared record set | product.md §7 | OPEN-02, OPEN-29 |
| Tenant side has no path to any money screen | cross-cutting §1.2, §5 | ✓ |

### §9 User flow (Diagram 2)

| Requirement | Home | |
|---|---|---|
| Tenant path, three screens deep, no account | product.md §8; index.md §4 | OPEN-02 |
| Tenant also arrives by message | product.md §8 | ✓ |
| Landlord path from dashboard to every board, each with its own actions | product.md §8 | ✓ |

### §10 Rent lifecycle (Diagram 3)

| Requirement | Home | |
|---|---|---|
| Rent row created per unit on the 1st | product.md §9; L-04 rules | OPEN-16 |
| Day 3 gentle, day 10 direct, day 20 formal | product.md §9; L-15 | OPEN-07 |
| Landlord approves every message | cross-cutting §1.1 | ✓ |
| Paid at any point → marked paid, receipt issued | L-04, L-05, P-01 | ✓ |
| Formal notice quotes the agreement clause | product.md §9 | OPEN-21 |
| Call is logged on the record | L-05 | ✓ |
| Whatever happens is written to the record | L-05 timeline | ✓ |

### §11 Where the assistant helps

| Requirement | Home | |
|---|---|---|
| Rent reminders, tone by lateness | product.md §10; S-01 | ✓ |
| Maintenance request categorisation and urgency | product.md §10; T-01, L-07 | ✓ |
| Deposit settlement statement | product.md §10; L-13 | ✓ |
| Three places only, never sends | product.md §10 | OPEN-08 |

### §12 The twelve connections

| # | Connection | Home | |
|---|---|---|---|
| 1 | Pay by UPI | cross-cutting §7; S-02 | OPEN-12 |
| 2 | Payment QR | cross-cutting §7; S-02, P-01 | OPEN-35 |
| 3 | Send on WhatsApp | cross-cutting §7; S-01 | ✓ |
| 4 | Send by email | cross-cutting §7; L-11, L-14 | OPEN-11 |
| 5 | Tap to call | cross-cutting §7; L-05, L-11, T-01, T-04 | ✓ |
| 6 | Open in Maps | cross-cutting §7; L-07, L-09 | OPEN-13 |
| 7 | Copy in one tap | cross-cutting §7; S-03 | ✓ |
| 8 | Share | cross-cutting §7; S-03 | OPEN-13 |
| 9 | Add to calendar | cross-cutting §7; L-12 | OPEN-09 |
| 10 | Print or save as PDF | cross-cutting §7; P-01…P-03 | OPEN-11 |
| 11 | Unit QR code | cross-cutting §7; L-08, L-09, P-03 | ✓ |
| 12 | Export to a spreadsheet | cross-cutting §7; L-04, L-14 | ✓ |
| — | Nothing to install or configure | product.md §11, §12 | ✓ |

### §13 System architecture (Diagram 6)

| Requirement | Home | |
|---|---|---|
| Two ways in, one core, twelve connections, existing apps | product.md §12 | ✓ |
| Core layers: records · rules and dates · assistant | product.md §12 | ✓ |

### §14 Data flow (Diagram 7)

| Requirement | Home | |
|---|---|---|
| Three input actors: landlord, tenant, vendor | product.md §13 | OPEN-10 |
| Four processes | product.md §13 | ✓ |
| Six stores | product.md §13 | ✓ |

### §15 Entity relationship diagram (Diagram 8)

| Requirement | Home | |
|---|---|---|
| Eight entities with their attributes | product.md §14 | ✓ |
| 1:many relationships | product.md §14 | ✓ |
| History stays with the unit, not the person | product.md §14; L-09 | ✓ |
| Fields the screens need that the ER omits | product.md §14 (second table) | ✓ |

### §16 Scope

| Requirement | Home | |
|---|---|---|
| Seven included areas | product.md §15 | ✓ |
| Six deliberate exclusions | product.md §15 | ✓ |
| Four later-considerations with reasons | product.md §15 | ✓ |

### §17 How this makes life easier

| Requirement | Home | |
|---|---|---|
| Seven today / landlord / tenant rows | product.md §16 | ✓ |
| The one sentence | product.md §16 | ✓ |

### §18 Success measures

| Requirement | Home | |
|---|---|---|
| Six measures with reasons | product.md §17 | ✓ |

---

## Part 2 · UI/UX Specification v1.0

### How to read

| Requirement | Home | |
|---|---|---|
| ID patterns L/T/S/P and element IDs | index.md §2 | ✓ |
| Eleven element types | index.md §2 | ✓ |
| Six sections per screen | screens/README.md | ✓ |
| The two rules applying to every screen | cross-cutting §1 | ✓ |

### A1 Design tokens

| Requirement | Home | |
|---|---|---|
| Twelve colour tokens | foundations §1.1 | OPEN-18 |
| Status colour is never the only signal | foundations §1.1; cross-cutting §6 | ✓ |
| Six type tokens; tabular figures | foundations §1.2 | ✓ |
| Spacing scale, two radii, two shadows | foundations §1.3 | ✓ |

### A2 Component library

| Requirement | Home | |
|---|---|---|
| Five button variants, three heights, disabled and loading rules | foundations §2.1 | ✓ |
| Eight form field types | foundations §2.2 | ✓ |
| Eight display components | foundations §2.3 | OPEN-06 |

### A3 Global navigation

| Requirement | Home | |
|---|---|---|
| Sidebar contents and active state | foundations §3 | ✓ |
| Mobile bottom bar, five items | foundations §3 | ✓ |
| Page header persistence | foundations §3 | ✓ |
| No global search in v1 | foundations §3; product.md §15 | ✓ |
| Tenant screens have no navigation | foundations §3; T-01…T-05 | OPEN-02, OPEN-03 |

### A4 Responsive rules

| Requirement | Home | |
|---|---|---|
| Three breakpoints | foundations §4 | ✓ |
| Tenant mobile-first, 48×48 minimum | foundations §4; T-01 | ✓ |

### Screen map

| Requirement | Home | |
|---|---|---|
| Full enumeration of L, T, S, P | index.md §3 | OPEN-01 |
| Dashboard is the only hub | index.md §4; L-03 | ✓ |

### Part B · Landlord screens

| Screen | Home | |
|---|---|---|
| L-01 Sign in — components, interactions, three rules | L-01 | OPEN-27 |
| L-02 First-run setup — three steps, seven components, three rules | L-02 | OPEN-04, OPEN-05 |
| L-03 Dashboard — four cards, chart, attention list, ordering, four states | L-03 | OPEN-19, OPEN-32 |
| L-04 Rent board — ten components, six interactions, five edge cases | L-04 | OPEN-14, OPEN-15, OPEN-16, OPEN-18, OPEN-24 |
| L-05 Rent detail — nine components, four interactions | L-05 | OPEN-25 |
| L-06 Maintenance board — eight components, three interactions, three rules | L-06 | OPEN-34 |
| L-07 Request detail — ten components, four interactions, the never-expose rule | L-07 | OPEN-08, OPEN-10 |
| L-08 Unit register — five components | L-08 | OPEN-04 |
| L-09 Unit detail — four tabs, five icon buttons, the lifetime-figures note | L-09 | OPEN-23 |
| L-10 Tenant list — two components | L-10 | OPEN-22 |
| L-11 Tenant detail — six components | L-11 | OPEN-11 |
| L-12 Agreement tracker — eight components, three interactions, two rules | L-12 | OPEN-22, OPEN-26 |
| L-13 Deposit and settlement — nine components, three rules | L-13 | ✓ |
| L-14 Documents and exports — three components | L-14 | OPEN-25, OPEN-30 |
| L-15 Settings — six components | L-15 | OPEN-07, OPEN-26 |

### Part C · Tenant screens

| Screen | Home | |
|---|---|---|
| Design brief for the section | T-01 (quoted at the top) | ✓ |
| T-01 — ten components, three interactions, six states, three rules | T-01 | OPEN-20, OPEN-31, OPEN-33 |
| T-02 — five components, the save-the-link note | T-02 | OPEN-03 |
| T-03 — three components | T-03 | OPEN-03, OPEN-34 |
| T-04 — three components, the no-rent-figure note | T-04 | OPEN-03 |
| T-05 — two components, the receipts exception | T-05 | OPEN-03, OPEN-30 |

### Part D · Shared components and print views

| Component | Home | |
|---|---|---|
| S-01 — ten components, six interactions, the "Did you send it?" rule | S-01 | OPEN-08, OPEN-09 |
| S-02 — seven components, two rules | S-02 | OPEN-12, OPEN-35 |
| S-03 — two components, the synchronous-clipboard rule | S-03 | OPEN-13 |
| S-04 — three components, four rules | S-04 | ✓ |
| P-01 Rent receipt — nine contents | P-01 | OPEN-17, OPEN-30, OPEN-35 |
| P-02 Settlement statement — seven contents | P-02 | ✓ |
| P-03 Door QR card — five contents, four to A4 | P-03 | ✓ |
| Print views are separate pages; do not use print styles on the app | cross-cutting §7 (10); P-01…P-03 | ✓ |

### Part E · Cross-cutting behaviour

| Requirement | Home | |
|---|---|---|
| E1 — eleven messages with types | cross-cutting §2 | OPEN-20 |
| E1 — four wording rules | cross-cutting §2 | ✓ |
| E2 — eight empty states | cross-cutting §3 | ✓ |
| E3 — four loading behaviours; the 10-second boundary | cross-cutting §4 | ✓ |
| E4 — seven permission boundary tests | cross-cutting §5 | OPEN-30 |
| E5 — seven accessibility rules | cross-cutting §6; foundations §6 | ✓ |

### Part F · Build tracker

| Requirement | Home | |
|---|---|---|
| Twenty-four tickets across eight phases, with done-when criteria | index.md §5 | ✓ |
| The note on why the tenant form comes first | index.md §5 | ✓ |

---

## Requirements with no screen to live on

Carried in the spec but not implementable as written. Each is an open question; none has
been dropped.

| Requirement | Source | Question |
|---|---|---|
| Late fee as a payment reason | Connection 1 | OPEN-12 |
| Monthly statement (printable and emailable) | Connections 4, 10 | OPEN-11 |
| One-page agreement summary (printable) | Connection 10 | OPEN-11 |
| Property owner as a recipient | Connection 4 | OPEN-11 |
| Vacancy details for a broker / prospective tenant | Connections 6, 8 | OPEN-13 |
| Calendar entries for notice period, vendor visit, rent due date | Connection 9 | OPEN-09 |
| Recording a notice served | Scope §6 | OPEN-22 |
| Sending a receipt (as opposed to printing it) | Scope §6, connection 3 | OPEN-24 |
| Sharing the unit link from the tenant record | Scope §6 | OPEN-23 |
| Creating a second property | Implied by L-04's property filter | OPEN-04 |
| Reaching T-04 and T-05 | UI/UX Part C | OPEN-03 |
| Tenant confirming a renewal or giving notice in the app | Scope §5 | OPEN-22 |
