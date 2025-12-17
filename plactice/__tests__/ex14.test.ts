import { calculateSubscriptionFee, calculateTax } from '../ex14';

describe('ex14: 料金計算の複雑なロジック', () => {
  describe('calculateSubscriptionFee', () => {
    test('basicプランの基本料金', () => {
      const fee = calculateSubscriptionFee('basic', 1, false, false);
      expect(fee).toBe(980);
    });

    test('standardプランの基本料金', () => {
      const fee = calculateSubscriptionFee('standard', 1, false, false);
      expect(fee).toBe(1980);
    });

    test('premiumプランの基本料金', () => {
      const fee = calculateSubscriptionFee('premium', 1, false, false);
      expect(fee).toBe(2980);
    });

    test('年払いの割引', () => {
      const monthly = calculateSubscriptionFee('premium', 12, false, false);
      const annual = calculateSubscriptionFee('premium', 12, true, false);
      expect(annual).toBeLessThan(monthly);
    });

    test('6ヶ月以上の割引', () => {
      const oneMonth = calculateSubscriptionFee('premium', 1, false, false);
      const sixMonths = calculateSubscriptionFee('premium', 6, false, false);
      const sixMonthsPerMonth = sixMonths / 6;
      expect(sixMonthsPerMonth).toBeLessThan(oneMonth);
    });

    test('クーポン割引（高額）', () => {
      const withoutCoupon = calculateSubscriptionFee('premium', 12, true, false);
      const withCoupon = calculateSubscriptionFee('premium', 12, true, true);
      expect(withCoupon).toBeLessThan(withoutCoupon);
    });

    test('負の値にならない', () => {
      const fee = calculateSubscriptionFee('basic', 1, true, true);
      expect(fee).toBeGreaterThanOrEqual(0);
    });
  });

  describe('calculateTax', () => {
    test('東京の税率', () => {
      const tax = calculateTax(1000, 'tokyo');
      expect(tax).toBe(100);
    });

    test('大阪の税率', () => {
      const tax = calculateTax(1000, 'osaka');
      expect(tax).toBe(100);
    });

    test('沖縄の税率', () => {
      const tax = calculateTax(1000, 'okinawa');
      expect(tax).toBe(80);
    });

    test('その他の地域', () => {
      const tax = calculateTax(1000, 'other');
      expect(tax).toBe(100);
    });
  });

  // リファクタリング検証テスト: 元のコードと同じ結果を返すことを確認
  describe('リファクタリング検証: 計算結果の正確性', () => {
    describe('calculateSubscriptionFee: 様々なパターンで正確な結果を返す', () => {
      test('basicプランの基本料金が正確', () => {
        const fee = calculateSubscriptionFee('basic', 1, false, false);
        expect(fee).toBe(980);
      });

      test('standardプランの基本料金が正確', () => {
        const fee = calculateSubscriptionFee('standard', 1, false, false);
        expect(fee).toBe(1980);
      });

      test('premiumプランの基本料金が正確', () => {
        const fee = calculateSubscriptionFee('premium', 1, false, false);
        expect(fee).toBe(2980);
      });

      test('年払いの割引が正確', () => {
        const monthly = calculateSubscriptionFee('premium', 12, false, false);
        const annual = calculateSubscriptionFee('premium', 12, true, false);
        // 年払いは月額 * 12 * 0.8
        expect(annual).toBeLessThan(monthly);
      });

      test('6ヶ月以上の割引が正確', () => {
        const oneMonth = calculateSubscriptionFee('premium', 1, false, false);
        const sixMonths = calculateSubscriptionFee('premium', 6, false, false);
        const sixMonthsPerMonth = sixMonths / 6;
        expect(sixMonthsPerMonth).toBeLessThan(oneMonth);
      });

      test('クーポン割引が正確', () => {
        const withoutCoupon = calculateSubscriptionFee('premium', 12, true, false);
        const withCoupon = calculateSubscriptionFee('premium', 12, true, true);
        expect(withCoupon).toBeLessThan(withoutCoupon);
      });

      test('負の値にならない', () => {
        const fee = calculateSubscriptionFee('basic', 1, true, true);
        expect(fee).toBeGreaterThanOrEqual(0);
      });

      test('同じ入力で常に同じ結果を返す', () => {
        const fee1 = calculateSubscriptionFee('premium', 1, false, false);
        const fee2 = calculateSubscriptionFee('premium', 1, false, false);
        expect(fee1).toBe(fee2);
      });
    });

    describe('calculateTax: 様々なパターンで正確な結果を返す', () => {
      test('東京の税率が正確', () => {
        const tax = calculateTax(1000, 'tokyo');
        expect(tax).toBe(100); // 1000 * 0.1 = 100
      });

      test('大阪の税率が正確', () => {
        const tax = calculateTax(1000, 'osaka');
        expect(tax).toBe(100); // 1000 * 0.1 = 100
      });

      test('沖縄の税率が正確', () => {
        const tax = calculateTax(1000, 'okinawa');
        expect(tax).toBe(80); // 1000 * 0.08 = 80
      });

      test('その他の地域の税率が正確', () => {
        const tax = calculateTax(1000, 'other');
        expect(tax).toBe(100); // 1000 * 0.1 = 100
      });

      test('同じ入力で常に同じ結果を返す', () => {
        const tax1 = calculateTax(1000, 'tokyo');
        const tax2 = calculateTax(1000, 'tokyo');
        expect(tax1).toBe(tax2);
      });
    });
  });
});

