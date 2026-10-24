import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
  return (
    <div className="mh-workspace-shell h-screen w-full bg-darkBg flex text-slate-50 overflow-hidden font-vazirmatn" dir="rtl">
      <Sidebar />
      
      <main className="flex-1 h-full overflow-y-auto overflow-x-hidden relative">
        <Outlet /> 
      </main>
    </div>
  );
};

export default DashboardLayout;