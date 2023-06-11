interface Array<T> {
    groupBy<K>(predicate: (value: T, index: number, arr: Array<T>) => K): object;
    groupByToMap<K>(predicate: (value: T, index: number, arr: Array<T>) => K): Map<K, Array<T>>
    groupByToMapUnique<K>(predicate: (value: T, index: number, arr: Array<T>) => K): Map<K, T>
}
