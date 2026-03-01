export type TaskStatus = 'pending' | 'in_progress' | 'completed'; // [cite: 41]
export type TaskPriority = 'low' | 'medium' | 'high'; // [cite: 42]

export interface Task {
  id: number;
  title: string; // [cite: 39]
  description?: string; // [cite: 40]
  status: TaskStatus; // [cite: 41]
  priority: TaskPriority; // [cite: 42]
  due_date?: string; // [cite: 44]
}

export interface AuthResponse {
  token: string;
}