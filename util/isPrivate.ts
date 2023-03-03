import isValidIPv4 from "./isValidIPv4";

/**
 * プライベートIPアドレスかどうかを判定する
 * @param ipAddress IPアドレス
 * @returns プライベートIPアドレスの場合は、プライベートIPアドレスの種類を返す。それ以外の場合は、適切な値を返す。
 */
function isPrivate(ipAddress: string): 'private-A' | 'private-B' | 'private-C' | 'public' | 'special' | null {
  const ipArray = ipAddress.split(".");
  const first = parseInt(ipArray[0], 10);
  const second = parseInt(ipArray[1], 10);

  const specialIPs = [
    '127.0.0.1',
    '192.0.2.0',
    '0.0.0.0',
    '255.255.255.255',
  ];

  if (specialIPs.includes(ipAddress)) {
    return 'special';
  }
  if (isValidIPv4(ipAddress) === false) {
    return null;
  }
  if (first === 10) {
    return 'private-A';
  }
  if (first === 172 && second >= 16 && second <= 31) {
    return 'private-B';
  }
  if (first === 192 && second === 168) {
    return 'private-C';
  }
  return 'public';
}

export default isPrivate;
