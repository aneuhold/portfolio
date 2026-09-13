/**
 * Stands in for `window.matchMedia`, which jsdom lacks and GSAP calls as soon as ScrollTrigger
 * registers. No query matches, so the timeline runs no animation under test.
 *
 * @param media The media query being asked about.
 */
window.matchMedia = (media: string): MediaQueryList => ({
  matches: false,
  media,
  onchange: null,
  addListener: () => undefined,
  removeListener: () => undefined,
  addEventListener: () => undefined,
  removeEventListener: () => undefined,
  dispatchEvent: () => false
});
