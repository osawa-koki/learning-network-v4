import getIpDetails from './getIpDetails';
import getIPAddressBits from './getIPAddressBits';

/**
 * サブネットがVNetに含まれるかどうかを判定する
 * @param subnet_ip サブネットのIPアドレス
 * @param subnet_prefix サブネットのプレフィックス
 * @param vnet_ip VNetのIPアドレス
 * @param vnet_prefix VNetのプレフィックス
 * @returns サブネットがVNetに含まれるかどうかを表す真偽値
 */
function subnetIsInVNet(subnet_ip: string, subnet_prefix: string, vnet_ip: string, vnet_prefix: string): boolean {
  // サブネットがVNetに含まれるかどうかを判定する
  const subnet_from = getIpDetails(subnet_ip, parseInt(subnet_prefix)).networkAddress;
  const subnet_to = getIpDetails(subnet_ip, parseInt(subnet_prefix)).broadcastAddress;
  const vnet_from = getIpDetails(vnet_ip, parseInt(vnet_prefix)).networkAddress;
  const vnet_to = getIpDetails(vnet_ip, parseInt(vnet_prefix)).broadcastAddress;

  if (getIPAddressBits(subnet_from) >= getIPAddressBits(vnet_from) && getIPAddressBits(subnet_to) <= getIPAddressBits(vnet_to)) {
    return true;
  }

  return false;
}

export default subnetIsInVNet;
