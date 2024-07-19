import type { SidebarConfigType } from "@/types";

import {
  BarChart3,
  Briefcase,
  Cable,
  CircleDollarSign,
  FolderTree,
  Home,
  Presentation,
  Settings,
  Users,
} from "lucide-react";

export const sidebarConfig: SidebarConfigType[] = [
  {
    title: "Dashboard",
    Icon: Home,
    href: "/dashboard",
    dropdown: false,
  },
  {
    title: "People",
    Icon: Users,
    dropdown: true,
    dropdownMenu: [
      {
        name: "Users",
        path: "/dashboard/users",
      },
      { name: "Roles", path: "/dashboard/roles" },
    ],
  },
  {
    title: "Inventory",
    Icon: Briefcase,
    dropdown: true,
    dropdownMenu: [
      { name: "Products", path: "/dashboard/products" },
      { name: "Categories", path: "/dashboard/categories" },
      { name: "Brands", path: "/dashboard/brands" },
      { name: "Units", path: "/dashboard/units" },
      { name: "Suppliers", path: "/dashboard/suppliers" },
      { name: "Warehouses", path: "/dashboard/warehouses" },
    ],
  },
  {
    title: "Sales",
    Icon: CircleDollarSign,
    dropdown: true,
    dropdownMenu: [
      {
        name: "Sales",
        path: "/dashboard/sales",
      },
      { name: "Sales Returns", path: "/dashboard/sales-returns" },
      { name: "Payments In", path: "/dashboard/payments-in" },
      { name: "Quotations", path: "/dashboard/quotations" },
      { name: "Customers", path: "/dashboard/customers" },
    ],
  },
  {
    title: "POS",
    Icon: Presentation,
    href: "/dashboard/pos",
    dropdown: false,
  },
  {
    title: "Stock",
    Icon: FolderTree,
    dropdown: true,
    dropdownMenu: [
      { name: "Stock Transfers", path: "/dashboard/stock-transfers" },
      { name: "Stock Adjustments", path: "/dashboard/stock-adjustments" },
    ],
  },
  {
    title: "Integrations",
    Icon: Cable,
    href: "/dashboard/integrations",
    dropdown: false,
  },
  {
    title: "Settings",
    Icon: Settings,
    href: "/dashboard/settings",
    dropdown: false,
  },
  {
    title: "Reports",
    Icon: BarChart3,
    href: "/dashboard/reports",
    dropdown: false,
  },
];
