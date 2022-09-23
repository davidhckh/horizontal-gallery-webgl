import { Renderer } from "ogl";
import App from "./App";

export default class SceneRenderer {
  constructor() {
    this.app = new App();
    this.sizes = this.app.sizes;

    this.init();
  }

  init() {
    this.instance = new Renderer({ alpha: true, antialis: true, dpr: window.devicePixelRatio });
    this.gl = this.instance.gl;
    document.body.appendChild(this.gl.canvas);
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
  }

  update() {
    this.instance.render({ scene: this.app.scene.instance, camera: this.app.camera.instance });
  }
}
