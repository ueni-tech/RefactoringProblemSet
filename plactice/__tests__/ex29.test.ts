import { processPayment, validateAndProcess } from '../ex29';

describe('ex29: 複雑なネストと早期リターンの欠如', () => {
  describe('processPayment', () => {
    test('正常な支払い処理', () => {
      const order = {
        id: 1,
        items: [{ price: 1000 }],
        total: 1000
      };
      const payment = { type: 'credit' };
      const user = { verified: true, balance: 5000 };
      const result = processPayment(order, payment, user);
      expect(result.success).toBe(true);
      expect(result.orderId).toBe(1);
    });

    test('注文がnullの場合は失敗', () => {
      const payment = { type: 'credit' };
      const user = { verified: true, balance: 5000 };
      const result = processPayment(null, payment, user);
      expect(result.success).toBe(false);
      expect(result.error).toBe('Order not found');
    });

    test('アイテムがない場合は失敗', () => {
      const order = {
        id: 1,
        items: [],
        total: 0
      };
      const payment = { type: 'credit' };
      const user = { verified: true, balance: 5000 };
      const result = processPayment(order, payment, user);
      expect(result.success).toBe(false);
    });

    test('残高不足の場合は失敗', () => {
      const order = {
        id: 1,
        items: [{ price: 1000 }],
        total: 1000
      };
      const payment = { type: 'credit' };
      const user = { verified: true, balance: 500 };
      const result = processPayment(order, payment, user);
      expect(result.success).toBe(false);
      expect(result.error).toBe('Insufficient balance');
    });

    test('ユーザーが未認証の場合は失敗', () => {
      const order = {
        id: 1,
        items: [{ price: 1000 }],
        total: 1000
      };
      const payment = { type: 'credit' };
      const user = { verified: false, balance: 5000 };
      const result = processPayment(order, payment, user);
      expect(result.success).toBe(false);
      expect(result.error).toBe('User not verified');
    });
  });

  describe('validateAndProcess', () => {
    test('有効なデータ', () => {
      const data = {
        email: 'test@example.com',
        name: 'John',
        age: 25
      };
      const result = validateAndProcess(data);
      expect(result.valid).toBe(true);
      expect(result.data).toEqual(data);
    });

    test('メールアドレスがない場合は無効', () => {
      const data = {
        name: 'John',
        age: 25
      };
      const result = validateAndProcess(data);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Email is required');
    });

    test('名前がない場合は無効', () => {
      const data = {
        email: 'test@example.com',
        age: 25
      };
      const result = validateAndProcess(data);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Name is required');
    });

    test('年齢が18未満は無効', () => {
      const data = {
        email: 'test@example.com',
        name: 'John',
        age: 17
      };
      const result = validateAndProcess(data);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Age must be 18 or older');
    });
  });

  // リファクタリング検証テスト: 元のコードと同じ結果を返すことを確認
  describe('リファクタリング検証: 計算結果の正確性', () => {
    describe('processPayment: 様々なパターンで正確な結果を返す', () => {
      test('正常な支払い処理', () => {
        const order = {
          id: 1,
          items: [{ price: 1000 }],
          total: 1000
        };
        const payment = { type: 'credit' };
        const user = { verified: true, balance: 5000 };
        const result = processPayment(order, payment, user);
        expect(result.success).toBe(true);
        expect(result.orderId).toBe(1);
      });

      test('注文がnullの場合は失敗', () => {
        const payment = { type: 'credit' };
        const user = { verified: true, balance: 5000 };
        const result = processPayment(null, payment, user);
        expect(result.success).toBe(false);
        expect(result.error).toBe('Order not found');
      });

      test('アイテムがない場合は失敗', () => {
        const order = {
          id: 1,
          items: [],
          total: 0
        };
        const payment = { type: 'credit' };
        const user = { verified: true, balance: 5000 };
        const result = processPayment(order, payment, user);
        expect(result.success).toBe(false);
      });

      test('残高不足の場合は失敗', () => {
        const order = {
          id: 1,
          items: [{ price: 1000 }],
          total: 1000
        };
        const payment = { type: 'credit' };
        const user = { verified: true, balance: 500 };
        const result = processPayment(order, payment, user);
        expect(result.success).toBe(false);
        expect(result.error).toBe('Insufficient balance');
      });

      test('ユーザーが未認証の場合は失敗', () => {
        const order = {
          id: 1,
          items: [{ price: 1000 }],
          total: 1000
        };
        const payment = { type: 'credit' };
        const user = { verified: false, balance: 5000 };
        const result = processPayment(order, payment, user);
        expect(result.success).toBe(false);
        expect(result.error).toBe('User not verified');
      });

      test('同じ入力で常に同じ結果を返す', () => {
        const order = {
          id: 1,
          items: [{ price: 1000 }],
          total: 1000
        };
        const payment = { type: 'credit' };
        const user = { verified: true, balance: 5000 };
        const result1 = processPayment(order, payment, user);
        const result2 = processPayment(order, payment, user);
        expect(result1).toEqual(result2);
      });
    });

    describe('validateAndProcess: 様々なパターンで正確な結果を返す', () => {
      test('有効なデータ', () => {
        const data = {
          email: 'test@example.com',
          name: 'John',
          age: 25
        };
        const result = validateAndProcess(data);
        expect(result.valid).toBe(true);
        expect(result.data).toEqual(data);
      });

      test('メールアドレスがない場合は無効', () => {
        const data = {
          name: 'John',
          age: 25
        };
        const result = validateAndProcess(data);
        expect(result.valid).toBe(false);
        expect(result.error).toBe('Email is required');
      });

      test('名前がない場合は無効', () => {
        const data = {
          email: 'test@example.com',
          age: 25
        };
        const result = validateAndProcess(data);
        expect(result.valid).toBe(false);
        expect(result.error).toBe('Name is required');
      });

      test('年齢が18未満は無効', () => {
        const data = {
          email: 'test@example.com',
          name: 'John',
          age: 17
        };
        const result = validateAndProcess(data);
        expect(result.valid).toBe(false);
        expect(result.error).toBe('Age must be 18 or older');
      });

      test('同じ入力で常に同じ結果を返す', () => {
        const data = {
          email: 'test@example.com',
          name: 'John',
          age: 25
        };
        const result1 = validateAndProcess(data);
        const result2 = validateAndProcess(data);
        expect(result1).toEqual(result2);
      });
    });
  });
});

