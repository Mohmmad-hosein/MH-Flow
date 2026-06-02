import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

import DashboardLayout from './components/panel/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Tasks from './components/panel/Task';
import UserProfile from './components/panel/UserProfile';
import Settings from './components/panel/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} /> 
          <Route path="tasks" element={<Tasks />} /> 
          <Route path="profile" element={<UserProfile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;