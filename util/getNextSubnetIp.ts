import getIpDetails from "./getIpDetails";
import getIPAddressBits from "./getIPAddressBits";

/**
 * 次に使用できるサブネットのIPアドレスを取得する
 * @param ip 最後のサブネットのIPアドレス
 * @param prefix サブネットマスクのプレフィックス
 * @returns 次に使用できるサブネットのIPアドレス
 */
function getNextSubnetIp(ip: string, prefix: string) {
  const { broadcastAddress } = getIpDetails(ip, parseInt(prefix));
  const broadcastAddressBits = getIPAddressBits(broadcastAddress);
  const nextSubnetIpBits = addOneToBitString(broadcastAddressBits);
  const nextSubnetIp = nextSubnetIpBits.split(".").map((bit, _) => parseInt(bit, 2)).join(".");
  return nextSubnetIp;
}

/**
 * 2進数の文字列を1つ加算する
 * @param str 2進数の文字列
 * @returns 加算した結果の2進数の文字列
 */
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
