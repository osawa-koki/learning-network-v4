export {};

import subnetIsInVNet from '../util/subnetIsInVNet';

test('サブネット・仮想ネットワークの論理関係検証関数のテスト', () => {
  {
    // 通常のケース
    const subnet_ip = '10.0.0.0';
    const subnet_prefix = '24';
    const vnet_ip = '10.0.0.0';
    const vnet_prefix = '16';
    expect(subnetIsInVNet(subnet_ip, subnet_prefix, vnet_ip, vnet_prefix)).toBe(true);
  }
  {
    // 通常のケース
    const subnet_ip = '10.0.0.1';
    const subnet_prefix = '24';
    const vnet_ip = '10.0.0.0';
    const vnet_prefix = '16';
    expect(subnetIsInVNet(subnet_ip, subnet_prefix, vnet_ip, vnet_prefix)).toBe(true);
  }
  {
    // 完全一致ケース
    const subnet_ip = '10.0.0.0';
    const subnet_prefix = '16';
    const vnet_ip = '10.0.0.0';
    const vnet_prefix = '16';
    expect(subnetIsInVNet(subnet_ip, subnet_prefix, vnet_ip, vnet_prefix)).toBe(true);
  }
  {
    // 差が大きいケース
    const subnet_ip = '10.0.0.0';
    const subnet_prefix = '24';
    const vnet_ip = '10.0.0.0';
    const vnet_prefix = '8';
    expect(subnetIsInVNet(subnet_ip, subnet_prefix, vnet_ip, vnet_prefix)).toBe(true);
  }
  {
    // 理論上は可能なケース
    const subnet_ip = '10.255.0.0';
    const subnet_prefix = '24';
    const vnet_ip = '10.0.0.0';
    const vnet_prefix = '8';
    expect(subnetIsInVNet(subnet_ip, subnet_prefix, vnet_ip, vnet_prefix)).toBe(true);
  }
  {
    // アウトケース
    const subnet_ip = '10.255.0.0';
    const subnet_prefix = '16';
    const vnet_ip = '10.0.0.0';
    const vnet_prefix = '16';
    expect(subnetIsInVNet(subnet_ip, subnet_prefix, vnet_ip, vnet_prefix)).toBe(false);
  }
  {
    // アウトケース
    const subnet_ip = '10.0.255.0';
    const subnet_prefix = '24';
    const vnet_ip = '10.0.0.0';
    const vnet_prefix = '24';
    expect(subnetIsInVNet(subnet_ip, subnet_prefix, vnet_ip, vnet_prefix)).toBe(false);
  }
});
