// deno-lint-ignore-file no-namespace
/** A two-dimensional vector. */
export type Vec2 = [number, number];
export namespace Vec2 {
    export function add(a: Vec2, b: Vec2): Vec2 {
        return [a[0] + b[0], a[1] + b[1]];
    }
}