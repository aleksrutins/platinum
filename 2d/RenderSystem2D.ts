import { System } from "../ecs.ts";
import { Game } from "../game.ts";
import { createError } from "../internal/error.ts";
import { expect } from "../internal/expect.ts";

export const ContextInitError = createError("Failed to initialize context");

/**
 * A system to render to a CanvasRenderingContext2D.
 */
export class RenderSystem2D implements System {
    #canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    /** The background color to use. */
    clearColor = "black";
    
    game?: Game;

    /**
     * @param canvas The canvas to use.
     */
    constructor(canvas: HTMLCanvasElement) {
        this.#canvas = canvas;
        this.ctx = expect(canvas.getContext('2d'), ContextInitError);
    }

    init(game: Game): void {
        this.game = game;
    }

    update(): void {
        this.#canvas.style.backgroundColor = this.clearColor;
        this.ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    }
}