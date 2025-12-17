import { checkAccess } from '../ex02';

describe('ex02: ネストが深い条件分岐', () => {
  test('adminユーザーは常にアクセス可能', () => {
    const user = { id: 1, role: 'admin' };
    const resource = { ownerId: 2 };
    expect(checkAccess(user, resource, 'read')).toBe(true);
    expect(checkAccess(user, resource, 'write')).toBe(true);
    expect(checkAccess(user, resource, 'delete')).toBe(true);
  });

  test('userユーザーは自分のリソースにread/write可能', () => {
    const user = { id: 1, role: 'user' };
    const resource = { ownerId: 1 };
    expect(checkAccess(user, resource, 'read')).toBe(true);
    expect(checkAccess(user, resource, 'write')).toBe(true);
  });

  test('userユーザーは他人のリソースにreadのみ可能', () => {
    const user = { id: 1, role: 'user' };
    const resource = { ownerId: 2 };
    expect(checkAccess(user, resource, 'read')).toBe(true);
    expect(checkAccess(user, resource, 'write')).toBe(false);
  });

  test('nullユーザーはアクセス不可', () => {
    const resource = { ownerId: 1 };
    expect(checkAccess(null, resource, 'read')).toBe(false);
  });

  test('roleがundefinedのユーザーはアクセス不可', () => {
    const user = { id: 1 };
    const resource = { ownerId: 1 };
    expect(checkAccess(user, resource, 'read')).toBe(false);
  });

  test('nullリソースはアクセス不可', () => {
    const user = { id: 1, role: 'user' };
    expect(checkAccess(user, null, 'read')).toBe(false);
  });

  // リファクタリング検証テスト: 元のコードと同じ結果を返すことを確認
  describe('リファクタリング検証: 計算結果の正確性', () => {
    test('複数の組み合わせパターンで同じ結果を返す', () => {
      // adminユーザーの様々なアクション
      const adminUser = { id: 1, role: 'admin' };
      const resource1 = { ownerId: 1 };
      const resource2 = { ownerId: 2 };
      
      // adminは常にtrueを返す
      expect(checkAccess(adminUser, resource1, 'read')).toBe(true);
      expect(checkAccess(adminUser, resource1, 'write')).toBe(true);
      expect(checkAccess(adminUser, resource1, 'delete')).toBe(true);
      expect(checkAccess(adminUser, resource2, 'read')).toBe(true);
      expect(checkAccess(adminUser, resource2, 'write')).toBe(true);
      expect(checkAccess(adminUser, resource2, 'delete')).toBe(true);
    });

      test('userユーザーの様々なパターンで同じ結果を返す', () => {
        const user1 = { id: 1, role: 'user' };
        const user2 = { id: 2, role: 'user' };
        const ownResource = { ownerId: 1 };
        const otherResource = { ownerId: 2 };
        
        // 自分のリソース: read/write可能、delete不可
        expect(checkAccess(user1, ownResource, 'read')).toBe(true);
        expect(checkAccess(user1, ownResource, 'write')).toBe(true);
        expect(checkAccess(user1, ownResource, 'delete')).toBe(false);
        
        // 他人のリソース: readのみ可能
        expect(checkAccess(user1, otherResource, 'read')).toBe(true);
        expect(checkAccess(user1, otherResource, 'write')).toBe(false);
        expect(checkAccess(user1, otherResource, 'delete')).toBe(false);
        
        // 同じパターンで複数回呼び出しても同じ結果
        expect(checkAccess(user1, ownResource, 'read')).toBe(checkAccess(user1, ownResource, 'read'));
        // user2はownerId=1のリソースに対してreadアクセスは可能（他人のリソースでもreadは可能）
        expect(checkAccess(user2, ownResource, 'read')).toBe(true);
        expect(checkAccess(user2, ownResource, 'write')).toBe(false);
      });

    test('エッジケースで同じ結果を返す', () => {
      // nullユーザー
      expect(checkAccess(null, { ownerId: 1 }, 'read')).toBe(false);
      expect(checkAccess(null, { ownerId: 1 }, 'write')).toBe(false);
      
      // roleがundefined
      expect(checkAccess({ id: 1 }, { ownerId: 1 }, 'read')).toBe(false);
      
      // nullリソース
      expect(checkAccess({ id: 1, role: 'user' }, null, 'read')).toBe(false);
      
      // 無効なrole
      expect(checkAccess({ id: 1, role: 'guest' }, { ownerId: 1 }, 'read')).toBe(false);
    });
  });
});

