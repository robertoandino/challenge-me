const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

const MS_PER_DAY = 86_400_000;