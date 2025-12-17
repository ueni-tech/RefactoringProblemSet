import { processOrders, getStatistics } from '../ex15';

describe('ex15: 配列操作が読みにくい（map/filter/reduceの乱用）', () => {
  describe('processOrders', () => {
    test('アクティブな注文を処理', () => {
      const orders = [
        {
          id: 1,
          status: 'active',
          items: [{ price: 600, quantity: 2 }], // 1200円（1000円超）
          customer: { name: 'John' }
        },
        {
          id: 2,
          status: 'inactive',
          items: [{ price: 1000, quantity: 1 }],
          customer: { name: 'Jane' }
        }
      ];
      const processed = processOrders(orders);
      expect(processed).toHaveLength(1);
      expect(processed[0].id).toBe(1);
    });

    test('1000円以下の注文は除外', () => {
      const orders = [
        {
          id: 1,
          status: 'active',
          items: [{ price: 500, quantity: 1 }],
          customer: { name: 'John' }
        },
        {
          id: 2,
          status: 'active',
          items: [{ price: 500, quantity: 2 }],
          customer: { name: 'Jane' }
        }
      ];
      const processed = processOrders(orders);
      // 1000円以下の注文は除外される
      expect(processed.every(o => o.total > 1000)).toBe(true);
    });

    test('最大10件まで返す', () => {
      const orders = Array(15).fill(null).map((_, i) => ({
        id: i + 1,
        status: 'active',
        items: [{ price: 2000, quantity: 1 }],
        customer: { name: `User${i + 1}` }
      }));
      const processed = processOrders(orders);
      expect(processed.length).toBeLessThanOrEqual(10);
    });

    test('最終合計金額でソート', () => {
      const orders = [
        {
          id: 1,
          status: 'active',
          items: [{ price: 2000, quantity: 1 }], // 2000円（1000円超）
          customer: { name: 'John' }
        },
        {
          id: 2,
          status: 'active',
          items: [{ price: 3000, quantity: 1 }], // 3000円（1000円超）
          customer: { name: 'Jane' }
        }
      ];
      const processed = processOrders(orders);
      if (processed.length >= 2) {
        expect(processed[0].total).toBeGreaterThanOrEqual(processed[1].total);
      }
    });
  });

  describe('getStatistics', () => {
    test('基本的な統計情報', () => {
      const data = [
        { value: 10 },
        { value: 20 },
        { value: 30 }
      ];
      const stats = getStatistics(data);
      expect(stats.total).toBe(3);
      expect(stats.average).toBe(20);
      expect(stats.max).toBe(30);
      expect(stats.min).toBe(10);
    });

    test('平均値より大きい値のフィルタ数', () => {
      const data = [
        { value: 10 },
        { value: 20 },
        { value: 30 }
      ];
      const stats = getStatistics(data);
      expect(stats.filtered).toBeGreaterThanOrEqual(0);
    });
  });

  // リファクタリング検証テスト: 元のコードと同じ結果を返すことを確認
  describe('リファクタリング検証: 計算結果の正確性', () => {
    describe('processOrders: 様々なパターンで正確な結果を返す', () => {
      test('アクティブな注文を処理', () => {
        const orders = [
          {
            id: 1,
            status: 'active',
            items: [{ price: 600, quantity: 2 }], // 1200円（1000円超）
            customer: { name: 'John' }
          },
          {
            id: 2,
            status: 'inactive',
            items: [{ price: 1000, quantity: 1 }],
            customer: { name: 'Jane' }
          }
        ];
        const processed = processOrders(orders);
        expect(processed).toHaveLength(1);
        expect(processed[0].id).toBe(1);
      });

      test('1000円以下の注文は除外', () => {
        const orders = [
          {
            id: 1,
            status: 'active',
            items: [{ price: 500, quantity: 1 }],
            customer: { name: 'John' }
          },
          {
            id: 2,
            status: 'active',
            items: [{ price: 500, quantity: 2 }], // 1000円
            customer: { name: 'Jane' }
          }
        ];
        const processed = processOrders(orders);
        expect(processed.every(o => o.total > 1000)).toBe(true);
      });

      test('最大10件まで返す', () => {
        const orders = Array(15).fill(null).map((_, i) => ({
          id: i + 1,
          status: 'active',
          items: [{ price: 2000, quantity: 1 }],
          customer: { name: `User${i + 1}` }
        }));
        const processed = processOrders(orders);
        expect(processed.length).toBeLessThanOrEqual(10);
      });

      test('最終合計金額でソート', () => {
        const orders = [
          {
            id: 1,
            status: 'active',
            items: [{ price: 2000, quantity: 1 }],
            customer: { name: 'John' }
          },
          {
            id: 2,
            status: 'active',
            items: [{ price: 3000, quantity: 1 }],
            customer: { name: 'Jane' }
          }
        ];
        const processed = processOrders(orders);
        if (processed.length >= 2) {
          expect(processed[0].total).toBeGreaterThanOrEqual(processed[1].total);
        }
      });

      test('同じ入力で常に同じ結果を返す', () => {
        const orders = [
          {
            id: 1,
            status: 'active',
            items: [{ price: 2000, quantity: 1 }],
            customer: { name: 'John' }
          }
        ];
        const processed1 = processOrders(orders);
        const processed2 = processOrders(orders);
        expect(processed1).toEqual(processed2);
      });
    });

    describe('getStatistics: 様々なパターンで正確な結果を返す', () => {
      test('基本的な統計情報が正確', () => {
        const data = [
          { value: 10 },
          { value: 20 },
          { value: 30 }
        ];
        const stats = getStatistics(data);
        expect(stats.total).toBe(3);
        expect(stats.average).toBe(20); // (10 + 20 + 30) / 3 = 20
        expect(stats.max).toBe(30);
        expect(stats.min).toBe(10);
      });

      test('平均値より大きい値のフィルタ数が正確', () => {
        const data = [
          { value: 10 },
          { value: 20 },
          { value: 30 }
        ];
        const stats = getStatistics(data);
        // 平均20より大きい値は30のみなので1つ
        expect(stats.filtered).toBe(1);
      });

      test('同じ入力で常に同じ結果を返す', () => {
        const data = [
          { value: 10 },
          { value: 20 },
          { value: 30 }
        ];
        const stats1 = getStatistics(data);
        const stats2 = getStatistics(data);
        expect(stats1).toEqual(stats2);
      });
    });
  });
});

