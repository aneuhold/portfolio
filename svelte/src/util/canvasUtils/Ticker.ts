/**
 * The number of frames per second that the ticker should tick at. This is
 * just a target and is not guaranteed if the event listener calls take a long
 * time to execute, so this could be higher to accomdate long event listeners.
 */
const FRAMES_PER_SECOND = 60;

/**
 * TODO: This still needs to be setup. Was working on also adding in WebGL.
 */
export type TickerOptions = {
  /**
   * Whether or not to use setTimeout instead of requestAnimationFrame. This
   * should be true if the event listeners take a long time to execute.
   */
  useSetTimeout?: boolean;
};

/**
 * A ticker that ticks at a constant rate and can be subscribed to for
 * proceeding through animations.
 */
export default class Ticker {
  private eventListeners: Array<() => void> = [];
  private msToPassBetweenFrames = 1000 / FRAMES_PER_SECOND;

  constructor() {
    this.start();
  }

  subscribe(listener: () => void) {
    this.eventListeners.push(listener);
  }

  /**
   * Starts the ticker.
   */
  private start() {
    this.continue();
  }

  /**
   * Recursively calls itself to continue the ticker.
   */
  private continue() {
    this.eventListeners.forEach((listener) => listener());
    setTimeout(() => {
      this.continue();
    }, this.msToPassBetweenFrames);
  }
}
