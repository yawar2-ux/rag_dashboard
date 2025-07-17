import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function SideNav() {
  const Navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('overview');

  const navItems = [
    { id: 'overview', label: 'Overview', icon: '📊', onClick: () => Navigate('/Overview') },
    { id: 'customers', label: 'Customers', icon: '👥', onClick: () => Navigate('/Customers') },
    { id: 'integrations', label: 'Integrations', icon: '🔗', onClick: () => Navigate('/Integration') },
    { id: 'settings', label: 'Settings', icon: '⚙️', onClick: () => Navigate('/Settings') },
    { id: 'account', label: 'Account', icon: '👤', onClick: () => Navigate('/Accounts') },
  ];

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
  };

  return (
    <div className="sidenav">
      
        <div >
          <img className="logo" src="/TantorImage/tantor.png" alt="Tantor" />
        </div>


      <nav className="sidenav-menu">
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
            onClick={() => {
              handleItemClick(item.id);
              item.onClick && item.onClick(); // navigate
            }}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
}

export default SideNav;
