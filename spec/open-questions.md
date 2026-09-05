# Open questions

Every contradiction and undecided point found in the source documents, preserved rather
than resolved. Each has a stable `OPEN-nn` id used throughout the spec tree.

**How to use this file**

- **Blocking** — an agent cannot write correct code without a decision. Do not guess.
- **Should decide** — a reasonable default exists, but it must be chosen once and applied
  everywhere. Record the choice here when it is made.
- **Note** — an inconsistency in the source that does not change what gets built. Recorded
  so nobody "fixes" the spec by accident.

Nothing in this file has been decided. Where a section says *"the likely reading"*, that
is an observation to speed up the decision, not the decision itself.

| Severity | Count |
|---|---|
| Blocking | 9 |
| Should decide | 15 |
| Note | 11 |
| **Total** | **35** |

---

## Blocking

### OPEN-03 · Tenant screens T-02…T-05 have no routes and no way in

**Where:** UI/UX Part C; A3 navigation.
**The contradiction:** T-01 is given a route (`/u/:unitToken`). T-02, T-03, T-04 and T-05
are specified as screens with components but with no routes at all. Tenant screens have
"no navigation at all". The only link out of T-01 is `T01-LNK-MYREPORTS` → T-03, and the
only links out of T-02 are to T-03 and back to T-01. **Nothing links to T-04 or T-05, so
as specified they are unreachable.**
**Affects:** T-02, T-03, T-04, T-05, and the phase-6 ticket that builds them.
**The likely reading:** sub-paths under the token, e.g. `/u/:unitToken/reports`,
`/u/:unitToken/unit`, `/u/:unitToken/receipts`, with a small set of links at the foot of
T-01 — which then has to be reconciled with "no navigation at all".

### OPEN-04 · No screen creates a second property

**Where:** L-02 access rule; L-08 add-unit form; L-03 no-data state.
**The contradiction:** properties are created only in L-02, which "cannot be revisited"
once the account has a property. L-08's add-unit form takes a property as an input. L-04
has a property dropdown "hidden when the landlord has one property", so multiple
properties are clearly expected. A landlord who buys a second building has no path.
**Affects:** L-02, L-08, L-03, L-04.

### OPEN-07 · Editable reminder ladder versus fixed lateness thresholds

**Where:** `L15-TBL-LADDER`; `L04-CHP-STATUS`; L-03 Needs-attention ordering.
**The contradiction:** the ladder days (3 / 10 / 20) are editable in settings, while the
status chip thresholds (`warning` at 1–9 days, `danger` at 10+) and the dashboard rank
"rent overdue 10+ days" are stated as fixed numbers. A landlord who moves the ladder to
5 / 15 / 25 gets a board whose colours no longer match when reminders are due.
**Affects:** L-04, L-03, L-05, S-01, L-15.

### OPEN-08 · What the assistant is allowed to write

**Where:** Scope §11 ("used in three places only"); `L07-BTN-DISPATCH`,
`L07-BTN-UPDATETENANT`, `L12-BTN-NOTICE`, `L13-BTN-SEND`, S-01.
**The contradiction:** the scope document restricts the assistant to rent reminders,
maintenance request sorting and settlement statements, "and never to send anything". The
UI/UX spec opens S-01 with a *drafted* message from four more places: vendor dispatch,
tenant status update, renewal notice and settlement summary. Either those are fixed
templates, or the assistant is used in six or seven places.
**Affects:** S-01, L-07, L-12, L-13, and every assistant call site.

### OPEN-14 · Part payment versus one amount and one receipt per rent entry

**Where:** L-04 rules; entity model RENT ENTRY.
**The contradiction:** RENT ENTRY carries a single `amount paid` and a single
`receipt number`. L-04 specifies part payment: the row shows "Part paid — ₹4,000 pending"
and "a receipt is issued for the amount actually received". A second part payment would
need a second receipt against the same entry.
**Affects:** L-04, L-05, P-01, the rent export, the collected-this-month figure on L-03.

### OPEN-15 · Pro-rata calculation method

**Where:** L-04 rules.
**Undecided:** the first month's row is created with "the pro-rata amount", with no
method given — actual days in the month, a 30-day convention, or landlord-entered with
the app only flagging the row. The landlord can edit the amount afterwards, which
suggests the app's figure is a starting point, but the figure still has to be computed.
**Affects:** L-04, L-05, the monthly job.

