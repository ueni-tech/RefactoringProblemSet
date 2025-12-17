import { Calculator, processItems } from '../ex17';

describe('ex17: 早すぎる最適化（無意味なキャッシュ）', () => {
  describe('Calculator', () => {
    test('addメソッド', () => {
      const calc = new Calculator();
      expect(calc.add(1, 2)).toBe(3);
      expect(calc.add(5, 10)).toBe(15);
    });

    test('multiplyメソッド', () => {
      const calc = new Calculator();
      expect(calc.multiply(3, 4)).toBe(12);
      expect(calc.multiply(2, 5)).toBe(10);
    });

    test('getFullNameメソッド', () => {
      const calc = new Calculator();
      expect(calc.getFullName('John', 'Doe')).toBe('John Doe');
      expect(calc.getFullName('Jane', 'Smith')).toBe('Jane Smith');
    });

    test('同じ引数でキャッシュが使われる', () => {
      const calc = new Calculator();
      const result1 = calc.add(1, 2);
      const result2 = calc.add(1, 2);
      expect(result1).toBe(result2);
    });
  });

  describe('processItems', () => {
    test('アイテムを処理', () => {
      const items = [
        { id: 1, name: 'A' },
        { id: 2, name: 'B' }
      ];
      const processed = processItems(items);
      expect(processed).toHaveLength(2);
      expect(processed[0].processed).toBe(true);
      expect(processed[1].processed).toBe(true);
    });

    test('重複IDはキャッシュから取得', () => {
      const items = [
        { id: 1, name: 'A' },
        { id: 1, name: 'A' }
      ];
      const processed = processItems(items);
      expect(processed).toHaveLength(2);
      // 同じIDなので、同じオブジェクト参照が使われる可能性がある
    });
  });

  // リファクタリング検証テスト: 元のコードと同じ結果を返すことを確認
  describe('リファクタリング検証: 計算結果の正確性', () => {
    describe('Calculator: 様々なパターンで正確な結果を返す', () => {
      test('addメソッドが正確', () => {
        const calc = new Calculator();
        expect(calc.add(1, 2)).toBe(3);
        expect(calc.add(5, 10)).toBe(15);
        expect(calc.add(0, 0)).toBe(0);
        expect(calc.add(-1, 1)).toBe(0);
      });

      test('multiplyメソッドが正確', () => {
        const calc = new Calculator();
        expect(calc.multiply(3, 4)).toBe(12);
        expect(calc.multiply(2, 5)).toBe(10);
        expect(calc.multiply(0, 5)).toBe(0);
      });

      test('getFullNameメソッドが正確', () => {
        const calc = new Calculator();
        expect(calc.getFullName('John', 'Doe')).toBe('John Doe');
        expect(calc.getFullName('Jane', 'Smith')).toBe('Jane Smith');
      });

      test('同じ引数でキャッシュが使われる（元のコードの動作）', () => {
        const calc = new Calculator();
        const result1 = calc.add(1, 2);
        const result2 = calc.add(1, 2);
        expect(result1).toBe(result2);
        expect(result1).toBe(3);
      });

      test('同じ入力で常に同じ結果を返す', () => {
        const calc1 = new Calculator();
        const calc2 = new Calculator();
        expect(calc1.add(1, 2)).toBe(calc2.add(1, 2));
      });
    });

    describe('processItems: 様々なパターンで正確な結果を返す', () => {
      test('アイテムを処理', () => {
        const items = [
          { id: 1, name: 'A' },
          { id: 2, name: 'B' }
        ];
        const processed = processItems(items);
        expect(processed).toHaveLength(2);
        expect(processed[0].processed).toBe(true);
        expect(processed[1].processed).toBe(true);
      });

      test('重複IDはキャッシュから取得（元のコードの動作）', () => {
        const items = [
          { id: 1, name: 'A' },
          { id: 1, name: 'A' }
        ];
        const processed = processItems(items);
        expect(processed).toHaveLength(2);
      });

      test('同じ入力で常に同じ結果を返す', () => {
        const items = [
          { id: 1, name: 'A' },
          { id: 2, name: 'B' }
        ];
        const processed1 = processItems(items);
        const processed2 = processItems(items);
        expect(processed1).toEqual(processed2);
      });
    });
  });
});

