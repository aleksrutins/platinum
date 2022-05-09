import { Nullable, Type } from "./types";

export function expect<T, E extends Error>(what: Nullable<T>, err: Type<E>): T {
    if(!what) throw new err;
    return what;
}