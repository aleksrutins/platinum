import {Type} from './internal/types.ts';
import { MessageReceiver, pingAll } from './messaging.ts';

export type Message<T, A> = keyof {
    [Prop in keyof T]: T[Prop] extends (_: A) => void ? T[Prop] : undefined;
}

export interface System {
    init(): void;
    update(): void;
}

export class Entity {
    #components: Component<System>[] = [];
    #name: string;
    get name() { return this.#name }
    
    constructor(name: string) {
        this.#name = name;
    }

    attach(x: Component<System>) {
        x.entity = this;
        this.#components.push(x);
    }
    detach<S extends System, T extends Component<S>>(x: T): boolean {
        if(!this.#components.includes(x)) return false;
        this.#components.splice(this.#components.indexOf(x), 1);
        return true;
    }
    detachAll<S extends System, T extends Component<S>>(t: Type<T>) {
        for(const c of this.#components) {
            if(c instanceof t) this.#components.splice(this.#components.indexOf(c), 1);
        }
    }
    getComponent<S extends System, T extends Component<S>>(t: Type<T>): T | undefined {
        for(const c of this.#components) {
            if(c instanceof t) return c;
        }
    }

    init(systems: System[]) {
        pingAll(this.#components, 'init', systems, (r, d) => r.canUse(d));
    }

    *iterateComponents() {
        yield *this.#components;
    }

    update(systems: System[]) {
        pingAll(this.#components, 'update', systems, (r, d) => r.canUse(d));
    }
}

export abstract class Component<T extends System> implements MessageReceiver<'init' | 'update', T> {
    receive(msg: string, system: T): void {
        switch(msg) {
            case 'init': this.init(system); break;
            case 'update': this.update(system); break;
        }
    }
    entity?: Entity;
    abstract canUse(system: System): system is T;
    abstract init(system: T): void;
    abstract update(system: T): void;
    getComponent<S extends System, T extends Component<S>>(t: Type<T>): T | undefined {
        return this.entity?.getComponent(t);
    }
}

export function requiresSystem<T extends System>(t: Type<T>) {
    return (target: Type<Component<System>>) => {
        target.prototype.canUse = (system: System) => system instanceof t;
    }
}