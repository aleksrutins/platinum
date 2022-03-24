import { Game } from "../game.ts";

export interface GameExtension {
    connect(game: Game): void;
}