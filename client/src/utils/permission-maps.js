export const ROLES = {
  user: "USER",
  admin: "ADMIN",
};

export const SCOPES = {
  canCreate: "can-create",
  canEdit: "can-edit",
  canDelete: "can-delete",
  canView: "can-view",
};

export const PERMISSIONS = {
  [ROLES.user]: [SCOPES.canView],
  [ROLES.admin]: [
    SCOPES.canView,
    SCOPES.canEdit,
    SCOPES.canCreate,
    SCOPES.canDelete,
  ],
};
