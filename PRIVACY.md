# Privacy Policy — YouTube Auto Skip

_Last updated: 2026-05-26_

YouTube Auto Skip is a Chrome / Edge extension that watches the current
YouTube page for the appearance of YouTube's official "Skip Ad" button
and, when one is present, ends the current ad by seeking the ad video to
its end.

## What data the extension collects

**None.** YouTube Auto Skip does not collect, store, transmit, sell, or
share any user data. There are no analytics, no telemetry, no remote
servers, no accounts, and no third-party SDKs.

## What the extension accesses

The extension runs a single content script that is only injected on
`https://www.youtube.com/*`. The script reads the YouTube page's DOM
locally in your browser in order to detect the Skip Ad button. It does
not make network requests, does not access any other site, and does not
read or modify content outside of the YouTube tab in which it is
running.

## Permissions

The extension declares no `permissions` and no `host_permissions`
beyond the `https://www.youtube.com/*` match pattern required to run
the content script.

## Contact

For questions or issues, open an issue at
https://github.com/johnivanov04/Youtube-Ad-Skipper/issues
