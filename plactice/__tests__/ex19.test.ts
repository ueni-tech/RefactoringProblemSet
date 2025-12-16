import { calculatePrice, processData } from '../ex19';

describe('ex19: コメントアウトされたコードとデッドコード', () => {
  describe('calculatePrice', () => {
    test('基本的な価格計算', () => {
      expect(calculatePrice(1000, 2)).toBe(2000);
    });

    test('10000円超の割引', () => {
      const price = calculatePrice(5000, 3);
      expect(price).toBeLessThan(15000);
    });

    test('数量による計算', () => {
      expect(calculatePrice(1000, 1)).toBe(1000);
      expect(calculatePrice(1000, 5)).toBe(5000);
    });
  });

  describe('processData', () => {
    test('valueがある要素のみをフィルタ', () => {
      const data = [
        { value: 1 },
        { value: 2 },
        {}
      ];
      const processed = processData(data);
      expect(processed).toHaveLength(2);
      expect(processed[0].value).toBe(1);
      expect(processed[1].value).toBe(2);
    });

    test('valueが0の要素は除外される', () => {
      const data = [
        { value: 0 },
        { value: 1 }
      ];
      const processed = processData(data);
      expect(processed).toHaveLength(1);
      expect(processed[0].value).toBe(1);
    });
  });
});

