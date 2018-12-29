// @Модель данных
export interface Task {
  id?: number;
  title: string;
  userId: number;
  completed: boolean;
  text?: string;
  borderState?: boolean;
}
