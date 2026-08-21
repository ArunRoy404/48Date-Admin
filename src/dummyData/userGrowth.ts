export interface UserGrowthDataPoint {
  month: string;
  users: number;
}

export const userGrowthDummyData: UserGrowthDataPoint[] = [
  { month: "Jan", users: 3200 },
  { month: "Feb", users: 4600 },
  { month: "Mar", users: 6400 },
  { month: "Apr", users: 8500 },
  { month: "May", users: 11200 },
  { month: "Jun", users: 14800 },
  { month: "Jul", users: 18347 },
];
