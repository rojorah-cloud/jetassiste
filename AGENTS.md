# Project rules

- Keep audit input validation in a browser-safe schema module shared by the server function and its tests, so validation can be tested without sending email.
- Scope the coach landing CSS and client DOM queries to `.coachs-page`; restore any document scrolling overrides on unmount so preserved routes retain their design.
- Keep the coach questionnaire client-side with browser-safe identity validation; its summary is shared manually and must not call the audit email function.