export type Type<T> = { new(..._: any): T };

export type Nullable<T> = T | null | undefined