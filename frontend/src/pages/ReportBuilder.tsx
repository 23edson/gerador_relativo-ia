import React from 'react';
import { ReportBuilder as ReportBuilderComponent } from '../components/report-builder';

export const ReportBuilderPage: React.FC = () => {
  const handleSave = (report: any) => {
    console.log('Salvando relatório:', report);
    // Aqui você implementaria a lógica de salvamento no backend
  };

  const handlePreview = () => {
    console.log('Abrindo preview do relatório');
    // Aqui você implementaria a navegação para o preview
  };

  const handleExport = () => {
    console.log('Exportando relatório');
    // Aqui você implementaria a lógica de exportação
  };

  return (
    <ReportBuilderComponent
      onSave={handleSave}
      onPreview={handlePreview}
      onExport={handleExport}
    />
  );
};
