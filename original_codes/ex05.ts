// ex05: フラグ引数の乱用
// 問題点:
// - boolean引数が多く、呼び出し側の意図が不明確
// - 条件分岐が複雑になる
// - 関数の責務が曖昧
// 期待する練習:
// - フラグ引数の削除
// - 関数の分離
// - ポリモーフィズムの導入

function formatPrice(price: number, includeTax: boolean, useYen: boolean, showDecimals: boolean): string {
  let result = price;
  
  if (includeTax) {
    result = result * 1.1;
  }
  
  if (useYen) {
    if (showDecimals) {
      return result.toFixed(2) + '円';
    } else {
      return Math.floor(result) + '円';
    }
  } else {
    if (showDecimals) {
      return '$' + result.toFixed(2);
    } else {
      return '$' + Math.floor(result);
    }
  }
}

function calculateTotal(items: any[], applyDiscount: boolean, includeShipping: boolean, isMember: boolean): number {
  let total = 0;
  for (const item of items) {
    total += item.price;
  }
  
  if (applyDiscount) {
    if (isMember) {
      total = total * 0.9;
    } else {
      total = total * 0.95;
    }
  }
  
  if (includeShipping) {
    total += 500;
  }
  
  return total;
}

const price1 = formatPrice(1000, true, true, false);
const price2 = formatPrice(2000, false, false, true);
const total = calculateTotal([{ price: 1000 }, { price: 2000 }], true, true, false);

export { formatPrice, calculateTotal };

