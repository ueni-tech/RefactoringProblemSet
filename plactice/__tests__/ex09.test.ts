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

  // リファクタリング検証テスト: 元のコードと同じ結果を返すことを確認
  describe('リファクタリング検証: 計算結果の正確性', () => {
    test('ユーザー追加のIDが正確に割り当てられる', () => {
      const manager = new UserManager();
      manager.addUser('John', 'john@example.com');
      expect(manager.users[0].id).toBe(1);
      
      manager.addUser('Jane', 'jane@test.com');
      expect(manager.users[1].id).toBe(2);
    });

    test('ユーザー検索が正確', () => {
      const manager = new UserManager();
      manager.addUser('John', 'john@example.com');
      manager.addUser('Jane', 'jane@test.com');
      
      const user1 = manager.findUser(1);
      expect(user1?.name).toBe('John');
      expect(user1?.email).toBe('john@example.com');
      
      const user2 = manager.findUser(2);
      expect(user2?.name).toBe('Jane');
      expect(user2?.email).toBe('jane@test.com');
      
      const user999 = manager.findUser(999);
      expect(user999).toBeUndefined();
    });

      test('メール検証が正確', () => {
        const manager = new UserManager();
        expect(manager.validateEmail('test@example.com')).toBe(true);
        expect(manager.validateEmail('user.name@domain.co.jp')).toBe(true);
        expect(manager.validateEmail('invalid')).toBe(false);
        expect(manager.validateEmail('test@')).toBe(false);
        // 注意: 元のコードは @ と . の両方を含むかどうかのみチェックするため、@example.com は true になる
        expect(manager.validateEmail('@example.com')).toBe(true);
      });

    test('レポート生成が正確', () => {
      const manager = new UserManager();
      manager.addUser('John', 'john@example.com');
      manager.addUser('Jane', 'jane@test.com');
      
      const report = manager.generateReport();
      expect(report).toContain('User Report');
      expect(report).toContain('Total Users: 2');
      expect(report).toContain('John');
      expect(report).toContain('Jane');
      expect(report).toContain('john@example.com');
      expect(report).toContain('jane@test.com');
    });

    test('CSVエクスポートが正確', () => {
      const manager = new UserManager();
      manager.addUser('John', 'john@example.com');
      manager.addUser('Jane', 'jane@test.com');
      
      const csv = manager.exportToCSV();
      expect(csv).toContain('id,name,email');
      expect(csv).toContain('1,John,john@example.com');
      expect(csv).toContain('2,Jane,jane@test.com');
    });

    test('統計情報の計算が正確', () => {
      const manager = new UserManager();
      manager.addUser('John', 'john@example.com');
      manager.addUser('Jane', 'jane@test.com');
      
      const stats = manager.calculateStatistics();
      expect(stats.total).toBe(2);
      expect(stats.averageNameLength).toBe((4 + 4) / 2); // John(4) + Jane(4) / 2 = 4
      expect(stats.emailDomains['example.com']).toBe(1);
      expect(stats.emailDomains['test.com']).toBe(1);
    });

    test('同じ操作で常に同じ結果を返す', () => {
      const manager1 = new UserManager();
      manager1.addUser('John', 'john@example.com');
      
      const manager2 = new UserManager();
      manager2.addUser('John', 'john@example.com');
      
      expect(manager1.users[0]).toEqual(manager2.users[0]);
      expect(manager1.generateReport()).toBe(manager2.generateReport());
    });
  });
});

