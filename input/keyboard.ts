import {GameExtension} from '../extension/mod.ts';
import { Game } from "../game.ts";
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
    isDown(key: string) {
        return this.#down.has(key);
    }
}