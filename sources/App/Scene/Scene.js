import App from "../App";
import TeaserImage from "./TeaserImage";
import Raycasting from "./Raycasting";
import { Transform } from "ogl";
import { gsap } from "gsap";

export default class Scene {
  constructor() {
    this.app = new App();
    this.loader = this.app.loader;
    this.articles = this.app.articles;

    this.instance = new Transform();

    this.teaserImages = [];

    this.loader.on("loaded", () => {
      this.articles.forEach((article, index) => {
        this.teaserImages.push(new TeaserImage(article, index));
      });

      this.raycasting = new Raycasting();

      this.playOpening();
    });
  }

  playOpening() {
    this.teaserImages.forEach((teaserImage, index) => {
      gsap.fromTo(
        teaserImage.mesh.position,
        { x: 0, z: -index * 0.3 + 0.2 },
        {
          x: teaserImage.mesh.position.x,
          z: 0,
          duration: 1.4,
          ease: "power3.out",
          stagger: 0.1
        }
      );
    });

    gsap.delayedCall(0.5, () => {
      this.app.openingPlayed = true;
    });
  }

  resize() {
    this.teaserImages.forEach((teaserImage) => {
      teaserImage.resize();
    });
  }

  update() {
    this.teaserImages.forEach((teaserImage) => {
      teaserImage.update();
    });
  }
}
