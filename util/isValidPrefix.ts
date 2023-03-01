
function isValidIPv4(prefix: string): boolean {
  const num = parseInt(prefix);
  return !isNaN(num) && num >= 0 && num <= 32;
}

export default isValidIPv4;
