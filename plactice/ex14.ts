// ex14: 料金計算の複雑なロジック
// 問題点:
// - 料金計算のロジックが複雑
// - 条件分岐が多く読みづらい
// - マジックナンバーが散在
// - 計算の意図が不明確
// 期待する練習:
// - 関数の抽出
// - 条件記述の単純化
// - マジックナンバーの置換

function calculateSubscriptionFee(plan: string, months: number, isAnnual: boolean, hasCoupon: boolean): number {
  let basePrice = 0;
  if (plan === 'basic') {
    basePrice = 980;
  } else if (plan === 'standard') {
    basePrice = 1980;
  } else if (plan === 'premium') {
    basePrice = 2980;
  }
  
  let monthlyPrice = basePrice;
  
  if (isAnnual) {
    monthlyPrice = basePrice * 12 * 0.8 / 12;
  } else if (months >= 6) {
    monthlyPrice = basePrice * 0.9;
  } else if (months >= 3) {
    monthlyPrice = basePrice * 0.95;
  }
  
  let total = monthlyPrice * months;
  
  if (hasCoupon) {
    if (total > 10000) {
      total = total - 1000;
    } else if (total > 5000) {
      total = total - 500;
    } else {
      total = total - 200;
    }
  }
  
  if (total < 0) {
    total = 0;
  }
  
  return Math.floor(total);
}

function calculateTax(amount: number, region: string): number {
  let taxRate = 0.1;
  if (region === 'tokyo') {
    taxRate = 0.1;
  } else if (region === 'osaka') {
    taxRate = 0.1;
  } else if (region === 'okinawa') {
    taxRate = 0.08;
  }
  return Math.floor(amount * taxRate);
}

const fee = calculateSubscriptionFee('premium', 12, true, true);
const tax = calculateTax(fee, 'tokyo');

export { calculateSubscriptionFee, calculateTax };

