
function getSubnetMask(prefixLength: number): string {
  if (prefixLength < 0 || prefixLength > 32) {
    throw new Error("Invalid prefix length");
  }

  const subnetMaskArray = Array(4)
    .fill(0)
    .map((_, i) => {
      const bits = Math.min(prefixLength, 8);
      prefixLength -= bits;
      return 256 - Math.pow(2, 8 - bits);
    });

  const subnetMask = subnetMaskArray.join(".");
  return subnetMask;
}

export default getSubnetMask;
