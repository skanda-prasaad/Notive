export function random(len: number) {
  const numberPool = "0123456789";
  const letterPool = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let ans = "";

  for (let i = 0; i < len; i++) {
    if (Math.random() < 0.6) {
      ans += numberPool[Math.floor(Math.random() * numberPool.length)];
    } else {
      ans += letterPool[Math.floor(Math.random() * letterPool.length)];
    }
  }
  return ans;
}
