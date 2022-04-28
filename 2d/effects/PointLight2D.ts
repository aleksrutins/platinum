import { Component, System } from "../../ecs.ts";
import { PostRenderEffect, RenderSystem2D } from "../RenderSystem2D.ts";
import { Transform2D } from "../Transform2D.ts";

export class PointLight2D implements PostRenderEffect {
    #parabola(vx: number, vy: number): (x: number) => number {
        return x => -(this.blurFactor * (x - vx)^2) + vy;
    }
    #pointBrightness(x: number, y: number): number {
        const dist = Math.sqrt((x - this.cx)^2 + (y - this.cy)^2);
        const f = this.#parabola(0, this.brightness);
        return f(dist);
    }
    #pixelProp = (i: number) => i % 4
    constructor(public cx: number, public cy: number, private screenWidth: number, private screenHeight: number, private brightness: number = 255, private blurFactor: number = 5) { }
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
                    return;
                case 3:
                    image.data[index] = value + this.#pointBrightness(x, y);
            }
        });
        ctx.putImageData(image, 0, 0);
    }
}