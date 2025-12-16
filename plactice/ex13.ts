// ex13: 日付計算の業務ロジック
// 問題点:
// - 日付計算が複雑で読みづらい
// - マジックナンバーが多い
// - ロジックが分散している
// - テストが困難
// 期待する練習:
// - 関数の抽出
// - マジックナンバーの置換
// - 変数の抽出

function calculateRentalFee(startDate: string, endDate: string, itemType: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  let dailyRate = 0;
  if (itemType === 'car') {
    dailyRate = 5000;
  } else if (itemType === 'bike') {
    dailyRate = 1000;
  } else if (itemType === 'equipment') {
    dailyRate = 2000;
  }
  
  let total = dailyRate * diffDays;
  
  if (diffDays > 7) {
    total = total * 0.9;
  } else if (diffDays > 3) {
    total = total * 0.95;
  }
  
  const today = new Date();
  const daysUntilStart = Math.ceil((start.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (daysUntilStart > 30) {
    total = total * 0.85;
  }
  
  return Math.floor(total);
}

function isBusinessDay(date: string): boolean {
  const d = new Date(date);
  const day = d.getDay();
  if (day === 0 || day === 6) {
    return false;
  }
  
  const month = d.getMonth();
  const dayOfMonth = d.getDate();
  if (month === 0 && dayOfMonth === 1) {
    return false;
  }
  if (month === 4 && dayOfMonth === 3) {
    return false;
  }
  if (month === 11 && dayOfMonth === 23) {
    return false;
  }
  
  return true;
}

const fee = calculateRentalFee('2024-12-01', '2024-12-10', 'car');
const isBusiness = isBusinessDay('2024-12-25');

export { calculateRentalFee, isBusinessDay };

