import type { PermissionsConfigType } from "@/types";

export const permissions: PermissionsConfigType[] = [
  {
    model: "Dashboard",
    actions: [{ name: "Dashboard", action: "canAccessDashboard" }],
  },
  { model: "Roles", actions: [{ name: "Roles", action: "canManageRoles" }] },
  {
    model: "Brands",
    actions: [
      { name: "View", action: "canViewBrands" },
      { name: "Add", action: "canAddBrands" },
      { name: "Edit", action: "canEditBrands" },
      { name: "Delete", action: "canDeleteBrands" },
    ],
  },
  {
    model: "Categories",
    actions: [
      { name: "View", action: "canViewCategories" },
      { name: "Add", action: "canAddCategories" },
      { name: "Edit", action: "canEditCategories" },
      { name: "Delete", action: "canDeleteCategories" },
    ],
  },
  {
    model: "Products",
    actions: [
      { name: "View", action: "canViewProducts" },
      { name: "Add", action: "canAddProducts" },
      { name: "Edit", action: "canEditProducts" },
      { name: "Delete", action: "canDeleteProducts" },
    ],
  },
  {
    model: "Units",
    actions: [{ name: "Units", action: "canManageUnits" }],
  },
  {
    model: "Users",
    actions: [
      { name: "View", action: "canViewUsers" },
      { name: "Add", action: "canAddUsers" },
      { name: "Edit", action: "canEditUsers" },
      { name: "Delete", action: "canDeleteUsers" },
    ],
  },
  {
    model: "Suppliers",
    actions: [
      { name: "View", action: "canViewSuppliers" },
      { name: "Add", action: "canAddSuppliers" },
      { name: "Edit", action: "canEditSuppliers" },
      { name: "Delete", action: "canDeleteSuppliers" },
    ],
  },
  {
    model: "Warehouses",
    actions: [
      { name: "View", action: "canViewWarehouses" },
      { name: "Add", action: "canAddWarehouses" },
      { name: "Edit", action: "canEditWarehouses" },
      { name: "Delete", action: "canDeleteWarehouses" },
    ],
  },
];
