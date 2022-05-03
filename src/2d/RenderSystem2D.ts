import { System } from "../ecs";
import { Game } from "../game";
import { createError } from "../internal/error";
import { expect } from "../internal/expect";

export const ContextInitError = createError("Failed to initialize context");

export abstract class PostRenderEffect {
    init?(system: RenderSystem2D): void | Promise<void>;
    update?(system: RenderSystem2D): void | Promise<void>;
}

/**
 * A system to render to a CanvasRenderingContext2D.
 */
export class RenderSystem2D implements System {
    canvas: HTMLCanvasElement;
    #effects: PostRenderEffect[] = [];
    ctx: CanvasRenderingContext2D;

    /** The background color to use. */
    clearColor = "black";
    
    game?: Game;

    /**
     * @param canvas The canvas to use.
     */
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = expect(canvas.getContext('2d'), ContextInitError);
    }

    async init(game: Game) {
        this.game = game;
        await Promise.all(this.#effects.map(effect => effect.init?.(this)));
    }

    addEffect(effect: PostRenderEffect) {
        this.#effects.push(effect);
    }

    update(): void {
        this.ctx.fillStyle = this.clearColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    async postUpdate() {
        await Promise.all(this.#effects.map(effect => effect.update?.(this)));
    }
}