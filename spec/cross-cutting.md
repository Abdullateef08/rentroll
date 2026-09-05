# RentRoll — Cross-Cutting Rules

Rules that apply to more than one screen. Derived from **RentRoll — UI/UX Specification
v1.0** Parts A and E, and from **RentRoll — Product Scope Document v1.0** §3 and §11.

If a screen file and this file disagree, this file wins, except where the screen file
names a specific exception.

---

## 1. The two inviolable rules

These two are quoted from the source as applying to **every screen in the product**.
Any ticket that appears to breach either should be escalated, not implemented.

### 1.1 Nothing sends by itself

> No message ever leaves the system without the landlord pressing send — the assistant
> drafts into an editable field and never dispatches.

Consequences for implementation:

- There is **no server-side send**. The product's only outbound channels are
  hand-offs to WhatsApp, email, phone and share sheets on the user's own device.
- The assistant writes into `S01-FLD-MESSAGE`, a normal editable text area, **not a
  preview**.
- Because the app hands the message to WhatsApp, it cannot know whether the landlord
  actually pressed send there. Therefore **S-01's "Did you send it?" step is not
  optional**. Only an explicit "Yes" writes a reminder to the timeline. Recording a
  reminder that was never sent would corrupt the escalation history and produce a wrong
  tone next time.
- No scheduled job may send anything. The monthly job creates **rows**, not messages.

### 1.2 Money stays private

> No tenant-facing screen ever queries or displays rent amounts, repair costs, other
> units, or other tenants.

Consequences for implementation:

- This is a **query-level** rule, not a rendering rule. The API responses behind tenant
  pages must not contain the forbidden fields at all. See §5, test 4.
- Never expose to the tenant: the vendor's rate, the cost recorded, internal notes, or
  any other unit. The tenant update draft is built from **status and category only**.
- T-04 shows agreement dates but **not** the rent figure. The reasoning given: the
  tenant knows their own rent; the app does not need to state it, and any screen that
  displays a money figure is one refactor away from displaying the wrong one.

**The one documented exception:** T-05 receipts *do* show amounts, and P-01 prints them,
because those are the tenant's own payments and the receipt is the point. This exception
is scoped to (a) the tenant's own paid rent entries and (b) the settlement statement
sent to them. It does not extend to outstanding amounts, other months' expectations,
repair costs or any other unit.

---

## 2. Message catalogue

Every message the system shows. Wording is contract — match it exactly.

| Situation | Message | Type |
|---|---|---|
| Payment recorded | `Payment recorded. Receipt RR-0847 created.` | Toast with Undo |
| Reminder logged | `Reminder recorded on the tenant's history.` | Toast |
| Copied | `Copied.` | Toast, 2 seconds |
| Export ready | `Downloaded rent-2026-02.csv` | Toast |
| Calendar file | `Added — open the file to save it to your calendar.` | Toast |
| Request submitted (tenant) | `Reported. Your request number is R-0412.` | Full screen — T-02 |
| Save failed | `Could not save. Your changes are still here — try again.` | Inline, above the form |
| Network lost | `You are offline. We will save this when you reconnect.` | Banner |
| Assistant unavailable | `Wrote this from a template — edit as needed.` | Quiet note inside S-01 |
| Invalid tenant link | `This link is not valid. Please ask your landlord for your unit link.` | Full screen |
| Rent rows missing | `This month's rent rows have not been created.` | Banner with action |

Messages specified on individual screens but not in the catalogue above:

| Situation | Message | Type | Screen |
|---|---|---|---|
| Sign-in failure | `Email or password is incorrect.` | Inline, above the form | L-01 |
| Tenant submission failed | `Could not submit. Please try again.` | Inline, above the button | T-01 |
| Tenant offline | `You are offline. Your report will be sent when you reconnect.` | Banner | T-01 |
| Nothing needs attention | `Nothing needs your attention today.` | Reward state with a tick | L-03 |
| No property yet | `Add your first property to see your dashboard` | Empty state with a button | L-03 |
| Regenerate over edits | `This will replace your edits.` | Confirm | S-01 |
| Payment on desktop | `Scan the code with your phone instead.` | Disabled-button tooltip | S-02 |
| Upload too large | `That file is too large` | Inline on the thumbnail | S-04 |
| Upload wrong type | `That file type is not supported` | Inline on the thumbnail | S-04 |
| Upload in progress | `Uploading photo…` | Button label | S-04 |

