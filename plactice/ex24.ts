// ex24: 長いメソッドチェーンと中間変数の欠如
// 問題点:
// - メソッドチェーンが長すぎる
// - 中間結果が確認できない
// - デバッグが困難
// - 読みづらい
// 期待する練習:
// - 変数の抽出
// - 関数の抽出
// - 中間変数の導入

function processUsers(users: any[]): any[] {
  return users
    .filter(u => u.active)
    .map(u => ({ ...u, fullName: u.firstName + ' ' + u.lastName }))
    .filter(u => u.age >= 18)
    .map(u => ({ ...u, category: u.age < 30 ? 'young' : u.age < 50 ? 'middle' : 'senior' }))
    .sort((a, b) => b.points - a.points)
    .slice(0, 10)
    .map(u => ({ id: u.id, name: u.fullName, category: u.category, score: u.points * u.age }))
    .filter(u => u.score > 500)
    .sort((a, b) => a.name.localeCompare(b.name));
}

function calculateReport(data: any[]): any {
  return {
    total: data.length,
    average: data.reduce((sum, item) => sum + item.value, 0) / data.length,
    max: Math.max(...data.map(item => item.value)),
    min: Math.min(...data.map(item => item.value)),
    sum: data.reduce((sum, item) => sum + item.value, 0),
    filtered: data.filter(item => item.value > data.reduce((sum, i) => sum + i.value, 0) / data.length).map(item => item.id)
  };
}

function transformData(input: any[]): string {
  return input
    .map(item => item.value)
    .filter(val => val > 0)
    .map(val => val * 2)
    .sort((a, b) => b - a)
    .slice(0, 5)
    .map(val => val.toString())
    .join(', ');
}

const users = [
  { id: 1, firstName: 'John', lastName: 'Doe', age: 25, points: 100, active: true },
  { id: 2, firstName: 'Jane', lastName: 'Smith', age: 35, points: 200, active: true }
];
const processed = processUsers(users);
const report = calculateReport([{ id: 1, value: 10 }, { id: 2, value: 20 }]);
const transformed = transformData([{ value: 5 }, { value: 10 }, { value: 15 }]);

export { processUsers, calculateReport, transformData };

