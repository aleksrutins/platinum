import { System } from "../ecs.ts";
import { Game } from "../game.ts";
import { createError } from "../internal/error.ts";
import { expect } from "../internal/expect.ts";

export const ContextInitError = createError("Failed to initialize context");

export interface PostRenderEffect {
    update(system: RenderSystem2D): void;
}

/**
 * A system to render to a CanvasRenderingContext2D.
 */
export class RenderSystem2D implements System {
    #canvas: HTMLCanvasElement;
    #effects: PostRenderEffect[] = [];
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

    addEffect(effect: PostRenderEffect) {
        this.#effects.push(effect);
    }

    update(): void {
        this.ctx.fillStyle = this.clearColor;
        this.ctx.fillRect(0, 0, this.#canvas.width, this.#canvas.height);
    }

    postUpdate(): void {
        for(const effect of this.#effects) {
            effect.update(this);
        }
    }
}