### Wording rules

- **Never blame the user.**
- **Never show a code or an internal identifier.**
- **Never use the words *error*, *invalid*, *failed*, or *unauthorised* in tenant-facing
  text.**
- **Always say what happens next.**

> OPEN-20 — The catalogue's offline banner reads "We will save this when you reconnect",
> while T-01 specifies "Your report will be sent when you reconnect." The catalogue
> claims to be the complete list of every message the system shows, so one of the two is
> stale.

---

## 3. Empty states

Every empty state is one line explaining what would appear here, plus the button that
creates the first one. Never just "No data".

| Screen | Message | Action offered |
|---|---|---|
| L-04 Rent, no units | `Add a unit and this month's rent will appear here.` | Add unit |
| L-04 Rent, all paid | `Everything is paid for February. Nice.` | None |
| L-06 Maintenance | `No open requests. Tenants report problems through their unit link.` | Print door QR codes |
| L-08 Units | `Your properties and units live here.` | Add your first unit |
| L-12 Agreements | `Nothing expiring in the next 90 days.` | Switch to All |
| L-13 Deposits | `Deposits appear here once you add tenants.` | Add tenant |
| T-03 Tenant reports | `You have not reported anything yet.` | Report a problem |
| T-05 Tenant receipts | `Receipts appear here once your landlord records a payment.` | None |

L-03 is deliberately different: when nothing is wrong, the Needs attention card shows
`Nothing needs your attention today.` with a tick icon. **This is a reward state, not an
empty state** — do not style it as one.

The "February" in the L-04 all-paid message is the selected month, not a literal.

---

## 4. Loading

| Context | Behaviour |
|---|---|
| **Page load** | Skeleton shapes matching the real layout. **Never a centred spinner on a blank page.** |
| **Row action** | Spinner inside the button only; the rest of the screen stays usable. |
| **Assistant draft** | Skeleton lines inside the text area, with a **4-second ceiling** before falling back to a template. |
| **Photo upload** | Thumbnail appears instantly from the local file with a progress ring over it. |

**Anything expected to take over 10 seconds does not exist in version one.** If a
feature needs that long, it is scoped wrong.

Partial-failure rule, from L-03 and generalised: a load failure is handled at the
smallest component that can carry it. One failed card shows a retry link inside itself
and does not blank the page.

---

## 5. Permission boundaries

**QA should treat these as the highest-severity test cases in the product.** All seven
must pass before release (build tracker phase 8).

| # | Test | Expected |
|---|---|---|
| 1 | Open a unit link belonging to another landlord's unit | Invalid link message |
| 2 | Open a former tenant's link after the tenancy ended | Invalid link message |
| 3 | Alter the token in a valid tenant URL | Invalid link message |
| 4 | Inspect the data behind any tenant page | Contains no rent amount, no cost, no other unit, no other tenant |
| 5 | Request another landlord's rent, unit, tenant or request record while signed in | Not found |
| 6 | Reach any landlord route while signed out | Redirect to L-01, then return to the intended screen after signing in |
| 7 | Open a document belonging to another landlord | Not found |

### Rules these tests imply

- **Not found, never forbidden.** Cross-landlord access returns a not-found response.
  Do not distinguish "exists but is not yours" from "does not exist".
- **The invalid-link screen says nothing else.** No hints about what a valid link looks
  like, no suggestion to check the URL, no support link.
- **A former tenant's link stops working when the tenancy ends.** The same message is
  used for a vacant unit, an unknown token and a tampered token — the three cases are
  indistinguishable to the visitor.
- **Tokens are long and random.** Unit numbers are never used in the URL, because
  `/u/2A` would let anyone guess `/u/2B`.
- **Rate limit:** 5 submissions per token per hour, with a plain message if exceeded.
- **A bot check runs invisibly.** A tenant should never see a puzzle.
- **Sign-in throttling:** after five failed attempts, add a 30-second delay and say so
  plainly.
- **Session:** persists for 30 days on a trusted device.

