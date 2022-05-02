import {GameExtension} from '../extension/index';
import { Game } from "../game";

/**
 * An extension for handling keyboard input.
 * 
 * @example
 * let keyboard = game.useExt(platinum.input.keyboard.KeyboardManager);
 * 
 * // ...
 * 
 * game.mainLoop(() => {
 * 
 *     // ...
 * 
 *     if(keyboard.isDown('Space')) {
 *         // Do something
 *     }
 * 
 *     // ...
 * 
 * });
 */
export class KeyboardManager implements GameExtension {
    #down: Set<string> = new Set();
    connect(_game: Game): void {
        document.body.addEventListener('keydown', ev => {
            this.#down.add(ev.key);
        });
        document.body.addEventListener('keyup', ev => {
            this.#down.delete(ev.key);
        });
    }

    /**
     * Checks whether a key is down.
     * @param key The key to check.
     * @returns Whether or not {@code key} is down.
     */
    isDown(key: string) {
        return this.#down.has(key);
    }
}