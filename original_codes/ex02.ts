// ex02: ネストが深い条件分岐
// 問題点:
// - ネストが深すぎて読みづらい
// - ガード節が使われていない
// - 条件判定が複雑で意図が不明確
// - 早期リターンがない
// 期待する練習:
// - ガード節の導入
// - 条件記述の単純化
// - 早期リターンの導入

function checkAccess(user: any, resource: any, action: string): boolean {
  if (user !== null) {
    if (user.role !== undefined) {
      if (user.role === 'admin') {
        return true;
      } else {
        if (user.role === 'user') {
          if (resource !== null) {
            if (resource.ownerId === user.id) {
              if (action === 'read' || action === 'write') {
                return true;
              } else {
                return false;
              }
            } else {
              if (action === 'read') {
                return true;
              } else {
                return false;
              }
            }
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}

const user = { id: 1, role: 'user' };
const resource = { ownerId: 1 };
const canAccess = checkAccess(user, resource, 'write');

export { checkAccess };

