import { canPurchase, isEligibleForDiscount, shouldNotifyUser } from '../ex12';

describe('ex12: 条件判定が仕様を隠している', () => {
  describe('canPurchase', () => {
    test('在庫があり、年齢条件を満たし、ポイント条件を満たす場合', () => {
      const product = {
        stock: 5,
        category: 'electronics',
        price: 1000,
        isActive: true,
        isRestricted: false
      };
      const user = { age: 25, points: 100, membershipLevel: 1 };
      const cart = [{ id: 1 }];
      expect(canPurchase(product, user, cart)).toBe(true);
    });

    test('在庫がない場合は購入不可', () => {
      const product = {
        stock: 0,
        category: 'electronics',
        price: 1000,
        isActive: true,
        isRestricted: false
      };
      const user = { age: 25, points: 100, membershipLevel: 1 };
      const cart = [{ id: 1 }];
      expect(canPurchase(product, user, cart)).toBe(false);
    });

    test('未成年はアルコールを購入不可', () => {
      const product = {
        stock: 5,
        category: 'alcohol',
        price: 1000,
        isActive: true,
        isRestricted: false
      };
      const user = { age: 17, points: 100, membershipLevel: 1 };
      const cart = [{ id: 1 }];
      expect(canPurchase(product, user, cart)).toBe(false);
    });

    test('カートが10個以上は購入不可', () => {
      const product = {
        stock: 5,
        category: 'electronics',
        price: 1000,
        isActive: true,
        isRestricted: false
      };
      const user = { age: 25, points: 100, membershipLevel: 1 };
      const cart = Array(10).fill({ id: 1 });
      expect(canPurchase(product, user, cart)).toBe(false);
    });
  });

  describe('isEligibleForDiscount', () => {
    test('会員歴が長く高額注文の場合', () => {
      const order = {
        items: [{ price: 6000 }]
      };
      const customer = {
        memberSince: '2019-01-01',
        purchaseCount: 5,
        referralCount: 0
      };
      expect(isEligibleForDiscount(order, customer)).toBe(true);
    });

    test('購入回数が多く中額注文の場合', () => {
      const order = {
        items: [{ price: 4000 }]
      };
      const customer = {
        memberSince: '2023-01-01',
        purchaseCount: 15,
        referralCount: 0
      };
      expect(isEligibleForDiscount(order, customer)).toBe(true);
    });
  });

  describe('shouldNotifyUser', () => {
    test('メール通知設定で高優先度', () => {
      const user = {
        preferences: { email: true, sms: false, push: false },
        isActive: true
      };
      const notification = {
        type: 'email',
        priority: 'high'
      };
      expect(shouldNotifyUser(user, notification)).toBe(true);
    });

    test('通知設定がない場合は通知しない', () => {
      const user = {
        preferences: { email: false, sms: false, push: false },
        isActive: true
      };
      const notification = {
        type: 'email',
        priority: 'high'
      };
      expect(shouldNotifyUser(user, notification)).toBe(false);
    });
  });

  // リファクタリング検証テスト: 元のコードと同じ結果を返すことを確認
  describe('リファクタリング検証: 計算結果の正確性', () => {
    describe('canPurchase: 様々なパターンで正確な結果を返す', () => {
      test('全ての条件を満たす場合は購入可能', () => {
        const product = {
          stock: 5,
          category: 'electronics',
          price: 1000,
          isActive: true,
          isRestricted: false
        };
        const user = { age: 25, points: 100, membershipLevel: 1 };
        const cart = [{ id: 1 }];
        expect(canPurchase(product, user, cart)).toBe(true);
      });

      test('在庫がない場合は購入不可', () => {
        const product = {
          stock: 0,
          category: 'electronics',
          price: 1000,
          isActive: true,
          isRestricted: false
        };
        const user = { age: 25, points: 100, membershipLevel: 1 };
        const cart = [{ id: 1 }];
        expect(canPurchase(product, user, cart)).toBe(false);
      });

      test('未成年はアルコールを購入不可', () => {
        const product = {
          stock: 5,
          category: 'alcohol',
          price: 1000,
          isActive: true,
          isRestricted: false
        };
        const user = { age: 17, points: 100, membershipLevel: 1 };
        const cart = [{ id: 1 }];
        expect(canPurchase(product, user, cart)).toBe(false);
      });

      test('カートが10個以上は購入不可', () => {
        const product = {
          stock: 5,
          category: 'electronics',
          price: 1000,
          isActive: true,
          isRestricted: false
        };
        const user = { age: 25, points: 100, membershipLevel: 1 };
        const cart = Array(10).fill({ id: 1 });
        expect(canPurchase(product, user, cart)).toBe(false);
      });

      test('同じ入力で常に同じ結果を返す', () => {
        const product = {
          stock: 5,
          category: 'electronics',
          price: 1000,
          isActive: true,
          isRestricted: false
        };
        const user = { age: 25, points: 100, membershipLevel: 1 };
        const cart = [{ id: 1 }];
        expect(canPurchase(product, user, cart)).toBe(canPurchase(product, user, cart));
      });
    });

    describe('isEligibleForDiscount: 様々なパターンで正確な結果を返す', () => {
      test('会員歴が長く高額注文の場合', () => {
        const order = {
          items: [{ price: 6000 }]
        };
        const customer = {
          memberSince: '2019-01-01',
          purchaseCount: 5,
          referralCount: 0
        };
        expect(isEligibleForDiscount(order, customer)).toBe(true);
      });

      test('購入回数が多く中額注文の場合', () => {
        const order = {
          items: [{ price: 4000 }]
        };
        const customer = {
          memberSince: '2023-01-01',
          purchaseCount: 15,
          referralCount: 0
        };
        expect(isEligibleForDiscount(order, customer)).toBe(true);
      });

      test('紹介者が多く低額注文の場合', () => {
        const order = {
          items: [{ price: 2500 }]
        };
        const customer = {
          memberSince: '2023-01-01',
          purchaseCount: 5,
          referralCount: 6
        };
        expect(isEligibleForDiscount(order, customer)).toBe(true);
      });

      test('条件を満たさない場合は割引不可', () => {
        const order = {
          items: [{ price: 1000 }]
        };
        const customer = {
          memberSince: '2023-01-01',
          purchaseCount: 5,
          referralCount: 0
        };
        expect(isEligibleForDiscount(order, customer)).toBe(false);
      });
    });

    describe('shouldNotifyUser: 様々なパターンで正確な結果を返す', () => {
      test('メール通知設定で高優先度', () => {
        const user = {
          preferences: { email: true, sms: false, push: false },
          isActive: true
        };
        const notification = {
          type: 'email',
          priority: 'high'
        };
        expect(shouldNotifyUser(user, notification)).toBe(true);
      });

      test('通知設定がない場合は通知しない', () => {
        const user = {
          preferences: { email: false, sms: false, push: false },
          isActive: true
        };
        const notification = {
          type: 'email',
          priority: 'high'
        };
        expect(shouldNotifyUser(user, notification)).toBe(false);
      });
    });
  });
});

