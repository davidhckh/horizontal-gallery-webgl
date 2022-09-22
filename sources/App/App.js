import Time from "./Utils/Time";
import Sizes from "./Utils/Sizes";
import SceneCamera from "./Camera";
import SceneRenderer from "./Renderer";
import Loader from "./Utils/Loader";
import Scene from "./Scene/Scene";
import articles from "./articles";
import Scrolling from "./Scrolling";
import Details from "./Details";

export default class App {
  static instance;
  constructor(_options) {
    if (App.instance) {
      return App.instance;
    }
    App.instance = this;

    this.options = _options;
    this.canvas = this.options.canvas;

    this.articles = articles;

    this.details = new Details();
    this.time = new Time();
    this.sizes = new Sizes();
    this.camera = new SceneCamera();
    this.renderer = new SceneRenderer();
    this.loader = new Loader();
    this.scene = new Scene();
    this.scrolling = new Scrolling();

    this.resize();
    this.sizes.on("resize", () => this.resize());
    this.time.on("tick", () => this.update());
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
    this.scene.resize();
  }

  update() {
    this.scene.update();
    this.renderer.update();
    this.scrolling.update();
  }
}
