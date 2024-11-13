import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MinesyncWebsite from './MinesyncWebsite';
import ShiftHandover from './ShiftHandover';
import UserManagement from './UserManagement.jsx';
import ReportingAnalytics from './ReportingAnalytics.jsx';
import ERPIntegration from './ERPIntegration.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<MinesyncWebsite />} />
      <Route path="/shift-handover" element={<ShiftHandover />} />
      <Route path="/user-management" element={<UserManagement />} />
      <Route path="/reporting-analytics" element={<ReportingAnalytics />} />
      <Route path="/erp-integration" element={<ERPIntegration />} />
    </Routes>
  </Router>
);