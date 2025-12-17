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

  // リファクタリング検証テスト: 元のコードと同じ結果を返すことを確認
  describe('リファクタリング検証: 計算結果の正確性', () => {
    describe('calculatePrice: 様々なパターンで正確な結果を返す', () => {
      test('基本的な価格計算が正確', () => {
        expect(calculatePrice(1000, 2)).toBe(2000); // 1000 * 2 = 2000
        expect(calculatePrice(1000, 1)).toBe(1000);
        expect(calculatePrice(1000, 5)).toBe(5000);
      });

      test('10000円超の割引が正確', () => {
        const price = calculatePrice(5000, 3);
        // 5000 * 3 = 15000, 15000 > 10000なので 15000 * 0.85 = 12750
        expect(price).toBe(12750);
      });

      test('10000円以下の場合は割引なし', () => {
        const price = calculatePrice(1000, 5);
        // 1000 * 5 = 5000, 5000 <= 10000なので割引なし
        expect(price).toBe(5000);
      });

      test('同じ入力で常に同じ結果を返す', () => {
        expect(calculatePrice(1000, 2)).toBe(calculatePrice(1000, 2));
      });
    });

    describe('processData: 様々なパターンで正確な結果を返す', () => {
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

      test('同じ入力で常に同じ結果を返す', () => {
        const data = [
          { value: 1 },
          { value: 2 }
        ];
        const processed1 = processData(data);
        const processed2 = processData(data);
        expect(processed1).toEqual(processed2);
      });
    });
  });
});

