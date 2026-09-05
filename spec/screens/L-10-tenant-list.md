# L-10 · Tenant list

## Meta

| | |
|---|---|
| **Route** | `/tenants` |
| **Access** | Signed in |
| **Purpose** | Contact, agreement and payment history for a person, past or present. (Shared purpose with L-11.) |
| **Arrives from** | Sidebar |
| **Leads to** | L-11 |
| **Build phase** | 2 |

## Layout

Page header · filter row · data table. Under 640px the table becomes stacked cards.

## Components and interactions

| ID | Type | Content · what happens |
|---|---|---|
| `L10-TBL-TENANTS` | Data table | Columns: **Name · Unit · Phone · Agreement ends · Status**. Row click → L-11. |
| `L10-SEG-FILTER` | Segmented choice | **Current · On notice · Past** |

The source does not name a status chip component on this screen; the Status column uses
the same vocabulary as the filter (Current · On notice · Past), rendered as a status chip
per foundations §2.3 — always with a word.

## States

| State | Display |
|---|---|
| Loading | Skeleton table rows |
| Empty | Not specified in the source empty-state table. Use the standard pattern: one line explaining what appears here plus the action that creates the first one (add a tenant from L-09, which is where tenants are created). |
| Past filter | Shows tenants whose tenancy has ended; their unit links are dead (cross-cutting §5) |

## Rules

- A tenant is created from `L09-BTN-ADDTENANT` on a vacant unit, not from this screen.
  Phase 2's acceptance criterion is "a tenant can be attached to a unit with agreement
  dates".
- **Past tenants are never deleted.** They remain reachable so their rent history and
  settlement stay auditable.
- The default filter is not specified; **Current** is the sensible default and is what
  the ordering of the segmented choice implies.
- "On notice" corresponds to the unit chip "Notice period" on L-08 and to the tenant's
  `notice status` field.

> OPEN-22 — Nothing in the specification sets `notice status`. It is displayed on L-08,
> L-10 and L-11 and filtered on here, but the only agreement-tracker control is "Record
> renewal". The scope document's "record a notice served" capability has no control.
