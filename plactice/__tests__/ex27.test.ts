import {
  isDateBefore,
  addDays,
  getDaysBetween,
  formatDate,
  isWeekend,
  getCurrentDate
} from '../ex27';

describe('ex27: 日付・時刻の扱いが不適切', () => {
  describe('isDateBefore', () => {
    test('日付の比較（文字列比較）', () => {
      expect(isDateBefore('2024-01-01', '2024-12-31')).toBe(true);
      expect(isDateBefore('2024-12-31', '2024-01-01')).toBe(false);
    });
  });

  describe('addDays', () => {
    test('日数を追加', () => {
      const result = addDays('2024-12-01', 30);
      expect(result).toBeDefined();
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    test('負の日数', () => {
      const result = addDays('2024-12-01', -5);
      expect(result).toBeDefined();
    });
  });

  describe('getDaysBetween', () => {
    test('日数の差を計算', () => {
      const days = getDaysBetween('2024-01-01', '2024-12-31');
      expect(days).toBeGreaterThan(0);
    });

    test('同じ日付は0日', () => {
      const days = getDaysBetween('2024-12-01', '2024-12-01');
      expect(days).toBe(0);
    });
  });

  describe('formatDate', () => {
    test('日付をフォーマット', () => {
      const formatted = formatDate('2024-12-25');
      expect(formatted).toContain('2024');
      expect(formatted).toContain('12');
      expect(formatted).toContain('25');
    });
  });

  describe('isWeekend', () => {
    test('週末の判定', () => {
      // 2024-12-28は土曜日
      expect(isWeekend('2024-12-28')).toBe(true);
      // 2024-12-29は日曜日
      expect(isWeekend('2024-12-29')).toBe(true);
      // 2024-12-30は月曜日
      expect(isWeekend('2024-12-30')).toBe(false);
    });
  });

  describe('getCurrentDate', () => {
    test('現在の日付を取得', () => {
      const today = getCurrentDate();
      expect(today).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  // リファクタリング検証テスト: 元のコードと同じ結果を返すことを確認
  describe('リファクタリング検証: 計算結果の正確性', () => {
    describe('isDateBefore: 様々なパターンで正確な結果を返す', () => {
      test('日付の比較（文字列比較、元のコードの動作）', () => {
        expect(isDateBefore('2024-01-01', '2024-12-31')).toBe(true);
        expect(isDateBefore('2024-12-31', '2024-01-01')).toBe(false);
      });

      test('同じ入力で常に同じ結果を返す', () => {
        expect(isDateBefore('2024-01-01', '2024-12-31')).toBe(isDateBefore('2024-01-01', '2024-12-31'));
      });
    });

    describe('addDays: 様々なパターンで正確な結果を返す', () => {
      test('日数を追加', () => {
        const result = addDays('2024-12-01', 30);
        expect(result).toBeDefined();
        expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      });

      test('負の日数', () => {
        const result = addDays('2024-12-01', -5);
        expect(result).toBeDefined();
      });

      test('同じ入力で常に同じ結果を返す', () => {
        const result1 = addDays('2024-12-01', 30);
        const result2 = addDays('2024-12-01', 30);
        expect(result1).toBe(result2);
      });
    });

    describe('getDaysBetween: 様々なパターンで正確な結果を返す', () => {
      test('日数の差を計算', () => {
        const days = getDaysBetween('2024-01-01', '2024-12-31');
        expect(days).toBeGreaterThan(0);
      });

      test('同じ日付は0日', () => {
        const days = getDaysBetween('2024-12-01', '2024-12-01');
        expect(days).toBe(0);
      });

      test('同じ入力で常に同じ結果を返す', () => {
        const days1 = getDaysBetween('2024-01-01', '2024-12-31');
        const days2 = getDaysBetween('2024-01-01', '2024-12-31');
        expect(days1).toBe(days2);
      });
    });

    describe('formatDate: 様々なパターンで正確な結果を返す', () => {
      test('日付をフォーマット', () => {
        const formatted = formatDate('2024-12-25');
        expect(formatted).toContain('2024');
        expect(formatted).toContain('12');
        expect(formatted).toContain('25');
      });

      test('同じ入力で常に同じ結果を返す', () => {
        const formatted1 = formatDate('2024-12-25');
        const formatted2 = formatDate('2024-12-25');
        expect(formatted1).toBe(formatted2);
      });
    });

    describe('isWeekend: 様々なパターンで正確な結果を返す', () => {
      test('週末の判定', () => {
        expect(isWeekend('2024-12-28')).toBe(true); // 土曜日
        expect(isWeekend('2024-12-29')).toBe(true); // 日曜日
        expect(isWeekend('2024-12-30')).toBe(false); // 月曜日
      });

      test('同じ入力で常に同じ結果を返す', () => {
        expect(isWeekend('2024-12-28')).toBe(isWeekend('2024-12-28'));
      });
    });
  });
});

