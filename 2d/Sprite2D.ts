import { Component, System, requiresSystem } from '../ecs.ts';
import { RenderSystem2D } from './RenderSystem2D.ts';
import { Transform2D } from "./Transform2D.ts";

export class Sprite2D extends Component<RenderSystem2D> {
    constructor(public img: ImageBitmap, public scale: number = 1) {
        super();
    }
    canUse(system: System): system is RenderSystem2D {
        return system instanceof RenderSystem2D;
    }
    init(system: RenderSystem2D): void {

    }
    update(system: RenderSystem2D): void {
        const transform = this.getComponent(Transform2D);
        system.ctx.drawImage(this.img, transform!.x, transform!.y, this.img.width * this.scale, this.img.height * this.scale);
    }
}