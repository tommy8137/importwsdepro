/**
 * 取得一條弧線的兩個座標
 * @param {Number} 起始的角度
 * @param {Number} 結束的角度
 * @param {Number} 半徑
 * @param {Number} x 中心點x
 * @param {Number} y 中心點y
 */
export function getAnglePoint(startAngle, endAngle, radius, x, y) {
  const x1 = x + radius * Math.cos(Math.PI * startAngle / 180); // 計算起點x座標
  const y1 = y + radius * Math.sin(Math.PI * startAngle / 180); // 計算起點y座標
  const x2 = x + radius * Math.cos(Math.PI * endAngle / 180); // 計算終點x座標
  const y2 = y + radius * Math.sin(Math.PI * endAngle / 180); // 計算終點y座標

  return { x1, y1, x2, y2 };
}

/**
 * 弧度轉角度
 * @param {float} radian
 */
export function getAngleByRadian(radian) {
  return radian / Math.PI * 180;
}

export default {};
