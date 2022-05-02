import { Game } from "../game";

/**
 * The base interface for extensions.
 */
export interface GameExtension {
    /**
     * Called when an extension is connected to a game.
     * @param game The game that this extension was connected to.
     */
    connect(game: Game): void;
}