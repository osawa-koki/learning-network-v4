
/**
 * サブネットマスクを取得する
 * @param prefix サブネットマスクのプレフィックス値
 * @returns サブネットマスク(`.`区切り)
 */
function getSubnetMask(prefix: number): string {
  if (prefix < 0 || prefix > 32) {
    return "";
  }

  const subnetMaskArray = Array(4)
    .fill(0)
    .map((_, i) => {
      const bits = Math.min(prefix, 8);
      prefix -= bits;
      return 256 - Math.pow(2, 8 - bits);
    });

  const subnetMask = subnetMaskArray.join(".");
  return subnetMask;
}

export default getSubnetMask;
