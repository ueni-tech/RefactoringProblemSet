import { Product, updateProduct, applyDiscount, sellProduct, getProductInfo } from '../ex25';

describe('ex25: オブジェクトのプロパティへの直接アクセス', () => {
  test('Productを作成', () => {
    const product = new Product('Laptop', 100000, 10);
    expect(product.name).toBe('Laptop');
    expect(product.price).toBe(100000);
    expect(product.stock).toBe(10);
  });

  test('価格を直接更新（バリデーションなし）', () => {
    const product = new Product('Laptop', 100000, 10);
    updateProduct(product, -1000);
    expect(product.price).toBe(-1000); // 無効な値も設定可能
  });

  test('割引を適用', () => {
    const product = new Product('Laptop', 100000, 10);
    applyDiscount(product, 0.1);
    expect(product.price).toBe(90000);
  });

  test('割引で負の値にならない', () => {
    const product = new Product('Laptop', 1000, 10);
    applyDiscount(product, 0.5);
    expect(product.price).toBeGreaterThanOrEqual(0);
  });

  test('商品を販売', () => {
    const product = new Product('Laptop', 100000, 10);
    const result = sellProduct(product, 3);
    expect(result).toBe(true);
    expect(product.stock).toBe(7);
  });

  test('在庫不足の場合は販売不可', () => {
    const product = new Product('Laptop', 100000, 2);
    const result = sellProduct(product, 5);
    expect(result).toBe(false);
    expect(product.stock).toBe(2);
  });

  test('商品情報を取得', () => {
    const product = new Product('Laptop', 100000, 10);
    const info = getProductInfo(product);
    expect(info).toContain('Laptop');
    expect(info).toContain('100000');
    expect(info).toContain('10');
  });

  // リファクタリング検証テスト: 元のコードと同じ結果を返すことを確認
  describe('リファクタリング検証: 計算結果の正確性', () => {
    test('Productを作成', () => {
      const product = new Product('Laptop', 100000, 10);
      expect(product.name).toBe('Laptop');
      expect(product.price).toBe(100000);
      expect(product.stock).toBe(10);
    });

    test('価格を直接更新（バリデーションなし、元のコードの動作）', () => {
      const product = new Product('Laptop', 100000, 10);
      updateProduct(product, -1000);
      expect(product.price).toBe(-1000); // 無効な値も設定可能
    });

    test('割引を適用', () => {
      const product = new Product('Laptop', 100000, 10);
      applyDiscount(product, 0.1);
      expect(product.price).toBe(90000); // 100000 * 0.9 = 90000
    });

    test('割引で負の値にならない', () => {
      const product = new Product('Laptop', 1000, 10);
      applyDiscount(product, 0.5);
      expect(product.price).toBeGreaterThanOrEqual(0);
    });

    test('商品を販売', () => {
      const product = new Product('Laptop', 100000, 10);
      const result = sellProduct(product, 3);
      expect(result).toBe(true);
      expect(product.stock).toBe(7); // 10 - 3 = 7
    });

    test('在庫不足の場合は販売不可', () => {
      const product = new Product('Laptop', 100000, 2);
      const result = sellProduct(product, 5);
      expect(result).toBe(false);
      expect(product.stock).toBe(2); // 在庫は変わらない
    });

    test('商品情報を取得', () => {
      const product = new Product('Laptop', 100000, 10);
      const info = getProductInfo(product);
      expect(info).toContain('Laptop');
      expect(info).toContain('100000');
      expect(info).toContain('10');
    });

    test('同じ入力で常に同じ結果を返す', () => {
      const product1 = new Product('Laptop', 100000, 10);
      const product2 = new Product('Laptop', 100000, 10);
      applyDiscount(product1, 0.1);
      applyDiscount(product2, 0.1);
      expect(product1.price).toBe(product2.price);
    });
  });
});

