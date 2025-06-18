export interface RequestedBooksProp {
  id: number; // Request ID
  employeeId: number;
  status: "REQUESTED" | "NOTIFIED" | "REMOVED";
  book: {
    id: number;
    title: string;
  };
}