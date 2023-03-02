
/**
 * サブネットマスクのプレフィックスが有効かどうかを判定する
 * @param prefix 検査対象のプレフィックス
 * @returns 有効なプレフィックスの場合はtrue、そうでない場合はfalse
 */
function isValidPrefix(prefix: string): boolean {
  const num = parseInt(prefix);
  if (num !== parseFloat(prefix)) {
    return false; // 少数はNG
  }
  return !isNaN(num) && num >= 0 && num <= 32;
}

export default isValidPrefix;
