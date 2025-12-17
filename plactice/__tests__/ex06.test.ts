import { calc, process, getValue, check } from '../ex06';

describe('ex06: 命名が悪い変数と関数', () => {
  describe('calc', () => {
    test('基本的な計算', () => {
      expect(calc(2, 3, false)).toBe(6);
      expect(calc(5, 4, false)).toBe(20);
    });

    test('cがtrueの場合は1.1倍', () => {
      expect(calc(100, 2, true)).toBeCloseTo(220, 10);
      expect(calc(10, 5, true)).toBeCloseTo(55, 10);
    });
  });

  describe('process', () => {
    test('条件に合う要素をフィルタ', () => {
      const data = [
        { x: 15, y: 10 },
        { x: 5, y: 25 },
        { x: 20, y: 15 }
      ];
      const result = process(data);
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({ x: 15, y: 10 });
      expect(result[1]).toEqual({ x: 20, y: 15 });
    });

    test('条件に合わない要素は除外', () => {
      const data = [
        { x: 5, y: 25 },
        { x: 10, y: 20 }
      ];
      const result = process(data);
      expect(result).toHaveLength(0);
    });
  });

  describe('getValue', () => {
    test('オブジェクトから値を取得', () => {
      const obj = { name: 'test', age: 30 };
      expect(getValue(obj, 'name')).toBe('test');
      expect(getValue(obj, 'age')).toBe(30);
    });
  });

  describe('check', () => {
    test('有効な値はtrue', () => {
      expect(check('hello')).toBe(true);
      expect(check('test')).toBe(true);
      expect(check(123)).toBe(true);
    });

    test('無効な値はfalse', () => {
      expect(check(null)).toBe(false);
      expect(check(undefined)).toBe(false);
      expect(check('')).toBe(false);
    });
  });

  // リファクタリング検証テスト: 元のコードと同じ結果を返すことを確認
  describe('リファクタリング検証: 計算結果の正確性', () => {
    describe('calc: 様々なパターンで正確な結果を返す', () => {
      test('cがfalseの場合', () => {
        expect(calc(2, 3, false)).toBe(6); // 2 * 3 = 6
        expect(calc(5, 4, false)).toBe(20); // 5 * 4 = 20
        expect(calc(10, 10, false)).toBe(100); // 10 * 10 = 100
      });

      test('cがtrueの場合（1.1倍）', () => {
        // 浮動小数点の誤差を考慮してtoBeCloseToを使用
        expect(calc(100, 2, true)).toBeCloseTo(220, 10); // 100 * 2 * 1.1 = 220
        expect(calc(10, 5, true)).toBeCloseTo(55, 10); // 10 * 5 * 1.1 = 55
        expect(calc(1, 1, true)).toBeCloseTo(1.1, 10); // 1 * 1 * 1.1 = 1.1
      });

      test('同じ入力で常に同じ結果を返す', () => {
        expect(calc(2, 3, false)).toBe(calc(2, 3, false));
        expect(calc(100, 2, true)).toBe(calc(100, 2, true));
      });
    });

    describe('process: 様々なパターンで正確な結果を返す', () => {
      test('条件に合う要素をフィルタ（x > 10 && y < 20）', () => {
        const data = [
          { x: 15, y: 10 },
          { x: 5, y: 25 },
          { x: 20, y: 15 }
        ];
        const result = process(data);
        expect(result).toHaveLength(2);
        expect(result[0]).toEqual({ x: 15, y: 10 });
        expect(result[1]).toEqual({ x: 20, y: 15 });
      });

      test('境界値のテスト', () => {
        const data = [
          { x: 10, y: 10 }, // x = 10は条件に合わない（x > 10が必要）
          { x: 11, y: 19 }, // 条件に合う
          { x: 11, y: 20 }, // y = 20は条件に合わない（y < 20が必要）
        ];
        const result = process(data);
        expect(result).toHaveLength(1);
        expect(result[0]).toEqual({ x: 11, y: 19 });
      });

      test('同じ入力で常に同じ結果を返す', () => {
        const data = [{ x: 15, y: 10 }, { x: 5, y: 25 }];
        const result1 = process(data);
        const result2 = process(data);
        expect(result1).toEqual(result2);
      });
    });

    describe('getValue: 様々なパターンで正確な結果を返す', () => {
      test('オブジェクトから値を取得', () => {
        const obj = { name: 'test', age: 30 };
        expect(getValue(obj, 'name')).toBe('test');
        expect(getValue(obj, 'age')).toBe(30);
        expect(getValue(obj, 'nonexistent')).toBeUndefined();
      });

      test('同じ入力で常に同じ結果を返す', () => {
        const obj = { name: 'test' };
        expect(getValue(obj, 'name')).toBe(getValue(obj, 'name'));
      });
    });

    describe('check: 様々なパターンで正確な結果を返す', () => {
      test('有効な値はtrue', () => {
        expect(check('hello')).toBe(true);
        expect(check('test')).toBe(true);
        expect(check(123)).toBe(true);
        expect(check(0)).toBe(true); // 0は有効
        expect(check(false)).toBe(true); // falseは有効
      });

      test('無効な値はfalse', () => {
        expect(check(null)).toBe(false);
        expect(check(undefined)).toBe(false);
        expect(check('')).toBe(false);
      });

      test('同じ入力で常に同じ結果を返す', () => {
        expect(check('hello')).toBe(check('hello'));
        expect(check(null)).toBe(check(null));
      });
    });
  });
});

