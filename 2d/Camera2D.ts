import { Component, Entity, System } from "../ecs.ts";
import { RenderSystem2D } from "./RenderSystem2D.ts";
import { Transform2D } from "./Transform2D.ts";

function lerp(a: number, b: number, t: number): number {
    return a + t * (b - a);
}

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

export class CameraEntity2D extends Entity {
    constructor(name: string, private sceneWidth: number, private sceneHeight: number) {
        super(name);
        this.attach(new Transform2D(0, 0));
        this.attach(new Camera2D);
    }
    follow(thing: Transform2D, lerpFactor = 0.1) {
        const transform = this.getComponent(Transform2D)!;
        const modified = thing.add([-this.sceneWidth/2, -this.sceneHeight/2]);
        transform.x = lerp(transform.x, modified.x, lerpFactor);
        transform.y = lerp(transform.y, modified.y, lerpFactor);
    }
}
