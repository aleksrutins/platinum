import { PostRenderEffect, RenderSystem2D } from '../RenderSystem2D';
export class Darkness implements PostRenderEffect {
    constructor(private screenWidth: number, private screenHeight: number) {}
    update(system: RenderSystem2D): void {
        const ctx = system.ctx;
        const image = ctx.getImageData(0, 0, this.screenWidth, this.screenHeight);
        for(let i = 0; i < image.data.length; i += 4) {
            image.data[i + 3] = 3; // zero alpha channel
        }
        ctx.putImageData(image, 0, 0);
    }
}