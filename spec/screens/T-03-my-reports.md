# T-03 · My reports and their status

## Meta

| | |
|---|---|
| **Route** | Not specified in the source — see `OPEN-03` |
| **Access** | Holder of the unit link. No sign-in. |
| **Purpose** | Let the tenant see that they were heard, and what has happened since. |
| **Arrives from** | `T01-LNK-MYREPORTS`, `T02-BTN-TRACK` |
| **Leads to** | T-01 |
| **Build phase** | 6 |

## Components and interactions

| ID | Type | Content · what happens |
|---|---|---|
| `T03-LST-REPORTS` | List | **Every request from this unit's current tenancy.** Each shows: number, category, date, status chip, **and the landlord's latest update if any**. |
| `T03-CHP-STATUS` | Status chip | **Received · Assigned · In progress · Done. Plain words, no internal jargon.** |
| `T03-TML-ITEM` | Timeline | Expanding a report shows its history — **reported, assigned, updated, completed — with the tenant-safe wording only** |

## States

| State | Display |
|---|---|
| Loading | Skeleton list rows |
| Empty | `You have not reported anything yet.` + **Report a problem** |
| Invalid or dead link | `This link is not valid. Please ask your landlord for your unit link.` |

## Rules

- **Current tenancy only.** A tenant never sees requests raised by whoever lived there
  before them, even though those requests stay attached to the unit.
- **Tenant-safe wording only.** The timeline shows status and category. It never shows
  the vendor's name or rate, the cost recorded, internal notes, or any other unit
  (cross-cutting §1.2).
- The status vocabulary here is the tenant mapping of the landlord's board columns:
  `New → Received`, then Assigned, In progress, Done.
- No navigation. The only way out is back to T-01.
- 48×48px minimum touch targets; expanding a row must be operable by keyboard.

> OPEN-34 — The `New → Received` mapping is implied by the two vocabularies but never
> stated. The same applies to the category label `Other` → `Something else`.

> OPEN-03 — No route is specified, and nothing links here except T-01 and T-02.
