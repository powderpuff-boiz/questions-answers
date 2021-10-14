function sum(a, b) {
  return a + b;
}

test('adds two integers', () => {
  expect(sum(2, 5)).toBe(7);
});