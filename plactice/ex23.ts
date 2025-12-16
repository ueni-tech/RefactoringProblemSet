// ex23: スイッチ文の重複とdefaultの不適切な処理
// 問題点:
// - スイッチ文が重複している
// - default節でエラーを握りつぶしている
// - 処理が分散している
// 期待する練習:
// - 関数の抽出
// - ポリモーフィズムの導入
// - 例外の整理

function getStatusColor(status: string): string {
  switch (status) {
    case 'pending':
      return 'yellow';
    case 'processing':
      return 'blue';
    case 'completed':
      return 'green';
    case 'cancelled':
      return 'red';
    default:
      return 'gray'; // エラーを無視
  }
}

function getStatusIcon(status: string): string {
  switch (status) {
    case 'pending':
      return '⏳';
    case 'processing':
      return '⚙️';
    case 'completed':
      return '✅';
    case 'cancelled':
      return '❌';
    default:
      return '?'; // エラーを無視
  }
}

function getStatusMessage(status: string): string {
  switch (status) {
    case 'pending':
      return 'Your order is pending';
    case 'processing':
      return 'Your order is being processed';
    case 'completed':
      return 'Your order has been completed';
    case 'cancelled':
      return 'Your order has been cancelled';
    default:
      return 'Unknown status'; // エラーを無視
  }
}

function processStatus(status: string): void {
  switch (status) {
    case 'pending':
      console.log('Processing pending order');
      break;
    case 'processing':
      console.log('Order is in progress');
      break;
    case 'completed':
      console.log('Order completed successfully');
      break;
    case 'cancelled':
      console.log('Order was cancelled');
      break;
    default:
      // 何もしない（エラーを無視）
      break;
  }
}

const color = getStatusColor('processing');
const icon = getStatusIcon('completed');
const message = getStatusMessage('pending');
processStatus('cancelled');

export { getStatusColor, getStatusIcon, getStatusMessage, processStatus };

