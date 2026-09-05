# L-11 · Tenant detail

## Meta

| | |
|---|---|
| **Route** | `/tenants/:tenantId` |
| **Access** | Signed in |
| **Purpose** | Contact, agreement and payment history for a person, past or present. |
| **Arrives from** | `L10-TBL-TENANTS` row click |
| **Leads to** | L-13 (via End tenancy), the email composer, S-01, S-02 |
| **Build phase** | 2 |

## Components and interactions

| ID | Type | Content · what happens |
|---|---|---|
| `L11-SEC-CONTACT` | Contact block | Phone with **call, message and copy** buttons; email with a **mail button if present** |
| `L11-SEC-AGREEMENT` | Key-value block | Start, end, rent, deposit paid, notice status, **with a countdown when within 90 days** |
| `L11-SEC-PAYMENTS` | Table | Every rent entry for this tenant, **with a paid-on-time percentage at the top** |
| `L11-SEC-DOCS` | File list | Agreement, ID proof, anything else uploaded. **Each with download and share.** |
| `L11-BTN-ENDTENANCY` | Danger button | "End tenancy" → **confirm dialog** → **routes to L-13 with this tenant selected** |
| `L11-BTN-SENDAGREEMENT` | Quiet button | Opens the **email composer** with the agreement referenced. Helper text: `Attach the file after your email app opens.` |

## Interactions

| Trigger | Result |
|---|---|
| Call button | Dials; on return to the tab, offers to log the call (cross-cutting §7, connection 5) |
| Message button | Opens S-01 addressed to this tenant |
| Copy button | Copies the phone number, `Copied.` toast |
| Mail button | Opens the email app with the address filled |
| `L11-BTN-ENDTENANCY` | Confirm dialog whose action button says "End tenancy" → routes to L-13 with this tenant selected |
| `L11-BTN-SENDAGREEMENT` | Email composer, subject and body ready, file **not** attachable programmatically — helper text explains |
| Document download / share | Standard S-03 behaviour |

## States

| State | Display |
|---|---|
| Loading | Skeleton blocks |
| Current tenant | Full actions available |
| Past tenant | Read-only history; End tenancy no longer applies |
| Agreement within 90 days | Countdown shown in `L11-SEC-AGREEMENT` |
| No email on record | The mail button and `S01-BTN-EMAIL` are absent, not disabled |
| No documents | `L11-SEC-DOCS` shows an empty state offering an upload |

## Rules

- **End tenancy is destructive and irreversible in effect** — it leads to settlement,
  the unit becomes vacant, and the tenant's unit link stops working. It is a Danger
  button behind a confirm dialog whose action button says what it does.
- The paid-on-time percentage is computed from this tenant's rent entries against their
  due dates.
- Countdown appears at 90 days, matching the agreement tracker's default window.
- Email-dependent controls are **hidden when no email exists**, following S-01's rule
  ("Email instead — only when an email address exists").

> OPEN-11 — `L11-BTN-SENDAGREEMENT` references the agreement file, and connection 10
> promises "a one-page summary of an agreement" as a printable. No such print view is
> specified.

> OPEN-23 — The product scope lists "share the unit link" as a tenant-record capability;
> the control exists only on L-09.
