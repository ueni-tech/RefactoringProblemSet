// ex27: 日付・時刻の扱いが不適切
// 問題点:
// - 日付の比較が文字列で行われている
// - タイムゾーンが考慮されていない
// - 日付計算が不正確
// - フォーマットが一貫していない
// 期待する練習:
// - 関数の抽出
// - 日付処理の改善
// - 定数の抽出

function isDateBefore(date1: string, date2: string): boolean {
  return date1 < date2; // 文字列比較（YYYY-MM-DD形式なら動くが危険）
}

function addDays(dateStr: string, days: number): string {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0]; // タイムゾーンの問題
}

function getDaysBetween(date1: string, date2: string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diff = d2.getTime() - d1.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24)); // 丸め誤差の可能性
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 0ベース
  const day = date.getDate();
  return year + '/' + month + '/' + day; // フォーマットが一貫していない
}

function isWeekend(dateStr: string): boolean {
  const date = new Date(dateStr);
  const day = date.getDay();
  return day === 0 || day === 6; // タイムゾーンの影響を受ける
}

function getCurrentDate(): string {
  return new Date().toISOString().split('T')[0]; // 毎回新しいDateオブジェクト
}

const isBefore = isDateBefore('2024-01-01', '2024-12-31');
const futureDate = addDays('2024-12-01', 30);
const days = getDaysBetween('2024-01-01', '2024-12-31');
const formatted = formatDate('2024-12-25');
const weekend = isWeekend('2024-12-28');
const today = getCurrentDate();

export { isDateBefore, addDays, getDaysBetween, formatDate, isWeekend, getCurrentDate };