> OPEN-30 — P-01 is opened by the tenant from `T05-BTN-PRINT`, but print views are
> otherwise landlord surfaces and the receipt shows a money amount. The authorisation
> model for a print view reached with a unit token — and which receipts that token may
> open — is not specified.

> OPEN-27 — "Trusted device" is not defined: what marks a device trusted, whether the
> user chooses, and what the session length is otherwise.

> OPEN-31 — "A bot check runs invisibly" names no mechanism, and the constraint that a
> tenant must never see a puzzle rules out an interactive challenge fallback.

---

## 6. Accessibility floor

- Every control reachable and operable by keyboard, with a visible focus ring. Tab order
  follows reading order.
- Text contrast at least 4.5:1; status chips are tested against their tinted backgrounds
  specifically.
- Icon-only buttons carry an accessible label and a visible tooltip on hover.
- Form errors are announced, and the label is programmatically tied to its field.
- Detail panels and modals trap focus, return it to the trigger on close, and close on
  Escape.
- Status is never carried by colour alone — every chip has a word.
- Photo thumbnails carry meaningful alternative text, not the file name.

Acceptance for phase 8: a keyboard-only run through every screen completes.

---

## 7. The twelve connections as behaviours

Each connection appears inside a workflow, never as a screen of its own. This section is
the behavioural contract; [`product.md`](product.md) §11 records where each is used.

| # | Connection | Implementation contract |
|---|---|---|
| 1 | **Pay by UPI** | Build a UPI intent URL carrying the landlord's UPI ID, the exact amount and a note. Opens the tenant's payment app. On desktop the button is disabled with a tooltip pointing at the QR. Never claims payment was received. |
| 2 | **Payment QR** | The same UPI payload rendered as a scannable code. Regenerates whenever the amount changes. Large enough to scan from a laptop screen. Downloadable as an image. Printed on P-01. |
| 3 | **Send on WhatsApp** | Opens WhatsApp in a new tab with the current text pre-filled. Always followed by the "Did you send it?" prompt (§1.1). Recipient is explicit per context — for vendor dispatch it defaults to the vendor's number, **not** the tenant's. |
| 4 | **Send by email** | Opens the user's email app with subject and body ready. Attachments cannot be pre-attached; helper text tells the landlord to attach the downloaded file after their email app opens. |
| 5 | **Tap to call** | Dials without copying the number. On return to the tab, prompts `Log this call?`; accepting opens the call-log form, which saves as a reminder record with method `call`. Also present on the tenant's own page so they can reach the landlord without saving the number. |
| 6 | **Open in Maps** | Turns a stored address into a maps URL, opened in a new tab. |
| 7 | **Copy in one tap** | Writes to the clipboard, shows the `Copied.` toast for 2 seconds, and the icon changes to a tick for 2 seconds. **Must be called directly from the click handler — never after an `await`**, or the browser will refuse the clipboard write. |
| 8 | **Share** | Uses the device share sheet where available; falls back to copy with a toast on desktop. **Never shows a broken share icon.** |
| 9 | **Add to calendar** | Generates a downloadable calendar file. For agreement expiry it contains the expiry date with a reminder 30 days before. Toast: `Added — open the file to save it to your calendar.` |
| 10 | **Print or save as PDF** | Opens a print view in a new tab with the print dialog triggered on load. Print views are separate pages with no navigation, no buttons and a white background. **Do not attempt to hide the app's own interface with print styles.** |
| 11 | **Unit QR code** | A printable code encoding the unit's `/u/:unitToken` URL. Shown in a modal on L-09; printed four to an A4 page as P-03. |
| 12 | **Export to a spreadsheet** | Downloads CSV of the current filtered view. Four named exports on L-14: rent ledger, maintenance spend, tenant list, deposit register — each with a date range picker. Files must open correctly in Excel **with the rupee symbol intact** (write a UTF-8 BOM). |

---

## 8. Recurring behaviours

Patterns that appear on several screens; implement once.

### 8.1 Row click versus row buttons

On every data table, clicking the row opens its detail panel or page. Buttons inside a
row **stop propagation** so they never also trigger the row click.

### 8.2 Filters in the URL

