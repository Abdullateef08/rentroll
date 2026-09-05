# L-02 · First-run setup

## Meta

| | |
|---|---|
| **Route** | `/setup` |
| **Access** | Signed in, **and only while the account has no property**. Cannot be revisited afterwards. |
| **Purpose** | Get one property, one unit and the landlord's payment details in, so the dashboard is not empty on first sight. |
| **Arrives from** | L-01 after sign-in or sign-up, when no property exists |
| **Leads to** | L-03 |
| **Build phase** | 2 (after L-08/L-09 and L-10/L-11, so the underlying forms already exist) |

## Layout

**Three steps on one scrolling page, not a wizard with hidden steps.** A progress line
at the top shows all three at once. Every step can be skipped except the first.

```
[ 1 Property ]───[ 2 Units ]───[ 3 Payment details ]      progress line, all visible

Step 1 · Your property
  L02-FLD-PROPNAME
  L02-FLD-PROPADDR

Step 2 · Your units
  L02-FLD-UNITCOUNT
  L02-TBL-UNITS

Step 3 · How you get paid
  L02-FLD-UPI
  L02-FLD-BIZNAME

                                            [ L02-BTN-FINISH ]
```

## Components

| ID | Type | Content and behaviour |
|---|---|---|
| `L02-FLD-PROPNAME` | Text field | "Property name" — e.g. Kulkarni Apartments. **Required.** |
| `L02-FLD-PROPADDR` | Text area | "Address". **Required.** Used later by the Maps link. |
| `L02-FLD-UNITCOUNT` | Text field | "How many units?" Numeric. Generates that many blank unit rows to fill in. |
| `L02-TBL-UNITS` | Editable table | Columns: unit number · type · monthly rent · deposit. Add row and remove row available. |
| `L02-FLD-UPI` | Text field | "Your UPI ID" — helper text: `This appears on payment links and QR codes sent to tenants.` |
| `L02-FLD-BIZNAME` | Text field | "Name to show on receipts". Defaults to the account name. |
| `L02-BTN-FINISH` | Primary button | "Go to my dashboard" |

## Interactions

| Trigger | Result |
|---|---|
| `L02-FLD-UNITCOUNT` changes | `L02-TBL-UNITS` grows or shrinks to that many blank rows. Rows already filled are preserved when growing. |
| Add row / remove row in `L02-TBL-UNITS` | Adjusts the table without changing `L02-FLD-UNITCOUNT` semantics |
| Duplicate unit number entered | Inline error **on the offending row only** |
| `L02-BTN-FINISH` | Saves the property, its units and the payment details → routes to L-03 |

## States

| State | Display |
|---|---|
| Default | Step 1 fields empty and focused; steps 2 and 3 visible below |
| Saving | Spinner in `L02-BTN-FINISH`; page stays usable |
| Save failure | `Could not save. Your changes are still here — try again.` inline above the form |

## Rules

- **Unit numbers must be unique within a property.** Duplicates show an inline error on
  the offending row only.
- **UPI ID is validated for shape (`name@handle`) but not verified.** Helper text says it
  can be added later.
- **Skipping the UPI step is allowed**; the payment features then show a prompt to add it
  (see S-02), rather than being hidden.
- Every step can be skipped **except the first** — so a property with a name and an
  address is the minimum this screen produces.
- Once a property exists, this route is unreachable.

> OPEN-04 — Because L-02 cannot be revisited and no other screen creates a property
> (L-08 adds *units* to an existing property, and its form takes property as an input),
> a landlord who acquires a second property has no way to add it. Either L-08 needs an
> add-property path or L-02 needs to be reachable again.

> OPEN-05 — L-03 specifies a "no data at all" state, reachable "only if L-02 was
> skipped". But step 1 of L-02 cannot be skipped, and the route gate sends any
> property-less account back here. As specified, that dashboard state cannot be reached
> unless the landlord abandons setup mid-way and navigates directly to `/`.