### OPEN-16 · Where the rent due date comes from

**Where:** RENT ENTRY (`due date`); L-04 column; the rent lifecycle.
**Undecided:** rows are created on the 1st and carry a due date, but nothing says whether
that date is per unit, per agreement, or a global setting, nor what the default is. The
whole escalation ladder counts from it.
**Affects:** L-04, L-05, L-03, the monthly job, L-15.

### OPEN-28 · Timezone and the definition of "today"

**Where:** everywhere a countdown, a day-count or the 1st-of-month job appears.
**Undecided:** no timezone is stated anywhere in either document. Days overdue, days
remaining, the 90/60/30 bands, the 48-hour and 7-day card ageing, and the row-creation
job all depend on it. The product is built for India, which implies IST, but that is
inference. Nothing says whether the boundary is the landlord's local midnight or a fixed
server timezone.
**Affects:** L-03, L-04, L-05, L-06, L-12, the monthly job.

### OPEN-30 · Authorisation for a print view reached with a tenant token

**Where:** `T05-BTN-PRINT` → P-01; E4 permission tests.
**The contradiction:** print views are otherwise landlord surfaces, and P-01 shows a
money amount. T-05 lets a tenant open P-01 for their own receipts using only a unit
token. The permission tests say the data behind any tenant page contains no rent amount —
yet this page must contain one. The rule that separates "the tenant's own receipt" from
"any receipt" is not written down.
**Affects:** P-01, T-05, the E4 test suite.

---

## Should decide

### OPEN-05 · Is the L-03 "no data at all" state reachable?

L-03 specifies a state "only reachable if L-02 was skipped", but L-02's first step cannot
be skipped and any property-less account is routed back to L-02. The state can only be
reached by abandoning setup and navigating directly to `/`. Decide whether to keep it,
and what its button (which points at L-08) should actually do given `OPEN-04`.

### OPEN-06 · Toast lifetime versus Undo window

Toasts live 4 seconds (foundations §2.3). The mark-paid toast carries "an Undo that
reverses it for 10 seconds". Either that toast is a documented exception with a longer
life, or the undo window outlives the affordance that offers it.

### OPEN-09 · Tone selector and calendar entries beyond their specified cases

Two related gaps. (a) `S01-SEG-TONE` is specified only in terms of days overdue; whether
it appears on vendor, renewal, status-update and settlement messages is unstated.
(b) Connection 9 lists four calendar uses — agreement expiry, the notice period ending, a
scheduled vendor visit, a rent due date — but `L12-BTN-CALENDAR` is the only control.

### OPEN-10 · Is a vendor a stored entity?

The entity model gives REQUEST a `vendor assigned` attribute. `L07-FLD-VENDOR` is free
text that "remembers previously used vendors as suggestions". The data-flow diagram names
a store "maintenance requests **and vendors**". Decide before writing the schema.

### OPEN-11 · Print views promised but not specified

Connection 10 promises four printables: rent receipts, **the monthly statement**, the
deposit settlement, and **a one-page summary of an agreement**. Only P-01, P-02 and P-03
exist, and P-03 (door QR) is not in that list. Connection 4 also references "a monthly
statement to a property owner", and no property-owner role exists anywhere.

### OPEN-12 · Late fee

Connection 1 lists "a late fee" as a UPI payment reason. No late-fee field, setting,
calculation, column or screen exists in either document.

### OPEN-17 · Numbering formats and sequence scope

`RR-0847` and `R-0412` are shown as examples. Undecided: whether each sequence is per
landlord or global, whether it resets by financial year, its width, and what happens to
the sequence when a mark-paid is undone within its 10-second window.

### OPEN-19 · Overlapping Needs-attention conditions

Rank 2 is "rent overdue 10+ days"; rank 4 is "rent overdue 1–9 days" but its condition
column reads "unpaid and past due", which also matches rank 2. Rank 3 and rank 6 have the
same shape. The titles are clearly the intent; confirm and fix the conditions.

### OPEN-21 · What happens after day 20

The rent lifecycle ends at "landlord calls the tenant". No state after that is defined —
no write-off, no legal step, no long-overdue treatment, and no fourth reminder level.
Separately, the day-20 formal notice "quotes the agreement clause", but no agreement text
or clause field is stored on any entity.

### OPEN-22 · Nothing sets a tenant's notice status

