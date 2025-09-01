import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  useTheme,
} from '@mui/material';
import { ReportPreview } from '../components/reports';
import { ReportData } from '../types/report';

export const ReportPreviewPage: React.FC = () => {
  const theme = useTheme();
  const [selectedReportType, setSelectedReportType] = useState<string>('vendas');

  // Dados simulados para demonstração
  const mockReportData: ReportData = {
    id: 'demo-1',
    name: `Relatório de ${selectedReportType}`,
    description: 'Relatório de demonstração com dados simulados',
    type: selectedReportType as any,
    dataSource: 'csv',
    layout: {
      sections: [],
      theme: 'light',
      responsive: true,
      pageSize: 'a4',
    },
    filters: [],
    visualizations: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'publicado',
    createdBy: 'Sistema Demo',
  };

  const reportTypes = [
    { value: 'vendas', label: 'Vendas' },
    { value: 'financeiro', label: 'Financeiro' },
    { value: 'rh', label: 'Recursos Humanos' },
    { value: 'marketing', label: 'Marketing' },
  ];

  const handleReportTypeChange = (event: any) => {
    setSelectedReportType(event.target.value);
  };

  const handleExport = (format: 'pdf' | 'csv' | 'json') => {
    console.log(`Exportando relatório em formato ${format}`);
    // Aqui você implementaria a lógica de exportação real
  };

  const handleShare = () => {
    console.log('Compartilhando relatório');
    // Aqui você implementaria a lógica de compartilhamento real
  };

  const handleEdit = () => {
    console.log('Editando relatório');
    // Aqui você implementaria a lógica de edição real
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header da página */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Preview de Relatórios
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
          Demonstração do sistema de preview de relatórios com dados simulados.
          Selecione um tipo de relatório para visualizar diferentes visualizações.
        </Typography>

        {/* Seletor de tipo de relatório */}
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Tipo de Relatório</InputLabel>
              <Select
                value={selectedReportType}
                label="Tipo de Relatório"
                onChange={handleReportTypeChange}
              >
                {reportTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={8}>
            <Typography variant="body2" color="textSecondary">
              <strong>Recursos disponíveis:</strong> Tabelas interativas, gráficos responsivos, 
              filtros avançados, exportação de dados e análise estatística.
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Componente de preview do relatório */}
      <ReportPreview
        reportId="demo-1"
        reportData={mockReportData}
        onExport={handleExport}
        onShare={handleShare}
        onEdit={handleEdit}
        readOnly={false}
      />

      {/* Informações adicionais */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Sobre o Sistema de Preview
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              🎯 Funcionalidades Principais
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              • Visualização em múltiplas abas (Tabela, Gráfico, Análise)<br/>
              • Filtros avançados com busca e seleção de datas<br/>
              • Gráficos interativos com diferentes tipos<br/>
              • Exportação em CSV e JSON<br/>
              • Análise estatística automática<br/>
              • Interface responsiva e acessível
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              🚀 Tecnologias Utilizadas
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              • React + TypeScript para componentes<br/>
              • Material UI para interface<br/>
              • Recharts para gráficos<br/>
              • Zustand para gerenciamento de estado<br/>
              • Tailwind CSS para estilização<br/>
              • Hooks customizados para lógica
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};
