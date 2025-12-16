// ex12: 条件判定が仕様を隠している
// 問題点:
// - 複雑な条件式で意図が不明確
// - ビジネスルールがコードに埋もれている
// - 条件の組み合わせが理解しづらい
// 期待する練習:
// - 条件記述の単純化
// - 関数の抽出
// - 説明変数の導入

function canPurchase(product: any, user: any, cart: any[]): boolean {
  if (product.stock > 0 && 
      (user.age >= 18 || product.category !== 'alcohol') &&
      (user.points >= product.price * 0.1 || user.membershipLevel >= 2) &&
      cart.length < 10 &&
      product.isActive &&
      !product.isRestricted) {
    return true;
  }
  return false;
}

function isEligibleForDiscount(order: any, customer: any): boolean {
  const total = order.items.reduce((sum: number, item: any) => sum + item.price, 0);
  if ((customer.memberSince < '2020-01-01' && total > 5000) ||
      (customer.purchaseCount > 10 && total > 3000) ||
      (customer.referralCount > 5 && total > 2000)) {
    return true;
  }
  return false;
}

function shouldNotifyUser(user: any, notification: any): boolean {
  if ((user.preferences.email && notification.type === 'email') ||
      (user.preferences.sms && notification.type === 'sms' && user.phone) ||
      (user.preferences.push && notification.type === 'push' && user.deviceToken)) {
    if (notification.priority === 'high' || 
        (notification.priority === 'medium' && user.isActive) ||
        (notification.priority === 'low' && user.lastLogin > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))) {
      return true;
    }
  }
  return false;
}

const product = { stock: 5, category: 'electronics', price: 1000, isActive: true, isRestricted: false };
const user = { age: 25, points: 100, membershipLevel: 1 };
const cart = [{ id: 1 }];
const canBuy = canPurchase(product, user, cart);

export { canPurchase, isEligibleForDiscount, shouldNotifyUser };

