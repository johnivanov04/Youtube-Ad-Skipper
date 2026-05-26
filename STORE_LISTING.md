# Chrome Web Store Listing Copy

Paste these straight into the developer dashboard fields.

---

## Short description (max 132 chars)

> Automatically dismisses skippable YouTube ads the moment YouTube's
> official Skip Ad button appears. No ad blocking.

(125 chars — fits.)

---

## Detailed description

> YouTube Auto Skip clicks past skippable YouTube ads for you, the
> instant YouTube's official Skip Ad button appears.
>
> It is intentionally minimal:
>
> • No ad blocking — ads still load and still play their mandatory
>   countdown. The extension only acts once YouTube has officially
>   marked an ad as skippable.
> • No bypassing unskippable ads — if YouTube doesn't show a skip
>   button, nothing happens.
> • No network calls, no analytics, no accounts, no data collection.
>   The extension runs entirely locally on youtube.com.
> • No new UI, no popup, no settings to configure. Install and forget.
>
> How it works: a content script watches the YouTube page for the
> appearance of the Skip Ad button. When one is visible, the
> extension ends the current ad by seeking the ad video to its end —
> the same end state as you clicking the button yourself.
>
> Source code and full technical details:
> https://github.com/johnivanov04/Youtube-Ad-Skipper

---

## Category

Productivity

---

## Permission justifications

**Host permission `https://www.youtube.com/*`:**
> Required to inject the content script that detects YouTube's
> Skip Ad button on the YouTube page. The extension does not
> access any other origin.

**No other permissions are requested.**

---

## Single purpose statement

> Detect when YouTube has shown a Skip Ad button and end the
> current ad on the user's behalf. The extension performs no
> other function.

---

## Data usage disclosure (developer dashboard checklist)

- Does it collect personally identifiable information? **No**
- Does it collect health information? **No**
- Does it collect financial / payment info? **No**
- Does it collect authentication information? **No**
- Does it collect personal communications? **No**
- Does it collect location? **No**
- Does it collect web history? **No**
- Does it collect user activity? **No**
- Does it collect website content? **No**
- "I do not sell or transfer user data to third parties." → **check**
- "I do not use or transfer user data for purposes unrelated to my
  item's single purpose." → **check**
- "I do not use or transfer user data to determine creditworthiness
  or for lending purposes." → **check**

---

## Privacy policy URL

Host `PRIVACY.md` via GitHub Pages (Settings → Pages → branch `main`
→ root), then submit:

`https://johnivanov04.github.io/Youtube-Ad-Skipper/PRIVACY`

(Or the rendered .md URL on GitHub itself if you prefer:
`https://github.com/johnivanov04/Youtube-Ad-Skipper/blob/main/PRIVACY.md`
— the Web Store accepts either.)
