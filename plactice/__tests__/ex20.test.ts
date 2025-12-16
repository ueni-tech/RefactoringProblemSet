import { formatMessage, buildQuery, createEmail } from '../ex20';

describe('ex20: 文字列連結の繰り返し', () => {
  describe('formatMessage', () => {
    test('メッセージをフォーマット', () => {
      const message = formatMessage('John', 5000, '2024-12-01');
      expect(message).toContain('Hello,');
      expect(message).toContain('John');
      expect(message).toContain('5000');
      expect(message).toContain('2024-12-01');
    });

    test('すべての要素が含まれる', () => {
      const message = formatMessage('Jane', 3000, '2024-11-15');
      expect(message).toContain('Jane');
      expect(message).toContain('3000');
      expect(message).toContain('2024-11-15');
    });
  });

  describe('buildQuery', () => {
    test('基本的なクエリ構築', () => {
      const query = buildQuery('users', { id: 1 });
      expect(query).toContain('SELECT * FROM users');
      expect(query).toContain('WHERE');
      expect(query).toContain('id = 1');
    });

    test('複数の条件', () => {
      const query = buildQuery('users', { id: 1, status: 'active' });
      expect(query).toContain('id = 1');
      expect(query).toContain('status = active');
      expect(query).toContain('AND');
    });

    test('空の条件', () => {
      const query = buildQuery('users', {});
      expect(query).toContain('SELECT * FROM users');
      expect(query).toContain('WHERE');
    });
  });

  describe('createEmail', () => {
    test('メール形式を構築', () => {
      const email = createEmail('user@example.com', 'Test Subject', 'Test Body');
      expect(email).toContain('To: user@example.com');
      expect(email).toContain('Subject: Test Subject');
      expect(email).toContain('Test Body');
      expect(email).toContain('This is an automated message.');
    });

    test('改行が含まれる', () => {
      const email = createEmail('user@example.com', 'Subject', 'Body');
      const lines = email.split('\n');
      expect(lines.length).toBeGreaterThan(1);
    });
  });
});

