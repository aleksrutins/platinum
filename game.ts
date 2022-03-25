import { Entity, Component, System } from './ecs.ts';
import { GameExtension } from "./extension/mod.ts";
import { Nullable, Type } from "./internal/types.ts";

/**
 * This is the main object for a Platinum game.
 */
export class Game {
    #systems: System[] = []
    #entities: Entity[] = [];

    /**
     * Add a system to the game.
     * @param system The system to add.
     */
    use<T extends System>(system: T) {
        this.#systems.push(system);
        system.init(this);
    }

    /**
     * Connect an extension to the game.
     * @param tExt The extension type to connect.
     * @returns The connected extension.
     */
    useExt<T extends GameExtension>(tExt: Type<T>) {
        const ext = new tExt;
        ext.connect(this);
        return ext;
    }

    /**
     * Add an entity to the game.
     * @param entity The entity to add.
     */
    add<T extends Entity>(entity: T) {
        this.#entities.push(entity);
        entity.init(this.#systems);
    }

    /**
     * Add multiple entites to the game.
     * @param entities The entities to add.
     */
    addAll(entities: Entity[]) {
        for(const e of entities) {
            this.add(e);
        }
    }
    
    private updateAll() {
        for(const system of this.#systems) {
            try {
                system.update();
            } catch(e) {
                console.error(e);
            }
        }
        for(const entity of this.#entities) {
            try {
                entity.update(this.#systems);
            } catch(e) {
                console.error(e);
            }
        }
    }

    /**
     * Retrieve an entity from the game.
     * @param t The type of entity to retrieve.
     * @param name The name of the entity.
     * @returns The entity, if it exists. Otherwise, null.
     */
    get<T extends Entity>(t: Type<T>, name: string): Nullable<T> {
        for(const entity of this.#entities) {
            if(entity instanceof t && entity.name == name) return entity;
        }
    }

    /**
     * Retrieve all entities matching a given predicate.
     * @param predicate The predicate to check.
     * @returns All entities matching the predicate.
     */
    getWhere(predicate: (e: Entity) => boolean): Entity[] {
        return this.#entities.filter(predicate);
    }

    /**
     * Retrieve a system from the game.
     * @param t The type of the system to retrieve.
     * @returns The system, if it exists. Otherwise, null.
     */
    getSystem<T extends System>(t: Type<T>): Nullable<T> {
        for(const system of this.#systems) {
            if(system instanceof t) return system;
        }
    }

    /**
     * Start the game's main loop.
     * @param cb A callback to be called each frame.
     */
    mainLoop(cb: () => void) {
        cb();
        this.updateAll();
        requestAnimationFrame(this.mainLoop.bind(this, cb));
    }
}