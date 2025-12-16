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
});

