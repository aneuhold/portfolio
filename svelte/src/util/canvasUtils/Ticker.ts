/**
 * The number of frames per second that the ticker should tick at. This is
 * just a target and is not guaranteed if the event listener calls take a long
 * time to execute, so this could be higher to accomdate long event listeners.
 */
const FRAMES_PER_SECOND = 60;

/**
 * The options for setting up the ticker.
 */
export type TickerOptions = {
  /**
   * The time keeping technique to use for the ticker. This will default to
   * `requestAnimationFrame` if not specified.
   *
   * `requestAnimationFrame` has the benefit of being able to pause when the
   * user switches tabs.
   */
  tickerTechnique?: TickerTechnique;
};

export type TickerTechnique = 'setTimeout' | 'requestAnimationFrame' | 'setInterval';

/**
 * A ticker that ticks at a constant rate and can be subscribed to for
 * proceeding through animations.
 */
export default class Ticker {
  private eventListeners: Array<() => void> = [];
  private msToPassBetweenFrames = 1000 / FRAMES_PER_SECOND;
  private tickerTechnique: TickerTechnique;
  /**
   * The timestamp of the previous frame. This is only used if the technique is
   * `requestAnimationFrame`.
   */
  private previousTimeStamp: DOMHighResTimeStamp = performance.now();

  constructor(options: TickerOptions = {}) {
    this.tickerTechnique = options.tickerTechnique || 'requestAnimationFrame';
    this.start();
  }

  subscribe(listener: () => void) {
    this.eventListeners.push(listener);
  }

  /**
   * Starts the ticker.
   */
  private start() {
    switch (this.tickerTechnique) {
      case 'setTimeout':
        this.continueSetTimeout();
        break;
      case 'requestAnimationFrame':
        requestAnimationFrame((timeStamp) => this.continueRequestAnimationFrame(timeStamp));
        break;
      case 'setInterval':
        setInterval(() => {
          this.eventListeners.forEach((listener) => listener());
        }, this.msToPassBetweenFrames);
        break;
    }
  }

  private continueSetTimeout() {
    this.eventListeners.forEach((listener) => listener());
    setTimeout(() => {
      this.continueSetTimeout();
    }, this.msToPassBetweenFrames);
  }

  private continueRequestAnimationFrame(timeStamp: DOMHighResTimeStamp) {
    if (timeStamp - this.previousTimeStamp >= this.msToPassBetweenFrames) {
      this.eventListeners.forEach((listener) => listener());
      // Update the previous timestamp after the event listeners have been
      // called.
      this.previousTimeStamp = timeStamp;
    }
    requestAnimationFrame((timeStamp) => this.continueRequestAnimationFrame(timeStamp));
  }
}
