
interface CIDRRanges {
  networkAddress: string;
  broadcastAddress: string;
  ipAddressStart: string;
  ipAddressEnd: string;
}

function getCIDRRanges(ipAddress: string, prefixLength: number): CIDRRanges {
  const ipArray = ipAddress.split(".").map(Number);
  const subnetMaskArray = Array(4)
    .fill(0)
    .map((_, i) => (i < prefixLength ? 255 : 0));

  const networkAddressArray = ipArray.map((part, i) => part & subnetMaskArray[i]);
  const networkAddress = networkAddressArray.join(".");

  const wildcardMaskArray = subnetMaskArray.map(part => 255 - part);
  const broadcastAddressArray = ipArray.map((part, i) => part | wildcardMaskArray[i]);
  const broadcastAddress = broadcastAddressArray.join(".");

  const ipAddressStartArray = [...networkAddressArray];
  ipAddressStartArray[3]++; // increment the last octet to get the start address
  const ipAddressStart = ipAddressStartArray.join(".");

  const ipAddressEndArray = [...broadcastAddressArray];
  ipAddressEndArray[3]--; // decrement the last octet to get the end address
  const ipAddressEnd = ipAddressEndArray.join(".");

  return { networkAddress, broadcastAddress, ipAddressStart, ipAddressEnd };
}

export default getCIDRRanges;
export type { CIDRRanges };
