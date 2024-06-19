interface LoginValues {
  email: string;
  password: string;
}

interface SidebarItem {
  id: number;
  title?: string;
  items: { id: number; icon: any; heading: string; path: string }[];
}

interface StatisticsCardProps {
  title: string;
  value: string;
  icon: string;
}

interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: string;
}

interface TableProp {
  data: User[];
}
