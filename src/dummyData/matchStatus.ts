export interface MatchStatusCategory {
  id: string;
  name: string;
  count: number;
  formattedCount: string;
  color: string;
}

export const matchStatusDummyData: MatchStatusCategory[] = [
  {
    id: "active",
    name: "Active",
    count: 4280,
    formattedCount: "4,280",
    color: "#22c55e",
  },
  {
    id: "completed",
    name: "Completed",
    count: 2840,
    formattedCount: "2,840",
    color: "#e11d48",
  },
  {
    id: "expired",
    name: "Expired",
    count: 1560,
    formattedCount: "1,560",
    color: "#f59e0b",
  },
  {
    id: "cancelled",
    name: "Cancelled",
    count: 820,
    formattedCount: "820",
    color: "#94a3b8",
  },
];
