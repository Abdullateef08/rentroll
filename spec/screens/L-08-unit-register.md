# L-08 · Unit register

## Meta

| | |
|---|---|
| **Route** | `/units` |
| **Access** | Signed in |
| **Purpose** | The list of everything owned, and the way in to a unit's full history. |
| **Arrives from** | Sidebar, `L03-CRD-OCCUPANCY` (filtered to vacant), the L-03 no-data empty state |
| **Leads to** | L-09 · P-03 |
| **Build phase** | 2 |

## Layout

Page header with the primary action on the right · filter row · data table. Under 640px
the table becomes stacked cards.

## Components and interactions

| ID | Type | Content · what happens |
|---|---|---|
| `L08-TBL-UNITS` | Data table | Columns: **Unit · Property · Type · Rent · Current tenant · Status**. Row click → L-09. |
| `L08-CHP-STATUS` | Status chip | Occupied (`success`) · Vacant (`neutral`) · Notice period (`warning`) |
| `L08-BTN-ADDUNIT` | Primary button | "Add unit" → **inline form: property, unit number, type, rent, deposit** |
| `L08-BTN-PRINTQR` | Secondary button | "Print door QR codes" → **P-03, one card per selected unit** |
| `L08-CHK-SELECT` | Checkbox | Row selection, **enables bulk QR printing and bulk export** |

## States

| State | Display |
|---|---|
| Loading | Skeleton table rows |
| Empty | `Your properties and units live here.` + **Add your first unit** |
| Vacant filter applied | Arriving from `L03-CRD-OCCUPANCY`, the list is filtered to vacant units |
| No rows selected | `L08-BTN-PRINTQR` prints for all units, or is disabled with a tooltip — decide once and apply consistently |

## Rules

- Unit numbers must be **unique within a property** (same rule as L-02).
- A unit's reporting token is generated when the unit is created — phase 2's acceptance
  criterion is "units can be created, listed and opened; **tokens generated**".
- The token is long and random and never contains the unit number (cross-cutting §5).
- Selection state drives both bulk QR printing and bulk export.

> OPEN-04 — The add-unit form takes a **property** as an input but no screen creates a
> property after first-run setup. Either this form needs an "add new property" option or
> L-02 must be reachable again.

The "vacant" status here is the same state that makes a tenant link stop working
(cross-cutting §5, test 2): when a tenancy ends the unit becomes vacant and its former
tenant's link is dead.
