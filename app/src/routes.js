import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import RTLDefault from "views/rtl/default";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";

const routes = [
  {
    name: "Tổng quát",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-4 w-4" />,
    component: <MainDashboard />,
  },
  {
    name: "Nguồn dữ liệu",
    layout: "/admin",
    icon: <MdBarChart className="h-4 w-4" />,
    path: "data-tables",
    component: <DataTables />,
  },
  {
    name: "Bảng phân tích",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-4 w-4" />,
    component: <Profile />,
  },
  {
    name: "Ý tưởng - Đề xuất",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-4 w-4" />,
    component: <Profile />,
  },
  {
    name: "Kế hoạch",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-4 w-4" />,
    component: <SignIn />,
  },
  {
    name: "Cấu hình",
    layout: "/rtl",
    path: "rtl",
    icon: <MdHome className="h-4 w-4" />,
    component: <RTLDefault />,
  },
];
export default routes;
