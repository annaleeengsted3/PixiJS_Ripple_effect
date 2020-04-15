import * as PIXI from "pixi.js";

export class RippleEffect {
  private _app: PIXI.Application;
  private _width: number;
  private _height: number;
  private _sprite: PIXI.Sprite;
  private _URLimageToDisplace: string = "./assets/img/3.jpg";
  private _URLDmap: string = "./assets/img/dmaps/512x512/ripple_2.jpg";
  private _DOMContainer: HTMLElement = document.querySelector(
    ".pixi-container"
  );
  private _dMap: PIXI.Sprite;

  constructor() {
    this._width = window.innerWidth;
    this._height = window.innerHeight;
    this.setupPIXIApp();
  }

  private setupPIXIApp() {
    this._app = new PIXI.Application({
      resizeTo: window,
      width: this._width,
      height: this._height,
    });

    this._DOMContainer.appendChild(this._app.view);
    //to make interactive on mousemove or click:
    // this._app.stage.interactive = true;
    // to allow for optimal resolution on retina devices- makes canvas 2x larger and images 4x, FIND FIX:
    // this._app.renderer.resolution = window.devicePixelRatio;
    //this._app.renderer.autoDensity = true;

    this.createSprite();
  }

  public onResize(width: number, height: number) {
    this._width = width;
    this._height = height;
    this._sprite.width = this._width;
    this._sprite.height = this._height;
    this._dMap.x = this._width / 2;
    this._dMap.y = this._height / 2;

    this._app.renderer.resize(this._width, this._height);
  }
  private createSprite() {
    this._sprite = PIXI.Sprite.from(this._URLimageToDisplace);
    this._sprite.width = this._app.screen.width;
    this._sprite.height = this._app.screen.height;
    this._app.stage.addChild(this._sprite);
    this._sprite.width = this._width;
    this._sprite.height = this._height;
    this.createDMapFilter();
  }

  private createDMapFilter() {
    this._dMap = PIXI.Sprite.from(this._URLDmap);
    // to make sprite wrap:
    // dMap.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    const displacementFilter = new PIXI.filters.DisplacementFilter(this._dMap);
    // displacementFilter.padding = 100;
    // dMap.position = imageToDisplace.position;
    this._dMap.x = this._width / 2;
    this._dMap.y = this._height / 2;
    this._dMap.scale.x = 0.2;
    this._dMap.scale.y = 0.2;
    this._app.stage.addChild(this._dMap);
    this._sprite.filters = [displacementFilter];
    displacementFilter.scale.x = 10;
    displacementFilter.scale.y = 10;
  }

  public start() {
    this._app.ticker.add(() => {
      // dMap.x++;
      this._dMap.anchor.x = 0.5;
      this._dMap.anchor.y = 0.5;
      this._dMap.scale.x = this._dMap.scale.x * 1.01;
      this._dMap.scale.y = this._dMap.scale.y * 1.01;
      // Reset x to 0 when it's over width to keep values from going to very huge numbers.
      // if (dMap.x > dMap.width) {
      // 	dMap.x = 0;
      // }
      if (this._dMap.scale.x > 6) {
        this._dMap.scale.x = 0.2;
        this._dMap.scale.y = 0.2;
      }
    });
  }

  public stop() {
    this._app.ticker.stop();
  }
}
