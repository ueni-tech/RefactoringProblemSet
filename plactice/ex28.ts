// ex28: ループ内での不要な計算の繰り返し
// 問題点:
// - ループ内で同じ計算を繰り返している
// - 不変の値を毎回計算している
// - パフォーマンスが悪い
// 期待する練習:
// - 変数の抽出
// - ループの改善
// - 計算の最適化

function processItems(items: any[], discountRate: number): any[] {
  const result: any[] = [];
  for (let i = 0; i < items.length; i++) {
    const basePrice = items[i].price;
    const discountedPrice = basePrice * (1 - discountRate);
    const tax = discountedPrice * 0.1; // 毎回同じ税率を計算
    const finalPrice = discountedPrice + tax;
    
    // ループ内で毎回計算
    const maxPrice = Math.max(...items.map(item => item.price));
    const minPrice = Math.min(...items.map(item => item.price));
    
    result.push({
      ...items[i],
      finalPrice,
      isExpensive: items[i].price > maxPrice * 0.8,
      isCheap: items[i].price < minPrice * 1.2
    });
  }
  return result;
}

function filterAndSort(data: any[], threshold: number): any[] {
  const result: any[] = [];
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const average = total / data.length;
  
  for (const item of data) {
    // ループ内で毎回計算
    const total = data.reduce((sum, i) => sum + i.value, 0);
    const average = total / data.length;
    
    if (item.value > average && item.value > threshold) {
      result.push(item);
    }
  }
  
  // ソートでも毎回計算
  return result.sort((a, b) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const avg = total / data.length;
    return (b.value - avg) - (a.value - avg);
  });
}

function calculateStatistics(numbers: number[]): any {
  const stats: any = {};
  for (let i = 0; i < numbers.length; i++) {
    // 毎回同じ計算
    stats.sum = numbers.reduce((a, b) => a + b, 0);
    stats.average = stats.sum / numbers.length;
    stats.max = Math.max(...numbers);
    stats.min = Math.min(...numbers);
  }
  return stats;
}

const items = [{ price: 1000 }, { price: 2000 }, { price: 1500 }];
const processed = processItems(items, 0.1);
const filtered = filterAndSort([{ value: 10 }, { value: 20 }, { value: 30 }], 15);
const stats = calculateStatistics([1, 2, 3, 4, 5]);

export { processItems, filterAndSort, calculateStatistics };

