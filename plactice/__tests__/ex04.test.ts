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
});

