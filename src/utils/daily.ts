const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

const MS_PER_DAY = 86_400_000;

/**
 * Index of today's item in a list of 'length' items.
 * 
 * It steps through the list by a stride that shares no factor with the length, so:
 * - evert item comes up once per 'length' days before any repeats,
 * - the order looks shuffled instead of following the file order,
 * - month boundaries don't cause jumps (it counts whole local calendar days).
 */

export function dailyIndex(length: number, date: Date = new Date()): number {
    if (length <= 0) return 0;

    const dayNumber = Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / MS_PER_DAY);

    let stride = 37;
    while (gcd(stride, length) !== 1) stride++;

    return (dayNumber * stride) % length;
}