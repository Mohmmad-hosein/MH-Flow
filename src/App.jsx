import React,{Suspense,lazy} from 'react';
import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom';
import Home from './pages/Home';
import {ToastProvider} from './context/ToastContext';
import {AuthProvider} from './context/AuthContext';
import ScrollMotion from './components/ScrollMotion';
import VoiceNavigator from './components/panel/VoiceNavigator';
const Login=lazy(()=>import('./pages/Login'));
const About=lazy(()=>import('./pages/About'));
const NotFound=lazy(()=>import('./pages/NotFound'));
const BugReport=lazy(()=>import('./pages/BugReport'));
const Privacy=lazy(()=>import('./pages/Privacy'));
const Dashboard=lazy(()=>import('./pages/Dashboard'));
const Calendar=lazy(()=>import('./pages/Calendar'));
const DashboardLayout=lazy(()=>import('./components/panel/DashboardLayout'));
const Tasks=lazy(()=>import('./components/panel/Task'));
const UserProfile=lazy(()=>import('./components/panel/UserProfile'));
const Settings=lazy(()=>import('./components/panel/Settings'));
const PanelFeature=lazy(()=>import('./components/panel/PanelFeature'));
const TeamWorkspace=lazy(()=>import('./components/panel/TeamWorkspace'));
const TeamChat=lazy(()=>import('./components/panel/TeamChat'));
const Projects=lazy(()=>import('./components/panel/Projects'));
const Analytics=lazy(()=>import('./components/panel/Analytics'));
const RouteFallback=()=> <div className="grid min-h-[45vh] place-items-center bg-[#080b16] text-slate-200" dir="rtl" role="status"><div className="rounded-2xl border border-white/10 bg-white/[.04] px-5 py-4 text-sm">در حال بارگذاری صفحه...</div></div>;
export default function App(){return <ToastProvider><AuthProvider><ScrollMotion/><Router><VoiceNavigator/><Suspense fallback={<RouteFallback/>}><Routes>
<Route path="/" element={<Home/>}/><Route path="/login" element={<Login/>}/><Route path="/about" element={<About/>}/><Route path="/report-bug" element={<BugReport/>}/><Route path="/privacy" element={<Privacy/>}/>
<Route path="/dashboard" element={<DashboardLayout/>}><Route index element={<Dashboard/>}/><Route path="tasks" element={<Tasks/>}/><Route path="projects" element={<Projects/>}/><Route path="calendar" element={<Calendar/>}/><Route path="profile" element={<UserProfile/>}/><Route path="settings" element={<Settings/>}/><Route path="ai-planner" element={<PanelFeature/>}/><Route path="analytics" element={<Analytics/>}/><Route path="workspace" element={<TeamWorkspace/>}/><Route path="team-chat" element={<TeamChat/>}/><Route path="*" element={<Navigate to="/dashboard" replace/>}/></Route>
<Route path="*" element={<NotFound/>}/></Routes></Suspense></Router></AuthProvider></ToastProvider>}
