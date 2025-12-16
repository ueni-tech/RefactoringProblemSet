// ex06: 命名が悪い変数と関数
// 問題点:
// - 意味のない変数名（a, b, tmp, data等）
// - 関数名が処理内容を表していない
// - 意図が伝わらない命名
// 期待する練習:
// - 変数名の変更
// - 関数名の変更
// - 意図を明確にする命名

function calc(a: number, b: number, c: boolean): number {
  let tmp = a * b;
  if (c) {
    tmp = tmp * 1.1;
  }
  return tmp;
}

function process(data: any[]): any[] {
  const result: any[] = [];
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (item.x > 10 && item.y < 20) {
      result.push(item);
    }
  }
  return result;
}

function getValue(obj: any, key: string): any {
  return obj[key];
}

function check(x: any): boolean {
  if (x !== null && x !== undefined && x !== '') {
    return true;
  }
  return false;
}

const result1 = calc(100, 2, true);
const filtered = process([{ x: 15, y: 10 }, { x: 5, y: 25 }]);
const value = getValue({ name: 'test' }, 'name');
const isValid = check('hello');

export { calc, process, getValue, check };

