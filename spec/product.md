# RentRoll — Product Architecture

Derived from **RentRoll — Product Scope Document v1.0**. This file holds intent,
domain model and system shape. It does not describe pixels — see
[`foundations.md`](foundations.md) — and it does not describe individual screens —
see [`screens/`](screens/).

---

## 1. What RentRoll is

A web app that keeps a small rental business in one place.

- **Product:** a web app for landlords and tenants.
- **Purpose:** make renting organised, transparent and tension-free.
- **Built for:** landlords with 5 to 50 units; PG and co-living operators.
- **Users:** the landlord signs in; the tenant opens a link.

The landlord signs in and sees everything — who has paid, what is broken, which
agreement is about to expire. **The tenant does not sign in at all.** They open one
link, saved once, and use it to report a problem or check its status.

The four ideas the product rests on:

1. **One record for every unit.** Rent history, photos, repairs and documents live
   together, for years.
2. **Dates that watch themselves.** Rent due dates and agreement expiry are tracked by
   the app, not by memory.
3. **A link for the tenant.** No account, no password, no app to install. One page
   usable in two minutes.
4. **Everything ready to send.** Reminders, receipts and notices are drafted for the
   landlord to review and send in one tap.

The outcome to optimise for: *the landlord stops carrying the rental business in their
head.*

---

## 2. The problem being solved

These are the failure modes the product exists to remove. Use them to settle design
arguments — a change that reintroduces one of these is wrong regardless of how tidy it
is.

### What the landlord lives with today

| Problem | Shape of it |
|---|---|
| Uncertainty about money | Rent arrives by UPI to a personal number. The notification is buried. On the 12th they are not sure who has paid. |
| Avoiding the awkward message | They do not chase on day three because it feels rude, so they wait until day twenty-five and then send something sharper than they meant to. |
| Dates that slip past | Nothing announces an expiry. An agreement that lapsed in November is discovered in March, and four months of escalation are gone. |
| Interruptions | Maintenance arrives as phone calls at inconvenient hours, and half are forgotten by the next morning. |
| Arguments without evidence | At move-out nobody has a photo of how the flat looked at move-in. The deposit is returned in full because arguing is not worth it. |
| March panic | The accountant reconstructs a year of rental income from bank statements, because no receipts were ever issued. |

### What the tenant lives with today

- No receipt, which becomes a problem when they need proof of rent paid.
- No idea whether their repair request was noted, or when someone is coming.
- Uncertainty about the exact amount and where to send it.
- At move-out, a deposit deduction with no explanation attached.

**The insight:** both sides want the same thing — a clear record. One shared record
solves both, and removes most of the tension between them.

---

## 3. Design principles

> A rental business should feel like a tidy folder, not a memory test.

| Principle | What it means in the product | Enforced by |
|---|---|---|
| **The tenant never signs up** | A tenant who must create an account to report a leaking tap will call instead. One saved link, no password, works on any phone. | T-01 token route; cross-cutting §5 |
| **Nothing sends by itself** | Every message is drafted by the app and sent by the landlord. A firm reminder sent automatically to someone who paid yesterday damages a relationship permanently. | S-01; cross-cutting §1.1 |
| **Money stays private** | The tenant's pages never show rent figures, repair costs or anything about other units. | cross-cutting §1.2, §5 |
| **Dates are the product** | Rent due and agreement expiry are the two things the app watches so the landlord does not have to. | §9 below; L-04, L-12 |
| **Evidence, always** | Photos at move-in, photos on every repair, a written reason on every deduction. This is what makes settlement calm. | L-09, L-07, L-13, S-04 |
| **One tap to act** | Wherever the app shows a problem, the action to fix it is on the same screen. | L-03, L-04, L-06 |

---

## 4. Who uses the product

| | Landlord | Tenant |
|---|---|---|
| How they get in | Signs in with email and password | Opens a saved link. No account. |
| How often | A few times a week; more around the 1st to 10th | A few times a year, when something breaks |
| On what | Laptop mostly, phone sometimes | Phone, almost always |
| What they see | Everything — all units, all money, all history | Only their own unit, and no money |
| What they want | To know nothing is slipping | To be heard, and to have proof |

