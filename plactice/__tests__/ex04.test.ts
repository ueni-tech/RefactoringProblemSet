import { validateEmail, validatePhone, processUserData } from '../ex04';

describe('ex04: 重複コードのコピペ', () => {
  describe('validateEmail', () => {
    test('有効なメールアドレス', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.jp')).toBe(true);
    });

    test('@がない場合は無効', () => {
      expect(validateEmail('testexample.com')).toBe(false);
    });

    test('長さが5未満は無効', () => {
      expect(validateEmail('a@b')).toBe(false);
      expect(validateEmail('ab@c')).toBe(false);
    });

    test('.がない場合は無効', () => {
      expect(validateEmail('test@example')).toBe(false);
    });
  });

  describe('validatePhone', () => {
    test('電話番号の検証（現在はメールと同じロジック）', () => {
      // 注意: 現在の実装はメール検証と同じロジックなので、電話番号としては不適切
      expect(validatePhone('test@example.com')).toBe(true);
      expect(validatePhone('090-1234-5678')).toBe(false); // @がないため
    });
  });

  describe('processUserData', () => {
    test('有効なメールアドレスでデータを処理', () => {
      const data = { email: 'user@test.com', name: 'John' };
      const result = processUserData(data);
      expect(result).toEqual({ email: 'user@test.com', name: 'John', validated: true });
    });

    test('無効なメールアドレスはnullを返す', () => {
      expect(processUserData({ email: 'invalid', name: 'John' })).toBeNull();
      expect(processUserData({ email: 'a@b', name: 'John' })).toBeNull();
      expect(processUserData({ email: 'test@example', name: 'John' })).toBeNull();
    });
  });

  // リファクタリング検証テスト: 元のコードと同じ結果を返すことを確認
  describe('リファクタリング検証: 計算結果の正確性', () => {
    describe('validateEmail: 様々なパターンで正確な結果を返す', () => {
      test('有効なメールアドレスのパターン', () => {
        expect(validateEmail('test@example.com')).toBe(true);
        expect(validateEmail('user.name@domain.co.jp')).toBe(true);
        expect(validateEmail('a@b.co')).toBe(true); // 最小限の有効なメール
      });

      test('無効なメールアドレスのパターン', () => {
        expect(validateEmail('testexample.com')).toBe(false); // @がない
        expect(validateEmail('a@b')).toBe(false); // 長さが5未満
        expect(validateEmail('ab@c')).toBe(false); // 長さが5未満
        expect(validateEmail('test@example')).toBe(false); // .がない
      });

      test('同じ入力で常に同じ結果を返す', () => {
        const email = 'test@example.com';
        expect(validateEmail(email)).toBe(validateEmail(email));
        expect(validateEmail(email)).toBe(true);
      });
    });

    describe('validatePhone: 様々なパターンで正確な結果を返す', () => {
      test('現在の実装ではメール検証と同じロジック', () => {
        // 注意: 現在の実装はメール検証と同じロジック
        expect(validatePhone('test@example.com')).toBe(true);
        expect(validatePhone('090-1234-5678')).toBe(false); // @がないため
        expect(validatePhone('a@b.co')).toBe(true);
      });

      test('同じ入力で常に同じ結果を返す', () => {
        const phone = 'test@example.com';
        expect(validatePhone(phone)).toBe(validatePhone(phone));
      });
    });

    describe('processUserData: 様々なパターンで正確な結果を返す', () => {
      test('有効なメールアドレスでデータを処理', () => {
        const data1 = { email: 'user@test.com', name: 'John' };
        const result1 = processUserData(data1);
        expect(result1).toEqual({ email: 'user@test.com', name: 'John', validated: true });

        const data2 = { email: 'test@example.com', name: 'Jane', age: 25 };
        const result2 = processUserData(data2);
        expect(result2).toEqual({ email: 'test@example.com', name: 'Jane', age: 25, validated: true });
      });

      test('無効なメールアドレスでnullを返す', () => {
        expect(processUserData({ email: 'invalid', name: 'John' })).toBeNull();
        expect(processUserData({ email: 'a@b', name: 'John' })).toBeNull();
        expect(processUserData({ email: 'test@example', name: 'John' })).toBeNull();
      });

      test('同じ入力で常に同じ結果を返す', () => {
        const data = { email: 'user@test.com', name: 'John' };
        const result1 = processUserData(data);
        const result2 = processUserData(data);
        expect(result1).toEqual(result2);
      });
    });
  });
});

