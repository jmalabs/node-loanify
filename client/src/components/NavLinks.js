import React from "react";
import links from "../utils/links";
import { NavLink } from "react-router-dom";
import ProtectedRoute from "../pages/ProtectedRoute";
import { SCOPES } from "../utils/permission-maps";

const NavLinks = ({ toggleSidebar }) => {
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, id, icon, scopes } = link;
        return (
          <ProtectedRoute scopes={scopes}>
            <NavLink
              to={path}
              key={id}
              onClick={toggleSidebar}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }>
              <span className="icon">{icon}</span>
              {text}
            </NavLink>
          </ProtectedRoute>
        );
      })}
    </div>
  );
};

export default NavLinks;
