// ex09: 責務が混ざった肥大化クラス
// 問題点:
// - 1つのクラスが複数の責務を持っている
// - クラスが肥大化している
// - 変更の影響範囲が大きい
// - テストが困難
// 期待する練習:
// - クラスの抽出
// - 責務の分離
// - 委譲の導入

class UserManager {
  users: any[];
  
  constructor() {
    this.users = [];
  }
  
  addUser(name: string, email: string): void {
    this.users.push({ name, email, id: this.users.length + 1 });
  }
  
  findUser(id: number): any {
    return this.users.find(u => u.id === id);
  }
  
  validateEmail(email: string): boolean {
    return email.includes('@') && email.includes('.');
  }
  
  sendEmail(to: string, subject: string, body: string): void {
    console.log(`Sending email to ${to}: ${subject}`);
    // 実際のメール送信処理
  }
  
  generateReport(): string {
    let report = 'User Report\n';
    report += `Total Users: ${this.users.length}\n`;
    for (const user of this.users) {
      report += `- ${user.name} (${user.email})\n`;
    }
    return report;
  }
  
  exportToCSV(): string {
    let csv = 'id,name,email\n';
    for (const user of this.users) {
      csv += `${user.id},${user.name},${user.email}\n`;
    }
    return csv;
  }
  
  calculateStatistics(): any {
    const stats = {
      total: this.users.length,
      averageNameLength: 0,
      emailDomains: {} as any
    };
    let totalLength = 0;
    for (const user of this.users) {
      totalLength += user.name.length;
      const domain = user.email.split('@')[1];
      stats.emailDomains[domain] = (stats.emailDomains[domain] || 0) + 1;
    }
    stats.averageNameLength = totalLength / this.users.length;
    return stats;
  }
}

const manager = new UserManager();
manager.addUser('John', 'john@example.com');
manager.addUser('Jane', 'jane@test.com');
const user = manager.findUser(1);
const report = manager.generateReport();

export { UserManager };

