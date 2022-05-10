import { Entity, Component, System } from './ecs';
import { GameExtension } from "./extension/index";
import { Nullable, Type } from "@platinum-ge/internal";

/**
 * This is the main object for a Platinum game.
 */
export class Game {
    #systems: System[] = []
    #baseEntities: Entity[] = [];
    #scene?: Scene;
    get entities() {
        return [...this.#baseEntities, ...(this.#scene?.entities ?? [])];
    }

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
        this.#baseEntities.push(entity);
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

    /**
     * Remove an entity from the game.
     * @param entity The entity to remove.
     */
    remove(entity: Entity) {
        if(this.#baseEntities.includes(entity)) {
            this.#baseEntities.splice(this.#baseEntities.indexOf(entity), 1);
        } else if(this.#scene?.entities.includes(entity)) {
            this.#scene.entities.splice(this.#scene.entities.indexOf(entity), 1);
        }
    }

    /** Clear all entities from the game. */
    clear() {
        this.#baseEntities.splice(0, this.entities.length);
    }

    /**
     * Switches to the specified scene.
     * @param scene The scene to switch to.
     */
    switchScene(scene: Scene) {
        this.#scene = scene;
        for(let entity of this.#scene.entities) {
            entity.init(this.#systems);
        }
    }
    
    private async updateAll() {
        for(const system of this.#systems) {
            try {
                system.update();
            } catch(e) {
                console.error(e);
            }
        }
        for(const entity of this.entities) {
            try {
                entity.update(this.#systems);
            } catch(e) {
                console.error(e);
            }
        }
        for(const system of this.#systems) {
            try {
                await system.postUpdate();
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
        for(const entity of this.entities) {
            if(entity instanceof t && entity.name == name) return entity;
        }
    }

    /**
     * Retrieve all entities matching a given predicate.
     * @param predicate The predicate to check.
     * @returns All entities matching the predicate.
     */
    getWhere(predicate: (e: Entity) => boolean): Entity[] {
        return this.entities.filter(predicate);
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
    async mainLoop(cb: () => boolean) {
        const shouldContinue = cb();
        await this.updateAll();
        if(shouldContinue) requestAnimationFrame(this.mainLoop.bind(this, cb));
    }
}

/**
 * A list of entities that can be switched to.
 */
export class Scene {
    entities: Entity[] = [];
    add(entity: Entity) {
        this.entities.push(entity);
    }
    addAll(entities: Entity[]) {
        for(const entity of entities) this.add(entity);
    }
}