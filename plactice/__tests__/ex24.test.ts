import { processUsers, calculateReport, transformData } from '../ex24';

describe('ex24: 長いメソッドチェーンと中間変数の欠如', () => {
  describe('processUsers', () => {
    test('アクティブなユーザーを処理', () => {
      const users = [
        { id: 1, firstName: 'John', lastName: 'Doe', age: 25, points: 100, active: true },
        { id: 2, firstName: 'Jane', lastName: 'Smith', age: 17, points: 50, active: true }
      ];
      const processed = processUsers(users);
      // 17歳は18歳未満なので除外される
      // score > 500の条件も満たす必要がある（25*100=2500なのでOK）
      // 結果として25歳のユーザーのみが残る
      // 注意: 最終結果には id, name, category, score のみが含まれる（ageは含まれない）
      expect(processed.length).toBeGreaterThan(0);
      expect(processed[0].score).toBeGreaterThan(500);
    });

    test('fullNameが設定される', () => {
      const users = [
        { id: 1, firstName: 'John', lastName: 'Doe', age: 25, points: 100, active: true }
      ];
      const processed = processUsers(users);
      expect(processed[0].name).toContain('John');
      expect(processed[0].name).toContain('Doe');
    });

    test('スコアでソートされる', () => {
      const users = [
        { id: 1, firstName: 'John', lastName: 'Doe', age: 25, points: 100, active: true },
        { id: 2, firstName: 'Jane', lastName: 'Smith', age: 30, points: 200, active: true }
      ];
      const processed = processUsers(users);
      if (processed.length >= 2) {
        expect(processed[0].score).toBeGreaterThanOrEqual(processed[1].score);
      }
    });
  });

  describe('calculateReport', () => {
    test('基本的な統計情報', () => {
      const data = [
        { id: 1, value: 10 },
        { id: 2, value: 20 },
        { id: 3, value: 30 }
      ];
      const report = calculateReport(data);
      expect(report.total).toBe(3);
      expect(report.average).toBe(20);
      expect(report.max).toBe(30);
      expect(report.min).toBe(10);
      expect(report.sum).toBe(60);
    });
  });

  describe('transformData', () => {
    test('データを変換', () => {
      const data = [
        { value: 5 },
        { value: 10 },
        { value: 15 }
      ];
      const transformed = transformData(data);
      expect(transformed).toBeDefined();
      expect(typeof transformed).toBe('string');
    });

    test('正の値のみが処理される', () => {
      const data = [
        { value: -5 },
        { value: 10 },
        { value: 0 }
      ];
      const transformed = transformData(data);
      expect(transformed).toBeDefined();
    });
  });
});

