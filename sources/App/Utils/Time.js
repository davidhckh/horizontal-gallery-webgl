import EventEmitter from "./EventEmitter.js";

export default class Time extends EventEmitter {
  constructor() {
    super();

    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16;

    /**Tick on next animation frame */
    window.requestAnimationFrame(() => {
      this.tick();
    });
  }

  tick() {
    /**Update time */
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    /**Trigger event Emitter */
    this.trigger("tick");

    /**Continue ticking on next animation frame*/
    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}
