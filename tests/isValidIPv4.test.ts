export {};

import isValidIPv4 from '../util/isValidIPv4';

test("IPv4アドレスの検証関数のテスト", () => {
  expect(isValidIPv4('10.0.0.0')).toBe(true);
  expect(isValidIPv4('10.10.10.10')).toBe(true);
  expect(isValidIPv4('255.255.255.255')).toBe(true);

  expect(isValidIPv4('10.0.0.0A')).toBe(false);
  expect(isValidIPv4('10A.0A.0A.0A')).toBe(false);
  expect(isValidIPv4('255.255.255.256')).toBe(false);
  expect(isValidIPv4('255.255.255.A')).toBe(false);
  expect(isValidIPv4('255.255.255')).toBe(false);
  expect(isValidIPv4('255.255.255.')).toBe(false);
  expect(isValidIPv4('255.255.255.255.255')).toBe(false);
});
