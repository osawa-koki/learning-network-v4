
function getIpDetails(ipAddress: string, prefix: number): {
  networkAddress: string,
  broadcastAddress: string,
  ipAddressStart: string,
  ipAddressEnd: string
} {
  // ipAddressとprefixからサブネットマスクを算出する
  const subnetMask = (0xffffffff << (32 - prefix)) >>> 0;

  // ipAddressを数値に変換する
  const ipAsNumber = ipAddress.split('.')
    .reduce((result, value) => (result << 8) + parseInt(value), 0) >>> 0;

  // ネットワークアドレスを算出する
  const networkAddress = (ipAsNumber & subnetMask) >>> 0;

  // ブロードキャストアドレスを算出する
  const broadcastAddress = (ipAsNumber | (~subnetMask)) >>> 0;

  // IPアドレス範囲の開始アドレスを算出する
  const ipAddressStart = (networkAddress + 1) >>> 0;

  // IPアドレス範囲の終了アドレスを算出する
  const ipAddressEnd = (broadcastAddress - 1) >>> 0;

  // 各アドレスを文字列に変換して返す
  return {
    networkAddress: [(networkAddress >> 24) & 0xff, (networkAddress >> 16) & 0xff, (networkAddress >> 8) & 0xff, networkAddress & 0xff].join('.'),
    broadcastAddress: [(broadcastAddress >> 24) & 0xff, (broadcastAddress >> 16) & 0xff, (broadcastAddress >> 8) & 0xff, broadcastAddress & 0xff].join('.'),
    ipAddressStart: [(ipAddressStart >> 24) & 0xff, (ipAddressStart >> 16) & 0xff, (ipAddressStart >> 8) & 0xff, ipAddressStart & 0xff].join('.'),
    ipAddressEnd: [(ipAddressEnd >> 24) & 0xff, (ipAddressEnd >> 16) & 0xff, (ipAddressEnd >> 8) & 0xff, ipAddressEnd & 0xff].join('.')
  };
}

export default getIpDetails;
