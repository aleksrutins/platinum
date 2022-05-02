import { Entity } from "../../ecs";
import { CollisionBox2D, CollisionType } from "../CollisionBox2D";
import { Sprite2D } from "../Sprite2D";
import { Transform2D } from '../Transform2D';

/**
 * A level.
 */
export interface Level {
    /**
     * The name of the level.
     */
    name: string,
    /**
     * Tiles in the level.
     */
    tiles: {
        /**
         * The index of the tile in the tilemap.
         */
        index: number,
        /**
         * The X position on the screen of the tile.
         */
        x: number,
        /**
         * The Y position on the screen of the tile.
         */
        y: number,
        /**
         * How to behave in collisions.
         * @see s2d.CollisionBox2D
         */
        collisionType: 'Solid' | 'Movable' | 'PassThrough' | 'DoNotAvoid'
    }[],
    /**
     * Entities to be handled by the `entityCallback` passed to `LevelLoader.load`.
     */
    entities: {
        /**
         * The name of the entity.
         */
        name: string,
        /**
         * The X position on screen of the entity.
         */
        x: number,
        /**
         * The Y position on screen of the entity.
         */
        y: number
    }[]
}

/**
 * Information about a tilemap.
 */
export type TilemapInfo = {
    /**
     * The image containing the tilemap.
     */
    image: ImageBitmapSource,
    /**
     * The number of rows in the the tilemap.
     */
    rows: number,
    /**
     * The number of columns in the tilemap.
     */
    cols: number,
    /**
     * The width of each tile.
     */
    tileWidth: number,
    /**
     * The height of each tile.
     */
    tileHeight: number
}

/**
 * Utilities for loading levels.
 */
export class LevelLoader {
    /**
     * Loads a level.
     * @param level The Level to load.
     * @param tilemap The TilemapInfo to use for loading the level's tiles.
     * @param entityCallback The callback used to handle entities.
     * @returns An array of entities for the level.
     */
    static async load(level: Level, tilemap: TilemapInfo, entityCallback: (name: string, position: Transform2D) => (Entity | null | undefined)): Promise<Entity[]> {
        const entities: Entity[] = [];
        for(const tile of level.tiles) {
            const tileCol = tile.index % tilemap.cols;
            const tileRow = (tile.index > 0? Math.floor(tile.index / tilemap.cols) : 0);
            if(tileRow >= tilemap.rows) throw new Error("Tile index out of bounds");
            const img = await createImageBitmap(tilemap.image, tileCol * tilemap.tileWidth, tileRow * tilemap.tileHeight, tilemap.tileWidth, tilemap.tileHeight);
            const entity = new Entity(`${level.name}_${tile.x}_${tile.y}`);
            const collisionType = CollisionType[tile.collisionType];
            const sprite = new Sprite2D(img, 1);
            entity.attach(new Transform2D(tile.x, tile.y));
            entity.attach(sprite);
            entity.attach(new CollisionBox2D(collisionType, img.width, img.height));
            entities.push(entity);
        }
        for(const entity of level.entities) {
            const actEntity = entityCallback(entity.name, new Transform2D(entity.x, entity.y))
            if(actEntity) entities.push(actEntity);
        }
        return entities;
    }
}