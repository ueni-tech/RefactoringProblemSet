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

function processOrder(items: any[], isMember: boolean, hasCoupon: boolean): string {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    let price = items[i].price;
    if (items[i].category === 'electronics') {
      price = price * 0.9;
    }
    if (items[i].quantity > 5) {
      price = price * 0.95;
    }
    total += price * items[i].quantity;
  }
  
  if (isMember) {
    total = total * 0.9;
  }
  
  if (hasCoupon) {
    total = total - 500;
  }
  
  if (total < 0) {
    total = 0;
  }
  
  let tax = total * 0.1;
  let final = total + tax;
  
  if (final > 10000) {
    final = final - 300;
  }
  
  return '合計: ' + Math.floor(final) + '円';
}

const order = [
  { price: 2000, quantity: 3, category: 'electronics' },
  { price: 1500, quantity: 2, category: 'books' }
];
const result = processOrder(order, true, true);

export { processOrder };

