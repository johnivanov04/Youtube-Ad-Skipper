# YouTube Auto Skip

A minimal Chrome / Edge (Manifest V3) extension that automatically clicks
YouTube's official **Skip Ad** button as soon as it appears.

## What it does

- Watches YouTube pages for the appearance of the official "Skip Ad" button.
- The moment a skip button is visible (i.e. YouTube has officially marked
  the ad as skippable), it ends the ad by seeking the ad video to its end
  — the same end state as you clicking the button.
- Runs entirely locally — no network calls, no tracking, no permissions
  beyond running a content script on `https://www.youtube.com/*`.

## Why seek instead of click?

Chrome refuses to count JavaScript-dispatched click events as real user
input (`event.isTrusted` is always `false` for synthetic events). YouTube
gates its skip handler on a genuine user gesture, so a content script
click "fires" but does nothing. Seeking the ad `<video>` to its end is
the reliable equivalent: it triggers YouTube's normal end-of-ad flow.
The extension only does this when a skip button is already visible, so
it never affects unskippable ads.

## What it does NOT do

- It does **not** block ads.
- It does **not** bypass unskippable ads.
- It does **not** modify YouTube's player or interfere with playback.
- It does **not** click anything other than the official skip button.

In other words: it does exactly what you would do with your mouse, just
faster.

## Install locally

1. Open `chrome://extensions` in Chrome (or `edge://extensions` in Edge).
2. Toggle **Developer mode** on (top-right).
3. Click **Load unpacked**.
4. Select the `youtube-auto-skip` folder (the one containing
   `manifest.json`).

The extension should appear in your list as **YouTube Auto Skip**.

## Test it

1. Open any YouTube video that you know plays a pre-roll or mid-roll ad
   (channels with monetized content are a safe bet).
2. Open DevTools (`Cmd+Option+I` on macOS, `F12` on Windows) and switch to
   the **Console** tab.
3. When a skippable ad plays, the extension will click the Skip Ad button
   the instant it becomes available and log:
   ```
   [YouTube Auto Skip] Skip Ad button clicked.
   ```
4. Unskippable ads (no skip button) will play through normally — that's
   intentional.

## Notes / maintenance

YouTube changes its HTML and CSS class names from time to time. If skips
stop working, the selectors in `content.js` (e.g. `.ytp-ad-skip-button`,
`.ytp-ad-skip-button-modern`) may need to be updated. The script also has
a text/aria-label fallback that looks for any visible button labeled
"skip" inside the ad module, which makes it somewhat resilient to those
changes.
