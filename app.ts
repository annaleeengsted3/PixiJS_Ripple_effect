import ModuleRippleEffect from "./ModuleRippleEffect";

export class App {
  private _module: ModuleRippleEffect;

  constructor() {
    this.build();
  }

  private build() {
    window.addEventListener("load", this.awake);
    this._module = new ModuleRippleEffect();
    this._module.build();
  }

  private awake = () => {
    this._module.awake();
  };
}

let app: App = new App();
