// YouTube Auto Skip
// When YouTube shows a "Skip Ad" button (i.e. the ad is officially
// skippable), this script ends the ad by seeking the ad video to its end.
//
// Why not just click the button? Chrome refuses to count synthetic
// click events as user gestures (event.isTrusted is always false for
// JS-dispatched events), and YouTube's skip handler is gated on a real
// user gesture. So content-script clicks "fire" but produce no effect.
// Seeking the ad <video> reaches the same end state — the ad ends and
// the main video resumes — without bypassing or blocking anything:
// we only act when YouTube has already decided the ad is skippable.

(() => {
  "use strict";

  // Class names YouTube has used for the skip button. We don't click
  // these — we just use their presence as the signal that the current
  // ad is skippable.
  const SKIP_SELECTORS = [
    ".ytp-skip-ad-button",
    ".ytp-ad-skip-button-modern",
    ".ytp-ad-skip-button"
  ];

  // Track which ad video src we've already skipped, so each ad in a
  // multi-ad pod ("Ad 1 of 2") gets skipped exactly once instead of
  // being throttled by a wall-clock cooldown.
  let lastSkippedSrc = null;

  // True when an element is rendered and occupies space on screen.
  function isVisible(element) {
    if (!element || !(element instanceof Element)) return false;

    const style = window.getComputedStyle(element);
    if (
      style.display === "none" ||
      style.visibility === "hidden" ||
      style.opacity === "0"
    ) {
      return false;
    }

    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  // True if the element's text or aria-label hints that it's a skip control.
  function looksLikeSkip(element) {
    const aria = (element.getAttribute("aria-label") || "").toLowerCase();
    const text = (element.textContent || "").toLowerCase();
    return aria.includes("skip");
    // Note: we intentionally do NOT match text==="skip" alone, because
    // the "Skip" text appears during the pre-roll countdown too. The
    // aria-label is only set once the button is actually clickable.
    // (We keep `text` extraction for future tweaks if needed.)
  }

  // Find a visible skip button if one exists right now.
  function findSkipButton() {
    for (const selector of SKIP_SELECTORS) {
      for (const el of document.querySelectorAll(selector)) {
        if (isVisible(el)) return el;
      }
    }

    const adModule = document.querySelector(".video-ads, .ytp-ad-module");
    const scope = adModule || document;
    for (const btn of scope.querySelectorAll('button, [role="button"]')) {
      if (isVisible(btn) && looksLikeSkip(btn)) return btn;
    }
    return null;
  }

  // Returns the currently-playing ad <video> element, or null.
  // YouTube reuses the same <video> tag for ads and main content, but
  // the .ad-showing class is added to the player container while an
  // ad is on screen.
  function getAdVideo() {
    const player = document.querySelector(
      ".html5-video-player.ad-showing, .html5-video-player.ad-interrupting"
    );
    if (!player) return null;
    return player.querySelector("video.html5-main-video, video");
  }

  // Seek the ad video to its end. YouTube treats this as "ad finished"
  // and either starts the next ad in the pod or resumes the main video.
  function trySkipAd() {
    const skipButton = findSkipButton();
    if (!skipButton) return;

    const video = getAdVideo();
    if (!video || !isFinite(video.duration) || video.duration <= 0) return;

    // Skip each ad video at most once. In a multi-ad pod, YouTube loads
    // ad 2 with a different src, so this naturally re-arms for it.
    const src = video.currentSrc || video.src || "";
    if (src && src === lastSkippedSrc) return;
    lastSkippedSrc = src;

    video.currentTime = Math.max(video.currentTime, video.duration - 0.1);
    console.log("[YouTube Auto Skip] Skipped ad by seeking to end.");
  }

  function startObserver() {
    const observer = new MutationObserver(() => trySkipAd());
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "style", "aria-hidden"]
    });

    // Safety net for missed mutations (backgrounded tabs, shadow DOM, etc.).
    setInterval(trySkipAd, 1000);

    trySkipAd();
  }

  if (document.body) {
    startObserver();
  } else {
    document.addEventListener("DOMContentLoaded", startObserver, { once: true });
  }
})();
