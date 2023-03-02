export {};

import getIpDetails from '../util/getIpDetails';

test("'10.0.0.0/16'のCIDR詳細算出関数のテスト", () => {
  const result = getIpDetails('10.0.0.0', 16);
  expect(result.networkAddress).toBe('10.0.0.0');
  expect(result.broadcastAddress).toBe('10.0.255.255');
  expect(result.ipAddressStart).toBe('10.0.0.1');
  expect(result.ipAddressEnd).toBe('10.0.255.254');
});

test("'10.0.0.0/24'のCIDR詳細算出関数のテスト", () => {
  const result = getIpDetails('10.0.0.0', 24);
  expect(result.networkAddress).toBe('10.0.0.0');
  expect(result.broadcastAddress).toBe('10.0.0.255');
  expect(result.ipAddressStart).toBe('10.0.0.1');
  expect(result.ipAddressEnd).toBe('10.0.0.254');
});

test("'10.0.1.0/16'のCIDR詳細算出関数のテスト", () => {
  const result = getIpDetails('10.0.0.0', 16);
  expect(result.networkAddress).toBe('10.0.0.0');
  expect(result.broadcastAddress).toBe('10.0.255.255');
  expect(result.ipAddressStart).toBe('10.0.0.1');
  expect(result.ipAddressEnd).toBe('10.0.255.254');
});
