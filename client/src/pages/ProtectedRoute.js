import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";
import { PERMISSIONS } from "../utils/permission-maps";

const hasPermission = ({ permissions, scopes }) => {
  const scopesMap = {};
  scopes.forEach((scope) => {
    scopesMap[scope] = true;
  });

  return permissions.some((permission) => scopesMap[permission]);
};

const ProtectedRoute = ({ children, scopes = [] }) => {
  const { user } = useAppContext();
  if (!user) {
    return <Navigate to="/landing" />;
  }

  if (scopes.length > 0) {
    const permissions = PERMISSIONS[user.role];
    const permissionGranted = hasPermission({ permissions, scopes });
    if (!permissionGranted) return <></>;
  }

  return children;
};

export default ProtectedRoute;
