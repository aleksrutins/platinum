export * from './game';

/**
 * Utilities for working with Platinum's Entity-Component-System (ECS).
 */
export * as ecs from './ecs';

/**
 * Everything 2D.
 */
export * as s2d from './2d';

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
export * as extension from './extension';

/** Utilities for handling input. */
export * as input from './input';

/** Utilities for handling images. */
export * as image from './image';

/** Miscellaneous math utilities. */
export * as math from './math';