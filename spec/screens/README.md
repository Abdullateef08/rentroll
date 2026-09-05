# Screen specifications

One file per screen, panel, shared component and print view. Every file follows the
same six sections, from the source document's own convention:

1. **Meta** — route, who can reach it, why it exists, where users arrive from and leave to
2. **Layout** — the regions of the screen, top to bottom
3. **Components** — every element with its ID and content
4. **Interactions** — what happens on every click, in order
5. **States** — loading, empty, error, and any state-specific display
6. **Rules** — validation, permissions, edge cases

Read [`../cross-cutting.md`](../cross-cutting.md) before building any of them.

## Landlord · signed in

| ID | Screen | File |
|---|---|---|
| L-01 | Sign in | [L-01-sign-in.md](L-01-sign-in.md) |
| L-02 | First-run setup | [L-02-first-run-setup.md](L-02-first-run-setup.md) |
| L-03 | Portfolio dashboard | [L-03-portfolio-dashboard.md](L-03-portfolio-dashboard.md) |
| L-04 | Rent due board | [L-04-rent-due-board.md](L-04-rent-due-board.md) |
| L-05 | Rent detail panel | [L-05-rent-detail-panel.md](L-05-rent-detail-panel.md) |
| L-06 | Maintenance board | [L-06-maintenance-board.md](L-06-maintenance-board.md) |
| L-07 | Request detail panel | [L-07-request-detail-panel.md](L-07-request-detail-panel.md) |
| L-08 | Unit register | [L-08-unit-register.md](L-08-unit-register.md) |
| L-09 | Unit detail | [L-09-unit-detail.md](L-09-unit-detail.md) |
| L-10 | Tenant list | [L-10-tenant-list.md](L-10-tenant-list.md) |
| L-11 | Tenant detail | [L-11-tenant-detail.md](L-11-tenant-detail.md) |
| L-12 | Agreement tracker | [L-12-agreement-tracker.md](L-12-agreement-tracker.md) |
| L-13 | Deposit and settlement | [L-13-deposit-settlement.md](L-13-deposit-settlement.md) |
| L-14 | Documents and exports | [L-14-documents-exports.md](L-14-documents-exports.md) |
| L-15 | Settings | [L-15-settings.md](L-15-settings.md) |

## Tenant · link only

| ID | Screen | File |
|---|---|---|
| T-01 | Report a problem | [T-01-report-a-problem.md](T-01-report-a-problem.md) |
| T-02 | Submitted confirmation | [T-02-submitted-confirmation.md](T-02-submitted-confirmation.md) |
| T-03 | My reports | [T-03-my-reports.md](T-03-my-reports.md) |
| T-04 | My unit | [T-04-my-unit.md](T-04-my-unit.md) |
| T-05 | My receipts | [T-05-my-receipts.md](T-05-my-receipts.md) |

## Shared components

| ID | Component | File |
|---|---|---|
| S-01 | Message composer | [S-01-message-composer.md](S-01-message-composer.md) |
| S-02 | Payment sheet | [S-02-payment-sheet.md](S-02-payment-sheet.md) |
| S-03 | Share and copy menu | [S-03-share-copy-menu.md](S-03-share-copy-menu.md) |
| S-04 | Photo uploader | [S-04-photo-uploader.md](S-04-photo-uploader.md) |

## Print views

| ID | View | File |
|---|---|---|
| P-01 | Rent receipt | [P-01-rent-receipt.md](P-01-rent-receipt.md) |
| P-02 | Settlement statement | [P-02-settlement-statement.md](P-02-settlement-statement.md) |
| P-03 | Door QR card | [P-03-door-qr-card.md](P-03-door-qr-card.md) |