`notice status` is a TENANT attribute, displayed as "Notice period" on L-08 and filtered
as "On notice" on L-10. The scope document lists "record a notice served" as an agreement
tracker capability. L-12 has only "Record renewal". No control sets the field.

### OPEN-24 · Sending a receipt

The scope document lists "issue **and send** the receipt" as a rent-board capability.
L-04 specifies only a print icon opening P-01. No send-receipt path exists on any screen,
though connection 3 lists receipts as a WhatsApp use.

### OPEN-25 · Routes that are not specified

(a) L-14 and L-15 have no routes; `/documents` and `/settings` are inferred from sidebar
labels. (b) L-05 and L-07 have routes but are described as panels "over" their parent —
the behaviour of a direct visit or a refresh at those URLs is not stated.

### OPEN-26 · Escalation default and rounding

`L15-FLD-ESCDEFAULT` has no stated default value, and no rounding rule is given for the
suggested new rent on L-12 (whether to the rupee, the hundred, or the five hundred).

### OPEN-31 · The invisible bot check

T-01 says "a bot check runs invisibly. A tenant should never see a puzzle." No mechanism
is named, and the no-puzzle rule removes the usual fallback when a silent check is
inconclusive.

### OPEN-33 · Offline submission queue

T-01's offline banner promises the report "will be sent when you reconnect". That implies
persisting a draft plus its photos locally and retrying. No storage mechanism, retry
policy, expiry or interaction with the 5-per-hour rate limit is specified.

---

## Notes

### OPEN-01 · Screen and component counts

The UI/UX cover page says "14 landlord screens · 5 tenant screens · 6 shared components".
The screen map enumerates L-01…L-15 (fifteen) and S-01…S-04 (four), and its own caption
says "Fifteen landlord screens, five tenant screens, four shared components and three
print views". This tree follows the enumeration.

### OPEN-02 · How many tenant pages

The information architecture shows four tenant pages. The navigation rules refer to "the
tenant's own three pages". The screen map has five (T-01…T-05). The difference is whether
the confirmation and the unit-details page count.

### OPEN-13 · Vacancy sharing versus vacancy being out of scope

Connection 6 lists "a prospective tenant coming to view a vacant unit"; connection 8 lists
"sharing vacancy details with a broker". "Listing vacant units publicly" is explicitly
excluded from version one, and no vacancy-details view exists to share.

### OPEN-18 · The "Due" chip colour

The token table assigns `warning` to "due soon, expiring, 1–9 days late". `L04-CHP-STATUS`
specifies "Due (neutral)". Either the token description is loose or L-04 is.

### OPEN-20 · Two wordings for the offline banner

The message catalogue gives `You are offline. We will save this when you reconnect.`
T-01 gives `You are offline. Your report will be sent when you reconnect.` The catalogue
claims to list every message the system shows.

### OPEN-23 · Where "share the unit link" lives

The scope document lists it as a Tenant record capability (L-10 / L-11). The only control
is `L09-BTN-SHARELINK` on the unit detail screen.

### OPEN-27 · "Trusted device"

The session persists "for 30 days on a trusted device". What marks a device trusted,
whether the user opts in, and the session length otherwise are all unspecified.

### OPEN-29 · Two different lists of eight

Scope §6's eight modules include the tenant request portal and omit Documents & exports.
The information architecture's eight landlord sections do the reverse. Settings (L-15) is
in neither, though it is in the sidebar.

### OPEN-32 · Lakh abbreviation on stat cards

The scope document's dashboard wireframe shows `COLLECTED 2.1L` and `DUES 36k`. L-03's
component table says "Value in ₹". Tables clearly use full figures with separators.

### OPEN-34 · Status and category vocabularies differ between the two sides

Landlord columns are New · Assigned · In progress · Done; tenant chips are Received ·
Assigned · In progress · Done. Landlord categories end in `Other`; the tenant's end in
`Something else`. The mappings are obvious but never stated.

### OPEN-35 · A payment QR on a receipt

Connection 2 says the payment QR is "printed on every receipt", and P-01 lists one among
its contents. A receipt is issued for money already received.

---

## Decisions log

Record decisions here as they are made, with the date and who made them. An `OPEN-nn`
that has been decided stays in this file with its decision appended — it is not deleted,
because code and tickets reference the id.

| ID | Decision | Decided by | Date |
|---|---|---|---|
| — | — | — | — |
