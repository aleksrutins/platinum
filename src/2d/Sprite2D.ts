import { Component, System } from '../ecs';
import { RenderSystem2D } from './RenderSystem2D';
import { Transform2D } from "./Transform2D";

/**
 * A component to render a sprite.
 * Requires Transform2D.
 * @see Transform2D
 */
export class Sprite2D extends Component<RenderSystem2D> {
    /**
     * @param img The ImageBitmap to render.
     * @param scale The factor to scale the sprite by.
     */
    constructor(public img: ImageBitmap, public scale: number = 1) {
        super();
    }
    canUse(system: System): system is RenderSystem2D {
        return system instanceof RenderSystem2D;
    }
    init(_system: RenderSystem2D): void {
        
    }
    update(system: RenderSystem2D): void {
        const transform = this.getComponent(Transform2D);
        system.ctx.drawImage(this.img, transform!.actX, transform!.actY, this.img.width * this.scale, this.img.height * this.scale);
    }
}