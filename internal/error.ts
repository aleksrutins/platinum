export function createError(message: string) {
    return class extends Error {
        constructor() {
            super(message);
        }
    }
}