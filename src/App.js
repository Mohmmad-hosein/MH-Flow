import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import NotFound from './pages/NotFound';
import BugReport from './pages/BugReport';
import Privacy from './pages/Privacy';

import DashboardLayout from './components/panel/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Tasks from './components/panel/Task';
import UserProfile from './components/panel/UserProfile';
import Settings from './components/panel/Settings';
import PanelFeature from './components/panel/PanelFeature';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/report-bug" element={<BugReport />} />
        <Route path="/privacy" element={<Privacy />} />
        
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} /> 
          <Route path="tasks" element={<Tasks />} /> 
          <Route path="profile" element={<UserProfile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="ai-planner" element={<PanelFeature />} />
          <Route path="analytics" element={<PanelFeature />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;