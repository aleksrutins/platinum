import { Component, System } from "../../ecs.ts";
import { PostRenderEffect, RenderSystem2D } from "../RenderSystem2D.ts";
import { Transform2D } from "../Transform2D.ts";

export class PointLight2D implements PostRenderEffect {
    #parabola(x: number): number {
        // Find the "slope" of the parabola, based on the x-intercepts (this.radius and -this.radius) and vertex ((0, this.brightness) - also the y-intercept, thankfully)
        const xi1 = this.radius;
        const xi2 = -this.radius;
        const yi = this.brightness;
        const a = ((((-xi1 * x) - (xi2 * x) + (xi1 * xi2 * x^2)) / yi));
        // Return the parabola in vertex form
        return (a * x) + yi;
    }
    #pointBrightness(x: number, y: number): number {
        const dist = Math.sqrt((x - this.cx)^2 + (y - this.cy)^2);
        return this.#parabola(dist);
    }
    #pixelProp = (i: number) => i % 4
    constructor(public cx: number, public cy: number, private screenWidth: number, private screenHeight: number, private brightness: number = 255, private radius: number = 30) { }
    update(system: RenderSystem2D): void {
        const ctx = system.ctx;
        const image = ctx.getImageData(0, 0, this.screenWidth, this.screenHeight);
        image.data.forEach((value, index) => {
            const prop = this.#pixelProp(index);
            const x = (index / 4) % this.screenWidth;
            const y = Math.floor((index / 4) / this.screenWidth);
            switch(prop) {
                case 0: // red
                case 1: // green
                case 2: // blue
                    return;
                case 3:
                    image.data[index] = this.#pointBrightness(x, y);
            }
        });
        ctx.putImageData(image, 0, 0);
    }
}