import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
export default function TeamPreview() {
  const { pathname } = useLocation();
  return <Navigate to={pathname === '/dashboard/team-chat' ? '/dashboard/team-chat' : '/dashboard/workspace'} replace />;
}
