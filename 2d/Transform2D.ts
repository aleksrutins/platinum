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
  #x = 0
  #y = 0
  #history: Vec2[] = []
  /**
   * @param x The X position.
   * @param y The Y position.
   */
  constructor(x: number, y: number) {
    super();
    this.#x = x;
    this.#y = y;
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
    return this.#x + this.xMod;
  }

  /** The modified Y position. */
  get actY() {
    return this.#y + this.yMod;
  }

  /** Set the position, storing it in the history */
  set position(value: Vec2) {
    this.#history.push([this.#x, this.#y]);
    while(this.#history.length > 20) {
      this.#history.shift();
    }
    this.#x = value[0];
    this.#y = value[1];
  }

  get position(): Vec2 {
    return [this.#x, this.#y];
  }

  get x() {
    return this.#x;
  }
  get y() {
    return this.#y;
  }

  /**
   * Roll back to the previous position in the history, if there is one. The history stores the latest 20 positions.
   */
  rollback() {
    const last = this.#history.pop() ?? this.position;
    this.#x = last[0];
    this.#y = last[1];
  }

  /**
   * Translates `this` by `vec`.
   * @param vec The vector to translate by.
   */
  translate(vec: Vec2) {
    this.position = Vec2.add(this.position, vec);
  }
}
