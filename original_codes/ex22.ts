// ex22: 条件式の重複
// 問題点:
// - 同じ条件式が複数箇所に出現
// - 変更時に複数箇所を修正する必要がある
// - 読みづらい
// 期待する練習:
// - 変数の抽出
// - 関数の抽出
// - 重複の排除

function validateOrder(order: any): boolean {
  if (order.items && order.items.length > 0 && order.items.length <= 10) {
    if (order.customer && order.customer.age >= 18 && order.customer.age <= 100) {
      if (order.total && order.total > 0 && order.total <= 1000000) {
        return true;
      }
    }
  }
  return false;
}

function processOrder(order: any): any {
  if (order.items && order.items.length > 0 && order.items.length <= 10) {
    let total = 0;
    for (const item of order.items) {
      total += item.price;
    }
    order.total = total;
  }
  
  if (order.customer && order.customer.age >= 18 && order.customer.age <= 100) {
    order.customer.verified = true;
  }
  
  if (order.total && order.total > 0 && order.total <= 1000000) {
    order.status = 'valid';
  }
  
  return order;
}

function displayOrder(order: any): string {
  let message = '';
  if (order.items && order.items.length > 0 && order.items.length <= 10) {
    message += 'Items: ' + order.items.length + '\n';
  }
  if (order.customer && order.customer.age >= 18 && order.customer.age <= 100) {
    message += 'Customer: ' + order.customer.name + '\n';
  }
  if (order.total && order.total > 0 && order.total <= 1000000) {
    message += 'Total: ' + order.total;
  }
  return message;
}

const order = {
  items: [{ price: 1000 }, { price: 2000 }],
  customer: { name: 'John', age: 25 },
  total: 3000
};
const isValid = validateOrder(order);
const processed = processOrder(order);
const display = displayOrder(order);

export { validateOrder, processOrder, displayOrder };

