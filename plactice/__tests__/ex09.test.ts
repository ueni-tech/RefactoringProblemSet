import { UserManager } from '../ex09';

describe('ex09: 責務が混ざった肥大化クラス', () => {
  let manager: UserManager;

  beforeEach(() => {
    manager = new UserManager();
  });

  test('ユーザーを追加', () => {
    manager.addUser('John', 'john@example.com');
    expect(manager.users).toHaveLength(1);
    expect(manager.users[0].name).toBe('John');
    expect(manager.users[0].email).toBe('john@example.com');
    expect(manager.users[0].id).toBe(1);
  });

  test('複数のユーザーを追加', () => {
    manager.addUser('John', 'john@example.com');
    manager.addUser('Jane', 'jane@test.com');
    expect(manager.users).toHaveLength(2);
    expect(manager.users[1].id).toBe(2);
  });

  test('ユーザーを検索', () => {
    manager.addUser('John', 'john@example.com');
    manager.addUser('Jane', 'jane@test.com');
    const user = manager.findUser(1);
    expect(user).toBeDefined();
    expect(user?.name).toBe('John');
  });

  test('存在しないユーザーはundefined', () => {
    manager.addUser('John', 'john@example.com');
    const user = manager.findUser(999);
    expect(user).toBeUndefined();
  });

  test('メールアドレスの検証', () => {
    expect(manager.validateEmail('test@example.com')).toBe(true);
    expect(manager.validateEmail('invalid')).toBe(false);
    expect(manager.validateEmail('test@')).toBe(false);
  });

  test('レポート生成', () => {
    manager.addUser('John', 'john@example.com');
    manager.addUser('Jane', 'jane@test.com');
    const report = manager.generateReport();
    expect(report).toContain('User Report');
    expect(report).toContain('Total Users: 2');
    expect(report).toContain('John');
    expect(report).toContain('Jane');
  });

  test('CSVエクスポート', () => {
    manager.addUser('John', 'john@example.com');
    manager.addUser('Jane', 'jane@test.com');
    const csv = manager.exportToCSV();
    expect(csv).toContain('id,name,email');
    expect(csv).toContain('John');
    expect(csv).toContain('Jane');
  });

  test('統計情報の計算', () => {
    manager.addUser('John', 'john@example.com');
    manager.addUser('Jane', 'jane@test.com');
    const stats = manager.calculateStatistics();
    expect(stats.total).toBe(2);
    expect(stats.averageNameLength).toBeGreaterThan(0);
    expect(stats.emailDomains).toBeDefined();
  });
});

