import { createTask, updateTaskStatus, getTasksByStatus, isTaskOverdue, Task } from '../ex10';

describe('ex10: ドメインっぽいが型が弱い', () => {
  describe('createTask', () => {
    test('タスクを作成', () => {
      const task = createTask('Fix bug', 5, 1, '2024-12-31');
      expect(task.title).toBe('Fix bug');
      expect(task.priority).toBe(5);
      expect(task.assigneeId).toBe(1);
      expect(task.dueDate).toBe('2024-12-31');
      expect(task.status).toBe(0);
      expect(task.id).toBeDefined();
    });
  });

  describe('updateTaskStatus', () => {
    test('タスクのステータスを更新', () => {
      const task = createTask('Fix bug', 5, 1, '2024-12-31');
      const updated = updateTaskStatus(task, 1);
      expect(updated.status).toBe(1);
    });

    test('無効なステータス値も設定可能（問題点）', () => {
      const task = createTask('Fix bug', 5, 1, '2024-12-31');
      const updated = updateTaskStatus(task, 99);
      expect(updated.status).toBe(99); // 無効な値でも設定できてしまう
    });
  });

  describe('getTasksByStatus', () => {
    test('ステータスでフィルタ', () => {
      const task1 = createTask('Task 1', 1, 1, '2024-12-31');
      const task2 = createTask('Task 2', 2, 1, '2024-12-31');
      updateTaskStatus(task2, 1);
      const tasks = [task1, task2];
      const pendingTasks = getTasksByStatus(tasks, 0);
      expect(pendingTasks).toHaveLength(1);
      expect(pendingTasks[0].title).toBe('Task 1');
    });
  });

  describe('isTaskOverdue', () => {
    test('期限切れのタスクを判定', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      const task = createTask('Overdue task', 1, 1, pastDate.toISOString().split('T')[0]);
      expect(isTaskOverdue(task)).toBe(true);
    });

    test('完了済みタスクは期限切れではない', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      const task = createTask('Completed task', 1, 1, pastDate.toISOString().split('T')[0]);
      updateTaskStatus(task, 2);
      expect(isTaskOverdue(task)).toBe(false);
    });

    test('未来の日付は期限切れではない', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 30);
      const task = createTask('Future task', 1, 1, futureDate.toISOString().split('T')[0]);
      expect(isTaskOverdue(task)).toBe(false);
    });
  });

  // リファクタリング検証テスト: 元のコードと同じ結果を返すことを確認
  describe('リファクタリング検証: 計算結果の正確性', () => {
    describe('createTask: 様々なパターンで正確な結果を返す', () => {
      test('タスク作成時の初期値が正確', () => {
        const task = createTask('Fix bug', 5, 1, '2024-12-31');
        expect(task.title).toBe('Fix bug');
        expect(task.priority).toBe(5);
        expect(task.assigneeId).toBe(1);
        expect(task.dueDate).toBe('2024-12-31');
        expect(task.status).toBe(0);
        expect(task.id).toBeDefined();
        expect(typeof task.id).toBe('number');
      });

      test('異なる値でも正しく作成される', () => {
        const task = createTask('New feature', 3, 2, '2025-01-15');
        expect(task.title).toBe('New feature');
        expect(task.priority).toBe(3);
        expect(task.assigneeId).toBe(2);
        expect(task.dueDate).toBe('2025-01-15');
        expect(task.status).toBe(0);
      });
    });

    describe('updateTaskStatus: 様々なパターンで正確な結果を返す', () => {
      test('ステータス更新が正確', () => {
        const task = createTask('Fix bug', 5, 1, '2024-12-31');
        const updated = updateTaskStatus(task, 1);
        expect(updated.status).toBe(1);
        expect(updated.title).toBe('Fix bug'); // 他のフィールドは変わらない
      });

      test('無効なステータス値も設定可能（元のコードの動作）', () => {
        const task = createTask('Fix bug', 5, 1, '2024-12-31');
        const updated = updateTaskStatus(task, 99);
        expect(updated.status).toBe(99); // 無効な値でも設定できてしまう
      });

      test('同じ入力で常に同じ結果を返す', () => {
        const task1 = createTask('Fix bug', 5, 1, '2024-12-31');
        const task2 = createTask('Fix bug', 5, 1, '2024-12-31');
        const updated1 = updateTaskStatus(task1, 1);
        const updated2 = updateTaskStatus(task2, 1);
        expect(updated1.status).toBe(updated2.status);
      });
    });

    describe('getTasksByStatus: 様々なパターンで正確な結果を返す', () => {
      test('ステータスでフィルタが正確', () => {
        const task1 = createTask('Task 1', 1, 1, '2024-12-31');
        const task2 = createTask('Task 2', 2, 1, '2024-12-31');
        updateTaskStatus(task2, 1);
        const tasks = [task1, task2];
        
        const pendingTasks = getTasksByStatus(tasks, 0);
        expect(pendingTasks).toHaveLength(1);
        expect(pendingTasks[0].title).toBe('Task 1');
        
        const inProgressTasks = getTasksByStatus(tasks, 1);
        expect(inProgressTasks).toHaveLength(1);
        expect(inProgressTasks[0].title).toBe('Task 2');
      });

      test('存在しないステータスでフィルタ', () => {
        const task1 = createTask('Task 1', 1, 1, '2024-12-31');
        const tasks = [task1];
        const result = getTasksByStatus(tasks, 99);
        expect(result).toHaveLength(0);
      });
    });

    describe('isTaskOverdue: 様々なパターンで正確な結果を返す', () => {
      test('期限切れのタスクを正確に判定', () => {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 1);
        const task = createTask('Overdue task', 1, 1, pastDate.toISOString().split('T')[0]);
        expect(isTaskOverdue(task)).toBe(true);
      });

      test('完了済みタスクは期限切れではない', () => {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 1);
        const task = createTask('Completed task', 1, 1, pastDate.toISOString().split('T')[0]);
        updateTaskStatus(task, 2);
        expect(isTaskOverdue(task)).toBe(false);
      });

      test('未来の日付は期限切れではない', () => {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 30);
        const task = createTask('Future task', 1, 1, futureDate.toISOString().split('T')[0]);
        expect(isTaskOverdue(task)).toBe(false);
      });

      test('今日の日付は期限切れではない', () => {
        const today = new Date().toISOString().split('T')[0];
        const task = createTask('Today task', 1, 1, today);
        expect(isTaskOverdue(task)).toBe(false);
      });
    });
  });
});

