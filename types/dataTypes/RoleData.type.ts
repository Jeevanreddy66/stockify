export type RoleDataType = {
  displayName: string;
  roleName: string;
  description: string;

  canAccessDashboard: boolean;
  canManageRoles: boolean;

  canViewBrands: boolean;
  canAddBrands: boolean;
  canEditBrands: boolean;
  canDeleteBrands: boolean;

  canViewCategories: boolean;
  canAddCategories: boolean;
  canEditCategories: boolean;
  canDeleteCategories: boolean;

  canViewProducts: boolean;
  canAddProducts: boolean;
  canEditProducts: boolean;
  canDeleteProducts: boolean;

  canViewSuppliers: boolean;
  canAddSuppliers: boolean;
  canEditSuppliers: boolean;
  canDeleteSuppliers: boolean;

  canManageUnits: boolean;

  canViewUsers: boolean;
  canAddUsers: boolean;
  canEditUsers: boolean;
  canDeleteUsers: boolean;

  canViewWarehouses: boolean;
  canAddWarehouses: boolean;
  canEditWarehouses: boolean;
  canDeleteWarehouses: boolean;
};
