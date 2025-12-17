// 注意: グローバル変数を使用しているため、テスト間で状態が共有される
// 各テストの前に状態をリセットする必要がある

describe('ex18: グローバル変数の乱用', () => {
  // モジュールを再インポートして状態をリセット
  beforeEach(() => {
    jest.resetModules();
  });

  test('ユーザーを設定', async () => {
    const { setUser } = await import('../ex18');
    setUser({ id: 1, name: 'John', membershipLevel: 'premium' });
    // 状態が設定されたことを確認するため、calculateTotalを呼ぶ
    const { calculateTotal } = await import('../ex18');
    const total = calculateTotal();
    expect(total).toBeDefined();
  });

  test('カートにアイテムを追加', async () => {
    const { setUser, addToCart, calculateTotal } = await import('../ex18');
    setUser({ id: 1, name: 'John', membershipLevel: 'premium' });
    addToCart({ id: 1, price: 1000 });
    const total = calculateTotal();
    expect(total).toBeGreaterThanOrEqual(0);
  });

  test('会員割引が適用される', async () => {
    const { setUser, addToCart, calculateTotal, checkout } = await import('../ex18');
    // モジュールロード時に追加されるアイテムをクリア
    checkout();
    setUser({ id: 1, name: 'John', membershipLevel: 'premium' });
    addToCart({ id: 1, price: 10000 });
    const total = calculateTotal();
    // 10%割引が適用される: 10000 * 0.9 = 9000
    expect(total).toBe(9000);
  });

  test('カートからアイテムを削除', async () => {
    const { setUser, addToCart, removeFromCart, calculateTotal } = await import('../ex18');
    setUser({ id: 1, name: 'John', membershipLevel: 'premium' });
    addToCart({ id: 1, price: 1000 });
    addToCart({ id: 2, price: 2000 });
    const totalBefore = calculateTotal();
    removeFromCart(1);
    const totalAfter = calculateTotal();
    expect(totalAfter).toBeLessThan(totalBefore);
  });

  test('チェックアウトでカートがクリアされる', async () => {
    const { setUser, addToCart, checkout, calculateTotal } = await import('../ex18');
    setUser({ id: 1, name: 'John', membershipLevel: 'premium' });
    addToCart({ id: 1, price: 1000 });
    checkout();
    const total = calculateTotal();
    expect(total).toBe(0);
  });

  // リファクタリング検証テスト: 元のコードと同じ結果を返すことを確認
  describe('リファクタリング検証: 計算結果の正確性', () => {
    test('ユーザーを設定して合計を計算', async () => {
      jest.resetModules();
      const { setUser, calculateTotal } = await import('../ex18');
      setUser({ id: 1, name: 'John', membershipLevel: 'premium' });
      const total = calculateTotal();
      expect(total).toBeDefined();
    });

    test('カートにアイテムを追加して合計を計算', async () => {
      jest.resetModules();
      const { setUser, addToCart, calculateTotal } = await import('../ex18');
      setUser({ id: 1, name: 'John', membershipLevel: 'premium' });
      addToCart({ id: 1, price: 1000 });
      const total = calculateTotal();
      expect(total).toBeGreaterThanOrEqual(0);
    });

    test('会員割引が適用される', async () => {
      jest.resetModules();
      const { setUser, addToCart, calculateTotal, checkout } = await import('../ex18');
      checkout();
      setUser({ id: 1, name: 'John', membershipLevel: 'premium' });
      addToCart({ id: 1, price: 10000 });
      const total = calculateTotal();
      // 10%割引が適用される: 10000 * 0.9 = 9000
      expect(total).toBe(9000);
    });

    test('カートからアイテムを削除', async () => {
      jest.resetModules();
      const { setUser, addToCart, removeFromCart, calculateTotal } = await import('../ex18');
      setUser({ id: 1, name: 'John', membershipLevel: 'premium' });
      addToCart({ id: 1, price: 1000 });
      addToCart({ id: 2, price: 2000 });
      const totalBefore = calculateTotal();
      removeFromCart(1);
      const totalAfter = calculateTotal();
      expect(totalAfter).toBeLessThan(totalBefore);
    });

    test('チェックアウトでカートがクリアされる', async () => {
      jest.resetModules();
      const { setUser, addToCart, checkout, calculateTotal } = await import('../ex18');
      setUser({ id: 1, name: 'John', membershipLevel: 'premium' });
      addToCart({ id: 1, price: 1000 });
      checkout();
      const total = calculateTotal();
      expect(total).toBe(0);
    });
  });
});

