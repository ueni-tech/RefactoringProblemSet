// ex10: ドメインっぽいが型が弱い
// 問題点:
// - ドメインの概念が数値や文字列で表現されている
// - 型安全性が低い
// - 無効な値の代入が可能
// - 意図が不明確
// 期待する練習:
// - 型で意図を表現
// - プリミティブの置き換え
// - 値オブジェクトの導入

interface Task {
  id: number;
  title: string;
  status: number; // 0: pending, 1: in-progress, 2: completed, 3: cancelled
  priority: number; // 1-5
  assigneeId: number;
  dueDate: string; // YYYY-MM-DD
}

function createTask(title: string, priority: number, assigneeId: number, dueDate: string): Task {
  return {
    id: Math.floor(Math.random() * 10000),
    title,
    status: 0,
    priority,
    assigneeId,
    dueDate
  };
}

function updateTaskStatus(task: Task, newStatus: number): Task {
  task.status = newStatus; // 無効な値（例: 99）も代入可能
  return task;
}

function getTasksByStatus(tasks: Task[], status: number): Task[] {
  return tasks.filter(t => t.status === status);
}

function isTaskOverdue(task: Task): boolean {
  const today = new Date().toISOString().split('T')[0];
  return task.dueDate < today && task.status !== 2;
}

const task1 = createTask('Fix bug', 5, 1, '2024-12-31');
const task2 = updateTaskStatus(task1, 99); // 無効な値
const overdueTasks = getTasksByStatus([task1], 0).filter(isTaskOverdue);

export { createTask, updateTaskStatus, getTasksByStatus, isTaskOverdue, Task };

