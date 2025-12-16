import { createUser, updateProduct } from '../ex07';

describe('ex07: 引数が多すぎる関数', () => {
  describe('createUser', () => {
    test('ユーザーを作成', () => {
      const user = createUser(
        'John',
        'Doe',
        'john@example.com',
        30,
        true,
        'developer',
        'IT',
        5000000,
        '2024-01-01',
        '090-1234-5678'
      );
      expect(user.firstName).toBe('John');
      expect(user.lastName).toBe('Doe');
      expect(user.email).toBe('john@example.com');
      expect(user.age).toBe(30);
      expect(user.isActive).toBe(true);
      expect(user.role).toBe('developer');
      expect(user.department).toBe('IT');
      expect(user.salary).toBe(5000000);
      expect(user.startDate).toBe('2024-01-01');
      expect(user.phone).toBe('090-1234-5678');
    });
  });

  describe('updateProduct', () => {
    test('商品を更新', () => {
      const product = updateProduct(
        1,
        'Product A',
        1000,
        50,
        'Electronics',
        'Description',
        true,
        10
      );
      expect(product.id).toBe(1);
      expect(product.name).toBe('Product A');
      expect(product.price).toBe(1000);
      expect(product.stock).toBe(50);
      expect(product.category).toBe('Electronics');
      expect(product.description).toBe('Description');
      expect(product.isActive).toBe(true);
      expect(product.discount).toBe(10);
    });
  });
});

