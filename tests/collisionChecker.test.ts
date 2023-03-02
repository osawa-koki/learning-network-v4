import getIPAddressBits from "../util/getIPAddressBits";

type SubnetStruct = {
  id: string;
  ip: string;
  prefix: string;
};

function collisionChecker(subnet: SubnetStruct, other_subnets: SubnetStruct[]): [boolean, string[]] {
  const subnet_ip = subnet.ip;
  const subnet_prefix = subnet.prefix;
  const subnet_bits = getIPAddressBits(subnet_ip);
  const subnet_mask_bits = '1'.repeat(Number(subnet_prefix)).padEnd(32, '0');
  const subnet_network_bits = (parseInt(subnet_bits, 2) & parseInt(subnet_mask_bits, 2)).toString(2).padStart(32, '0');

  const collision_subnet_ids: string[] = [];

  for (const other_subnet of other_subnets) {
    const other_subnet_ip = other_subnet.ip;
    const other_subnet_prefix = other_subnet.prefix;
    const other_subnet_bits = getIPAddressBits(other_subnet_ip);
    const other_subnet_mask_bits = '1'.repeat(Number(other_subnet_prefix)).padEnd(32, '0');
    const other_subnet_network_bits = (parseInt(other_subnet_bits, 2) & parseInt(other_subnet_mask_bits, 2)).toString(2).padStart(32, '0');

    if (subnet_network_bits === other_subnet_network_bits && subnet_prefix === other_subnet_prefix && subnet_ip !== other_subnet_ip) {
      collision_subnet_ids.push(other_subnet.id);
    }
  }

  if (collision_subnet_ids.length > 0) {
    return [true, collision_subnet_ids];
  }
  return [false, collision_subnet_ids];
}

export default collisionChecker;
export type { SubnetStruct };
