import {
  sendEmail,
  connectToDatabase,
  calculateShippingFee,
  getApiEndpoint,
  validatePassword
} from '../ex30';

describe('ex30: 設定値のハードコーディングと環境依存', () => {
  describe('sendEmail', () => {
    test('メール送信関数が呼び出せる', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      sendEmail('user@example.com', 'Test', 'Body');
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('connectToDatabase', () => {
    test('データベース接続関数が呼び出せる', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      connectToDatabase();
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('calculateShippingFee', () => {
    test('日本の送料計算', () => {
      expect(calculateShippingFee(0.5, 'JP')).toBe(500);
      expect(calculateShippingFee(3, 'JP')).toBe(800);
      expect(calculateShippingFee(7, 'JP')).toBe(1200);
      expect(calculateShippingFee(15, 'JP')).toBe(2000);
    });
  });

  describe('getApiEndpoint', () => {
    test('production環境', () => {
      const endpoint = getApiEndpoint('production');
      expect(endpoint).toContain('api.example.com');
    });

    test('staging環境', () => {
      const endpoint = getApiEndpoint('staging');
      expect(endpoint).toContain('staging-api.example.com');
    });

    test('開発環境', () => {
      const endpoint = getApiEndpoint('development');
      expect(endpoint).toContain('localhost');
    });
  });

  describe('validatePassword', () => {
    test('有効なパスワード', () => {
      expect(validatePassword('MyP@ssw0rd')).toBe(true);
    });

    test('短すぎるパスワードは無効', () => {
      expect(validatePassword('Short1')).toBe(false);
    });

    test('長すぎるパスワードは無効', () => {
      const longPassword = 'a'.repeat(129);
      expect(validatePassword(longPassword)).toBe(false);
    });
  });
});

