import {Type} from './internal/types.ts';
import { MessageReceiver, pingAll } from './messaging.ts';
import { Game } from './game.ts';

export type Message<T, A> = keyof {
    [Prop in keyof T]: T[Prop] extends (_: A) => void ? T[Prop] : undefined;
}

/**
 * A system.
 */
export interface System {
    /**
     * Called when this system is initialized in a game.
     * @param game The current game.
     */
    init(game: Game): void;
    /**
     * Called once every frame, before any entities have updated.
     */
    update(): void;
    /** Called once every frame, after all entities have updated. */
    postUpdate(): void;
}

/**
 * An entity.
 */
export class Entity {
    #components: Component<System>[] = [];
    #name: string;
    /** The name of this entity. */
    get name() { return this.#name }
    
    /**
     * Creates an entity.
     * @param name The name of the entity.
     */
    constructor(name: string) {
        this.#name = name;
    }

    /**
     * Attaches a component.
     * @param x The component to attach.
     */
    attach(x: Component<System>) {
        x.entity = this;
        this.#components.push(x);
    }

    /**
     * Detaches a component. This will fail only if the component is not attached.
     * @param x The component to detach.
     * @returns Whether or not the component was detached successfully.
     */
    detach<S extends System, T extends Component<S>>(x: T): boolean {
        if(!this.#components.includes(x)) return false;
        this.#components.splice(this.#components.indexOf(x), 1);
        return true;
    }

    /**
     * Detaches all components of the specified type.
     * @param t The type of component to detach.
     */
    detachAll<S extends System, T extends Component<S>>(t: Type<T>) {
        for(const c of this.#components) {
            if(c instanceof t) this.#components.splice(this.#components.indexOf(c), 1);
        }
    }

    /**
     * Retrieves the component of the specified type.
     * @param t The type of component to retrieve.
     * @returns The component, or undefined if none was found.
     */
    getComponent<S extends System, T extends Component<S>>(t: Type<T>): T | undefined {
        for(const c of this.#components) {
            if(c instanceof t) return c;
        }
    }

    /**
     * Checks whether a component of the specified type exists in this entity.
     * @param t The type of component to check.
     * @returns Whether or not a component of the specified type exists in this entity.
     */
    hasComponent<S extends System, T extends Component<S>>(t: Type<T>): boolean {
        for(const c of this.#components) {
            if(c instanceof t) return true;
        }
        return false;
    }

    init(systems: System[]) {
        pingAll(this.#components, 'init', systems, (r, d) => r.canUse(d));
    }

    /**
     * Iterate through all components.
     */
    *iterateComponents() {
        yield *this.#components;
    }

    update(systems: System[]) {
        pingAll(this.#components, 'update', systems, (r, d) => r.canUse(d));
    }
}

/**
 * A component.
 */
export abstract class Component<T extends System> implements MessageReceiver<'init' | 'update', T> {
    receive(msg: string, system: T): void {
        switch(msg) {
            case 'init': this.init(system); break;
            case 'update': this.update(system); break;
        }
    }
    /** The entity that this component is attached to. */
    entity?: Entity;
    
    /**
     * Whether or not this component can use the specified system.
     * @param system The system to check.
     */
    abstract canUse(system: System): system is T;

    /**
     * Called when this component's entity is initialized.
     * @param system The system to use.
     */
    abstract init(system: T): void;

    /**
     * Called every frame.
     * @param system The system to use.
     */
    abstract update(system: T): void;

    /**
     * @see Entity.getComponent
     */
    getComponent<S extends System, T extends Component<S>>(t: Type<T>): T | undefined {
        return this.entity?.getComponent(t);
    }

    /**
     * @see Entity.hasComponent
     */
    hasComponent<S extends System, T extends Component<S>>(t: Type<T>): boolean {
        return this.entity?.hasComponent(t) ?? false;
    }
}

/** Experimental and broken with TypeScript - do not use. */
export function requiresSystem<T extends System>(t: Type<T>) {
    return (target: Type<Component<System>>) => {
        target.prototype.canUse = (system: System) => system instanceof t;
    }
}