import { RippleEffect } from "./RippleEffect";

export default class ModuleRippleEffect {
  private effect: RippleEffect;

  public build(): void {
    this.effect = new RippleEffect();
  }

  public awake(): void {
    this.effect.start();
    window.addEventListener("resize", this.onResize);
    document
      .querySelector(".Module-RippleEffect")
      .addEventListener("click", this.stopEffect);
  }

  private stopEffect = () => {
    this.effect.stop();
  };

  private onResize = () => {
    this.effect.onResize(window.innerWidth, window.innerHeight);
  };

  protected sleep(): void {
    document
      .querySelector(".Module-RippleEffect")
      .removeEventListener("click", this.stopEffect);
  }
}
