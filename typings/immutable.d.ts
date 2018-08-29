/* tslint:disable:prefer-array-literal */
type KeyPath = Iterable<any>

interface Collection<T> extends Iterable<T> {
  get<K extends keyof T>(name: K): T[K]
  getIn<D>(keyPath: KeyPath, defaultValue?: D): any | D
  set(key: string | number, value: any): this
  setIn(keyPath: KeyPath, value: any): this
  update<K extends keyof T>(key: K, notSetValue: any, updater: (value: T[K]) => any): this
  update(key: string, updater: (value: any) => any): this
  updateIn(keyPath: KeyPath, notSetValue: any, updater: (value: any) => any): this
  updateIn(keyPath: KeyPath, updater: (value: any) => any): this
  merge<C>(
    collection: C,
    ...collections: Array<Iterable<any> | Iterable<[any, any]> | { [key: string]: any }>
  ): C & this
  mergeIn<C>(
    keyPath: KeyPath,
    collection: C,
    ...collections: Array<Iterable<any> | Iterable<[any, any]> | { [key: string]: any }>
  ): any
  mergeDeep<C>(
    collection: C,
    ...collections: Array<Iterable<any> | Iterable<[any, any]> | { [key: string]: any }>
  ): C
  mergeWith<C>(
    merger: (oldVal: C, newVal: C, key: any) => C,
    ...collections: Array<Iterable<any> | Iterable<[any, any]> | { [key: string]: any }>
  )
  filter(predicate: (value: any, key: string, iter: this) => any, context?: any): this
  every(predicate: (value: any, key: any, iter: this) => boolean, context?: any): boolean
  some(predicate: (value: any, key: any, iter: this) => boolean, context?: any): boolean
  map(mapper: (value: any, key?: number, iter?: this) => any, context?: any): this
  toMap(): ImmutableMap<T>
  toObject(): T
  toJS(): any
  forEach(
    sideEffect: (value: ImmutableMap<any>, key: string, iter: this) => any,
    context?: any,
  ): number
  mapKeys(mapper: (key: string, value: any, iter: this) => any, context?: any): this
  sort(comparator?: (valueA: any, valueB: any) => number): this
  remove(key: number | string): this
  delete<K extends keyof T>(key: K | number): this
  deleteIn(keyPath: KeyPath): this
  removeIn(keyPath: KeyPath): this
  isEmpty(): boolean
  push(...values: T[]): this
  size: number
  toList(): ImmutableList<T>
  sortBy<C>(
    comparatorValueMapper: (value: any, key: string, iter: this) => C,
    comparator?: (valueA: C, valueB: C) => number,
  ): this
  groupBy<G>(
    grouper: (value: any, key: string, iter: this) => G,
    context?: any,
  ): ImmutableMap<{ [key: string]: ImmutableList<G> }>
  toArray(): any[]
  valueSeq(): ImmutableSeq<any>
  findKey(mapper: (value: T, key: keyof T) => boolean): undefined | keyof T
  has(key: keyof T): boolean
}

interface ImmutableMap<T> extends Collection<T> {
  toJS(): { [prop: string]: any }
}

interface ImmutableList<T> extends Collection<T> {
  findIndex(predicate: (value: T, index: number, iter: this) => boolean, context?: any): number
  find(predicate: (value: T, index: number, iter: this) => boolean, context?: any): T | undefined
  join(separator?: string): string
  map(mapper: (value: T, key?: number, iter?: this) => any, context?: any): this
  concat(newValue: ImmutableList<any>): this
  last(): T
  toArray(): any[]
  insert(key: number, value: any): this
  toJS(): any[]
  shift(): this
  unshift(...values: any[]): this
  includes(value: T): boolean
}

interface ImmutableSeq<T> extends Collection<T> {
  map(mapper: (value: any, key?: number, iter?: this) => any, context?: any): this
}

declare module 'immutable' {
  namespace Map {
    function isMap(maybeMap): boolean
    function isList(mayBeList): boolean
  }

  namespace Immutable {
    export function is(first: any, second: any): boolean
    export function isImmutable(value: any): boolean
    export function Map(): ImmutableMap<{}>
    export function Map<T>(T): ImmutableMap<T>
    export function List(): ImmutableList<any>
    export function List<T>(collection: Iterable<T>): ImmutableList<T>
    export function fromJS<T>(T): Collection<T>
    export namespace Map {
      function isMap(maybeMap): boolean
    }
    export namespace List {
      function isList(mayBeList): boolean
    }
  }

  export function fromJS<T>(v: T): ImmutableMap<T>
  export function is(first: any, second: any): boolean
  export function isImmutable(mayBeImmutable: any): boolean
  export default Immutable
}
