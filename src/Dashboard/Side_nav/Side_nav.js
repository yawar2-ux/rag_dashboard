import React from 'react';
import { useState } from 'react';
function SideNav(){
    const [activeItem, setActiveItem] = useState('overview');

    const navItems = [
      { id: 'overview', label: 'Overview', icon: '📊' },
      { id: 'customers', label: 'Customers', icon: '👥' },
      { id: 'integrations', label: 'Integrations', icon: '🔗' },
      { id: 'settings', label: 'Settings', icon: '⚙️' },
      { id: 'account', label: 'Account', icon: '👤' },
    ];
  
    const handleItemClick = (itemId) => {
      setActiveItem(itemId);
    };
  
    return (
      <div className="sidenav">
        <div className="sidenav-header">
          <div className="logo">
            <span className="logo-icon">T</span>
            <span className="logo-text">TANTOR</span>
          </div>
        </div>
        
        <nav className="sidenav-menu">
          {navItems.map((item) => (
            <div
              key={item.id}
              className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
              onClick={() => handleItemClick(item.id)}
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