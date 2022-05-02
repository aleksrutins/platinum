import { PostRenderEffect, RenderSystem2D } from "../RenderSystem2D";
// import wasm from './wasm/point_light.wat';
// const { instance } = await WebAssembly.instantiate(wasm);

export class PointLight2D extends PostRenderEffect {
    constructor(
        public cx: number,
        public cy: number,
        private brightness: number = 255,
        private radius: number = 20
    ) { super() }
    update(system: RenderSystem2D): void | Promise<void> {
        // const image = system.ctx.getImageData(0, 0, system.canvas.width, system.canvas.height);
        // const mem8 = new Uint8Array((instance.exports.memory as WebAssembly.Memory).buffer);
        // for(let i = 0; i < image.data.length; i++) {
        //     mem8[i] = image.data[i];
        // }
        // (instance.exports as any).calculate_all(0, system.canvas.width, system.canvas.height, this.cx, this.cy, this.radius, this.brightness);
        // for(let i = 0; i < image.data.length; i++) {
        //     image.data[i] = mem8[i];
        // }
        // system.ctx.putImageData(image, 0, 0);
    }
}