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
});

