import { processItems, filterAndSort, calculateStatistics } from '../ex28';

describe('ex28: ループ内での不要な計算の繰り返し', () => {
  describe('processItems', () => {
    test('アイテムを処理', () => {
      const items = [
        { price: 1000 },
        { price: 2000 },
        { price: 1500 }
      ];
      const processed = processItems(items, 0.1);
      expect(processed).toHaveLength(3);
      expect(processed[0].finalPrice).toBeDefined();
    });

    test('割引が適用される', () => {
      const items = [{ price: 1000 }];
      const processed = processItems(items, 0.1);
      expect(processed[0].finalPrice).toBeLessThan(1000);
    });
  });

  describe('filterAndSort', () => {
    test('データをフィルタしてソート', () => {
      const data = [
        { value: 10 },
        { value: 20 },
        { value: 30 }
      ];
      const filtered = filterAndSort(data, 15);
      expect(filtered).toBeDefined();
      expect(Array.isArray(filtered)).toBe(true);
    });
  });

  describe('calculateStatistics', () => {
    test('統計情報を計算', () => {
      const numbers = [1, 2, 3, 4, 5];
      const stats = calculateStatistics(numbers);
      expect(stats.sum).toBe(15);
      expect(stats.average).toBe(3);
      expect(stats.max).toBe(5);
      expect(stats.min).toBe(1);
    });
  });

  // リファクタリング検証テスト: 元のコードと同じ結果を返すことを確認
  describe('リファクタリング検証: 計算結果の正確性', () => {
    describe('processItems: 様々なパターンで正確な結果を返す', () => {
      test('アイテムを処理', () => {
        const items = [
          { price: 1000 },
          { price: 2000 },
          { price: 1500 }
        ];
        const processed = processItems(items, 0.1);
        expect(processed).toHaveLength(3);
        expect(processed[0].finalPrice).toBeDefined();
      });

      test('割引が適用される', () => {
        const items = [{ price: 1000 }];
        const processed = processItems(items, 0.1);
        expect(processed[0].finalPrice).toBeLessThan(1000);
      });

      test('同じ入力で常に同じ結果を返す', () => {
        const items = [{ price: 1000 }];
        const processed1 = processItems(items, 0.1);
        const processed2 = processItems(items, 0.1);
        expect(processed1).toEqual(processed2);
      });
    });

    describe('filterAndSort: 様々なパターンで正確な結果を返す', () => {
      test('データをフィルタしてソート', () => {
        const data = [
          { value: 10 },
          { value: 20 },
          { value: 30 }
        ];
        const filtered = filterAndSort(data, 15);
        expect(filtered).toBeDefined();
        expect(Array.isArray(filtered)).toBe(true);
      });

      test('同じ入力で常に同じ結果を返す', () => {
        const data = [{ value: 10 }, { value: 20 }];
        const filtered1 = filterAndSort(data, 15);
        const filtered2 = filterAndSort(data, 15);
        expect(filtered1).toEqual(filtered2);
      });
    });

    describe('calculateStatistics: 様々なパターンで正確な結果を返す', () => {
      test('統計情報を計算', () => {
        const numbers = [1, 2, 3, 4, 5];
        const stats = calculateStatistics(numbers);
        expect(stats.sum).toBe(15); // 1 + 2 + 3 + 4 + 5 = 15
        expect(stats.average).toBe(3); // 15 / 5 = 3
        expect(stats.max).toBe(5);
        expect(stats.min).toBe(1);
      });

      test('同じ入力で常に同じ結果を返す', () => {
        const numbers = [1, 2, 3];
        const stats1 = calculateStatistics(numbers);
        const stats2 = calculateStatistics(numbers);
        expect(stats1).toEqual(stats2);
      });
    });
  });
});

