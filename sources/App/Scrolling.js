import App from "./App";
import { clamp, lerp } from "./Utils/math";

export default class Scrolling {
  constructor() {
    this.app = new App();
    this.camera = this.app.camera.instance;

    this.trigger = window;

    this.speed = 0.5;
    this.current = 0;
    this.target = 0;
    this.easing = 0.08;
    this.limit = 746;
    this.ratio = 100;

    this.addEventListeners();
  }

  onWheel({ deltaY }) {
    this.target += deltaY * this.speed;
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

    this.target = this.position + distance * 2;
  }

  onTouchEnd(event) {
    this.isDown = false;
  }

  addEventListeners() {
    this.trigger.addEventListener("wheel", this.onWheel.bind(this));

    this.trigger.addEventListener("touchstart", this.onTouchStart.bind(this));
    this.trigger.addEventListener("touchmove", this.onTouchMove.bind(this));
    this.trigger.addEventListener("touchend", this.onTouchEnd.bind(this));

    this.trigger.addEventListener("mousedown", this.onTouchStart.bind(this));
    this.trigger.addEventListener("mousemove", this.onTouchMove.bind(this));
    this.trigger.addEventListener("mouseup", this.onTouchEnd.bind(this));
    window.oncontextmenu = this.onTouchEnd.bind(this);
  }

  update() {
    this.target = clamp(this.target, 0, this.limit);
    this.current = lerp(this.current, this.target, this.easing);
    this.velocity = this.current - this.target;

    this.camera.position.x = this.current / this.ratio;
  }
}
