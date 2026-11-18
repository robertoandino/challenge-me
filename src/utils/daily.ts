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

