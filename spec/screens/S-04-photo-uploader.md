# S-04 · Photo uploader

## Meta

| | |
|---|---|
| **Type** | Form component |
| **Used on** | T-01 (up to 3), L-07 after-photos, L-09 condition photos, L-13 deduction photos, `L15-UPL-LOGO` |
| **Purpose** | Get a photo off a phone and into the record fast enough that people actually do it. |
| **Build phase** | 3 |

## Components

| ID | Type | Content · what happens |
|---|---|---|
| `S04-ZONE` | Drop zone | **Tap to choose or take a photo; drag and drop on desktop. Camera opens directly on mobile.** |
| `S04-THUMB` | Thumbnail | **Shows immediately from the local file while the upload runs, with a progress ring.** Tap to enlarge, **X to remove**. |
| `S04-ERR` | Inline error | `That file is too large` or `That file type is not supported` — **on the thumbnail, not as a popup** |

## Rules

- **Images are compressed on the device before upload. A 6MB phone photo should leave as
  roughly 400KB.**
- **Maximum 3 photos on tenant screens, 10 on landlord screens.**
- **Upload continues if the user scrolls.**
- **Submitting while an upload is in progress waits for it**, with the button showing
  `Uploading photo…`.
- Errors appear on the offending thumbnail, never as a popup, and never blame the user.
- Thumbnails carry **meaningful alternative text, not the file name** (cross-cutting §6).
- Phase-3 acceptance: **a 6MB photo uploads in under 5 seconds on a normal connection.**

## States

| State | Display |
|---|---|
| Empty | The drop zone with its prompt; on T-01 it is optional but **visually encouraged** |
| Uploading | Local thumbnail with a progress ring over it |
| Uploaded | Thumbnail with an X to remove |
| Too large / wrong type | `S04-ERR` on that thumbnail |
| At the limit | The add affordance is disabled with a tooltip explaining the limit (foundations §2.1) |
| Submission attempted mid-upload | Submit button reads `Uploading photo…` and waits |

## Why this component matters

Photos are the evidence the settlement feature runs on. **Units with move-in photos
attached** is a tracked success measure, with the note: *if this is low, the settlement
feature is decorative.* On the tenant side, a photo is what makes a reported problem
actionable without a phone call. Anything that adds friction here costs the product more
than it looks.
