// ex17: 早すぎる最適化（無意味なキャッシュ）
// 問題点:
// - 不要なキャッシュが追加されている
// - コードが複雑になっている
// - メモリを無駄に使っている
// - 実際には最適化になっていない
// 期待する練習:
// - 不要なコードの削除
// - シンプル化
// - 最適化の見直し

class Calculator {
  private cache: Map<string, number> = new Map();
  
  add(a: number, b: number): number {
    const key = `add_${a}_${b}`;
    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }
    const result = a + b;
    this.cache.set(key, result);
    return result;
  }
  
  multiply(a: number, b: number): number {
    const key = `multiply_${a}_${b}`;
    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }
    const result = a * b;
    this.cache.set(key, result);
    return result;
  }
  
  getFullName(firstName: string, lastName: string): string {
    const key = `name_${firstName}_${lastName}`;
    if (this.cache.has(key)) {
      return String(this.cache.get(key));
    }
    const result = firstName + ' ' + lastName;
    this.cache.set(key, result.length); // 型が合わないがキャッシュしている
    return result;
  }
}

function processItems(items: any[]): any[] {
  const processedCache: any[] = [];
  const result: any[] = [];
  
  for (const item of items) {
    let found = false;
    for (const cached of processedCache) {
      if (cached.id === item.id) {
        found = true;
        result.push(cached);
        break;
      }
    }
    if (!found) {
      const processed = { ...item, processed: true };
      processedCache.push(processed);
      result.push(processed);
    }
  }
  
  return result;
}

const calc = new Calculator();
const sum = calc.add(1, 2);
const product = calc.multiply(3, 4);
const name = calc.getFullName('John', 'Doe');
const items = processItems([{ id: 1, name: 'A' }, { id: 2, name: 'B' }]);

export { Calculator, processItems };

