// ex20: 文字列連結の繰り返し
// 問題点:
// - 文字列連結が非効率
// - コードが読みづらい
// - フォーマットが一貫していない
// 期待する練習:
// - テンプレートリテラルの導入
// - 関数の抽出
// - フォーマットの統一

function formatMessage(name: string, amount: number, date: string): string {
  let message = 'Hello, ';
  message += name;
  message += '. Your order of ';
  message += amount;
  message += ' yen was placed on ';
  message += date;
  message += '. Thank you!';
  return message;
}

function buildQuery(table: string, conditions: any): string {
  let query = 'SELECT * FROM ';
  query += table;
  query += ' WHERE ';
  
  let first = true;
  for (const key in conditions) {
    if (!first) {
      query += ' AND ';
    }
    query += key;
    query += ' = ';
    query += conditions[key];
    first = false;
  }
  
  return query;
}

function createEmail(to: string, subject: string, body: string): string {
  let email = 'To: ' + to + '\n';
  email += 'Subject: ' + subject + '\n';
  email += '\n';
  email += body + '\n';
  email += '\n';
  email += '---\n';
  email += 'This is an automated message.';
  return email;
}

const message = formatMessage('John', 5000, '2024-12-01');
const query = buildQuery('users', { id: 1, status: 'active' });
const email = createEmail('user@example.com', 'Order Confirmation', 'Your order has been received.');

export { formatMessage, buildQuery, createEmail };

