// ex25: オブジェクトのプロパティへの直接アクセス
// 問題点:
// - オブジェクトのプロパティに直接アクセスしている
// - カプセル化されていない
// - バリデーションがない
// - 変更に弱い
// 期待する練習:
// - データのカプセル化
// - カプセル化の強化
// - アクセサの導入

class Product {
  name: string;
  price: number;
  stock: number;
  
  constructor(name: string, price: number, stock: number) {
    this.name = name;
    this.price = price;
    this.stock = stock;
  }
}

function updateProduct(product: Product, newPrice: number): void {
  product.price = newPrice; // 直接変更、バリデーションなし
}

function applyDiscount(product: Product, discount: number): void {
  product.price = product.price * (1 - discount); // 直接変更
  if (product.price < 0) {
    product.price = 0; // 後からチェック
  }
}

function sellProduct(product: Product, quantity: number): boolean {
  if (product.stock >= quantity) {
    product.stock = product.stock - quantity; // 直接変更
    return true;
  }
  return false;
}

function getProductInfo(product: Product): string {
  return product.name + ': ' + product.price + ' yen, Stock: ' + product.stock;
}

const product = new Product('Laptop', 100000, 10);
updateProduct(product, -1000); // 無効な値も設定可能
applyDiscount(product, 0.5);
sellProduct(product, 3);
const info = getProductInfo(product);

export { Product, updateProduct, applyDiscount, sellProduct, getProductInfo };

