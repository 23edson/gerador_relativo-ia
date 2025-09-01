import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
  useTheme,
  Grid,
  Chip,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  TableChart as TableIcon,
  BarChart as ChartIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  Edit as EditIcon,
  Refresh as RefreshIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { ReportPreviewProps, ReportFilterState } from '../../types/report';
import { useReportData } from '../../hooks/useReportData';
import { ReportTable } from './ReportTable';
import { ReportChart } from './ReportChart';
import { ReportControls } from './ReportControls';
import { getTextsByType, getMetricsByType } from '../../utils/mockData';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`report-tabpanel-${index}`}
      aria-labelledby={`report-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `report-tab-${index}`,
    'aria-controls': `report-tabpanel-${index}`,
  };
}

export const ReportPreview: React.FC<ReportPreviewProps> = ({
  reportId,
  reportData,
  onExport,
  onShare,
  onEdit,
  readOnly = false,
}) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [reportType, setReportType] = useState('vendas');
  const [showControls, setShowControls] = useState(true);
  const [loading, setLoading] = useState(false);

  // Hook para gerenciar dados do relatório
  const {
    data,
    loading: dataLoading,
    error,
    applyFilters,
    clearFilters,
    exportData,
    statistics,
    totalRecords,
  } = useReportData(reportType);

  // Textos e métricas do relatório
  const texts = getTextsByType(reportType);
  const metrics = getMetricsByType(reportType);

  // Determinar tipo do relatório baseado nos dados ou props
  useEffect(() => {
    if (reportData?.type) {
      setReportType(reportData.type);
    }
  }, [reportData]);

  // Função para alternar entre abas
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Função para aplicar filtros
  const handleFiltersChange = (filters: ReportFilterState) => {
    applyFilters(filters);
  };

  // Função para exportar relatório
  const handleExport = (format: 'pdf' | 'csv' | 'json') => {
    if (onExport) {
      onExport(format);
    } else {
      exportData(format as 'csv' | 'json');
    }
  };

  // Função para compartilhar relatório
  const handleShare = () => {
    if (onShare) {
      onShare();
    } else {
      // Implementação padrão de compartilhamento
      const url = `${window.location.origin}/report/${reportId || reportType}`;
      navigator.clipboard.writeText(url);
      // Aqui você poderia mostrar um toast de sucesso
    }
  };

  // Função para editar relatório
  const handleEdit = () => {
    if (onEdit) {
      onEdit();
    }
  };

  // Função para atualizar dados
  const handleRefresh = () => {
    setLoading(true);
    // Simular atualização
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // Função para alternar controles
  const toggleControls = () => {
    setShowControls(!showControls);
  };

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Erro ao carregar o relatório: {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header do relatório */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography variant="h4" sx={{ mb: 1 }}>
              {texts[0]?.content || `Relatório de ${reportType}`}
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
              {texts[1]?.content || 'Visualização dinâmica dos dados do relatório'}
            </Typography>
            
            {/* Métricas principais */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {metrics.map((metric, index) => (
                <Chip
                  key={index}
                  label={`${metric.label}: ${metric.value}${metric.unit ? ` ${metric.unit}` : ''}`}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              ))}
            </Box>
          </Box>

          {/* Ações do relatório */}
          <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="Controles">
                <IconButton
                  onClick={toggleControls}
                  color={showControls ? 'primary' : 'default'}
                >
                  <FilterIcon />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Atualizar">
                <IconButton onClick={handleRefresh} disabled={loading}>
                  {loading ? <CircularProgress size={20} /> : <RefreshIcon />}
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Configurações">
                <IconButton>
                  <SettingsIcon />
                </IconButton>
              </Tooltip>
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              {!readOnly && (
                <Tooltip title="Editar">
                  <IconButton onClick={handleEdit} color="primary">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              )}
              
              <Tooltip title="Compartilhar">
                <IconButton onClick={handleShare} color="secondary">
                  <ShareIcon />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Exportar">
                <IconButton onClick={() => handleExport('csv')} color="success">
                  <DownloadIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>

        {/* Informações do relatório */}
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Chip
            label={`Tipo: ${reportType}`}
            color="primary"
            size="small"
          />
          <Chip
            label={`Total de registros: ${totalRecords}`}
            color="secondary"
            size="small"
          />
          {statistics && (
            <Chip
              label={`Campos numéricos: ${Object.keys(statistics).length}`}
              color="info"
              size="small"
            />
          )}
        </Box>
      </Paper>

      {/* Controles de filtro */}
      {showControls && (
        <ReportControls
          reportType={reportType}
          onFiltersChange={handleFiltersChange}
          onRefresh={handleRefresh}
        />
      )}

      {/* Abas de visualização */}
      <Paper sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="Visualizações do relatório"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TableIcon />
                  Tabela
                </Box>
              }
              {...a11yProps(0)}
            />
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ChartIcon />
                  Gráfico
                </Box>
              }
              {...a11yProps(1)}
            />
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FilterIcon />
                  Análise
                </Box>
              }
              {...a11yProps(2)}
            />
          </Tabs>
        </Box>

        {/* Conteúdo das abas */}
        <TabPanel value={activeTab} index={0}>
          <ReportTable
            data={data}
            reportType={reportType}
            onExport={handleExport}
            loading={dataLoading}
            height={500}
          />
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <ReportChart
            reportType={reportType}
            height={500}
            onExport={() => handleExport('csv')}
            onRefresh={handleRefresh}
          />
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <Box>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Análise Estatística
            </Typography>
            
            {statistics ? (
              <Grid container spacing={3}>
                {Object.entries(statistics).map(([field, stats]) => (
                  <Grid item xs={12} sm={6} md={4} key={field}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
                        {field}
                      </Typography>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        {stats.avg.toFixed(2)}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                        <span>Min: {stats.min}</span>
                        <span>Max: {stats.max}</span>
                      </Box>
                      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                        Total: {stats.sum.toLocaleString('pt-BR')}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography color="textSecondary">
                Nenhuma estatística disponível para os dados atuais.
              </Typography>
            )}
          </Box>
        </TabPanel>
      </Paper>

      {/* Footer com informações adicionais */}
      <Paper sx={{ p: 2, mt: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="textSecondary">
          Relatório gerado em {new Date().toLocaleString('pt-BR')} | 
          Dados simulados para demonstração | 
          Total de {totalRecords} registros processados
        </Typography>
      </Paper>
    </Box>
  );
};
