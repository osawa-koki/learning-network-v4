
function isValidIPv4(ipAddress: string): boolean {
  const ipAddressParts = ipAddress.split(".");
  if (ipAddressParts.length !== 4) {
    return false;
  }
  for (const part of ipAddressParts) {
    const numericPart = parseInt(part);
    if (numericPart.toString() !== part) return false; // parseInt("10A") === 10
    if (isNaN(numericPart) || numericPart < 0 || numericPart > 255) {
      return false;
    }
  }
  return true;
}

export default isValidIPv4;
