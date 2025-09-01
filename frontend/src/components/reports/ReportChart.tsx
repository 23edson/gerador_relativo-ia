import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Box,
  Paper,
  Typography,
  useTheme,
  Chip,
  IconButton,
  Tooltip as MuiTooltip,
} from '@mui/material';
import {
  ZoomIn as ZoomInIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { useChartConfig } from '../../hooks/useChartConfig';

interface ReportChartProps {
  reportType: string;
  height?: number | string;
  onExport?: () => void;
  onRefresh?: () => void;
}

export const ReportChart: React.FC<ReportChartProps> = ({
  reportType,
  height = 400,
  onExport,
  onRefresh,
}) => {
  const theme = useTheme();
  const {
    chartConfig,
    chartData,
    chartType,
    xAxisLabel,
    yAxisLabel,
    formatYAxisValue,
    formatTooltipValue,
    getCustomColors,
    isResponsive,
  } = useChartConfig(reportType);

  // Cores personalizadas para os gráficos
  const colors = useMemo(() => {
    return getCustomColors();
  }, [getCustomColors]);

  // Função para renderizar tooltip customizado
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Paper
          sx={{
            p: 2,
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[3],
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            {label}
          </Typography>
          {payload.map((entry: any, index: number) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  backgroundColor: entry.color,
                  borderRadius: '50%',
                }}
              />
              <Typography variant="body2">
                {entry.name}: {formatTooltipValue(entry.value, entry.name)[0]}
              </Typography>
            </Box>
          ))}
        </Paper>
      );
    }
    return null;
  };

  // Função para renderizar legend customizada
  const CustomLegend = ({ payload }: any) => {
    if (!payload || payload.length === 0) return null;

    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
        {payload.map((entry: any, index: number) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 16,
                height: 16,
                backgroundColor: entry.color,
                borderRadius: 2,
              }}
            />
            <Typography variant="body2" color="textSecondary">
              {entry.value}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  };

  // Função para renderizar gráfico de barras
  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
        <XAxis
          dataKey="x"
          label={{ value: xAxisLabel, position: 'insideBottom', offset: -5 }}
          tick={{ fill: theme.palette.text.secondary }}
        />
        <YAxis
          label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }}
          tick={{ fill: theme.palette.text.secondary }}
          tickFormatter={formatYAxisValue}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
        <Bar dataKey="y" fill={colors[0]} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );

  // Função para renderizar gráfico de linha
  const renderLineChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
        <XAxis
          dataKey="x"
          label={{ value: xAxisLabel, position: 'insideBottom', offset: -5 }}
          tick={{ fill: theme.palette.text.secondary }}
        />
        <YAxis
          label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }}
          tick={{ fill: theme.palette.text.secondary }}
          tickFormatter={formatYAxisValue}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
        <Line
          type="monotone"
          dataKey="y"
          stroke={colors[0]}
          strokeWidth={3}
          dot={{ fill: colors[0], strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: colors[0], strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  // Função para renderizar gráfico de pizza
  const renderPieChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="y"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
      </PieChart>
    </ResponsiveContainer>
  );

  // Função para renderizar gráfico de área
  const renderAreaChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
        <XAxis
          dataKey="x"
          label={{ value: xAxisLabel, position: 'insideBottom', offset: -5 }}
          tick={{ fill: theme.palette.text.secondary }}
        />
        <YAxis
          label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }}
          tick={{ fill: theme.palette.text.secondary }}
          tickFormatter={formatYAxisValue}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
        <Area
          type="monotone"
          dataKey="y"
          stackId="1"
          stroke={colors[0]}
          fill={colors[0]}
          fillOpacity={0.6}
        />
      </AreaChart>
    </ResponsiveContainer>
  );

  // Função para renderizar gráfico de dispersão
  const renderScatterChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
        <XAxis
          dataKey="x"
          label={{ value: xAxisLabel, position: 'insideBottom', offset: -5 }}
          tick={{ fill: theme.palette.text.secondary }}
        />
        <YAxis
          label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }}
          tick={{ fill: theme.palette.text.secondary }}
          tickFormatter={formatYAxisValue}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
        <Scatter data={chartData} fill={colors[0]} />
      </ScatterChart>
    </ResponsiveContainer>
  );

  // Função para renderizar o gráfico baseado no tipo
  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return renderBarChart();
      case 'line':
        return renderLineChart();
      case 'pie':
      case 'doughnut':
        return renderPieChart();
      case 'area':
        return renderAreaChart();
      case 'scatter':
        return renderScatterChart();
      default:
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <Typography color="textSecondary">Tipo de gráfico não suportado</Typography>
          </Box>
        );
    }
  };

  // Função para exportar gráfico como imagem
  const handleExport = () => {
    if (onExport) {
      onExport();
    } else {
      // Exportação padrão como PNG
      const svg = document.querySelector('svg');
      if (svg) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        const svgData = new XMLSerializer().serializeToString(svg);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);
        
        img.onload = () => {
          canvas.width = svg.clientWidth;
          canvas.height = svg.clientHeight;
          ctx?.drawImage(img, 0, 0);
          
          const link = document.createElement('a');
          link.download = `grafico-${reportType}.png`;
          link.href = canvas.toDataURL();
          link.click();
        };
        
        img.src = url;
      }
    }
  };

  if (!chartConfig || !chartData || chartData.length === 0) {
    return (
      <Paper sx={{ p: 2, height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography color="textSecondary">Nenhum dado disponível para o gráfico</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ height, overflow: 'hidden', position: 'relative' }}>
      {/* Header do gráfico */}
      <Box sx={{ 
        p: 2, 
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Box>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            {chartConfig?.chartType?.toUpperCase()} - {reportType}
          </Typography>
          <Chip 
            label={`${chartData.length} pontos de dados`} 
            size="small" 
            color="primary" 
            variant="outlined" 
          />
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <MuiTooltip title="Atualizar">
            <IconButton size="small" onClick={onRefresh}>
              <RefreshIcon />
            </IconButton>
          </MuiTooltip>
          
          <MuiTooltip title="Exportar">
            <IconButton size="small" onClick={handleExport}>
              <DownloadIcon />
            </IconButton>
          </MuiTooltip>
        </Box>
      </Box>

      {/* Área do gráfico */}
      <Box sx={{ height: 'calc(100% - 80px)', p: 2 }}>
        {renderChart()}
      </Box>
    </Paper>
  );
};
