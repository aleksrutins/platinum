import { Entity } from "../../ecs.ts";
import { CollisionBox2D, CollisionType } from "../CollisionBox2D.ts";
import { Sprite2D } from "../Sprite2D.ts";
import { Transform2D } from '../Transform2D.ts';

export interface Level {
    name: string,
    tiles: {
        index: number,
        x: number,
        y: number,
        collisionType: 'Solid' | 'Movable' | 'PassThrough'
    }[],
    entities: {
        name: string,
        x: number,
        y: number
    }[]
}

export type TilemapInfo = {
    image: ImageBitmapSource,
    rows: number,
    cols: number,
    tileWidth: number,
    tileHeight: number
}

export class LevelLoader {
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