Board filters are reflected in the URL so a view can be shared or bookmarked, and they
filter without a page reload. L-04 is the worked example:
`/rent?month=2026-02&status=overdue`.

### 8.3 Unsaved edits

Detail panels and modals warn before closing when a field has unsaved edits. S-01 warns
before regenerating over an edited draft, and before cancelling an edited draft.

### 8.4 Timeline writes

Anything that changes a record's meaning writes a timeline entry rather than mutating
silently. Named instances:

- Every status change, message sent and note added on a request (L-07).
- Reopening a closed request writes a timeline entry rather than creating a new request
  (L-06).
- Editing a rent amount records the old and new value (L-05).
- Every reminder, with its level, when, and by which method; plus every logged call
  (L-05).

### 8.5 Confirmations

Destructive and irreversible actions sit behind a confirm dialog whose action button
says what it does. Named instances: End tenancy (L-11), Mark settled (L-13), delete a
document (L-14), any Danger button.

### 8.6 Optimistic actions with Undo

Mark paid flips the row immediately and offers Undo. Marking paid twice is impossible —
the button is replaced the moment the state changes.

### 8.7 Assistant fallback

Any surface that asks the assistant for text shows skeleton lines for up to 4 seconds,
then falls back to a plain template with the quiet note `Wrote this from a template —
edit as needed.` The surface is **never blocked** by the assistant.

---

## 9. Dates, time and money maths

Collected because several screens depend on the same arithmetic.

| Quantity | Definition |
|---|---|
| Days overdue | Today minus the rent entry's due date, when unpaid |
| Lateness bands | 1–9 days = `warning` · 10+ days = `danger` |
| Days remaining on an agreement | Agreement end date minus today |
| Expiry bands | Under 30 = `danger` · 30–60 = `warning` · 60–90 = `neutral` |
| Expiry warnings | Raised at 90, 60 and 30 days |
| Suggested new rent | Current rent increased by the escalation percentage |
| Refund due | Deposit held − total deductions |
| Lifetime net for a unit | Total rent collected − total maintenance spend |
| Paid-on-time percentage | Share of a tenant's rent entries paid by the due date |

> OPEN-28 — No timezone is stated. Every "today", countdown, day-overdue count and the
> 1st-of-month job depends on it. The product is built for India, which implies IST, but
> this is inference, not specification. Nothing says whether the boundary is the
> landlord's local midnight or a fixed server timezone.

> OPEN-15 — Mid-month move-in creates a pro-rata first row, but the method is not
> specified: actual days in the month, a 30-day convention, or landlord-entered.

> OPEN-26 — The default escalation percentage has no stated value, and no rounding rule
> is given for the suggested new rent.

> OPEN-19 — The Needs-attention ordering gives rank 2 to "rent overdue 10+ days" and
> rank 4 to "rent overdue 1–9 days", but writes rank 4's condition as "unpaid and past
> due", which also matches rank 2. Read rank 4 as 1–9 days; the condition column is
> loose.

---

## 10. Status vocabularies

| Domain | Landlord-facing | Tenant-facing |
|---|---|---|
| Rent entry | Paid · Due · *n* days late · Part paid | (not shown) |
| Maintenance request | New · Assigned · In progress · Done | Received · Assigned · In progress · Done |
| Request urgency | Urgent · Normal · Low | Urgent · Normal · Low |
| Unit | Occupied · Vacant · Notice period | (not shown) |
| Tenant | Current · On notice · Past | (not shown) |
| Request category | Plumbing · Electrical · Appliance · Structural · Pest · Cleaning · Other | …· Something else |

> OPEN-34 — The landlord's first status is `New` and the tenant's is `Received`. The
> mapping is obvious but never stated, and the two category lists differ in their last
> item (`Other` vs `Something else`). Both are presumably the same value with different
> labels.

---

## 11. Naming and code conventions

- Use the screen and element IDs from [`index.md`](index.md) §2 as `data-testid` values.
  QA scripts key off them.
- Route names are given per screen. Where the source gives none, the screen file says so
  and references `OPEN-25`.
- Status values stored in the database should be the landlord vocabulary; tenant labels
  are a presentation mapping (§10).
- All user-visible strings live in one place so the message catalogue (§2) can be
  verified against the build in phase 8.
