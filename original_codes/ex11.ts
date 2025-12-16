// ex11: エラー処理が雑
// 問題点:
// - エラーを戻り値で握りつぶしている
// - エラーの種類が区別できない
// - nullチェックが不十分
// - エラーハンドリングが一貫していない
// 期待する練習:
// - 例外の整理
// - エラーハンドリングの改善
// - ガード節の導入

function divide(a: number, b: number): number {
  if (b === 0) {
    return -1; // エラーを数値で返す
  }
  return a / b;
}

function findUser(users: any[], id: number): any {
  for (const user of users) {
    if (user.id === id) {
      return user;
    }
  }
  return null; // 見つからない場合の処理が呼び出し側に委ねられる
}

function parseDate(dateStr: string): Date {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return new Date(0); // 無効な日付をデフォルト値で返す
  }
  return date;
}

function calculateTotal(items: any[]): number {
  let total = 0;
  for (const item of items) {
    if (item.price === undefined) {
      continue; // エラーを無視
    }
    total += item.price;
  }
  return total;
}

const result1 = divide(10, 0); // -1が返るが、エラーかどうか不明
const user = findUser([{ id: 1, name: 'John' }], 999); // null
const date = parseDate('invalid'); // 無効な日付
const total = calculateTotal([{ price: 100 }, {}, { price: 200 }]); // エラーが無視される

export { divide, findUser, parseDate, calculateTotal };

