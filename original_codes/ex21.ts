// ex21: 型アサーションの乱用
// 問題点:
// - 型安全性を無視している
// - any型の多用
// - 型アサーションで無理やり通している
// - 実行時エラーのリスク
// 期待する練習:
// - 型で意図を表現
// - 型の適切な使用
// - 型ガードの導入

function processData(data: any): any {
  const user = data as any;
  const name = (user.name as string).toUpperCase();
  const age = user.age as number;
  const email = user.email as string;
  
  return {
    name,
    age: age + 10,
    email: email.toLowerCase()
  };
}

function getValue(obj: any, key: string): any {
  return (obj as any)[key];
}

function calculateTotal(items: any[]): number {
  let total = 0;
  for (const item of items) {
    total += (item.price as number) || 0;
  }
  return total as number;
}

function parseUser(json: string): any {
  const data = JSON.parse(json) as any;
  return {
    id: data.id as number,
    name: data.name as string,
    email: data.email as string
  };
}

const userData = { name: 'John', age: 30, email: 'JOHN@EXAMPLE.COM' };
const processed = processData(userData);
const value = getValue({ test: 123 }, 'test');
const total = calculateTotal([{ price: 100 }, { price: 200 }]);
const user = parseUser('{"id":1,"name":"Jane","email":"jane@test.com"}');

export { processData, getValue, calculateTotal, parseUser };

