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
});

