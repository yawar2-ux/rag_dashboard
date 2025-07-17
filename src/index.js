import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css';
import Dashboard from './Dashboard/Dashboard';
import Signup from './Landing_Page/Signup';
import Accounts from './DashboardComponents/Accounts';
import Customers from './DashboardComponents/Customers';
import Settings from './DashboardComponents/Settings';
import Integration from './DashboardComponents/Integration';
// import { AuthProvider } from './Auththorization';
//  import PrivateRoute from './Privateroute';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <BrowserRouter> <Routes>
    <Route path="/" element={<Signup/>}/>
    <Route path = "/dashboard" element = {<Dashboard/>}/>
    <Route path = "/Overview" element = {<Dashboard/>}/>
    <Route path="/Integration" element={<Integration />} />
    <Route path="/Accounts" element={<Accounts />} />
    <Route path="/Customers" element={<Customers />} />
     <Route path="/settings" element={<Settings />} />
  </Routes>
  </BrowserRouter>
);


