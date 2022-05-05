import { Component, System } from "../../ecs";
import { PostRenderEffect, RenderSystem2D } from "../RenderSystem2D";
import { Transform2D } from "../Transform2D";

export class PointLight2D implements PostRenderEffect {
    #parabola(x: number): number {
        // Find the "slope" of the parabola, based on the x-intercepts (this.radius and -this.radius) and vertex ((0, this.brightness) - also the y-intercept, thankfully)
        const yi = this.brightness;
        const a = (-(this.radius^2) * x^2) / yi;
        // Return the parabola in vertex form
        return Math.max((a * x) + yi, 0);
    }
    #pointBrightness(x: number, y: number): number {
        const dist = Math.sqrt(Math.pow(x - this.cx, 2) + Math.pow(y - this.cy, 2));
        return this.#parabola(dist);
    }
    constructor(public cx: number, public cy: number, private screenWidth: number, private screenHeight: number, private brightness: number = 255, private radius: number = 20) { }
    update(system: RenderSystem2D): void {
        const ctx = system.ctx;
        const image = ctx.getImageData(0, 0, this.screenWidth, this.screenHeight);
        for(let index = 0; index < image.data.length; index += 4) {
            const x = (index / 4) % this.screenWidth;
            const y = Math.floor((index / 4) / this.screenWidth);
            image.data[index + 3] += this.#pointBrightness(x, y);
        }
        ctx.putImageData(image, 0, 0);
    }
}