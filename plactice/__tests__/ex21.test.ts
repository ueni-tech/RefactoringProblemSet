import { processData, getValue, calculateTotal, parseUser } from '../ex21';

describe('ex21: 型アサーションの乱用', () => {
  describe('processData', () => {
    test('データを処理', () => {
      const data = { name: 'John', age: 30, email: 'JOHN@EXAMPLE.COM' };
      const processed = processData(data);
      expect(processed.name).toBe('JOHN');
      expect(processed.age).toBe(40);
      expect(processed.email).toBe('john@example.com');
    });
  });

  describe('getValue', () => {
    test('オブジェクトから値を取得', () => {
      const obj = { test: 123, name: 'value' };
      expect(getValue(obj, 'test')).toBe(123);
      expect(getValue(obj, 'name')).toBe('value');
    });
  });

  describe('calculateTotal', () => {
    test('価格の合計を計算', () => {
      const items = [
        { price: 100 },
        { price: 200 }
      ];
      expect(calculateTotal(items)).toBe(300);
    });

    test('priceがundefinedの場合は0として扱う', () => {
      const items = [
        { price: 100 },
        {},
        { price: 200 }
      ];
      expect(calculateTotal(items)).toBe(300);
    });
  });

  describe('parseUser', () => {
    test('JSON文字列からユーザーをパース', () => {
      const json = '{"id":1,"name":"Jane","email":"jane@test.com"}';
      const user = parseUser(json);
      expect(user.id).toBe(1);
      expect(user.name).toBe('Jane');
      expect(user.email).toBe('jane@test.com');
    });
  });

  // リファクタリング検証テスト: 元のコードと同じ結果を返すことを確認
  describe('リファクタリング検証: 計算結果の正確性', () => {
    describe('processData: 様々なパターンで正確な結果を返す', () => {
      test('データを処理', () => {
        const data = { name: 'John', age: 30, email: 'JOHN@EXAMPLE.COM' };
        const processed = processData(data);
        expect(processed.name).toBe('JOHN');
        expect(processed.age).toBe(40); // 30 + 10
        expect(processed.email).toBe('john@example.com');
      });

      test('同じ入力で常に同じ結果を返す', () => {
        const data = { name: 'John', age: 30, email: 'JOHN@EXAMPLE.COM' };
        const processed1 = processData(data);
        const processed2 = processData(data);
        expect(processed1).toEqual(processed2);
      });
    });

    describe('getValue: 様々なパターンで正確な結果を返す', () => {
      test('オブジェクトから値を取得', () => {
        const obj = { test: 123, name: 'value' };
        expect(getValue(obj, 'test')).toBe(123);
        expect(getValue(obj, 'name')).toBe('value');
      });

      test('同じ入力で常に同じ結果を返す', () => {
        const obj = { test: 123 };
        expect(getValue(obj, 'test')).toBe(getValue(obj, 'test'));
      });
    });

    describe('calculateTotal: 様々なパターンで正確な結果を返す', () => {
      test('価格の合計を計算', () => {
        const items = [
          { price: 100 },
          { price: 200 }
        ];
        expect(calculateTotal(items)).toBe(300);
      });

      test('priceがundefinedの場合は0として扱う（元のコードの動作）', () => {
        const items = [
          { price: 100 },
          {},
          { price: 200 }
        ];
        expect(calculateTotal(items)).toBe(300);
      });

      test('同じ入力で常に同じ結果を返す', () => {
        const items = [{ price: 100 }, { price: 200 }];
        expect(calculateTotal(items)).toBe(calculateTotal(items));
      });
    });

    describe('parseUser: 様々なパターンで正確な結果を返す', () => {
      test('JSON文字列からユーザーをパース', () => {
        const json = '{"id":1,"name":"Jane","email":"jane@test.com"}';
        const user = parseUser(json);
        expect(user.id).toBe(1);
        expect(user.name).toBe('Jane');
        expect(user.email).toBe('jane@test.com');
      });

      test('同じ入力で常に同じ結果を返す', () => {
        const json = '{"id":1,"name":"Jane","email":"jane@test.com"}';
        const user1 = parseUser(json);
        const user2 = parseUser(json);
        expect(user1).toEqual(user2);
      });
    });
  });
});

