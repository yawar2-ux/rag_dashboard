import React from "react";
import UseLogout from "../Logout/logout";


function TopNav() {
  const { handleLogout} = UseLogout();

  return (
    <div>
      <nav className="custom-navbar">
        <ul className="icon-list">
          <li>
            <i className="fas fa-bell" title="Notifications"></i>
          </li>
          <li onClick={handleLogout} style={{ cursor: "pointer" }}>
            <i className="fas fa-right-from-bracket" title="Sign Out"></i>
          </li>
        </ul>
      </nav>
    </div>
  );

}

export default TopNav;
