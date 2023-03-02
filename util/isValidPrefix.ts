
function isValidPrefix(prefix: string): boolean {
  const num = parseInt(prefix);
  if (num !== parseFloat(prefix)) {
    return false; // 少数はNG
  }
  return !isNaN(num) && num >= 0 && num <= 32;
}

export default isValidPrefix;
