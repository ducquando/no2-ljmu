// sort array ascending
const asc = (arr: number[]) => arr.sort((a, b) => a - b);

const quantile = (arr: number[], q: number) => {
    const sorted = asc(arr);
    const pos = (sorted.length - 1) * q;
    const base = Math.floor(pos);
    const rest = pos - base;
    if (sorted[base + 1] !== undefined) {
        return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
    } else {
        return sorted[base];
    }
};

export const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);

export const mean = (arr: number[]) => sum(arr) / arr.length;

export const q25 = (arr: number[]) => quantile(arr, .25);

export const median = (arr: number[]) => quantile(arr, .50);

export const q75 = (arr: number[]) => quantile(arr, .75);