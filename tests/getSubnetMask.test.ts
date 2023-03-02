export {};

import getSubnetMask from '../util/getSubnetMask';

test("'8'のサブネットマスク取得関数のテスト", () => {
  const result = getSubnetMask(8);
  expect(result).toBe('255.0.0.0');
});

test("'16'のサブネットマスク取得関数のテスト", () => {
  const result = getSubnetMask(16);
  expect(result).toBe('255.255.0.0');
});

test("'24'のサブネットマスク取得関数のテスト", () => {
  const result = getSubnetMask(24);
  expect(result).toBe('255.255.255.0');
});

test("'32'のサブネットマスク取得関数のテスト", () => {
  const result = getSubnetMask(32);
  expect(result).toBe('255.255.255.255');
});
