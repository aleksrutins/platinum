import { Component, System } from "../ecs.ts";
import { Vec2 } from "../math/vectors.ts";
import { RenderSystem2D } from "./RenderSystem2D.ts";

export class Transform2D extends Component<RenderSystem2D> {
  public xMod = 0;
  public yMod = 0;
  constructor(public x: number, public y: number) {
    super();
  }
  canUse(system: System): system is RenderSystem2D {
    return system instanceof RenderSystem2D;
  }
  init(_system: RenderSystem2D): void {
  }
  update(_system: RenderSystem2D): void {
  }
  get actX() {
    return this.x + this.xMod;
  }
  get actY() {
    return this.y + this.yMod;
  }

  add(vec: Vec2): Transform2D {
    return new Transform2D(this.x + vec[0], this.y + vec[1]);
  }
}
