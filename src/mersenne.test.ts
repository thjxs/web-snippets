import { rand, seed } from './mersenne';

it('mersenne rand less than 100', () => {
  expect(rand(100)).toBeLessThanOrEqual(100);
});

it('mersenne less than 100 and greater than 10', () => {
  expect(rand(100, 10)).toBeLessThanOrEqual(100);
  expect(rand(100, 10)).toBeGreaterThan(10);
});

it('mersenne seed same value, will always return same result at first rand, and seed 123, will return 28296', () => {
  const s = 123;
  seed(s);
  const n1 = rand();
  seed(s);
  const n2 = rand();
  const n3 = rand();
  expect(n1).toEqual(n2);
  expect(n1).toEqual(28296);
  expect(n1 !== n3).toBeTruthy();
});
