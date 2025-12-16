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
});