**Cardinality:** one landlord has many properties. Each property has many units. Each
unit has one current tenant and a history of past tenants. Every tenant gets their own
unit link.

A third actor, the **vendor**, never uses the app. They receive a WhatsApp message with
the job, the address and the tenant's phone, and their cost is recorded by the landlord.
See `OPEN-10` on whether a vendor is a stored entity.

---

## 5. User journey map

Six stages of the landlord–tenant relationship. The "app" column is what happens
without anyone asking.

| Stage | Landlord does | Tenant does | The app does | Result |
|---|---|---|---|---|
| **1 · Setting up** | Adds properties and units. Enters rent, deposit and their UPI ID. | Not involved yet | Creates a link and a printable QR for every unit. | Everything is in one place. |
| **2 · Move-in** | Adds the tenant, agreement dates, and photos of the flat's condition. | Gets a welcome message with their unit link. Saves it. Sees the QR too. | Stores the photos. Starts counting down to agreement expiry. | Both sides agree on the starting point. |
| **3 · Every month** | Glances at dues. Sends the drafted reminder. Marks payment received. | Taps the pay link, amount already filled. Receives a numbered receipt. | Creates the month's rent rows, drafts reminders, issues the receipt. | No chasing and no guessing. |
| **4 · Something breaks** | Assigns a vendor, sends him the address, records what it cost. | Opens the link, reports the problem with a photo. Checks status later. | Sorts the request, keeps its status, files the cost against the unit. | No late-night calls. Nothing forgotten. |
| **5 · Renewal** | Reviews what is expiring. Sends the renewal notice with new rent. | Confirms renewal, or gives notice. Knows the new rent in advance. | Warns at 90, 60 and 30 days. Works out the escalated rent. | No agreement ever lapses again. |
| **6 · Move-out** | Notes deductions with a reason and a photo for each one. | Receives a written settlement showing every deduction and its photo. | Builds the statement from the deposit ledger and the repair history. | A calm settlement instead of a row. |

Note that stage 5 lists a tenant action — "confirms renewal, or gives notice" — for
which no tenant screen exists in version one. The tenant does this by phone or message.

---

## 6. The eight modules

The first four are what the landlord uses most weeks; the last four prevent the
expensive mistakes.

