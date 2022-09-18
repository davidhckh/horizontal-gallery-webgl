import App from "../App";

export default class Scene {
  constructor() {
    this.app = new App();
    this.loader = this.app.loader;

    this.loader.on("loaded", () => {
      console.log("init scene");
    });
  }
}
