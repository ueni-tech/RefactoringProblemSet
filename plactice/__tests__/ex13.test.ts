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
});