| Module | What it shows | What the landlord can do from it | Screens |
|---|---|---|---|
| **Portfolio dashboard** | Occupied against vacant, collected this month, dues outstanding, agreements expiring soon, income over time | Jump straight to whatever is red. This is the "is anything wrong" screen. | L-03 |
| **Rent due board** | A grid of month against unit — paid, pending, or overdue by so many days | Send the drafted reminder, share a payment link, mark payment received, issue and send the receipt | L-04, L-05, P-01 |
| **Tenant request portal** (the tenant's page) | To the tenant: a simple form and the status of what they reported | **Nothing** — this page belongs to the tenant. No rent, no costs, no other units. | T-01…T-05 |
| **Maintenance board** | Every request by status, with photos, the vendor assigned and what it cost | Assign a vendor with the address, update the tenant, record the cost against the unit | L-06, L-07 |
| **Unit register** | Every unit, its rent, its deposit, its condition photos and its full repair history | Add units, print the door QR, review what a unit has cost over the years | L-08, L-09, P-03 |
| **Tenant record** | Contact details, agreement dates, rent paid to date, deposit held, documents | Call, message, share the unit link, attach the agreement | L-10, L-11 |
| **Agreement tracker** | Everything expiring in 90, 60 and 30 days, with the renewal value calculated | Send a renewal notice, add the date to a calendar, record a notice served | L-12 |
| **Deposit and settlement** | Deposit held, each deduction with its reason and photo, the balance due back | Build the settlement statement, print it, send it to the tenant | L-13, P-02 |

**Deliberately not in the product:** listing vacant flats, tenant background checks,
accounting software integration, and anything that sends a message without the landlord
reading it first. Each of these either belongs to someone else's product or breaks a
principle above.

> OPEN-29 — This list of eight modules is not the same set as the eight landlord
> sections in the information architecture (§7). The modules include the tenant portal
> and omit Documents & exports; the IA does the reverse. Settings (L-15) appears in
> neither list although it is in the sidebar. Treat both lists as valid views of the
> same product, not as a definition of what must exist.

> OPEN-23 — "Share the unit link" is listed as a Tenant record capability, but the only
> share-link control specified anywhere is `L09-BTN-SHARELINK` on the unit detail screen.

> OPEN-24 — "Issue and send the receipt" is listed as a Rent due board capability, but
> L-04 specifies only a print icon (`L04-BTN-RECEIPT` → P-01). No send-receipt path is
> specified on any screen.

> OPEN-22 — "Record a notice served" is listed as an Agreement tracker capability, but
> L-12 specifies only "Record renewal" (`L12-BTN-RENEW`). Notice status exists as a
> field on the tenant entity and as chips on L-08 and L-10, with no control that sets it.

---

## 7. Information architecture

Two separate worlds sharing one set of records. Everything on the left needs a sign-in;
everything on the right needs only a link.

```
                              RentRoll
                                 │
        ┌────────────────────────┴────────────────────────┐
        │                                                  │
  Landlord workspace                                  Tenant link
  requires sign-in                        one link per unit, no sign-in
        │                                                  │
  Portfolio dashboard        L-03                Report a problem        T-01
  Rent due board             L-04                Track what I reported   T-03
  Maintenance board          L-06                My unit and contact     T-04
  Agreement tracker          L-12                My receipts             T-05
  Unit register              L-08
  Tenant records             L-10
  Deposit & settlement       L-13
  Documents & exports        L-14
        │                                                  │
        └──────── both sides read and write ───────────────┘
                    the same shared records
```

Eight landlord sections, four tenant pages, one shared set of records underneath.
**The tenant side has no path to any money screen.**

> OPEN-02 — The tenant side is described as four pages here, as "the tenant's own three
> pages" in the navigation rules, and as five screens (T-01…T-05) in the screen map. The
> difference is whether T-02, the submitted confirmation, counts as a page.

---

## 8. User flow

The exact screens each user moves through, and what they can do at each stop.

### Tenant · no sign-in

```
Opens the saved unit link  (T-01)
   └─> Reports a problem: category · description · photo · urgency
         └─> Sees a confirmation with a request number  (T-02)
               └─> Returns to the same link later  (T-03, T-05)
                   to check status, or to find a receipt
```

The tenant also arrives by message: a rent reminder with a payment link, a receipt, and
status updates. Their path is three screens deep and needs no account.

### Landlord · signs in

```
Signs in  (L-01)
   └─> Portfolio dashboard  (L-03) — what needs attention today
         ├─> Rent due board  (L-04)
         │     ├─ Send reminder            → S-01
         │     ├─ Share payment link       → S-02
         │     ├─ Mark paid → receipt      → P-01
         │     └─ Print or export
         ├─> Maintenance board  (L-06)
         │     ├─ Assign a vendor          → S-01
         │     ├─ Send him the address     → S-01 + Maps
         │     ├─ Record the cost
         │     └─ Update the tenant        → S-01
         ├─> Agreement tracker  (L-12)
         │     ├─ Send renewal notice      → S-01
         │     ├─ Add date to calendar
         │     ├─ Settle a deposit         → L-13
         │     └─ Print the statement      → P-02
         └─> Units & tenants  (L-08 / L-10)
               ├─ Add a unit or tenant
               ├─ Upload condition photos  → S-04
               ├─ Share the unit link      → S-03
               └─ Print the door QR        → P-03
```

The landlord always starts at the dashboard, which routes to whichever board holds
today's problem; every board carries its own actions.

---

## 9. Rent lifecycle

The one rule set worth writing down precisely: what happens to a month's rent from the
day it is due. **Every reminder is drafted by the app and sent by the landlord — the app
never sends on its own.**

```
1st of the month
  a rent row is created per unit
        │
        ▼
  Paid by the due date? ──yes──> Landlord marks it paid
        │                        receipt is numbered, printed or sent
        no
        ▼
  Day 3 · gentle nudge
  drafted, landlord reviews and sends
        │
  Paid now? ──yes──> Marked paid · receipt issued
        │            reminder history is kept on the record
        no
        ▼
  Day 10 · direct reminder
  states the amount and the date
        │
  Paid now? ──yes──> Marked paid · receipt issued
        │            the month closes on the board
        no
        ▼
  Day 20 · formal notice
  quotes the agreement clause
        │
        ▼
  Landlord calls the tenant
  the call is logged on the record
```

Three escalation steps at day 3, 10 and 20, each with a different tone. The landlord
approves every message. Whatever happens is written to the record, so the history is
complete either way.

**Implementation notes**

- The three levels are **gentle, direct, formal** and are fixed. The *day numbers* are
  editable in settings (`L15-TBL-LADDER`).
- Escalation state is derived from days overdue, not from how many reminders were sent.
- A reminder is written to the record only when the landlord confirms "Yes" to the
  "Did you send it?" prompt in S-01. See `S-01`.
- A logged call is stored as a reminder record with method `call`.

> OPEN-21 — The flow terminates at "landlord calls the tenant" with no defined state
> after day 20 and no path to eviction, legal notice or write-off. The formal notice is
> specified as quoting "the agreement clause", but no agreement-clause text is stored on
> any entity.

> OPEN-07 — The ladder days are editable but the status thresholds are not: L-04 chips
> use warning at 1–9 days and danger at 10+, and the dashboard's Needs-attention
> ordering hard-codes "overdue 10+ days". If a landlord moves the ladder to 5/15/25, it
> is undefined whether those thresholds move with it.

> OPEN-16 — The rent row carries a due date, but nothing specifies where that date comes
> from: a per-unit setting, a per-agreement setting, or a global "due on the 1st".

---

## 10. Where the assistant helps

The app has an assistant built in. Per the scope document it is used in **three places
only, and never to send anything**.

| Where | What it does | Why it matters |
|---|---|---|
| **Rent reminders** | Writes the message at the right tone for how late the payment is — warm at day three, direct at day ten, formal at day twenty | This is the feature that changes behaviour. Landlords avoid chasing early because the words feel rude. Having the right words ready removes that hesitation. |
| **Maintenance requests** | Reads what the tenant typed and suggests a category and an urgency | Consistent sorting is what makes the "what keeps breaking" view possible later. |
| **Deposit settlement** | Turns the deposit amount, the deductions and their reasons into a written statement | A clear statement that explains each deduction turns an argument into a signature. |

**Firm rule:** the assistant drafts, the landlord decides. Nothing written by the
assistant reaches a tenant without the landlord reading it first. This is a product
rule, not a preference.

**Availability rule:** the assistant is never on the critical path. If a draft does not
arrive within 4 seconds, a plain template is used instead with a quiet note. If category
suggestion is slow or unavailable when a tenant submits, the request is created with the
tenant's own choices and nothing waits.

> OPEN-08 — "Three places only" contradicts the UI/UX spec, where S-01 opens with a
> *drafted* message from L-07 (vendor dispatch, tenant status update) and L-12 (renewal
> notice) as well. Either those drafts are templates rather than assistant output, or
> the assistant is used in six places. This decision changes what S-01 must call.

---

## 11. The twelve connections

All twelve are available from day one. **None of them is a screen of its own** — each
appears inside the workflow where it is needed, often in several places. Behavioural
contracts are in [`cross-cutting.md`](cross-cutting.md) §7.

| # | Connection | Where it is used |
|---|---|---|
| 1 | **Pay by UPI** | Opens the tenant's payment app with the exact amount already filled in. Used for: monthly rent from a reminder · deposit at move-in · a repair the tenant is liable for · a late fee |
| 2 | **Payment QR** | The same payment, as a scannable code. Used for: printed on every receipt · shown on the rent screen so a landlord can hold up their laptop · shared with a tenant whose phone will not open links |
| 3 | **Send on WhatsApp** | Opens WhatsApp with the message already typed, for the landlord to review and send. Used for: rent reminders · receipts · maintenance updates · sending a vendor the job and address · welcoming a new tenant with their link · renewal notices |
| 4 | **Send by email** | Opens the email app with subject and body ready. Used for: the year's rent records to the accountant in March · a copy of the agreement to a tenant who needs it for their office · a monthly statement to a property owner |
| 5 | **Tap to call** | Dials without copying the number, then offers to log the call. Used for: calling a tenant from an overdue rent row · calling from a maintenance request · calling a vendor · and on the tenant's own page, so they can reach the landlord without saving the number |
| 6 | **Open in Maps** | Turns an address into directions. Used for: the vendor being sent to a flat · a prospective tenant coming to view a vacant unit · the location shown on the property record |
| 7 | **Copy in one tap** | Puts text on the clipboard. Used for: any drafted message · a unit's link · the landlord's UPI ID · a receipt number |
| 8 | **Share** | Opens the phone's own share menu. Used for: sending a new tenant their unit link · passing a receipt to someone · sharing vacancy details with a broker |
| 9 | **Add to calendar** | Creates a calendar entry in whatever calendar the landlord already uses. Used for: agreement expiry · the notice period ending · a scheduled vendor visit · a rent due date |
| 10 | **Print or save as PDF** | A clean printable page. Used for: rent receipts · the monthly statement · the deposit settlement · a one-page summary of an agreement |
| 11 | **Unit QR code** | A printable code that opens that unit's reporting page. Used for: a sticker inside the flat door · the welcome sheet handed over at move-in · a notice board in the building |
| 12 | **Export to a spreadsheet** | Downloads the data as a file. Used for: the rent ledger for the accountant · maintenance spend per unit · the current tenant list · the deposit register |

**The design decision behind this list:** connections open apps the landlord and tenant
already use, rather than asking them to adopt anything new. There is nothing to install,
nothing to configure, and nothing that can stop working or start charging.

> OPEN-12 — Connection 1 names a **late fee** as a payment reason. No late-fee field,
> setting, calculation or screen exists anywhere in either document.

> OPEN-13 — Connections 6 and 8 name **a prospective tenant viewing a vacant unit** and
> **sharing vacancy details with a broker**. "Listing vacant flats" is explicitly out of
> scope and no vacancy-details view exists.

> OPEN-11 — Connection 10 promises four printables: rent receipts, **the monthly
> statement**, the deposit settlement, and **a one-page summary of an agreement**. Only
> three print views are specified (P-01 receipt, P-02 settlement, P-03 door QR). The
> monthly statement and agreement summary have no view. Connection 4 also references
> "a monthly statement to a property owner", and no property-owner role exists.

> OPEN-09 — Connection 9 includes "a scheduled vendor visit" and "a rent due date" as
> calendar entries. The only calendar control specified is `L12-BTN-CALENDAR` for
> agreement expiry.

---

## 12. System architecture

```
WHO USES IT      ┌──────────────────────┐   ┌──────────────────────────┐
                 │ Landlord workspace   │   │ Tenant link              │
                 │ signed in, sees all  │   │ no sign-in, one unit only│
                 └───────────┬──────────┘   └────────────┬─────────────┘
                             │                            │
THE PRODUCT      ┌───────────┴────────────────────────────┴─────────────┐
                 │ The records                                          │
                 │   units, tenants, rent, requests, documents, photos  │
                 ├──────────────────────────────────────────────────────┤
                 │ The rules and dates                                  │
                 │   monthly rent rows, due dates, expiry countdowns,   │
                 │   escalation                                         │
                 ├──────────────────────────────────────────────────────┤
                 │ The assistant                                        │
                 │   drafts reminders, sorts requests, writes           │
                 │   settlement statements                              │
                 └──────────────────────────┬───────────────────────────┘
                                            │
HOW IT REACHES   ┌──────────────────────────┴───────────────────────────┐
PEOPLE           │ The twelve connections                               │
                 │ pay · QR · WhatsApp · email · call · maps · copy ·   │
                 │ share · calendar · print · unit QR · export          │
                 └──────────────────────────┬───────────────────────────┘
                                            │
APPS THEY        ┌──────────┬───────────────┼──────────────┬────────────┐
ALREADY HAVE     │ Payment  │ WhatsApp &    │ Email &      │ Printer &  │
                 │ apps     │ phone         │ calendar     │ files      │
                 └──────────┴───────────────┴──────────────┴────────────┘
```

Nothing new to install · nothing to configure · no third-party account required by
either user.

---

## 13. Data flow

Landlord, tenant and vendor each put information in at a different point. Everything is
written to a shared set of records, and what comes back out — reminders, receipts,
status updates — is drawn from those same records.

| People | What the app does | Where it is kept |
|---|---|---|
| Landlord | 1 · Record units, tenants and condition photos | Units, properties and tenants |
| Tenant | 2 · Receive and sort a reported problem | Rent ledger — one row per unit per month |
| Vendor | 3 · Assign, resolve and record the cost | Maintenance requests and vendors |
| | 4 · Remind, receipt and settle | Photos, agreements and receipts |
| | | Reminder and call history |
| | | Deposit ledger and deductions |

Six stores in total:

1. Units, properties and tenants
2. Rent ledger — one row per unit per month
3. Maintenance requests and vendors
4. Photos, agreements and receipts
5. Reminder and call history
6. Deposit ledger and deductions

Reminders, receipts and status updates go back out to the landlord and the tenant.

---

## 14. Domain entities

The main things the product keeps track of, and how they relate. Attribute lists below
are the source's own — treat them as the minimum a schema must carry, not as a complete
column list.

```
LANDLORD ──1:many──> PROPERTY ──1:many──> UNIT ──1:many──> TENANT
                                            │                │
                                            │                └──1:many──> DOCUMENT
                                            ├──1:many──> RENT ENTRY ──1:many──> REMINDER
                                            ├──1:many──> REQUEST
                                            └──1:many──> DOCUMENT
```

| Entity | Attributes named by the source |
|---|---|
| **LANDLORD** | name · phone, email · UPI ID · business name for receipts |
| **PROPERTY** | name · address · number of units |
| **UNIT** | unit number, type · rent, deposit amount · occupied or vacant · its own reporting link |
| **TENANT** | name, phone · agreement start, end · deposit paid · notice status |
| **RENT ENTRY** | month · amount due, amount paid · due date, paid on · payment reference · receipt number |
| **REMINDER** | level: gentle, direct, formal · sent on · how it was sent · call notes if phoned |
| **REQUEST** | category, description · urgency, status · vendor assigned · cost · before and after photos |
| **DOCUMENT** | type: agreement, ID proof, photo, receipt, statement · what it belongs to |

**The rule that makes years of history possible:** a unit keeps its history when tenants
change. Rent entries, requests and photos stay with the **unit**, not the person.

### Fields the screens require that the ER diagram does not name

These are implied by screens and must exist somewhere. Recorded here so no agent
assumes them away.

| Field | Needed by | Notes |
|---|---|---|
| Unit token (long, random, unguessable) | T-01 | Distinct from unit number; unit number must never appear in the URL |
| Tenant email | L-11, S-01 email path | "Email instead" only when an email address exists |
| Request number (`R-0412`) | T-02, L-07 | Display format shown; sequence scope unspecified — `OPEN-17` |
| Receipt number (`RR-0847`) | L-04, P-01 | Same |
| Deduction rows: description, reason, amount, photo | L-13, P-02 | Reason mandatory, photo optional |
| Settlement statement: generated, sent, settled state | L-13 | Read-only once settled |
| Tenancy record distinct from tenant | L-09 photos "grouped by tenancy", T-03 "current tenancy" | A unit has many tenancies over time |
| Landlord settings: escalation %, reminder ladder days, accountant email, receipt name, logo | L-15 | |
| Cost / "no cost" flag on a request | L-06, L-07 | Closing requires one or the other |
| Tenant-liable flag on a request | L-07 | |
| Call log: outcome (promised to pay / no answer / disputed / other) and note | L-05 | Stored as a REMINDER with method `call` |
| Pro-rata flag on a rent entry | L-04 | Row shows a "pro-rata" note |
| Amount edit history (old and new value) | L-05 | Written to the timeline |

> OPEN-10 — REQUEST carries "vendor assigned" as an attribute, and `L07-FLD-VENDOR` is a
> free-text name and phone that "remembers previously used vendors as suggestions". The
> data-flow diagram lists a store called "Maintenance requests **and vendors**". Whether
> VENDOR is a first-class entity is undecided.

> OPEN-14 — RENT ENTRY carries one `amount paid` and one `receipt number`, but L-04
> specifies part payment with "a receipt issued for the amount actually received",
> implying several payments and several receipts per rent entry.

---

## 15. Scope

### Included in version one

| Area | What is included |
|---|---|
| Landlord workspace | All eight modules, with sign-in |
| Tenant pages | Report a problem, track it, see unit details and receipts — no sign-in |
| Money tracking | Rent recorded per unit per month, receipts issued and numbered, deposit ledger |
| Dates | Rent due dates and agreement expiry, with warnings at 90, 60 and 30 days |
| Photos and documents | Condition photos, repair photos, agreements, ID proofs |
| Assistant | Reminder drafting, request sorting, settlement statements |
| Connections | All twelve, available from day one |

### Deliberately excluded

| Excluded | Why |
|---|---|
| **Automatic sending** | Every message is approved by the landlord. This is a principle, not a limitation to be removed later. |
| **Listing vacant units publicly** | That is a different product with a different business model. |
| **Tenant background or credit checks** | Not meaningfully available to individual landlords in India. |
| **Accounting software integration** | A spreadsheet export serves the accountant and avoids a fragile dependency. |
| **Society or apartment-complex management** | Different buyer, different problem. |
| **A separate tenant mobile app** | The whole point is that the tenant installs nothing. |
| **Global search** | Not in version one. Filters on each board cover the need. |

### Considered for later, once the product is in real use

| Possible addition | Why it is not in version one |
|---|---|
| Collecting rent through a payment gateway, with the rent row updating on its own | Requires the landlord to complete merchant registration, and money would then settle a day later instead of arriving instantly. Worth it for operators with many small payments; a step backwards for a landlord with fourteen flats. |
| Sending messages automatically over WhatsApp's business service | Requires business verification, a separately dedicated phone number, and approval of each message format. Adds a monthly cost that only makes sense across many landlords at once. |
| Automatic monthly rent reminders without review | Would break the approval principle. Revisit only if landlords in real use ask for it. |
| Separate access for a caretaker or assistant | Most landlords in this range work alone. Add it when a customer with staff asks. |

**Performance boundary:** anything expected to take over 10 seconds does not exist in
version one. If a feature needs that long, it is scoped wrong.

---

## 16. The change the product makes

| Today | With RentRoll — landlord | With RentRoll — tenant |
|---|---|---|
| Not sure who has paid this month | One screen, one glance, twelve green and two red | Gets a numbered receipt every time, without asking |
| Avoids sending the awkward reminder | The right words are already written for day three, ten and twenty | Receives a fair reminder early instead of an angry one late |
| Agreement lapses unnoticed | Warned at 90, 60 and 30 days, with the new rent already calculated | Knows well in advance what is changing and when |
| Repairs reported by phone at odd hours | Requests arrive in a list with photos, in order of urgency | Reports in two minutes with a photo and can check the status |
| Deposit argument at move-out | Move-in photos, every repair and every cost, held for years | Receives a written statement explaining each deduction |
| Accountant rebuilds the year from bank statements | One export, one file, done in March in a minute | Has receipts on hand for their own proof of rent |
| Everything lives in the landlord's head | Everything lives in one place, and can be handed over | Knows there is a record, which is most of the trust |

**The one sentence:** the landlord stops carrying the business in their head, and the
tenant stops wondering whether anyone heard them. Both changes come from the same thing
— a shared, written record.

---

## 17. Success measures

These are product metrics, not build requirements. They are recorded because they tell
an implementer what a feature is *for*.

| What we will look at | Why it tells us the product is working |
|---|---|
| Rent rows marked paid within the month | The core promise. If collection does not improve, nothing else matters. |
| Days from due date to payment | Should fall once reminders go out on day three instead of day twenty-five. |
| Requests raised through the tenant link rather than by phone | Shows tenants have accepted the link, which is the biggest adoption risk. |
| Agreements renewed before expiry, not after | The clearest money-saving outcome, and easy to demonstrate to a prospect. |
| Units with move-in photos attached | If this is low, the settlement feature is decorative. Worth watching from week one. |
| Landlords still signing in after three months | The honest test of whether the product replaced the diary or joined it. |
