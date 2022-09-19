import { Camera } from "ogl";
import App from "./App";

export default class SceneCamera {
  constructor() {
    this.app = new App();
    this.sizes = this.app.sizes;

    this.init();
  }

  init() {
    this.instance = new Camera();
    this.instance.position.z = 3;
    this.instance.fov = 45;
  }

  resize() {
    this.instance.perspective({
      aspect: this.sizes.width / this.sizes.height
    });
  }
}
