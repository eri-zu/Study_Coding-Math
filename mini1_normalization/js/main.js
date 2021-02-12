class Utils {
  constructor() {}

  // 値を0-1の間に変換する（正規化した値を取得する）
  // minが0でない場合もあるので、式は以下の通りになる
  norm(value, min, max) {
    return (value - min) / (max - min);
  }

  // 0-1の正規化された値を普通の値に変換する
  // minが0でない場合もあるので、式は以下の通りになる
  lerp(norm, min, max) {
    return (max - min) * norm + min;
  }

  // sourceMinからsourceMaxにある値valueをdestMinからdestMaxの値に変換する
  map(value, sourceMin, sourceMax, destMin, destMax) {
    const n = norm(value, sourceMin, sourceMax);
    return lerp(n, destMin, destMax);
  }

  // min, maxの間の最小値を算出する（最小値がmin以下の場合、minがとなる）
  clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
}
