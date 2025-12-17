import { Order } from '../ex08';

describe('ex08: 状態があいまいなオブジェクト', () => {
  test('注文を作成', () => {
    const order = new Order();
    expect(order.status).toBe(0);
    expect(order.items).toEqual([]);
    expect(order.total).toBe(0);
    expect(order.paid).toBe(false);
    expect(order.shipped).toBe(false);
  });

  test('アイテムを追加', () => {
    const order = new Order();
    order.addItem({ price: 1000 });
    expect(order.items).toHaveLength(1);
    expect(order.total).toBe(1000);
  });

  test('複数のアイテムを追加', () => {
    const order = new Order();
    order.addItem({ price: 1000 });
    order.addItem({ price: 2000 });
    expect(order.items).toHaveLength(2);
    expect(order.total).toBe(3000);
  });

  test('支払い処理', () => {
    const order = new Order();
    order.addItem({ price: 1000 });
    order.pay();
    expect(order.paid).toBe(true);
    expect(order.status).toBe(1);
  });

  test('支払い後に発送可能', () => {
    const order = new Order();
    order.addItem({ price: 1000 });
    order.pay();
    order.ship();
    expect(order.shipped).toBe(true);
    expect(order.status).toBe(2);
  });

  test('支払い前に発送は不可', () => {
    const order = new Order();
    order.addItem({ price: 1000 });
    order.ship();
    expect(order.shipped).toBe(false);
    expect(order.status).toBe(0);
  });

  test('キャンセル処理（状態が不整合になる可能性）', () => {
    const order = new Order();
    order.addItem({ price: 1000 });
    order.pay();
    order.ship();
    order.cancel();
    expect(order.status).toBe(3);
    // 注意: paid や shipped の状態が残る可能性がある
  });

  // リファクタリング検証テスト: 元のコードと同じ結果を返すことを確認
  describe('リファクタリング検証: 計算結果の正確性', () => {
    test('初期状態が正確', () => {
      const order = new Order();
      expect(order.status).toBe(0);
      expect(order.items).toEqual([]);
      expect(order.total).toBe(0);
      expect(order.paid).toBe(false);
      expect(order.shipped).toBe(false);
    });

    test('アイテム追加の計算が正確', () => {
      const order = new Order();
      order.addItem({ price: 1000 });
      expect(order.items).toHaveLength(1);
      expect(order.total).toBe(1000);
      
      order.addItem({ price: 2000 });
      expect(order.items).toHaveLength(2);
      expect(order.total).toBe(3000);
    });

    test('支払い処理の状態遷移が正確', () => {
      const order = new Order();
      order.addItem({ price: 1000 });
      order.pay();
      expect(order.paid).toBe(true);
      expect(order.status).toBe(1);
      expect(order.total).toBe(1000); // totalは変わらない
    });

    test('発送処理の状態遷移が正確', () => {
      const order = new Order();
      order.addItem({ price: 1000 });
      order.pay();
      order.ship();
      expect(order.shipped).toBe(true);
      expect(order.status).toBe(2);
      expect(order.paid).toBe(true);
    });

    test('支払い前の発送は無効', () => {
      const order = new Order();
      order.addItem({ price: 1000 });
      order.ship();
      expect(order.shipped).toBe(false);
      expect(order.status).toBe(0);
      expect(order.paid).toBe(false);
    });

    test('キャンセル処理の状態が正確', () => {
      const order = new Order();
      order.addItem({ price: 1000 });
      order.pay();
      order.ship();
      order.cancel();
      expect(order.status).toBe(3);
      // 注意: 元のコードではpaidやshippedの状態が残る可能性がある
    });

    test('同じ操作で常に同じ結果を返す', () => {
      const order1 = new Order();
      order1.addItem({ price: 1000 });
      order1.pay();
      
      const order2 = new Order();
      order2.addItem({ price: 1000 });
      order2.pay();
      
      expect(order1.status).toBe(order2.status);
      expect(order1.paid).toBe(order2.paid);
      expect(order1.total).toBe(order2.total);
    });
  });
});

