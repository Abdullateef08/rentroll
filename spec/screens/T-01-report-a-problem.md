# T-01 · Report a problem

**The tenant's entry point.** Everything about the tenant side is judged here.

> **Design brief for the whole tenant section.** The tenant is on a phone, possibly
> annoyed, has never seen this before, and will not read instructions. There is no
> sign-in, no menu and no way to reach anything that is not theirs. **If any screen here
> takes more than two minutes, they will phone the landlord instead and the product has
> failed.**

## Meta

| | |
|---|---|
| **Route** | `/u/:unitToken` — **one unguessable token per unit, not the unit number** |
| **Access** | Anyone holding the link. **No sign-in.** |
| **Purpose** | Capture a problem with enough detail to act on, **in under two minutes**. |
| **Arrives from** | A saved link, a WhatsApp welcome message, the door QR sticker (P-03) |
| **Leads to** | T-02 · T-03 |
| **Build phase** | 3 |

## Layout

**Single column, one screen scroll.** Header identifying the unit so the tenant knows
they have the right link. Form. Submit. **Below the fold, a link to their earlier
reports.**

```
 Kulkarni Apartments                    T01-HDR
 Flat 2A
────────────────────────────────────────
 WHAT IS THE PROBLEM?
 [ Plumbing                       ▾ ]   T01-SEL-CATEGORY
 DESCRIBE IT
 [ Geyser is leaking from the      ]    T01-FLD-DESC
 [ bottom...                       ]
 ADD A PHOTO
 [ + Photo ]                            T01-UPL-PHOTO
 HOW URGENT?
 [ Low | Normal | Urgent ]              T01-SEG-URGENCY
 YOUR NAME
 [ M. Desai                        ]    T01-FLD-NAME
 YOUR PHONE
 [ +91 98xxx xxxxx                 ]    T01-FLD-PHONE
────────────────────────────────────────
 [          Submit               ]      T01-BTN-SUBMIT  (sticky, 48px)
 My earlier reports (2)                 T01-LNK-MYREPORTS
 Call the landlord                      T01-BTN-CALL
```

Mobile-first. **Minimum touch target 48×48px.** Buttons are 48px tall on tenant screens.

## Components

| ID | Type | Content and behaviour |
|---|---|---|
| `T01-HDR` | Header | **Landlord's name or logo · "Flat 2A, Kulkarni Apartments" · nothing else** |
| `T01-SEL-CATEGORY` | Dropdown | "What is the problem?" — Plumbing · Electrical · Appliance · Structural · Pest · Cleaning · **Something else**. **Required.** |
| `T01-FLD-DESC` | Text area | "Describe it" — placeholder: `Geyser is leaking from the bottom since yesterday.` **Required, minimum 10 characters.** |
| `T01-UPL-PHOTO` | Photo uploader | "Add a photo" — **up to 3**. Optional but **visually encouraged**. See S-04. |
| `T01-SEG-URGENCY` | Segmented choice | "How urgent?" — Low · Normal · Urgent. **Defaults to Normal.** |
| `T01-FLD-NAME` | Text field | **Pre-filled from the tenancy record, editable in case a family member is reporting** |
| `T01-FLD-PHONE` | Phone field | Pre-filled, editable |
| `T01-BTN-SUBMIT` | Primary button | "Submit" — **full width, 48px tall, sticky at the bottom of the viewport on mobile** |
| `T01-LNK-MYREPORTS` | Link | "My earlier reports (2)" → T-03. **Hidden when there are none.** |
| `T01-BTN-CALL` | Quiet button | "Call the landlord" — **always visible, below the form. Some things need a phone call.** |

## Interactions

| Trigger | Result |
|---|---|
| `T01-BTN-SUBMIT` | Validate → button shows spinner → request is created → **the assistant assigns a suggested category and urgency in the background** → route to T-02. **If the assistant is slow or unavailable, the request is still created with the tenant's own choices; nothing waits on it.** |
| **Validation failure** | **Scroll to the first invalid field, show the error under it. Never a summary at the top, never a popup.** |
| `T01-BTN-CALL` | Dials the landlord's number |
| `T01-LNK-MYREPORTS` | Routes to T-03 |
| Photo added | S-04 behaviour; submitting while an upload runs waits for it with the button reading `Uploading photo…` |

## States and rules

| State | Display |
|---|---|
| **Invalid or unknown token** | `This link is not valid. Please ask your landlord for your unit link.` **Nothing else — no hints about what a valid link looks like.** |
| **Unit is vacant** | **Same message as above.** A former tenant's link stops working when the tenancy ends. |
| **Submitting** | Button spinner, form fields disabled, **no full-screen overlay** |
| **Submission failed** | Inline error above the button: `Could not submit. Please try again.` **The form keeps everything typed, including the photo.** |
| **Offline** | A banner appears: `You are offline. Your report will be sent when you reconnect.` **The form remains usable.** |
| Rate limited | Plain message; see below |

### Rules

- **The token is long and random. Unit numbers are never used in the URL, because
  `/u/2A` would let anyone guess `/u/2B`.**
- **Rate limit: 5 submissions per token per hour**, with a plain message if exceeded.
- **A bot check runs invisibly. A tenant should never see a puzzle.**
- The assistant's category and urgency suggestions **overwrite nothing the tenant chose**
  on this screen; they populate `L07-SEL-CATEGORY` for the landlord to confirm.
- **No money, no other units, no other tenants** appear here or in the data behind it
  (cross-cutting §1.2, §5).
- No navigation of any kind. The only links out are T-03 and the phone call.

> OPEN-20 — The offline banner here reads "Your report will be sent when you reconnect",
> while the message catalogue gives `You are offline. We will save this when you
> reconnect.` for the same situation.

> OPEN-33 — "Will be sent when you reconnect" promises a queued submission that survives
> the offline period. No storage mechanism, retry policy or expiry is specified, and it
> interacts with the rate limit.

> OPEN-31 — The invisible bot check names no mechanism, and "never a puzzle" rules out
> an interactive fallback.
