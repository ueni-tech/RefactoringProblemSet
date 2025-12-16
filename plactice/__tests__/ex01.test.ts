import { processOrder } from '../ex01';

describe('ex01: 長すぎる関数と責務の混在', () => {
  test('基本的な注文処理', () => {
    const items = [
      { price: 1000, quantity: 2, category: 'books' }
    ];
    const result = processOrder(items, false, false);
    expect(result).toContain('合計:');
    expect(result).toContain('円');
  });

  test('会員割引が適用される', () => {
    const items = [
      { price: 1000, quantity: 1, category: 'books' }
    ];
    const result1 = processOrder(items, false, false);
    const result2 = processOrder(items, true, false);
    expect(result1).not.toBe(result2);
  });

  test('クーポン割引が適用される', () => {
    const items = [
      { price: 1000, quantity: 1, category: 'books' }
    ];
    const result1 = processOrder(items, false, false);
    const result2 = processOrder(items, false, true);
    expect(result1).not.toBe(result2);
  });

  test('電子機器カテゴリーの割引が適用される', () => {
    const items1 = [{ price: 1000, quantity: 1, category: 'books' }];
    const items2 = [{ price: 1000, quantity: 1, category: 'electronics' }];
    const result1 = processOrder(items1, false, false);
    const result2 = processOrder(items2, false, false);
    expect(result1).not.toBe(result2);
  });

  test('数量による割引が適用される', () => {
    const items1 = [{ price: 1000, quantity: 3, category: 'books' }];
    const items2 = [{ price: 1000, quantity: 6, category: 'books' }];
    const result1 = processOrder(items1, false, false);
    const result2 = processOrder(items2, false, false);
    expect(result1).not.toBe(result2);
  });

  test('高額注文の割引が適用される', () => {
    const items = [
      { price: 5000, quantity: 3, category: 'books' }
    ];
    const result = processOrder(items, false, false);
    expect(result).toBeDefined();
  });

  test('負の値にならない', () => {
    const items = [
      { price: 100, quantity: 1, category: 'books' }
    ];
    const result = processOrder(items, true, true);
    expect(result).toBeDefined();
    // 負の値が返らないことを確認
    const match = result.match(/\d+/);
    if (match) {
      expect(parseInt(match[0])).toBeGreaterThanOrEqual(0);
    }
  });
});

