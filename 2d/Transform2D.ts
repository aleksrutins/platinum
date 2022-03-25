import { Component, System } from "../ecs.ts";
import { Vec2 } from "../math/vectors.ts";
import { RenderSystem2D } from "./RenderSystem2D.ts";

/**
 * A component to describe the position of an object.
 */
export class Transform2D extends Component<RenderSystem2D> {
  /** The modifier to be applied to the X position. Used by Camera2D. */
  public xMod = 0;
  /** The modifier to be applied to the Y position. Used by Camera2D. */
  public yMod = 0;

  /**
   * @param x The X position.
   * @param y The Y position.
   */
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

  /** The modified X position. */
  get actX() {
    return this.x + this.xMod;
  }

  /** The modified Y position. */
  get actY() {
    return this.y + this.yMod;
  }

  /**
   * Translates `this` by `vec`.
   * @param vec The vector to translate by.
   * @returns The translated position.
   */
  add(vec: Vec2): Transform2D {
    return new Transform2D(this.x + vec[0], this.y + vec[1]);
  }
}
