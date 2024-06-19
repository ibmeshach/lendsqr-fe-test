import {
  activeU,
  activeUL,
  activeUS,
  badge,
  briefcase,
  chart,
  clipboard,
  coins,
  dashboard,
  galaxy,
  guarantors,
  handLoan,
  handShake,
  loans,
  normalUsers,
  piggy,
  savings,
  scroll,
  sliders,
  transactions,
  userCheck,
  userCog,
  userTimes,
  users,
} from "../assets";

export const UserSidebarItems: SidebarItem[] = [
  {
    id: 1,
    items: [
      {
        id: 1,
        icon: dashboard,
        heading: "Dashboard",
        path: "/user/dashboard",
      },
    ],
  },

  {
    id: 2,
    title: "customers",
    items: [
      {
        id: 2,
        icon: users,
        heading: "Users",
        path: "/user/users",
      },

      {
        id: 3,
        icon: guarantors,
        heading: "Guarantors",
        path: "/user/guarantors",
      },
      {
        id: 4,
        icon: loans,
        heading: "Loans",
        path: "/user/loans",
      },
      {
        id: 5,
        icon: handShake,
        heading: "Decision Models",
        path: "/user/decisionModels",
      },
      {
        id: 6,
        icon: piggy,
        heading: "Savings",
        path: "/user/savings",
      },
      {
        id: 7,
        icon: handLoan,
        heading: "Loan Requests",
        path: "/user/loanRequests",
      },
      {
        id: 8,
        icon: userCheck,
        heading: "Whitelist",
        path: "/user/whitelist",
      },
      {
        id: 9,
        icon: userTimes,
        heading: "Karma",
        path: "/user/karma",
      },
    ],
  },

  {
    id: 3,
    title: "businesses",
    items: [
      {
        id: 10,
        icon: briefcase,
        heading: "Organization",
        path: "/user/organization",
      },

      {
        id: 11,
        icon: handLoan,
        heading: "Loan Products",
        path: "/user/loanProducts",
      },
      {
        id: 12,
        icon: savings,
        heading: "Savings Products",
        path: "/user/savingsProducts",
      },
      {
        id: 13,
        icon: coins,
        heading: "Fees and Charges",
        path: "/user/fees&charges",
      },
      {
        id: 14,
        icon: transactions,
        heading: "Transactions",
        path: "/user/transactions",
      },
      {
        id: 15,
        icon: galaxy,
        heading: "Services",
        path: "/user/services",
      },
      {
        id: 16,
        icon: userCog,
        heading: "Service Account",
        path: "/user/serviceAccount",
      },
      {
        id: 17,
        icon: scroll,
        heading: "Settlements",
        path: "/user/settlements",
      },

      {
        id: 18,
        icon: chart,
        heading: "Reports",
        path: "/user/reports",
      },
    ],
  },

  {
    id: 4,
    title: "settings",
    items: [
      {
        id: 19,
        icon: sliders,
        heading: "Preferences",
        path: "/user/preferences",
      },

      {
        id: 20,
        icon: badge,
        heading: "Fees and Pricing",
        path: "/user/fees&pricing",
      },

      {
        id: 21,
        icon: clipboard,
        heading: "Audit Logs",
        path: "/user/auditLogs",
      },
    ],
  },
];

export const statisticsData: StatisticsCardProps[] = [
  {
    title: "Users",
    value: "2,453",
    icon: normalUsers,
  },

  {
    title: "Active Users",
    value: "2,453",
    icon: activeU,
  },

  {
    title: "Users with Loans",
    value: "12,453",
    icon: activeUL,
  },

  {
    title: "Users with Savings",
    value: "102,453",
    icon: activeUS,
  },
];
