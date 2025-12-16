// ex19: コメントアウトされたコードとデッドコード
// 問題点:
// - 不要なコメントアウトコードが残っている
// - デッドコードが存在する
// - 意図が不明確
// - コードが汚れている
// 期待する練習:
// - デッドコードの削除
// - 不要なコードの削除
// - コードの整理

function calculatePrice(price: number, quantity: number): number {
  // let discount = 0;
  // if (quantity > 10) {
  //   discount = 0.1;
  // }
  
  let total = price * quantity;
  
  // 旧ロジック
  // if (total > 5000) {
  //   total = total * 0.9;
  // }
  
  if (total > 10000) {
    total = total * 0.85;
  }
  
  // 未使用の変数
  const taxRate = 0.1;
  // const tax = total * taxRate;
  
  return total;
}

function processData(data: any[]): any[] {
  const result: any[] = [];
  
  // 古い実装
  // for (let i = 0; i < data.length; i++) {
  //   result.push(data[i] * 2);
  // }
  
  for (const item of data) {
    if (item.value) {
      result.push(item);
    }
  }
  
  // デバッグ用（残っている）
  // console.log('Processed:', result);
  
  return result;
}

function unusedFunction(): void {
  // この関数は呼ばれていない
  const x = 10;
  const y = 20;
  const z = x + y;
}

const price = calculatePrice(1000, 5);
const processed = processData([{ value: 1 }, { value: 2 }]);

export { calculatePrice, processData };

