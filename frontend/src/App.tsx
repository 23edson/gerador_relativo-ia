import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Reports } from './pages/Reports';
import { DataSources } from './pages/DataSources';
import { ReportPreviewPage } from './pages/ReportPreview';
import { ReportBuilderPage } from './pages/ReportBuilder';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/data-sources" element={<DataSources />} />
          <Route path="/report-builder" element={<ReportBuilderPage />} />
          <Route path="/report-preview" element={<ReportPreviewPage />} />
          <Route path="/templates" element={<div className="p-6"><h1 className="text-2xl font-bold">Templates</h1><p className="text-gray-600">Em desenvolvimento...</p></div>} />
          <Route path="/settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Configurações</h1><p className="text-gray-600">Em desenvolvimento...</p></div>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
