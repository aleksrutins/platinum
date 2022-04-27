import { Component, System } from "../../ecs.ts";
import { RenderSystem2D } from "../RenderSystem2D.ts";
import { Transform2D } from "../Transform2D.ts";

export class PointLight2D extends Component<RenderSystem2D> {
    #parabola(vx: number, vy: number): (x: number) => number {
        return x => (this.blurFactor * (x - vx)^2) + vy;
    }
    #pointBrightness(x: number, y: number): number {
        const transform = this.getComponent(Transform2D);
        if(transform == null) return 0;

        const [cx, cy] = transform.position;

        const dist = Math.sqrt((x - cx)^2 + (y - cy)^2);
        const f = this.#parabola(0, this.brightness);
        return f(dist);
    }
    #pixelProp = (i: number) => i % 4
    constructor(private radius: number, private screenWidth: number, private screenHeight: number, private brightness: number = 255, private blurFactor: number = 10) {
        super();
    }
    canUse(system: System): system is RenderSystem2D {
        return system instanceof RenderSystem2D;
    }
    init(system: RenderSystem2D): void {
        
    }
    update(system: RenderSystem2D): void {
        const ctx = system.ctx;
        const image = ctx.getImageData(0, 0, this.screenWidth, this.screenHeight);
        image.data.forEach((value, index) => {
            const prop = this.#pixelProp(index);
            const x = Math.floor(index / 4) % this.screenWidth;
            const y = Math.floor(index / this.screenWidth);
            switch(prop) {
                case 0: // red
                case 1: // green
                case 2: // blue
                    break;
                case 3:
                    image.data[index] = value + this.#pointBrightness(x, y);
            }
        });
        ctx.putImageData(image, 0, 0);
    }
}