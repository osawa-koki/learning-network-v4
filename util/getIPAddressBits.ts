
function getIPAddressBits(ipAddress: string): string {
  const ipAddressParts = ipAddress.split(".");
  const binaryParts = ipAddressParts.map(part => Number(part).toString(2).padStart(8, "0"));
  return binaryParts.join(".");
}

export default getIPAddressBits;
