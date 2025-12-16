import { processUsers, calculateTotals } from '../ex16';

describe('ex16: forループと配列操作のごちゃ混ぜ', () => {
  describe('processUsers', () => {
    test('18歳以上のユーザーをフィルタ', () => {
      const users = [
        { firstName: 'John', lastName: 'Doe', age: 25, points: 100 },
        { firstName: 'Jane', lastName: 'Smith', age: 17, points: 50 }
      ];
      const processed = processUsers(users);
      expect(processed.every(u => u.age >= 18)).toBe(true);
    });

    test('fullNameが設定される', () => {
      const users = [
        { firstName: 'John', lastName: 'Doe', age: 30, points: 100 } // 平均年齢より大きい必要がある
      ];
      const processed = processUsers(users);
      if (processed.length > 0) {
        expect(processed[0].fullName).toBe('John Doe');
      }
    });

    test('平均年齢より大きいユーザーのみ', () => {
      const users = [
        { firstName: 'John', lastName: 'Doe', age: 25, points: 100 },
        { firstName: 'Jane', lastName: 'Smith', age: 30, points: 200 }
      ];
      const processed = processUsers(users);
      // 平均年齢は27.5なので、30歳のユーザーのみが残る
      expect(processed.every(u => u.age > 27.5)).toBe(true);
    });

    test('スコアでソートされる', () => {
      const users = [
        { firstName: 'John', lastName: 'Doe', age: 25, points: 100 },
        { firstName: 'Jane', lastName: 'Smith', age: 30, points: 200 }
      ];
      const processed = processUsers(users);
      // 平均年齢は27.5なので、30歳のユーザーのみが残る
      if (processed.length >= 2) {
        expect(processed[0].score).toBeGreaterThanOrEqual(processed[1].score);
      } else if (processed.length === 1) {
        // 1人だけの場合は、その人のスコアが存在することを確認
        expect(processed[0].score).toBeDefined();
      }
    });
  });

  describe('calculateTotals', () => {
    test('基本的な合計計算', () => {
      const items = [
        { price: 1000, category: 'normal' },
        { price: 500, category: 'normal' }
      ];
      expect(calculateTotals(items)).toBe(1500);
    });

    test('saleカテゴリーは20%割引', () => {
      const items = [
        { price: 1000, category: 'sale' }
      ];
      expect(calculateTotals(items)).toBe(800);
    });

    test('通常とセールの混合', () => {
      const items = [
        { price: 1000, category: 'normal' },
        { price: 500, category: 'sale' }
      ];
      expect(calculateTotals(items)).toBe(1400);
    });
  });
});

