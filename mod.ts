export * from './game.ts';

/**
 * Utilities for working with Platinum's Entity-Component-System (ECS).
 */
export * as ecs from './ecs.ts';

/**
 * Everything 2D.
 */
export * as s2d from './2d/mod.ts';

/**
 * Utilities for creating extensions.
 * Extensions are things that hook into the game at start and are able to register event handlers, create sprites, etc.
 * 
 * @example
 * class LoggerExtension implements platinum.extension.GameExtension {
 *      connect(game: platinum.Game) {
 *          console.log(game);
 *      }
 * }
 * // ... //
 * let logger = game.useExt(LoggerExtension);
 */
export * as extension from './extension/mod.ts';

/** Utilities for handling input. */
export * as input from './input/mod.ts';

/** Utilities for handling images. */
export * as image from './image/mod.ts';

/** Miscellaneous math utilities. */
export * as math from './math/mod.ts';