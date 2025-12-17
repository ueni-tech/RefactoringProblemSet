import { divide, findUser, parseDate, calculateTotal } from '../ex11';

describe('ex11: エラー処理が雑', () => {
  describe('divide', () => {
    test('正常な除算', () => {
      expect(divide(10, 2)).toBe(5);
      expect(divide(15, 3)).toBe(5);
    });

    test('ゼロ除算は-1を返す（エラーを数値で返す問題）', () => {
      expect(divide(10, 0)).toBe(-1);
      expect(divide(5, 0)).toBe(-1);
    });
  });

  describe('findUser', () => {
    test('ユーザーが見つかる場合', () => {
      const users = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' }
      ];
      const user = findUser(users, 1);
      expect(user).toBeDefined();
      expect(user?.name).toBe('John');
    });

    test('ユーザーが見つからない場合はnull（エラーハンドリングが呼び出し側に委ねられる）', () => {
      const users = [{ id: 1, name: 'John' }];
      const user = findUser(users, 999);
      expect(user).toBeNull();
    });
  });

  describe('parseDate', () => {
    test('有効な日付文字列', () => {
      const date = parseDate('2024-12-01');
      expect(date).toBeInstanceOf(Date);
      expect(date.getTime()).not.toBeNaN();
    });

    test('無効な日付文字列はデフォルト値（1970-01-01）を返す（エラーを握りつぶす）', () => {
      const date = parseDate('invalid');
      expect(date).toBeInstanceOf(Date);
      expect(date.getTime()).toBe(0);
    });
  });

  describe('calculateTotal', () => {
    test('正常なアイテムの合計', () => {
      const items = [
        { price: 100 },
        { price: 200 },
        { price: 300 }
      ];
      expect(calculateTotal(items)).toBe(600);
    });

    test('priceがundefinedのアイテムは無視される（エラーが無視される）', () => {
      const items = [
        { price: 100 },
        {},
        { price: 200 }
      ];
      expect(calculateTotal(items)).toBe(300);
    });
  });

  // リファクタリング検証テスト: 元のコードと同じ結果を返すことを確認
  describe('リファクタリング検証: 計算結果の正確性', () => {
    describe('divide: 様々なパターンで正確な結果を返す', () => {
      test('正常な除算が正確', () => {
        expect(divide(10, 2)).toBe(5);
        expect(divide(15, 3)).toBe(5);
        expect(divide(20, 4)).toBe(5);
        expect(divide(100, 10)).toBe(10);
      });

      test('ゼロ除算は-1を返す（元のコードの動作）', () => {
        expect(divide(10, 0)).toBe(-1);
        expect(divide(5, 0)).toBe(-1);
        expect(divide(0, 0)).toBe(-1);
      });

      test('小数の除算が正確', () => {
        expect(divide(1, 2)).toBe(0.5);
        expect(divide(3, 4)).toBe(0.75);
      });

      test('同じ入力で常に同じ結果を返す', () => {
        expect(divide(10, 2)).toBe(divide(10, 2));
        expect(divide(10, 0)).toBe(divide(10, 0));
      });
    });

    describe('findUser: 様々なパターンで正確な結果を返す', () => {
      test('ユーザーが見つかる場合', () => {
        const users = [
          { id: 1, name: 'John' },
          { id: 2, name: 'Jane' }
        ];
        const user1 = findUser(users, 1);
        expect(user1).toBeDefined();
        expect(user1?.name).toBe('John');
        
        const user2 = findUser(users, 2);
        expect(user2).toBeDefined();
        expect(user2?.name).toBe('Jane');
      });

      test('ユーザーが見つからない場合はnull（元のコードの動作）', () => {
        const users = [{ id: 1, name: 'John' }];
        expect(findUser(users, 999)).toBeNull();
        expect(findUser(users, 0)).toBeNull();
        expect(findUser(users, -1)).toBeNull();
      });

      test('空配列の場合', () => {
        expect(findUser([], 1)).toBeNull();
      });

      test('同じ入力で常に同じ結果を返す', () => {
        const users = [{ id: 1, name: 'John' }];
        expect(findUser(users, 1)).toBe(findUser(users, 1));
        expect(findUser(users, 999)).toBe(findUser(users, 999));
      });
    });

    describe('parseDate: 様々なパターンで正確な結果を返す', () => {
      test('有効な日付文字列が正確にパースされる', () => {
        const date1 = parseDate('2024-12-01');
        expect(date1).toBeInstanceOf(Date);
        expect(date1.getTime()).not.toBeNaN();
        
        const date2 = parseDate('2024-01-15');
        expect(date2).toBeInstanceOf(Date);
        expect(date2.getTime()).not.toBeNaN();
      });

      test('無効な日付文字列はデフォルト値（1970-01-01）を返す（元のコードの動作）', () => {
        const date = parseDate('invalid');
        expect(date).toBeInstanceOf(Date);
        expect(date.getTime()).toBe(0);
        
        const date2 = parseDate('not-a-date');
        expect(date2.getTime()).toBe(0);
      });

      test('同じ入力で常に同じ結果を返す', () => {
        const date1 = parseDate('2024-12-01');
        const date2 = parseDate('2024-12-01');
        expect(date1.getTime()).toBe(date2.getTime());
      });
    });

    describe('calculateTotal: 様々なパターンで正確な結果を返す', () => {
      test('正常なアイテムの合計が正確', () => {
        const items = [
          { price: 100 },
          { price: 200 },
          { price: 300 }
        ];
        expect(calculateTotal(items)).toBe(600);
      });

      test('priceがundefinedのアイテムは無視される（元のコードの動作）', () => {
        const items = [
          { price: 100 },
          {},
          { price: 200 }
        ];
        expect(calculateTotal(items)).toBe(300);
      });

      test('空配列の場合', () => {
        expect(calculateTotal([])).toBe(0);
      });

      test('全てpriceがundefinedの場合', () => {
        const items = [{}, {}, {}];
        expect(calculateTotal(items)).toBe(0);
      });

      test('同じ入力で常に同じ結果を返す', () => {
        const items = [{ price: 100 }, { price: 200 }];
        expect(calculateTotal(items)).toBe(calculateTotal(items));
      });
    });
  });
});

