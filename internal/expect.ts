import { Nullable, Type } from "./types.ts";

export function expect<T, E extends Error>(what: T | null | undefined, err: Type<E>): T {
    if(!what) throw new err;
    return what;
}