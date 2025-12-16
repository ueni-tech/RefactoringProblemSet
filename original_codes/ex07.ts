// ex07: 引数が多すぎる関数
// 問題点:
// - 引数が多すぎて呼び出しが困難
// - 引数の順序を覚える必要がある
// - デフォルト値の指定ができない
// - 一部の引数だけ変更したい場合に不便
// 期待する練習:
// - 引数オブジェクトの導入
// - オブジェクトの導入
// - パラメータオブジェクトの導入

function createUser(
  firstName: string,
  lastName: string,
  email: string,
  age: number,
  isActive: boolean,
  role: string,
  department: string,
  salary: number,
  startDate: string,
  phone: string
): any {
  return {
    firstName,
    lastName,
    email,
    age,
    isActive,
    role,
    department,
    salary,
    startDate,
    phone
  };
}

function updateProduct(
  id: number,
  name: string,
  price: number,
  stock: number,
  category: string,
  description: string,
  isActive: boolean,
  discount: number
): any {
  return {
    id,
    name,
    price,
    stock,
    category,
    description,
    isActive,
    discount
  };
}

const user = createUser('John', 'Doe', 'john@example.com', 30, true, 'developer', 'IT', 5000000, '2024-01-01', '090-1234-5678');
const product = updateProduct(1, 'Product A', 1000, 50, 'Electronics', 'Description', true, 10);

export { createUser, updateProduct };

