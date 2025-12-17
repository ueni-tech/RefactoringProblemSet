import {
  calculateTax,
  calculateTotal,
  applyDiscount,
  comparePrices,
  calculatePercentage,
  roundPrice
} from '../ex26';

describe('ex26: 数値計算の精度問題と丸め誤差', () => {
  describe('calculateTax', () => {
    test('基本的な税額計算', () => {
      expect(calculateTax(1000)).toBe(100);
      expect(calculateTax(2000)).toBe(200);
    });
  });

  describe('calculateTotal', () => {
    test('浮動小数点の累積誤差が発生する可能性', () => {
      const items = [
        { price: 0.1, quantity: 3 },
        { price: 0.2, quantity: 2 }
      ];
      const total = calculateTotal(items);
      expect(total).toBeCloseTo(0.7, 10);
    });
  });

  describe('applyDiscount', () => {
    test('割引計算', () => {
      expect(applyDiscount(1000, 0.1)).toBeCloseTo(900, 10);
    });

    test('浮動小数点の誤差が発生する可能性', () => {
      const result = applyDiscount(0.1, 0.3);
      expect(result).toBeCloseTo(0.07, 10);
    });
  });

  describe('comparePrices', () => {
    test('価格の比較（浮動小数点の比較が不正確）', () => {
      // 0.1 + 0.2 = 0.30000000000000004
      expect(comparePrices(0.1 + 0.2, 0.3)).toBe(false);
    });
  });

  describe('calculatePercentage', () => {
    test('パーセンテージ計算', () => {
      expect(calculatePercentage(1, 3)).toBeCloseTo(33.333, 1);
    });
  });

  describe('roundPrice', () => {
    test('価格を丸める', () => {
      expect(roundPrice(99.5)).toBe(100);
      expect(roundPrice(99.4)).toBe(99);
    });
  });

  // リファクタリング検証テスト: 元のコードと同じ結果を返すことを確認
  describe('リファクタリング検証: 計算結果の正確性', () => {
    describe('calculateTax: 様々なパターンで正確な結果を返す', () => {
      test('基本的な税額計算が正確', () => {
        expect(calculateTax(1000)).toBe(100); // 1000 * 0.1 = 100
        expect(calculateTax(2000)).toBe(200); // 2000 * 0.1 = 200
      });

      test('同じ入力で常に同じ結果を返す', () => {
        expect(calculateTax(1000)).toBe(calculateTax(1000));
      });
    });

    describe('calculateTotal: 様々なパターンで正確な結果を返す', () => {
      test('浮動小数点の累積誤差が発生する可能性（元のコードの動作）', () => {
        const items = [
          { price: 0.1, quantity: 3 },
          { price: 0.2, quantity: 2 }
        ];
        const total = calculateTotal(items);
        expect(total).toBeCloseTo(0.7, 10);
      });

      test('同じ入力で常に同じ結果を返す', () => {
        const items = [{ price: 100, quantity: 2 }];
        expect(calculateTotal(items)).toBe(calculateTotal(items));
      });
    });

    describe('applyDiscount: 様々なパターンで正確な結果を返す', () => {
      test('割引計算が正確', () => {
        expect(applyDiscount(1000, 0.1)).toBeCloseTo(900, 10); // 1000 * 0.9 = 900
      });

      test('浮動小数点の誤差が発生する可能性（元のコードの動作）', () => {
        const result = applyDiscount(0.1, 0.3);
        expect(result).toBeCloseTo(0.07, 10); // 0.1 * 0.7 = 0.07
      });

      test('同じ入力で常に同じ結果を返す', () => {
        expect(applyDiscount(1000, 0.1)).toBeCloseTo(applyDiscount(1000, 0.1), 10);
      });
    });

    describe('comparePrices: 様々なパターンで正確な結果を返す', () => {
      test('価格の比較（浮動小数点の比較が不正確、元のコードの動作）', () => {
        // 0.1 + 0.2 = 0.30000000000000004
        expect(comparePrices(0.1 + 0.2, 0.3)).toBe(false);
      });

      test('同じ入力で常に同じ結果を返す', () => {
        expect(comparePrices(100, 100)).toBe(comparePrices(100, 100));
      });
    });

    describe('calculatePercentage: 様々なパターンで正確な結果を返す', () => {
      test('パーセンテージ計算が正確', () => {
        expect(calculatePercentage(1, 3)).toBeCloseTo(33.333, 1); // 1/3 * 100 ≈ 33.333
      });

      test('同じ入力で常に同じ結果を返す', () => {
        expect(calculatePercentage(1, 3)).toBeCloseTo(calculatePercentage(1, 3), 1);
      });
    });

    describe('roundPrice: 様々なパターンで正確な結果を返す', () => {
      test('価格を丸める', () => {
        expect(roundPrice(99.5)).toBe(100);
        expect(roundPrice(99.4)).toBe(99);
      });

      test('同じ入力で常に同じ結果を返す', () => {
        expect(roundPrice(99.5)).toBe(roundPrice(99.5));
      });
    });
  });
});

