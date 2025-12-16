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
});

