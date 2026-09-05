# T-04 · My unit and landlord contact

## Meta

| | |
|---|---|
| **Route** | Not specified in the source — see `OPEN-03` |
| **Access** | Holder of the unit link. No sign-in. |
| **Purpose** | Tell the tenant which unit this link belongs to, when their agreement runs, and how to reach the landlord. |
| **Arrives from** | Nothing specified — see `OPEN-03` |
| **Leads to** | A phone call, WhatsApp |
| **Build phase** | 6 |

## Components and interactions

| ID | Type | Content · what happens |
|---|---|---|
| `T04-SEC-UNIT` | Info block | Unit, property, landlord's name. Agreement start and end dates. **No rent figure.** |
| `T04-BTN-CALL` | Primary button | **Calls the landlord** |
| `T04-BTN-MESSAGE` | Secondary button | **Opens WhatsApp to the landlord with a blank message** |

## States

| State | Display |
|---|---|
| Loading | Skeleton block |
| Invalid or dead link | `This link is not valid. Please ask your landlord for your unit link.` |

## Rules

- **T-04 shows agreement dates but not rent.** The reasoning from the source: *the tenant
  knows their own rent; the app does not need to state it, and any screen that displays a
  money figure is one refactor away from displaying the wrong one.*
- Nothing about deposits, dues, repair costs, other units or other tenants
  (cross-cutting §1.2, §5 test 4).
- `T04-BTN-MESSAGE` opens WhatsApp with a **blank** message — this is the one hand-off in
  the product where no draft is prepared, because the tenant is the author.
- The call button exists so the tenant can reach the landlord **without saving their
  number** (connection 5).
- No navigation. 48×48px minimum touch targets.

> OPEN-03 — No route is specified and no screen links here. As specified, a tenant
> cannot reach T-04 at all.
