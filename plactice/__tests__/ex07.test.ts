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

  // リファクタリング検証テスト: 元のコードと同じ結果を返すことを確認
  describe('リファクタリング検証: 計算結果の正確性', () => {
    describe('createUser: 様々なパターンで正確な結果を返す', () => {
      test('全てのフィールドが正しく設定される', () => {
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
        expect(user).toEqual({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          age: 30,
          isActive: true,
          role: 'developer',
          department: 'IT',
          salary: 5000000,
          startDate: '2024-01-01',
          phone: '090-1234-5678'
        });
      });

      test('異なる値でも正しく設定される', () => {
        const user = createUser(
          'Jane',
          'Smith',
          'jane@test.com',
          25,
          false,
          'designer',
          'Marketing',
          3000000,
          '2023-06-15',
          '080-9876-5432'
        );
        expect(user.firstName).toBe('Jane');
        expect(user.lastName).toBe('Smith');
        expect(user.email).toBe('jane@test.com');
        expect(user.age).toBe(25);
        expect(user.isActive).toBe(false);
        expect(user.role).toBe('designer');
        expect(user.department).toBe('Marketing');
        expect(user.salary).toBe(3000000);
        expect(user.startDate).toBe('2023-06-15');
        expect(user.phone).toBe('080-9876-5432');
      });

      test('同じ入力で常に同じ結果を返す', () => {
        const user1 = createUser(
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
        const user2 = createUser(
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
        expect(user1).toEqual(user2);
      });
    });

    describe('updateProduct: 様々なパターンで正確な結果を返す', () => {
      test('全てのフィールドが正しく設定される', () => {
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
        expect(product).toEqual({
          id: 1,
          name: 'Product A',
          price: 1000,
          stock: 50,
          category: 'Electronics',
          description: 'Description',
          isActive: true,
          discount: 10
        });
      });

      test('異なる値でも正しく設定される', () => {
        const product = updateProduct(
          2,
          'Product B',
          2000,
          100,
          'Books',
          'Long description here',
          false,
          20
        );
        expect(product.id).toBe(2);
        expect(product.name).toBe('Product B');
        expect(product.price).toBe(2000);
        expect(product.stock).toBe(100);
        expect(product.category).toBe('Books');
        expect(product.description).toBe('Long description here');
        expect(product.isActive).toBe(false);
        expect(product.discount).toBe(20);
      });

      test('同じ入力で常に同じ結果を返す', () => {
        const product1 = updateProduct(
          1,
          'Product A',
          1000,
          50,
          'Electronics',
          'Description',
          true,
          10
        );
        const product2 = updateProduct(
          1,
          'Product A',
          1000,
          50,
          'Electronics',
          'Description',
          true,
          10
        );
        expect(product1).toEqual(product2);
      });
    });
  });
});

