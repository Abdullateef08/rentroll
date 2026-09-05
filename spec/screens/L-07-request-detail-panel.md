# L-07 · Request detail panel

## Meta

| | |
|---|---|
| **Route** | `/maintenance/:requestId` |
| **Access** | Signed in |
| **Purpose** | Everything about one reported problem, and every action needed to close it. |
| **Arrives from** | `L06-CRD-REQUEST`, `L03-ROW-ATTENTION` (requests) |
| **Leads to** | S-01 (vendor draft, tenant update draft), S-02 (tenant-liable payment request) |
| **Build phase** | 3 |

## Layout

Detail panel: 480px on desktop, full screen on mobile.

```
┌──────────────────────────────────────────────┐
│ R-0412 · Flat 1B  [Urgent]   [ New ▾ ]     × │  L07-HDR
├──────────────────────────────────────────────┤
│ "Geyser is leaking from the bottom since     │  L07-SEC-REPORT
│  yesterday."                                 │  verbatim, never edited
│  M. Desai · 03 Feb 2026                      │
├──────────────────────────────────────────────┤
│ [before] [before]        [+ after photo]     │  L07-GAL-PHOTOS
├──────────────────────────────────────────────┤
│ Category   [ Plumbing ▾ ]                    │  L07-SEL-CATEGORY
│ Vendor     [ Ramesh · +91 9xxxx ]            │  L07-FLD-VENDOR
│ Cost       [ ₹ 1,200 ]                       │  L07-FLD-COST
│ [ ] Tenant is liable for this cost           │  L07-CHK-TENANTLIABLE
├──────────────────────────────────────────────┤
│ [ Send job to vendor ] [ Update the tenant ] │
├──────────────────────────────────────────────┤
│ ● 04 Feb  Assigned to Ramesh                 │  L07-TML-HISTORY
│ ● 03 Feb  Reported by M. Desai               │
└──────────────────────────────────────────────┘
```

## Components

| ID | Type | Content and behaviour |
|---|---|---|
| `L07-HDR` | Panel header | Request number · unit · urgency chip · **status dropdown** |
| `L07-SEC-REPORT` | Content block | **What the tenant wrote, verbatim, with the date and their name. Never edited.** |
| `L07-GAL-PHOTOS` | Photo strip | **Before** photos from the tenant; **after** photos added by the landlord. Tap to enlarge. |
| `L07-SEL-CATEGORY` | Dropdown | **Pre-filled by the assistant, editable.** Options: Plumbing · Electrical · Appliance · Structural · Pest · Cleaning · Other |
| `L07-FLD-VENDOR` | Text field | Vendor name and phone. **Remembers previously used vendors as suggestions.** |
| `L07-FLD-COST` | Money field | What it cost. **Required to close.** |
| `L07-CHK-TENANTLIABLE` | Checkbox | "Tenant is liable for this cost" — when ticked, **offers a payment link instead of absorbing the cost** |
| `L07-BTN-DISPATCH` | Primary button | "Send job to vendor" |
| `L07-BTN-UPDATETENANT` | Secondary button | "Update the tenant" |
| `L07-TML-HISTORY` | Timeline | Every status change, message sent and note added |

## Interactions

| Trigger | Result |
|---|---|
| `L07-BTN-DISPATCH` | Opens S-01 with a **vendor-flavoured draft** containing: the problem, **the unit's address**, the tenant's phone and a **Maps link**. **Recipient defaults to the vendor's number, not the tenant's.** |
| `L07-BTN-UPDATETENANT` | Opens S-01 with a **status-update draft addressed to the tenant**. **The draft never mentions cost or vendor rates.** |
| `L07-CHK-TENANTLIABLE` | Reveals a **"Send payment request"** button that opens S-02 with the cost pre-filled |
| Status set to **Done** | Validates that a cost or "no cost" is present · **prompts to add an after photo** · **offers to notify the tenant** |
| Status changed to anything else | Writes a timeline entry; offers to notify the tenant (same as the L-06 drag toast) |
| Photo added | S-04 behaviour; up to 10 photos on a landlord screen |

## States

| State | Display |
|---|---|
| Loading | Skeleton lines inside the panel |
| Assistant category not yet suggested | Category dropdown shows the tenant's own choice; never blocks |
| Closing without cost | Validation blocks the status change until a cost or "no cost" is given |
| Reopened from Done | Timeline entry written; the request keeps its number |

## Rules

- **Never expose to the tenant:** the vendor's rate, the cost recorded, internal notes,
  or any other unit. **The tenant update draft is built from status and category only.**
- The tenant's own words in `L07-SEC-REPORT` are immutable. Corrections go in the
  timeline as notes.
- Closing requires a cost figure or an explicit "no cost".
- The category may be changed by the landlord at any time; changing it does not rewrite
  what the tenant wrote.

> OPEN-08 — The vendor draft and the tenant status-update draft are "drafts", but the
> scope document states the assistant is used in three places only, none of which is
> either of these. Decide whether S-01 calls the assistant here or fills a fixed
> template.

> OPEN-10 — `L07-FLD-VENDOR` is free text that "remembers previously used vendors",
> which implies stored vendor records, while the entity model carries only "vendor
> assigned" on the request.

> OPEN-25 — As with L-05, the behaviour of a direct visit to this route is not stated.
