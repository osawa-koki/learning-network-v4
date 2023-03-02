export {};

import isValidPrefix from '../util/isValidPrefix';

test('プレフィックスの検証関数のテスト', () => {
  expect(isValidPrefix('0')).toBe(true);
  expect(isValidPrefix('8')).toBe(true);
  expect(isValidPrefix('16')).toBe(true);
  expect(isValidPrefix('32')).toBe(true);

  expect(isValidPrefix('-1')).toBe(false);
  expect(isValidPrefix('1.5')).toBe(false);
  expect(isValidPrefix('33')).toBe(false);
  expect(isValidPrefix('foo')).toBe(false);
});
