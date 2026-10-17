export interface Task {
  readonly id: string;
  readonly title: string;
  readonly done: boolean;
}

export type TaskFilter = 'ALL' | 'ACTIVE' | 'DONE';
