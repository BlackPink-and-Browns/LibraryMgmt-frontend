export type notification = {
  id: number;
  type: 'BOOK_AVAILABLE' | 'BOOK_OVERDUE';
  message: string;
  read: boolean;
  createdAt: string;
};
