type TGroupBy<K> = {
    [key: string]:K[] 
}

export function groupBy<T>(arr:T[] , cb: (item: T) => string): TGroupBy<T> {
    return arr.reduce<TGroupBy<T>>(
        (prevValue, curr) => {
            const currKey = cb(curr);
            if (!prevValue[currKey]){
                prevValue[currKey] = [curr]
            } else prevValue[currKey].push(curr);
            return prevValue;
        }, {});
}