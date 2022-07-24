import React from "react";
import Wrappers from "../assets/wrappers/BigSidebar";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import { useAppContext } from "../context/appContext";

const BigSideBar = () => {
  const { showSidebar } = useAppContext();

  return (
    <Wrappers>
      <div
        className={
          showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"
        }>
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrappers>
  );
};

export default BigSideBar;
