import React from "react";

function topNav() {
  const goToDashboard = () => {
    window.location.href = "/";
  };

  return (
    <div>
      <nav className="custom-navbar">
        <ul className="icon-list">
          <li>
            <i className="fas fa-bell" title="Notifications"></i>
          </li>
          <li onClick={goToDashboard} style={{ cursor: "pointer" }}>
            <i className="fas fa-right-from-bracket" title="Sign Out"></i>
          </li>
        </ul>
      </nav>
    </div>
  );

}

export default topNav;
