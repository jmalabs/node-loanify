import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../../context/appContext";

const hasRole = (roles) => (Component) => (props) => {
  const { user } = useAppContext();

  if (!user || !user.role) {
    return <Navigate to="/landing" />;
  }

  if (user.role.match(roles)) {
    return <Component {...props} />;
  }
  return null;
};

export default hasRole;
