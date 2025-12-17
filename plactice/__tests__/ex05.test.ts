import { formatPrice, calculateTotal } from '../ex05';

describe('ex05: フラグ引数の乱用', () => {
  describe('formatPrice', () => {
    test('税込、円、小数点なし', () => {
      const result = formatPrice(1000, true, true, false);
      expect(result).toContain('円');
      expect(result).not.toContain('.');
    });

    test('税込、円、小数点あり', () => {
      const result = formatPrice(1000, true, true, true);
      expect(result).toContain('円');
      expect(result).toContain('.');
    });

    test('税抜、ドル、小数点なし', () => {
      const result = formatPrice(1000, false, false, false);
      expect(result).toContain('$');
      expect(result).not.toContain('.');
    });

    test('税抜、ドル、小数点あり', () => {
      const result = formatPrice(1000, false, false, true);
      expect(result).toContain('$');
      expect(result).toContain('.');
    });

    test('税込が適用される', () => {
      const withTax = formatPrice(1000, true, true, false);
      const withoutTax = formatPrice(1000, false, true, false);
      expect(withTax).not.toBe(withoutTax);
    });
  });

  describe('calculateTotal', () => {
    test('基本的な合計計算', () => {
      const items = [{ price: 1000 }, { price: 2000 }];
      expect(calculateTotal(items, false, false, false)).toBe(3000);
    });

    test('会員割引が適用される', () => {
      const items = [{ price: 1000 }, { price: 2000 }];
      const withoutDiscount = calculateTotal(items, false, false, false);
      const withMemberDiscount = calculateTotal(items, true, false, true);
      expect(withMemberDiscount).toBeLessThan(withoutDiscount);
    });

    test('非会員割引が適用される', () => {
      const items = [{ price: 1000 }, { price: 2000 }];
      const withoutDiscount = calculateTotal(items, false, false, false);
      const withNonMemberDiscount = calculateTotal(items, true, false, false);
      expect(withNonMemberDiscount).toBeLessThan(withoutDiscount);
    });

    test('送料が追加される', () => {
      const items = [{ price: 1000 }];
      const withoutShipping = calculateTotal(items, false, false, false);
      const withShipping = calculateTotal(items, false, true, false);
      expect(withShipping).toBe(withoutShipping + 500);
    });
  });

  // リファクタリング検証テスト: 元のコードと同じ結果を返すことを確認
  describe('リファクタリング検証: 計算結果の正確性', () => {
    describe('formatPrice: 全ての組み合わせで正確な結果を返す', () => {
      test('税込、円、小数点なし', () => {
        const result = formatPrice(1000, true, true, false);
        // 計算: 1000 * 1.1 = 1100, Math.floor(1100) = 1100
        expect(result).toBe('1100円');
      });

      test('税込、円、小数点あり', () => {
        const result = formatPrice(1000, true, true, true);
        // 計算: 1000 * 1.1 = 1100, toFixed(2) = "1100.00"
        expect(result).toBe('1100.00円');
      });

      test('税抜、円、小数点なし', () => {
        const result = formatPrice(1000, false, true, false);
        // 計算: 1000, Math.floor(1000) = 1000
        expect(result).toBe('1000円');
      });

      test('税抜、円、小数点あり', () => {
        const result = formatPrice(1000, false, true, true);
        // 計算: 1000, toFixed(2) = "1000.00"
        expect(result).toBe('1000.00円');
      });

      test('税込、ドル、小数点なし', () => {
        const result = formatPrice(1000, true, false, false);
        // 計算: 1000 * 1.1 = 1100, Math.floor(1100) = 1100
        expect(result).toBe('$1100');
      });

      test('税込、ドル、小数点あり', () => {
        const result = formatPrice(1000, true, false, true);
        // 計算: 1000 * 1.1 = 1100, toFixed(2) = "1100.00"
        expect(result).toBe('$1100.00');
      });

      test('税抜、ドル、小数点なし', () => {
        const result = formatPrice(1000, false, false, false);
        // 計算: 1000, Math.floor(1000) = 1000
        expect(result).toBe('$1000');
      });

      test('税抜、ドル、小数点あり', () => {
        const result = formatPrice(1000, false, false, true);
        // 計算: 1000, toFixed(2) = "1000.00"
        expect(result).toBe('$1000.00');
      });

      test('同じ入力で常に同じ結果を返す', () => {
        const result1 = formatPrice(1000, true, true, false);
        const result2 = formatPrice(1000, true, true, false);
        expect(result1).toBe(result2);
      });
    });

    describe('calculateTotal: 全ての組み合わせで正確な結果を返す', () => {
      test('基本的な合計計算', () => {
        const items = [{ price: 1000 }, { price: 2000 }];
        const result = calculateTotal(items, false, false, false);
        expect(result).toBe(3000);
      });

      test('会員割引が適用される', () => {
        const items = [{ price: 1000 }, { price: 2000 }];
        const result = calculateTotal(items, true, false, true);
        // 計算: (1000 + 2000) * 0.9 = 2700
        expect(result).toBe(2700);
      });

      test('非会員割引が適用される', () => {
        const items = [{ price: 1000 }, { price: 2000 }];
        const result = calculateTotal(items, true, false, false);
        // 計算: (1000 + 2000) * 0.95 = 2850
        expect(result).toBe(2850);
      });

      test('送料が追加される', () => {
        const items = [{ price: 1000 }];
        const result = calculateTotal(items, false, true, false);
        // 計算: 1000 + 500 = 1500
        expect(result).toBe(1500);
      });

      test('会員割引と送料の組み合わせ', () => {
        const items = [{ price: 1000 }, { price: 2000 }];
        const result = calculateTotal(items, true, true, true);
        // 計算: (1000 + 2000) * 0.9 + 500 = 2700 + 500 = 3200
        expect(result).toBe(3200);
      });

      test('非会員割引と送料の組み合わせ', () => {
        const items = [{ price: 1000 }, { price: 2000 }];
        const result = calculateTotal(items, true, true, false);
        // 計算: (1000 + 2000) * 0.95 + 500 = 2850 + 500 = 3350
        expect(result).toBe(3350);
      });

      test('同じ入力で常に同じ結果を返す', () => {
        const items = [{ price: 1000 }, { price: 2000 }];
        const result1 = calculateTotal(items, true, true, true);
        const result2 = calculateTotal(items, true, true, true);
        expect(result1).toBe(result2);
      });
    });
  });
});

