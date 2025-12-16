// ex30: 設定値のハードコーディングと環境依存
// 問題点:
// - 設定値がコードに直接書かれている
// - 環境によって変わる値が固定されている
// - 変更時にコードを修正する必要がある
// - テストが困難
// 期待する練習:
// - 定数の抽出
// - 設定の外部化
// - マジックナンバーの置換

function sendEmail(to: string, subject: string, body: string): void {
  const smtpHost = 'smtp.example.com';
  const smtpPort = 587;
  const timeout = 30000;
  const maxRetries = 3;
  const retryDelay = 1000;
  
  // メール送信処理
  console.log(`Sending email via ${smtpHost}:${smtpPort}`);
}

function connectToDatabase(): void {
  const host = 'localhost';
  const port = 5432;
  const database = 'mydb';
  const username = 'admin';
  const password = 'password123';
  const poolSize = 10;
  const connectionTimeout = 5000;
  
  // データベース接続処理
  console.log(`Connecting to ${host}:${port}/${database}`);
}

function calculateShippingFee(weight: number, country: string): number {
  const japanBaseFee = 500;
  const japanWeightLimit1 = 1;
  const japanWeightLimit2 = 5;
  const japanWeightLimit3 = 10;
  const japanFee1 = 500;
  const japanFee2 = 800;
  const japanFee3 = 1200;
  const japanFee4 = 2000;
  
  if (country === 'JP') {
    if (weight <= japanWeightLimit1) {
      return japanFee1;
    } else if (weight <= japanWeightLimit2) {
      return japanFee2;
    } else if (weight <= japanWeightLimit3) {
      return japanFee3;
    } else {
      return japanFee4;
    }
  }
  
  return 3000;
}

function getApiEndpoint(environment: string): string {
  if (environment === 'production') {
    return 'https://api.example.com/v1';
  } else if (environment === 'staging') {
    return 'https://staging-api.example.com/v1';
  } else {
    return 'http://localhost:3000/api/v1';
  }
}

function validatePassword(password: string): boolean {
  const minLength = 8;
  const maxLength = 128;
  const requireUppercase = true;
  const requireLowercase = true;
  const requireNumbers = true;
  const requireSpecialChars = true;
  
  if (password.length < minLength || password.length > maxLength) {
    return false;
  }
  
  // バリデーション処理
  return true;
}

sendEmail('user@example.com', 'Test', 'Body');
connectToDatabase();
const fee = calculateShippingFee(3, 'JP');
const endpoint = getApiEndpoint('production');
const isValid = validatePassword('MyP@ssw0rd');

export { sendEmail, connectToDatabase, calculateShippingFee, getApiEndpoint, validatePassword };

