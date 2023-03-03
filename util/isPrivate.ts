import isValidIPv4 from "./isValidIPv4";

/**
 * プライベートIPアドレスかどうかを判定する
 * @param ipAddress IPアドレス
 * @returns プライベートIPアドレスの場合は、'private-A' | 'private-B' | 'private-C'、それ以外は'public'を返す。不正なIPアドレスの場合はnullを返す。
 */
function isPrivate(ipAddress: string): 'public' | 'private-A' | 'private-B' | 'private-C' | null {
  const ipArray = ipAddress.split(".");
  const first = parseInt(ipArray[0], 10);
  const second = parseInt(ipArray[1], 10);

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
