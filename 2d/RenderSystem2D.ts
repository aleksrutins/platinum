import { System } from "../ecs.ts";
import { createError } from "../internal/error.ts";
import { expect } from "../internal/expect.ts";

export const ContextInitError = createError("Failed to initialize context");

export class RenderSystem2D implements System {
    #canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    clearColor = "black";
    constructor(canvas: HTMLCanvasElement) {
        this.#canvas = canvas;
        this.ctx = expect(canvas.getContext('2d'), ContextInitError);
    }

    init(): void {
        
    }

    update(): void {
        this.#canvas.style.backgroundColor = this.clearColor;
        this.ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    }
}