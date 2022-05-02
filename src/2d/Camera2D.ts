import { Component, Entity, System } from "../ecs";
import { Vec2 } from "../math/vectors";
import { RenderSystem2D } from "./RenderSystem2D";
import { Transform2D } from "./Transform2D";

function lerp(a: number, b: number, t: number): number {
    return a + t * (b - a);
}

/**
 * A component for a camera. Do not use directly.
 * Requires Transform2D.
 */
export class Camera2D extends Component<RenderSystem2D> {
  constructor() {
    super();
  }
  canUse(system: System): system is RenderSystem2D {
    return system instanceof RenderSystem2D;
  }
  init(_system: RenderSystem2D): void {
  }
  update(system: RenderSystem2D): void {
    if(!this.hasComponent(Transform2D)) return;
    for(const transform of system.game!.getWhere(e => e.hasComponent(Transform2D)).map(x => x.getComponent(Transform2D)!)) {
        transform.xMod = 0 - this.getComponent(Transform2D)!.x;
        transform.yMod = 0 - this.getComponent(Transform2D)!.y;
    }
  }
}

/**
 * An entity to manage a `Camera2D`.
 */
export class CameraEntity2D extends Entity {
    /**
     * @param name The name of this entity.
     * @param sceneWidth The width of the scene.
     * @param sceneHeight The height of the scene.
     */
    constructor(name: string, private sceneWidth: number, private sceneHeight: number) {
        super(name);
        this.attach(new Transform2D(0, 0));
        this.attach(new Camera2D);
    }

    /**
     * Updates the transform of `this` to match `thing`, with linear interpolation.
     * @param thing The transformation of the object to follow.
     * @param lerpFactor The coefficient for linear interpolation.
     */
    follow(thing: Transform2D, lerpFactor = 0.1) {
        const transform = this.getComponent(Transform2D)!;
        const modified = Vec2.add(thing.position, [-this.sceneWidth/2, -this.sceneHeight/2]);
        transform.position = [
          lerp(transform.x, modified[0], lerpFactor),
          lerp(transform.y, modified[1], lerpFactor)
        ];
    }
}
