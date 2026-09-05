# L-14 · Documents and exports

## Meta

| | |
|---|---|
| **Route** | `/documents` — inferred from the sidebar label; the source gives no route (`OPEN-25`) |
| **Access** | Signed in |
| **Purpose** | Every file the business has produced, and the four exports the accountant needs. |
| **Arrives from** | Sidebar |
| **Leads to** | The email composer, file downloads |
| **Build phase** | 7 |

## Components and interactions

| ID | Type | Content · what happens |
|---|---|---|
| `L14-TBL-DOCS` | Data table | **Every uploaded file: type, what it belongs to, uploaded on.** Download, share, delete. |
| `L14-BTN-EXPORT-*` | Buttons | **Four exports: rent ledger · maintenance spend · tenant list · deposit register. Each with a date range picker.** |
| `L14-BTN-EMAILCA` | Secondary button | Opens the email composer addressed to **the saved accountant address** (`L15-FLD-CAEMAIL`), subject `Rental records — FY 2025-26`, body listing what is attached. **Helper text reminds the landlord to attach the downloaded file.** |

Concrete IDs for the four exports:

| ID | Export |
|---|---|
| `L14-BTN-EXPORT-RENT` | Rent ledger |
| `L14-BTN-EXPORT-MAINT` | Maintenance spend |
| `L14-BTN-EXPORT-TENANTS` | Tenant list |
| `L14-BTN-EXPORT-DEPOSITS` | Deposit register |

## States

| State | Display |
|---|---|
| Loading | Skeleton table rows |
| Empty | Not specified in the source empty-state table. Use the standard pattern: one line naming what appears here, plus no action (files arrive from other screens). |
| Export running | Spinner inside the button only |
| Export ready | Toast `Downloaded <filename>` |
| No accountant email saved | `L14-BTN-EMAILCA` prompts for it with a link to L-15, mirroring S-02's missing-UPI behaviour |

## Rules

- Documents are created elsewhere — agreements and ID proofs on L-11, condition and
  repair photos on L-09 and L-07, receipts on L-04, settlement statements on L-13. This
  screen is the single place they can all be found, downloaded, shared and deleted.
- **Deleting a document is destructive** and sits behind a confirm dialog whose action
  button says what it does (foundations §2.3).
- **All four CSVs must open correctly in Excel with the rupee symbol intact** — this is
  the phase-7 acceptance criterion. Write a UTF-8 BOM.
- Each export respects its date range picker; the rent-board export
  (`L04-BTN-EXPORT`) is a different, filter-scoped export and keeps its own filename
  convention.
- The email hand-off cannot pre-attach a file; the helper text carries that limitation
  honestly rather than the app pretending otherwise.

Document types, from the entity model: agreement · ID proof · photo · receipt ·
statement.

> OPEN-30 — Receipts are documents belonging to the landlord, yet the tenant can open
> P-01 for their own receipts from T-05. The authorisation rule that distinguishes those
> two paths is not specified.

Settings values that this screen reads are specified in [L-15](L-15-settings.md).
