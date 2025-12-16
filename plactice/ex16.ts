// ex16: forループと配列操作のごちゃ混ぜ
// 問題点:
// - forループと配列メソッドが混在
// - 一貫性がない
// - 読みづらい
// 期待する練習:
// - ループの統一
// - 関数の抽出
// - 配列操作の統一

function processUsers(users: any[]): any[] {
  const result = [];
  
  for (let i = 0; i < users.length; i++) {
    if (users[i].age >= 18) {
      result.push(users[i]);
    }
  }
  
  const mapped = result.map(u => ({
    ...u,
    fullName: u.firstName + ' ' + u.lastName
  }));
  
  let totalAge = 0;
  for (const user of mapped) {
    totalAge += user.age;
  }
  const avgAge = totalAge / mapped.length;
  
  const filtered = mapped.filter(u => u.age > avgAge);
  
  for (let j = 0; j < filtered.length; j++) {
    filtered[j].score = filtered[j].age * 10 + filtered[j].points;
  }
  
  return filtered.sort((a, b) => b.score - a.score);
}

function calculateTotals(items: any[]): number {
  let sum = 0;
  items.forEach(item => {
    sum += item.price;
  });
  
  const discounted = items.map(item => {
    if (item.category === 'sale') {
      return item.price * 0.8;
    }
    return item.price;
  });
  
  let total = 0;
  for (let i = 0; i < discounted.length; i++) {
    total += discounted[i];
  }
  
  return total;
}

const users = [
  { firstName: 'John', lastName: 'Doe', age: 25, points: 100 },
  { firstName: 'Jane', lastName: 'Smith', age: 30, points: 200 }
];
const processed = processUsers(users);
const total = calculateTotals([{ price: 1000, category: 'normal' }, { price: 500, category: 'sale' }]);

export { processUsers, calculateTotals };

