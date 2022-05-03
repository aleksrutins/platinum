import { PostRenderEffect, RenderSystem2D } from "../RenderSystem2D";
import load from '../../../src-wasm/point-light.wasm';
export class PointLight2D extends PostRenderEffect {
    #wasm: Promise<any>;
    constructor(
        public cx: number,
        public cy: number,
        private brightness: number = 255,
        private radius: number = 20
    ) {
        super();
        this.#wasm = load({});
    }
    async init(system: RenderSystem2D) {
        // grow memory to accomodate everything
        const wasm = await this.#wasm;
        const bytesPerPage = 64 * 1024;
        const necessaryBytes = system.canvas.width * system.canvas.height + 1;
        if(necessaryBytes <= wasm.memory.buffer.byteLength) return;
        const newPages = Math.ceil((necessaryBytes - wasm.memory.buffer.byteLength) / bytesPerPage);
        wasm.memory.grow(newPages);
    }
    async update(system: RenderSystem2D) {
        const wasm = await this.#wasm;

        const image = system.ctx.getImageData(0, 0, system.canvas.width, system.canvas.height);
        const mem8 = new Uint8Array((wasm.memory as WebAssembly.Memory).buffer);
        for(let i = 0; i < image.data.length; i++) {
            mem8[i] = image.data[i];
        }
        wasm.calculateAll(0, system.canvas.width, system.canvas.height, this.cx, this.cy, this.radius, this.brightness);
        for(let i = 0; i < image.data.length; i++) {
            image.data[i] = mem8[i];
        }
        system.ctx.putImageData(image, 0, 0);
    }
}