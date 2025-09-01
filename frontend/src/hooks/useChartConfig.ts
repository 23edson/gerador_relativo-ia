import { useMemo } from 'react';
import { ChartConfig, ChartDataPoint } from '../types/report';
import { getChartConfigByType, getReportDataByType } from '../utils/mockData';

export const useChartConfig = (reportType: string = 'vendas') => {
  // Obter configuração do gráfico
  const chartConfig = useMemo(() => {
    return getChartConfigByType(reportType);
  }, [reportType]);

  // Obter dados para o gráfico
  const chartData = useMemo(() => {
    const rawData = getReportDataByType(reportType);
    
    if (!chartConfig) return [];

    switch (chartConfig.chartType) {
      case 'bar':
      case 'line':
        return rawData.map(item => ({
          x: item[chartConfig.xAxis.field],
          y: item[chartConfig.yAxis.field],
          label: item[chartConfig.xAxis.field],
          color: chartConfig.colors[0],
        }));

      case 'pie':
      case 'doughnut':
        // Agrupar dados por categoria para gráficos de pizza
        const groupedData = rawData.reduce((acc, item) => {
          const category = item[chartConfig.xAxis.field];
          if (!acc[category]) {
            acc[category] = 0;
          }
          acc[category] += item[chartConfig.yAxis.field] || 1;
          return acc;
        }, {} as Record<string, number>);

        return Object.entries(groupedData).map(([category, value], index) => ({
          x: category,
          y: value,
          label: category,
          color: chartConfig.colors[index % chartConfig.colors.length],
        }));

      case 'area':
        return rawData.map((item, index) => ({
          x: item[chartConfig.xAxis.field],
          y: item[chartConfig.yAxis.field],
          label: item[chartConfig.xAxis.field],
          color: chartConfig.colors[index % chartConfig.colors.length],
        }));

      case 'scatter':
        return rawData.map(item => ({
          x: item[chartConfig.xAxis.field],
          y: item[chartConfig.yAxis.field],
          label: `${item[chartConfig.xAxis.field]} - ${item[chartConfig.yAxis.field]}`,
          color: chartConfig.colors[0],
        }));

      default:
        return [];
    }
  }, [reportType, chartConfig]);

  // Configurações específicas para Recharts
  const rechartsConfig = useMemo(() => {
    if (!chartConfig) return {};

    const baseConfig = {
      colors: chartConfig.colors,
      legend: chartConfig.legend,
      tooltip: chartConfig.tooltip,
      responsive: chartConfig.responsive,
    };

    switch (chartConfig.chartType) {
      case 'bar':
        return {
          ...baseConfig,
          xAxis: {
            dataKey: 'x',
            label: chartConfig.xAxis.label,
          },
          yAxis: {
            label: chartConfig.yAxis.label,
          },
        };

      case 'line':
        return {
          ...baseConfig,
          xAxis: {
            dataKey: 'x',
            label: chartConfig.xAxis.label,
          },
          yAxis: {
            label: chartConfig.yAxis.label,
          },
        };

      case 'pie':
      case 'doughnut':
        return {
          ...baseConfig,
          dataKey: 'y',
          nameKey: 'x',
        };

      case 'area':
        return {
          ...baseConfig,
          xAxis: {
            dataKey: 'x',
            label: chartConfig.xAxis.label,
          },
          yAxis: {
            label: chartConfig.yAxis.label,
          },
        };

      case 'scatter':
        return {
          ...baseConfig,
          xAxis: {
            dataKey: 'x',
            label: chartConfig.xAxis.label,
          },
          yAxis: {
            dataKey: 'y',
            label: chartConfig.yAxis.label,
          },
        };

      default:
        return baseConfig;
    }
  }, [chartConfig]);

  // Função para formatar valores do eixo Y
  const formatYAxisValue = (value: number) => {
    if (!chartConfig) return value;

    switch (chartConfig.yAxis.format) {
      case 'currency':
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(value);
      
      case 'percentage':
        return `${value}%`;
      
      case 'number':
        return new Intl.NumberFormat('pt-BR').format(value);
      
      default:
        return value;
    }
  };

  // Função para formatar valores do tooltip
  const formatTooltipValue = (value: number, name: string) => {
    if (!chartConfig) return [value, name];

    let formattedValue = value;
    let formattedName = name;

    switch (chartConfig.yAxis.format) {
      case 'currency':
        formattedValue = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(value);
        break;
      
      case 'percentage':
        formattedValue = `${value}%`;
        break;
      
      case 'number':
        formattedValue = new Intl.NumberFormat('pt-BR').format(value);
        break;
    }

    return [formattedValue, formattedName];
  };

  // Função para obter cores personalizadas
  const getCustomColors = () => {
    if (!chartConfig) return [];
    return chartConfig.colors;
  };

  // Função para verificar se o gráfico é responsivo
  const isResponsive = () => {
    return chartConfig?.responsive ?? true;
  };

  return {
    chartConfig,
    chartData,
    rechartsConfig,
    formatYAxisValue,
    formatTooltipValue,
    getCustomColors,
    isResponsive,
    chartType: chartConfig?.chartType,
    xAxisLabel: chartConfig?.xAxis.label,
    yAxisLabel: chartConfig?.yAxis.label,
  };
};
