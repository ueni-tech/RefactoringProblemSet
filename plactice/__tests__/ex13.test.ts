import { calculateRentalFee, isBusinessDay } from '../ex13';

describe('ex13: 日付計算の業務ロジック', () => {
  describe('calculateRentalFee', () => {
    test('基本的なレンタル料金計算', () => {
      const fee = calculateRentalFee('2024-12-01', '2024-12-02', 'car');
      expect(fee).toBeGreaterThan(0);
    });

    test('車のレンタル料金', () => {
      const fee = calculateRentalFee('2024-12-01', '2024-12-02', 'car');
      expect(fee).toBeGreaterThanOrEqual(5000);
    });

    test('自転車のレンタル料金', () => {
      const fee = calculateRentalFee('2024-12-01', '2024-12-02', 'bike');
      expect(fee).toBeGreaterThanOrEqual(1000);
    });

    test('長期レンタルの割引（7日超）', () => {
      const shortTerm = calculateRentalFee('2024-12-01', '2024-12-05', 'car');
      const longTerm = calculateRentalFee('2024-12-01', '2024-12-10', 'car');
      // 長期の方が1日あたりの単価が安くなる
      const shortTermPerDay = shortTerm / 4;
      const longTermPerDay = longTerm / 9;
      expect(longTermPerDay).toBeLessThan(shortTermPerDay);
    });

    test('早期予約の割引（30日以上前）', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 35);
      const startDate = futureDate.toISOString().split('T')[0];
      const endDate = new Date(futureDate);
      endDate.setDate(endDate.getDate() + 5);
      const endDateStr = endDate.toISOString().split('T')[0];
      
      const fee = calculateRentalFee(startDate, endDateStr, 'car');
      expect(fee).toBeGreaterThan(0);
    });
  });

  describe('isBusinessDay', () => {
    test('平日はtrue', () => {
      // 2024-12-02は月曜日
      expect(isBusinessDay('2024-12-02')).toBe(true);
    });

    test('土曜日はfalse', () => {
      // 2024-12-07は土曜日
      expect(isBusinessDay('2024-12-07')).toBe(false);
    });

    test('日曜日はfalse', () => {
      // 2024-12-08は日曜日
      expect(isBusinessDay('2024-12-08')).toBe(false);
    });

    test('祝日はfalse', () => {
      // 1月1日
      expect(isBusinessDay('2024-01-01')).toBe(false);
      // 5月3日
      expect(isBusinessDay('2024-05-03')).toBe(false);
      // 12月23日
      expect(isBusinessDay('2024-12-23')).toBe(false);
    });
  });

  // リファクタリング検証テスト: 元のコードと同じ結果を返すことを確認
  describe('リファクタリング検証: 計算結果の正確性', () => {
    describe('calculateRentalFee: 様々なパターンで正確な結果を返す', () => {
      test('車のレンタル料金が正確', () => {
        const fee = calculateRentalFee('2024-12-01', '2024-12-02', 'car');
        // 1日 * 5000円 = 5000円
        expect(fee).toBe(5000);
      });

      test('自転車のレンタル料金が正確', () => {
        const fee = calculateRentalFee('2024-12-01', '2024-12-02', 'bike');
        // 1日 * 1000円 = 1000円
        expect(fee).toBe(1000);
      });

      test('長期レンタルの割引（7日超）が正確', () => {
        const fee = calculateRentalFee('2024-12-01', '2024-12-10', 'car');
        // 9日 * 5000円 * 0.9 = 40500円
        expect(fee).toBe(40500);
      });

      test('中期レンタルの割引（3日超7日以下）が正確', () => {
        const fee = calculateRentalFee('2024-12-01', '2024-12-05', 'car');
        // 4日 * 5000円 * 0.95 = 19000円
        expect(fee).toBe(19000);
      });

      test('同じ入力で常に同じ結果を返す', () => {
        const fee1 = calculateRentalFee('2024-12-01', '2024-12-02', 'car');
        const fee2 = calculateRentalFee('2024-12-01', '2024-12-02', 'car');
        expect(fee1).toBe(fee2);
      });
    });

    describe('isBusinessDay: 様々なパターンで正確な結果を返す', () => {
      test('平日はtrue', () => {
        expect(isBusinessDay('2024-12-02')).toBe(true); // 月曜日
        expect(isBusinessDay('2024-12-03')).toBe(true); // 火曜日
        expect(isBusinessDay('2024-12-04')).toBe(true); // 水曜日
      });

      test('土曜日はfalse', () => {
        expect(isBusinessDay('2024-12-07')).toBe(false);
      });

      test('日曜日はfalse', () => {
        expect(isBusinessDay('2024-12-08')).toBe(false);
      });

      test('祝日はfalse', () => {
        expect(isBusinessDay('2024-01-01')).toBe(false); // 1月1日
        expect(isBusinessDay('2024-05-03')).toBe(false); // 5月3日
        expect(isBusinessDay('2024-12-23')).toBe(false); // 12月23日
      });

      test('同じ入力で常に同じ結果を返す', () => {
        expect(isBusinessDay('2024-12-02')).toBe(isBusinessDay('2024-12-02'));
      });
    });
  });
});

