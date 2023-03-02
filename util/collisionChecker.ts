import getIPAddressBits from "./getIPAddressBits";
import getIpDetails from "./getIpDetails";

type SubnetStruct = {
  id: string;
  ip: string;
  prefix: string;
};

function collisionChecker(subnet: SubnetStruct, other_subnets: SubnetStruct[]): string[] {
  const collision_subnet_ids: string[] = [];
  const subnetDetails = getIpDetails(subnet.ip, parseInt(subnet.prefix));
  const networkAddress = subnetDetails.networkAddress;
  const broadcastAddress = subnetDetails.broadcastAddress;
  const networkAddressBits = getIPAddressBits(networkAddress);
  const broadcastAddressBits = getIPAddressBits(broadcastAddress);

  for (const other_subnet of other_subnets) {
    if (other_subnet.id === subnet.id) {
      continue;
    }
    const other_subnetDetails = getIpDetails(other_subnet.ip, parseInt(other_subnet.prefix));
    const other_networkAddress = other_subnetDetails.networkAddress;
    const other_broadcastAddress = other_subnetDetails.broadcastAddress;
    const other_networkAddressBits = getIPAddressBits(other_networkAddress);
    const other_broadcastAddressBits = getIPAddressBits(other_broadcastAddress);

    if (
      (networkAddressBits <= other_networkAddressBits &&
        other_networkAddressBits <= broadcastAddressBits) ||
      (networkAddressBits <= other_broadcastAddressBits &&
        other_broadcastAddressBits <= broadcastAddressBits)
    ) {
      collision_subnet_ids.push(other_subnet.id);
    }
  }

  return collision_subnet_ids;
}

export default collisionChecker;
export type { SubnetStruct };
