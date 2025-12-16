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
});

