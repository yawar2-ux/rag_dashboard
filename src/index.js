import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css';
import Dashboard from './Dashboard/Dashboard';
import Signup from './Landing_Page/Signup';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter> <Routes>
    <Route path="/" element={<Signup/>}/>
    <Route path = "/dashboard" element = {<Dashboard/>}/>
  </Routes>
  </BrowserRouter>

);


