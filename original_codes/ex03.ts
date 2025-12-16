// ex03: マジックナンバーと文字列の散在
// 問題点:
// - マジックナンバーが直接書かれている
// - 文字列リテラルが散在している
// - 意味が不明確な数値が多い
// - 変更時に複数箇所を修正する必要がある
// 期待する練習:
// - マジックナンバーの置換
// - 定数の抽出
// - 意味のある名前の導入

function calculateShippingFee(weight: number, country: string): number {
  if (country === 'JP') {
    if (weight <= 1) {
      return 500;
    } else if (weight <= 5) {
      return 800;
    } else if (weight <= 10) {
      return 1200;
    } else {
      return 2000;
    }
  } else if (country === 'US') {
    if (weight <= 1) {
      return 1000;
    } else if (weight <= 5) {
      return 2000;
    } else {
      return 5000;
    }
  } else {
    return 3000;
  }
}

function getStatusMessage(code: number): string {
  if (code === 0) {
    return 'pending';
  } else if (code === 1) {
    return 'processing';
  } else if (code === 2) {
    return 'completed';
  } else if (code === 3) {
    return 'cancelled';
  } else {
    return 'unknown';
  }
}

const fee = calculateShippingFee(3, 'JP');
const status = getStatusMessage(1);

export { calculateShippingFee, getStatusMessage };

