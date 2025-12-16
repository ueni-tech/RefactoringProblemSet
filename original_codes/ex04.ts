// ex04: 重複コードのコピペ
// 問題点:
// - 同じロジックが複数箇所に重複している
// - 修正時に複数箇所を変更する必要がある
// - コードが冗長で読みづらい
// 期待する練習:
// - 関数の抽出
// - 重複の排除
// - 共通処理の統合

function validateEmail(email: string): boolean {
  if (email.indexOf('@') === -1) {
    return false;
  }
  if (email.length < 5) {
    return false;
  }
  if (email.indexOf('.') === -1) {
    return false;
  }
  return true;
}

function validatePhone(phone: string): boolean {
  if (phone.indexOf('@') === -1) {
    return false;
  }
  if (phone.length < 5) {
    return false;
  }
  if (phone.indexOf('.') === -1) {
    return false;
  }
  return true;
}

function processUserData(data: any): any {
  if (data.email.indexOf('@') === -1) {
    return null;
  }
  if (data.email.length < 5) {
    return null;
  }
  if (data.email.indexOf('.') === -1) {
    return null;
  }
  return { ...data, validated: true };
}

const emailValid = validateEmail('test@example.com');
const phoneValid = validatePhone('090-1234-5678');
const user = processUserData({ email: 'user@test.com', name: 'John' });

export { validateEmail, validatePhone, processUserData };

