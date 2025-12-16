// ex26: 数値計算の精度問題と丸め誤差
// 問題点:
// - 浮動小数点の計算が不正確
// - 丸め処理が不適切
// - 金額計算で精度が失われる
// - 比較が不正確
// 期待する練習:
// - 関数の抽出
// - 計算ロジックの改善
// - 定数の抽出

function calculateTax(amount: number): number {
  return amount * 0.1; // 浮動小数点の誤差が発生する可能性
}

function calculateTotal(items: any[]): number {
  let total = 0;
  for (const item of items) {
    total += item.price * item.quantity; // 累積誤差が発生
  }
  return total;
}

function applyDiscount(price: number, discountRate: number): number {
  return price * (1 - discountRate); // 0.1 * 3 = 0.30000000000000004 のような誤差
}

function comparePrices(price1: number, price2: number): boolean {
  return price1 === price2; // 浮動小数点の比較が不正確
}

function calculatePercentage(part: number, total: number): number {
  return (part / total) * 100; // 割り算の誤差
}

function roundPrice(price: number): number {
  return Math.round(price); // 適切でない場合がある
}

const tax = calculateTax(1000);
const total = calculateTotal([{ price: 0.1, quantity: 3 }, { price: 0.2, quantity: 2 }]);
const discounted = applyDiscount(1000, 0.1);
const isEqual = comparePrices(0.1 + 0.2, 0.3);
const percentage = calculatePercentage(1, 3);
const rounded = roundPrice(99.5);

export { calculateTax, calculateTotal, applyDiscount, comparePrices, calculatePercentage, roundPrice };

