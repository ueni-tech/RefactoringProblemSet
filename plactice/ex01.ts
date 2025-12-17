// ex01: 長すぎる関数と責務の混在
// 問題点:
// - 1つの関数が複数の責務を持っている（計算、フォーマット、検証）
// - 関数が長すぎて理解が困難
// - マジックナンバーが散在している
// - 条件分岐が複雑で読みづらい
// 期待する練習:
// - 関数の抽出
// - 変数の抽出
// - マジックナンバーの置換
// - 条件記述の単純化

const discountRateForElectronics = 0.9;
const discountRateForBuyInBulk = 0.95;
const discountRateForMember = 0.9;
const discountPriceForCoupon = 500;
const discountPriceForHighValue = 300;
const thresholdForHighValue = 10000;
const taxRate = 0.1;

function calculateItemPrice(item: any): number {
  let price = item.price;

  if (item.category === "electronics") {
    price = price * discountRateForElectronics;
  }

  if (item.quantity > 5) {
    price = price * discountRateForBuyInBulk;
  }

  return price * item.quantity;
}

function calculateTotal(items: any[]): number {
  let result = 0;

  for (let i = 0; i < items.length; i++) {
    result += calculateItemPrice(items[i]);
  }

  return result;
}

function applyDiscounts(total: number, isMember: boolean, hasCoupon: boolean): number {
  let discountTotal = total;

  if (isMember) {
    discountTotal = discountTotal * discountRateForMember;
  }

  if (hasCoupon) {
    discountTotal = discountTotal - discountPriceForCoupon;
  }

  if (discountTotal < 0) {
    discountTotal = 0;
  }

  return discountTotal;
}

function applyTax(total: number): number {
  let tax = total * taxRate;
  let TotalWithTax = total + tax;

  return TotalWithTax;
}

function applyHighValeDiscount(final: number): number {
  if (final > thresholdForHighValue) {
    final = final - discountPriceForHighValue;
  }

  return final;
}

function processOrder(items: any[], isMember: boolean, hasCoupon: boolean): string {
  let total = calculateTotal(items);
  total = applyDiscounts(total, isMember, hasCoupon);
  let final = applyTax(total);
  final = applyHighValeDiscount(final);

  return "合計: " + Math.floor(final) + "円";
}

const order = [
  { price: 2000, quantity: 3, category: "electronics" },
  { price: 1500, quantity: 2, category: "books" },
];
const result = processOrder(order, true, true);

export { processOrder };
