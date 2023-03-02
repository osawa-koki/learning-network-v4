import getIpDetails from "./getIpDetails";
import getIPAddressBits from "./getIPAddressBits";

function getNextSubnetIp(ip, prefixLength) {
  const { broadcastAddress } = getIpDetails(ip, prefixLength);
  const broadcastAddressBits = getIPAddressBits(broadcastAddress);
  const nextSubnetIpBits = addOneToBitString(broadcastAddressBits);
  const nextSubnetIp = nextSubnetIpBits.split(".").map((bit, _) => parseInt(bit, 2)).join(".");
  return nextSubnetIp;
}

function addOneToBitString(str: string): string {
  const len = str.length;
  let carry = 1;
  let result = "";
  for (let i = len - 1; i >= 0; i--) {
    let bit = str.charAt(i);
    if (bit === "0" && carry === 1) {
      bit = "1";
      carry = 0;
    } else if (bit === "1" && carry === 1) {
      bit = "0";
      carry = 1;
    }
    result = bit + result;
  }
  if (carry === 1) {
    result = "1" + result;
  }
  return result;
}

export default getNextSubnetIp;
export { addOneToBitString };
