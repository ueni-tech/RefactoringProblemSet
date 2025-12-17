import { validateOrder, processOrder, displayOrder } from '../ex22';

describe('ex22: 条件式の重複', () => {
  describe('validateOrder', () => {
    test('有効な注文', () => {
      const order = {
        items: [{ price: 1000 }, { price: 2000 }],
        customer: { name: 'John', age: 25 },
        total: 3000
      };
      expect(validateOrder(order)).toBe(true);
    });

    test('アイテム数が0の場合は無効', () => {
      const order = {
        items: [],
        customer: { name: 'John', age: 25 },
        total: 0
      };
      expect(validateOrder(order)).toBe(false);
    });

    test('アイテム数が10超の場合は無効', () => {
      const order = {
        items: Array(11).fill({ price: 100 }),
        customer: { name: 'John', age: 25 },
        total: 1100
      };
      expect(validateOrder(order)).toBe(false);
    });

    test('年齢が18未満の場合は無効', () => {
      const order = {
        items: [{ price: 1000 }],
        customer: { name: 'John', age: 17 },
        total: 1000
      };
      expect(validateOrder(order)).toBe(false);
    });

    test('年齢が100超の場合は無効', () => {
      const order = {
        items: [{ price: 1000 }],
        customer: { name: 'John', age: 101 },
        total: 1000
      };
      expect(validateOrder(order)).toBe(false);
    });
  });

  describe('processOrder', () => {
    test('注文を処理', () => {
      const order = {
        items: [{ price: 1000 }, { price: 2000 }],
        customer: { name: 'John', age: 25 },
        total: 0
      };
      const processed = processOrder(order);
      expect(processed.total).toBe(3000);
      expect(processed.customer.verified).toBe(true);
      expect(processed.status).toBe('valid');
    });
  });

  describe('displayOrder', () => {
    test('注文情報を表示', () => {
      const order = {
        items: [{ price: 1000 }, { price: 2000 }],
        customer: { name: 'John', age: 25 },
        total: 3000
      };
      const display = displayOrder(order);
      expect(display).toContain('Items:');
      expect(display).toContain('Customer:');
      expect(display).toContain('Total:');
    });
  });

  // リファクタリング検証テスト: 元のコードと同じ結果を返すことを確認
  describe('リファクタリング検証: 計算結果の正確性', () => {
    describe('validateOrder: 様々なパターンで正確な結果を返す', () => {
      test('有効な注文', () => {
        const order = {
          items: [{ price: 1000 }, { price: 2000 }],
          customer: { name: 'John', age: 25 },
          total: 3000
        };
        expect(validateOrder(order)).toBe(true);
      });

      test('アイテム数が0の場合は無効', () => {
        const order = {
          items: [],
          customer: { name: 'John', age: 25 },
          total: 0
        };
        expect(validateOrder(order)).toBe(false);
      });

      test('アイテム数が10超の場合は無効', () => {
        const order = {
          items: Array(11).fill({ price: 100 }),
          customer: { name: 'John', age: 25 },
          total: 1100
        };
        expect(validateOrder(order)).toBe(false);
      });

      test('年齢が18未満の場合は無効', () => {
        const order = {
          items: [{ price: 1000 }],
          customer: { name: 'John', age: 17 },
          total: 1000
        };
        expect(validateOrder(order)).toBe(false);
      });

      test('年齢が100超の場合は無効', () => {
        const order = {
          items: [{ price: 1000 }],
          customer: { name: 'John', age: 101 },
          total: 1000
        };
        expect(validateOrder(order)).toBe(false);
      });

      test('同じ入力で常に同じ結果を返す', () => {
        const order = {
          items: [{ price: 1000 }, { price: 2000 }],
          customer: { name: 'John', age: 25 },
          total: 3000
        };
        expect(validateOrder(order)).toBe(validateOrder(order));
      });
    });

    describe('processOrder: 様々なパターンで正確な結果を返す', () => {
      test('注文を処理', () => {
        const order = {
          items: [{ price: 1000 }, { price: 2000 }],
          customer: { name: 'John', age: 25 },
          total: 0
        };
        const processed = processOrder(order);
        expect(processed.total).toBe(3000);
        expect(processed.customer.verified).toBe(true);
        expect(processed.status).toBe('valid');
      });

      test('同じ入力で常に同じ結果を返す', () => {
        const order = {
          items: [{ price: 1000 }, { price: 2000 }],
          customer: { name: 'John', age: 25 },
          total: 0
        };
        const processed1 = processOrder(order);
        const processed2 = processOrder(order);
        expect(processed1).toEqual(processed2);
      });
    });

    describe('displayOrder: 様々なパターンで正確な結果を返す', () => {
      test('注文情報を表示', () => {
        const order = {
          items: [{ price: 1000 }, { price: 2000 }],
          customer: { name: 'John', age: 25 },
          total: 3000
        };
        const display = displayOrder(order);
        expect(display).toContain('Items:');
        expect(display).toContain('Customer:');
        expect(display).toContain('Total:');
      });

      test('同じ入力で常に同じ結果を返す', () => {
        const order = {
          items: [{ price: 1000 }, { price: 2000 }],
          customer: { name: 'John', age: 25 },
          total: 3000
        };
        const display1 = displayOrder(order);
        const display2 = displayOrder(order);
        expect(display1).toBe(display2);
      });
    });
  });
});

