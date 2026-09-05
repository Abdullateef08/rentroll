# L-06 · Maintenance board

## Meta

| | |
|---|---|
| **Route** | `/maintenance` |
| **Access** | Signed in |
| **Purpose** | See every reported problem, **in order of urgency**, and move it along. |
| **Arrives from** | Sidebar, `L03-ROW-ATTENTION` (requests) |
| **Leads to** | L-07 detail panel |
| **Build phase** | 3 |

## Layout

**Four status columns on desktop — New · Assigned · In progress · Done — as a board of
cards.** On mobile it becomes a **single list with a status filter**, because horizontal
scrolling boards are unusable on a phone.

```
Maintenance                                         [ Log a request ]
 [ All | Urgent | Unassigned | This property ]
──────────────────────────────────────────────────────────────────────
 NEW (2)          ASSIGNED (1)     IN PROGRESS (1)   DONE (7)
 ┌────────────┐   ┌────────────┐   ┌────────────┐   ┌────────────┐
 │ 1B         │   │ 3A         │   │ 2C         │   │ 4C         │
 │ Plumbing   │   │ Electrical │   │ Appliance  │   │ Pest       │
 │ Geyser is… │   │ Fan not…   │   │ Fridge…    │   │ Cockroach… │
 │ [Urgent] 📷│   │ [Normal]   │   │ [Normal]   │   │ [Low]      │
 │ 2 days     │   │ 5 days     │   │ 9 days     │   │ 21 days    │
 └────────────┘   └────────────┘   └────────────┘   └────────────┘
```

The New column is **always leftmost** and is the highest-priority column.

## Components

| ID | Type | Content and behaviour |
|---|---|---|
| `L06-COL-NEW` | Board column | Header shows the count. **Highest priority column, always leftmost.** |
| `L06-COL-ASSIGNED` | Board column | Header shows the count |
| `L06-COL-INPROGRESS` | Board column | Header shows the count |
| `L06-COL-DONE` | Board column | Header shows the count |
| `L06-CRD-REQUEST` | Card | Unit number · category · first line of the description · urgency chip · **photo thumbnail if present** · age in days |
| `L06-CHP-URGENCY` | Status chip | Urgent (`danger`) · Normal (`neutral`) · Low (`muted`) |
| `L06-SEG-FILTER` | Segmented choice | All · Urgent · Unassigned · This property |
| `L06-BTN-NEW` | Primary button | "Log a request" — **for problems reported by phone or in person** |

Only `L06-COL-NEW` is named in the source; the other three column IDs above follow the
same pattern and are introduced by this spec.

## Interactions

| Trigger | Result |
|---|---|
| `L06-CRD-REQUEST` | Opens L-07 |
| **Drag a card between columns** | Changes the status, **writes a timeline entry**, and shows a toast **offering to notify the tenant**. Declining the toast leaves the tenant uninformed, **which is allowed**. |
| `L06-BTN-NEW` | Opens **the same form as T-01**, with an added **unit selector** and a **"reported by" field defaulting to "phone call"** |
| `L06-SEG-FILTER` | Filters the board without a reload |

## States

| State | Display |
|---|---|
| Loading | Skeleton cards in each column |
| Empty | `No open requests. Tenants report problems through their unit link.` + **Print door QR codes** |
| Under 640px | Single list with a status filter instead of columns |
| Card ageing | New cards older than **48 hours** gain a subtle left border in `warning`. Older than **7 days**, `danger`. **No notification, just a visual.** |

## Rules

- Cards in New older than 48 hours gain a subtle left border in `warning` colour. Older
  than 7 days, `danger` colour. **No notification, just a visual.**
- **Moving a card to Done requires either a cost figure or an explicit "no cost"** — this
  is what keeps the per-unit spend meaningful. The validation lives on L-07.
- A request can be **reopened from Done**; doing so **writes a timeline entry rather than
  creating a new request**.
- The board is ordered by urgency within each column.
- Drag-and-drop must have a keyboard-operable equivalent (cross-cutting §6); the status
  dropdown on `L07-HDR` is that equivalent.

> OPEN-34 — Column names here (`New`) differ from the tenant-facing status vocabulary on
> T-03 (`Received`). The mapping is never stated.
