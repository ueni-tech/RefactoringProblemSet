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
});

