export {};

import getIPAddressBits from '../util/getIPAddressBits';

test('IPアドレスのバイナリ表現を取得する関数のテスト', () => {
  expect(getIPAddressBits('0.0.0.0')).toBe('00000000.00000000.00000000.00000000');
  expect(getIPAddressBits('10.0.0.0')).toBe('00001010.00000000.00000000.00000000');
  expect(getIPAddressBits('10.10.10.10')).toBe('00001010.00001010.00001010.00001010');
  expect(getIPAddressBits('10.10.255.255')).toBe('00001010.00001010.11111111.11111111');
  expect(getIPAddressBits('255.255.255.255')).toBe('11111111.11111111.11111111.11111111');
});
