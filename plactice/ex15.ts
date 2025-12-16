// ex15: 配列操作が読みにくい（map/filter/reduceの乱用）
// 問題点:
// - チェーンが長すぎて読みづらい
// - 中間変数がないため理解が困難
// - 複数の操作が混在している
// 期待する練習:
// - 関数の抽出
// - 変数の抽出
// - ループの分離

function processOrders(orders: any[]): any[] {
  return orders
    .filter(o => o.status === 'active')
    .map(o => ({
      ...o,
      total: o.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0),
      itemCount: o.items.reduce((count: number, item: any) => count + item.quantity, 0)
    }))
    .filter(o => o.total > 1000)
    .map(o => ({
      ...o,
      discount: o.total > 5000 ? o.total * 0.1 : o.total > 3000 ? o.total * 0.05 : 0,
      finalTotal: o.total - (o.total > 5000 ? o.total * 0.1 : o.total > 3000 ? o.total * 0.05 : 0)
    }))
    .sort((a, b) => b.finalTotal - a.finalTotal)
    .slice(0, 10)
    .map(o => ({
      id: o.id,
      customerName: o.customer.name,
      total: o.finalTotal,
      items: o.itemCount
    }));
}

function getStatistics(data: any[]): any {
  return {
    total: data.length,
    average: data.reduce((sum, item) => sum + item.value, 0) / data.length,
    max: Math.max(...data.map(item => item.value)),
    min: Math.min(...data.map(item => item.value)),
    filtered: data.filter(item => item.value > data.reduce((sum, i) => sum + i.value, 0) / data.length).length
  };
}

const orders = [
  { id: 1, status: 'active', items: [{ price: 500, quantity: 2 }], customer: { name: 'John' } },
  { id: 2, status: 'active', items: [{ price: 1000, quantity: 3 }], customer: { name: 'Jane' } }
];
const processed = processOrders(orders);
const stats = getStatistics([{ value: 10 }, { value: 20 }, { value: 30 }]);

export { processOrders, getStatistics };

