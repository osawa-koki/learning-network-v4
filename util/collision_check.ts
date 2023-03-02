import getIPAddressBits from "./getIPAddressBits";

type SubnetStruct = {
  ip: string;
  prefix: string;
}

function collision_checker(subnet: SubnetStruct, other_subnets: SubnetStruct[]): [boolean, string[]] {
  const subnet_ip = subnet.ip;
  const subnet_prefix = subnet.prefix;
  const subnet_bits = getIPAddressBits(subnet_ip);
  const subnet_bits_prefix = subnet_bits.substr(0, Number(subnet_prefix));
  const collision_subnets: string[] = [];
  for (const other_subnet of other_subnets) {
    const other_subnet_ip = other_subnet.ip;
    const other_subnet_prefix = other_subnet.prefix;
    const other_subnet_bits = getIPAddressBits(other_subnet_ip);
    const other_subnet_bits_prefix = other_subnet_bits.substr(0, Number(other_subnet_prefix));
    if (subnet_bits_prefix === other_subnet_bits_prefix) {
      collision_subnets.push(other_subnet_ip);
    }
  }
  if (collision_subnets.length > 0) {
    return [true, collision_subnets];
  }
  return [false, collision_subnets];
}
