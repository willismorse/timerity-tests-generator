export function pairwise<T>(arr: T[]): T[] {
    const pairs: any[] = [];
    for (let i = 0; i < arr.length - 1; i++) {
        const val1 = arr[i];
        const val2 = arr[i+1];
        if ( val2)
        {
            pairs.push([val1, val2])
        }
    }

    return pairs;
}
