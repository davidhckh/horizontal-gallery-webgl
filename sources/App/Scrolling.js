import App from "./App";
import EventEmitter from "./Utils/EventEmitter";
import { clamp, lerp } from "./Utils/math";

export default class Scrolling extends EventEmitter {
  constructor() {
    super();

    this.app = new App();
    this.camera = this.app.camera.instance;

    this.element = window;

    this.speed = 0.5;
    this.current = 0;
    this.target = 0;
    this.easing = 0.08;
    this.limit = 746;
    this.ratio = 100;
    this.velocity = 0;

    this.addEventListeners();
  }

  onWheel({ deltaY }) {
    //update
    if (this.app.openingPlayed === true) {
      this.target += deltaY * this.speed;
      this.trigger("update");
    }
  }

  onTouchStart(event) {
    this.isDown = true;

    this.x = event.touches ? event.touches[0].clientX : event.clientX;
    this.position = this.current;
  }

  onTouchMove(event) {
    if (!this.isDown) return;

    const x = event.touches ? event.touches[0].clientX : event.clientX;
    const distance = this.x - x;

    //update
    if (this.app.openingPlayed === true) {
      this.target = this.position + distance * 2;
      this.trigger("update");
    }
  }

  onTouchEnd(event) {
    this.isDown = false;
  }

  addEventListeners() {
    this.element.addEventListener("wheel", this.onWheel.bind(this));

    this.element.addEventListener("touchstart", this.onTouchStart.bind(this));
    this.element.addEventListener("touchmove", this.onTouchMove.bind(this));
    this.element.addEventListener("touchend", this.onTouchEnd.bind(this));

    this.element.addEventListener("mousedown", this.onTouchStart.bind(this));
    this.element.addEventListener("mousemove", this.onTouchMove.bind(this));
    this.element.addEventListener("mouseup", this.onTouchEnd.bind(this));
    window.oncontextmenu = this.onTouchEnd.bind(this);
  }

  update() {
    if (this.app.openingPlayed === true) {
      this.target = clamp(this.target, 0, this.limit);
      this.current = lerp(this.current, this.target, this.easing);

      //animations
      this.velocity = this.current - this.target;
      this.camera.position.x = this.current / this.ratio;
    }
  }
}
