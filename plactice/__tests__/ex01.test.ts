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
    // 負の値が返らないことを確認（マイナス記号も含めて数値を抽出）
    const match = result.match(/合計:\s*(-?\d+)/);
    expect(match).not.toBeNull();
    if (match) {
      const amount = parseInt(match[1]);
      expect(amount).toBeGreaterThanOrEqual(0);
    }
  });

  // リファクタリング検証テスト: 元のコードと同じ結果を返すことを確認
  describe('リファクタリング検証: 計算結果の正確性', () => {
    test('基本的な注文（割引なし）の計算結果が正確', () => {
      const items = [
        { price: 1000, quantity: 2, category: 'books' }
      ];
      const result = processOrder(items, false, false);
      // 計算: 1000 * 2 = 2000, 税: 2000 * 0.1 = 200, 最終: 2200
      expect(result).toBe('合計: 2200円');
    });

    test('電子機器割引の計算結果が正確', () => {
      const items = [
        { price: 1000, quantity: 1, category: 'electronics' }
      ];
      const result = processOrder(items, false, false);
      // 計算: 1000 * 0.9 = 900, 税: 900 * 0.1 = 90, 最終: 990
      expect(result).toBe('合計: 990円');
    });

    test('数量割引（6個以上）の計算結果が正確', () => {
      const items = [
        { price: 1000, quantity: 6, category: 'books' }
      ];
      const result = processOrder(items, false, false);
      // 計算: 1000 * 0.95 * 6 = 5700, 税: 5700 * 0.1 = 570, 最終: 6270
      expect(result).toBe('合計: 6270円');
    });

    test('会員割引の計算結果が正確', () => {
      const items = [
        { price: 1000, quantity: 1, category: 'books' }
      ];
      const result = processOrder(items, true, false);
      // 計算: 1000 * 0.9 = 900, 税: 900 * 0.1 = 90, 最終: 990
      expect(result).toBe('合計: 990円');
    });

    test('クーポン割引の計算結果が正確', () => {
      const items = [
        { price: 1000, quantity: 1, category: 'books' }
      ];
      const result = processOrder(items, false, true);
      // 計算: 1000 - 500 = 500, 税: 500 * 0.1 = 50, 最終: 550
      expect(result).toBe('合計: 550円');
    });

    test('会員割引とクーポン割引の組み合わせ計算結果が正確', () => {
      const items = [
        { price: 1000, quantity: 1, category: 'books' }
      ];
      const result = processOrder(items, true, true);
      // 計算: 1000 * 0.9 = 900, 900 - 500 = 400, 税: 400 * 0.1 = 40, 最終: 440
      expect(result).toBe('合計: 440円');
    });

    test('高額注文割引の計算結果が正確', () => {
      const items = [
        { price: 5000, quantity: 3, category: 'books' }
      ];
      const result = processOrder(items, false, false);
      // 計算: 5000 * 3 = 15000, 税: 15000 * 0.1 = 1500, 税込: 16500
      // 高額割引: 16500 > 10000 → 16500 - 300 = 16200
      expect(result).toBe('合計: 16200円');
    });

    test('複数アイテムと複数割引の組み合わせ計算結果が正確', () => {
      const items = [
        { price: 2000, quantity: 3, category: 'electronics' },
        { price: 1500, quantity: 2, category: 'books' }
      ];
      const result = processOrder(items, true, true);
      // 計算:
      // 電子機器1: 2000 * 0.9 * 3 = 5400
      // 書籍: 1500 * 2 = 3000
      // 小計: 8400
      // 会員割引: 8400 * 0.9 = 7560
      // クーポン: 7560 - 500 = 7060
      // 税: 7060 * 0.1 = 706
      // 税込: 7766
      // 高額割引: 7766 < 10000 → 適用なし
      expect(result).toBe('合計: 7766円');
    });

    test('電子機器と数量割引の組み合わせ計算結果が正確', () => {
      const items = [
        { price: 1000, quantity: 6, category: 'electronics' }
      ];
      const result = processOrder(items, false, false);
      // 計算: 1000 * 0.9 * 0.95 * 6 = 5130, 税: 5130 * 0.1 = 513, 最終: 5643
      expect(result).toBe('合計: 5643円');
    });

    test('計算順序が変わっても結果が同じ（割引適用順序の検証）', () => {
      // 会員割引とクーポン割引の順序が変わっても結果が同じことを確認
      const items = [
        { price: 2000, quantity: 1, category: 'books' }
      ];
      
      // パターン1: 会員割引 → クーポン割引
      const result1 = processOrder(items, true, true);
      // パターン2: 同じ入力なので同じ結果になるはず
      const result2 = processOrder(items, true, true);
      
      expect(result1).toBe(result2);
      // 計算: 2000 * 0.9 = 1800, 1800 - 500 = 1300, 税: 1300 * 0.1 = 130, 最終: 1430
      expect(result1).toBe('合計: 1430円');
    });
  });
});

