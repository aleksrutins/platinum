import { Entity, Component, System } from './ecs.ts';
import { GameExtension } from "./extension/mod.ts";
import { Nullable, Type } from "./internal/types.ts";
export class Game {
    #systems: System[] = []
    #entities: Entity[] = [];
    constructor() {

    }
    use<T extends System>(system: T) {
        this.#systems.push(system);
        system.init(this);
    }
    useExt<T extends GameExtension>(tExt: Type<T>) {
        const ext = new tExt;
        ext.connect(this);
        return ext;
    }
    add<T extends Entity>(entity: T) {
        this.#entities.push(entity);
        entity.init(this.#systems);
    }
    addAll(entities: Entity[]) {
        for(const e of entities) {
            this.add(e);
        }
    }
    updateAll() {
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

    get<T extends Entity>(t: Type<T>, name: string): Nullable<T> {
        for(const entity of this.#entities) {
            if(entity instanceof t && entity.name == name) return entity;
        }
    }

    getWhere(predicate: (e: Entity) => boolean): Entity[] {
        return this.#entities.filter(predicate);
    }

    getSystem<T extends System>(t: Type<T>): Nullable<T> {
        for(const system of this.#systems) {
            if(system instanceof t) return system;
        }
    }

    mainLoop(cb: () => void) {
        cb();
        this.updateAll();
        requestAnimationFrame(this.mainLoop.bind(this, cb));
    }
}