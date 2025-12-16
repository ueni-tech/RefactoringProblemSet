// ex18: グローバル変数の乱用
// 問題点:
// - グローバル変数に依存している
// - 状態管理が不明確
// - テストが困難
// - 副作用が発生しやすい
// 期待する練習:
// - 変数のスコープの縮小
// - パラメータ化
// - 状態のカプセル化

let currentUser: any = null;
let cartItems: any[] = [];
let totalPrice: number = 0;

function setUser(user: any): void {
  currentUser = user;
}

function addToCart(item: any): void {
  cartItems.push(item);
  totalPrice += item.price;
}

function removeFromCart(itemId: number): void {
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].id === itemId) {
      totalPrice -= cartItems[i].price;
      cartItems.splice(i, 1);
      break;
    }
  }
}

function calculateTotal(): number {
  let discount = 0;
  if (currentUser && currentUser.membershipLevel === 'premium') {
    discount = totalPrice * 0.1;
  }
  return totalPrice - discount;
}

function checkout(): void {
  if (cartItems.length === 0) {
    return;
  }
  const finalTotal = calculateTotal();
  // 決済処理
  cartItems = [];
  totalPrice = 0;
}

setUser({ id: 1, name: 'John', membershipLevel: 'premium' });
addToCart({ id: 1, price: 1000 });
addToCart({ id: 2, price: 2000 });
const total = calculateTotal();

export { setUser, addToCart, removeFromCart, calculateTotal, checkout };

