# L-01 · Sign in

## Meta

| | |
|---|---|
| **Route** | `/signin` · also `/signup`, `/reset` |
| **Access** | Public. A signed-in user hitting this route is redirected to L-03. |
| **Purpose** | Get the landlord in with the least friction. **This screen is not a marketing page.** |
| **Arrives from** | Direct visit; redirect from any landlord route while signed out |
| **Leads to** | L-02 if no properties exist yet, otherwise L-03 |
| **Build phase** | 1 |

## Layout

Single centred card on `canvas`. Logo, heading, form, links. Nothing else — no
feature list, no testimonials, no marketing copy.

## Components

| ID | Type | Content and behaviour |
|---|---|---|
| `L01-FLD-EMAIL` | Text field | Label "Email". **Autofocus on desktop only.** |
| `L01-FLD-PASS` | Text field | Label "Password". Show/hide toggle on the right. |
| `L01-BTN-SIGNIN` | Primary button | "Sign in". Full width. |
| `L01-LNK-RESET` | Link | "Forgot password" |
| `L01-LNK-SIGNUP` | Link | "Create an account" |

## Interactions

| Trigger | Result |
|---|---|
| `L01-BTN-SIGNIN` | Validate both fields are filled → button shows spinner → on success route to L-02 or L-03 → on failure show a single inline error above the form: `Email or password is incorrect.` **Never say which one is wrong.** |
| Enter key in either field | Same as pressing `L01-BTN-SIGNIN` |
| `L01-LNK-RESET` | Route to `/reset`. Sending a reset **always shows the same confirmation whether or not the email exists.** |
| `L01-LNK-SIGNUP` | Route to `/signup` |

## States

| State | Display |
|---|---|
| Submitting | Spinner inside `L01-BTN-SIGNIN`; button non-interactive; fields stay readable |
| Failed sign-in | One inline error above the form, wording as above |
| Throttled | After five failed attempts, a 30-second delay, stated plainly to the user |
| Already signed in | Redirect to L-03 without rendering |

## Rules

- Password minimum **8 characters** on sign-up, with strength shown as **a single word,
  not a bar**.
- After **five failed attempts**, add a **30-second delay** and say so plainly.
- Session persists for **30 days on a trusted device**.
- Reaching any landlord route while signed out redirects here, and returns to the
  intended screen after signing in (cross-cutting §5, test 6).
- Never disclose whether an email address is registered — this applies to both sign-in
  failure and password reset.

> OPEN-27 — "Trusted device" is not defined: what marks a device trusted, whether the
> user opts in, and what the session length is on an untrusted one.

The routes `/signup` and `/reset` share this screen's ID. Their own field sets are not
enumerated in the source beyond the password rule above; build them as the minimum that
satisfies the rules on this page.
