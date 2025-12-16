// ex08: 状態があいまいなオブジェクト
// 問題点:
// - オブジェクトの状態が不明確
// - 無効な状態の組み合わせが可能
// - 型で制約できない
// - 状態遷移が不明確
// 期待する練習:
// - 型で意図を表現
// - データのカプセル化
// - 状態の明確化

class Order {
  status: number;
  items: any[];
  total: number;
  paid: boolean;
  shipped: boolean;
  
  constructor() {
    this.status = 0;
    this.items = [];
    this.total = 0;
    this.paid = false;
    this.shipped = false;
  }
  
  addItem(item: any): void {
    this.items.push(item);
    this.total += item.price;
  }
  
  pay(): void {
    this.paid = true;
    this.status = 1;
  }
  
  ship(): void {
    if (this.paid) {
      this.shipped = true;
      this.status = 2;
    }
  }
  
  cancel(): void {
    this.status = 3;
    // paid や shipped の状態が残る可能性がある
  }
}

const order = new Order();
order.addItem({ price: 1000 });
order.pay();
order.ship();
order.cancel(); // 無効な状態になる可能性

export { Order };

