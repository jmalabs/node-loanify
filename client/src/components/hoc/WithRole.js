import React from "react";
import { useAppContext } from "../../context/appContext";

const hasRole = (roles) => (Component) => (props) => {
  const { user } = useAppContext();
  if (user.role.match(roles)) {
    return <Component {...props} />;
  }
  return null;
};

export default hasRole;
