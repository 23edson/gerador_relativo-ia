import { useState, useEffect, useMemo } from 'react';
import { ReportData, ReportFilterState, TableData } from '../types/report';
import { getReportDataByType, getTableConfigByType } from '../utils/mockData';

export const useReportData = (reportType: string = 'vendas') => {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar dados iniciais
  useEffect(() => {
    setLoading(true);
    try {
      const reportData = getReportDataByType(reportType);
      setData(reportData);
      setFilteredData(reportData);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar dados do relatório');
      console.error('Erro ao carregar dados:', err);
    } finally {
      setLoading(false);
    }
  }, [reportType]);

  // Função para aplicar filtros
  const applyFilters = (filters: ReportFilterState) => {
    let filtered = [...data];

    // Aplicar filtro de busca
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(query)
        )
      );
    }

    // Aplicar filtros de campo
    Object.entries(filters.filters).forEach(([field, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        filtered = filtered.filter(item => {
          const itemValue = item[field];
          if (typeof value === 'string') {
            return String(itemValue).toLowerCase().includes(value.toLowerCase());
          }
          return itemValue === value;
        });
      }
    });

    // Aplicar filtro de data
    if (filters.dateRange.start || filters.dateRange.end) {
      filtered = filtered.filter(item => {
        if (item.dataAdmissao || item.mes) {
          const itemDate = new Date(item.dataAdmissao || item.mes);
          const startDate = filters.dateRange.start;
          const endDate = filters.dateRange.end;

          if (startDate && endDate) {
            return itemDate >= startDate && itemDate <= endDate;
          } else if (startDate) {
            return itemDate >= startDate;
          } else if (endDate) {
            return itemDate <= endDate;
          }
        }
        return true;
      });
    }

    setFilteredData(filtered);
  };

  // Função para limpar filtros
  const clearFilters = () => {
    setFilteredData(data);
  };

  // Função para obter dados da tabela com paginação
  const getTableData = (
    page: number = 0,
    pageSize: number = 10,
    sortField?: string,
    sortDirection?: 'asc' | 'desc'
  ): TableData => {
    let sortedData = [...filteredData];

    // Aplicar ordenação
    if (sortField && sortDirection) {
      sortedData.sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDirection === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }

        return 0;
      });
    }

    // Aplicar paginação
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = sortedData.slice(startIndex, endIndex);

    return {
      rows: paginatedData,
      totalRows: sortedData.length,
      currentPage: page,
      pageSize,
      sortField,
      sortDirection,
    };
  };

  // Função para exportar dados
  const exportData = (format: 'csv' | 'json') => {
    if (format === 'csv') {
      const headers = Object.keys(filteredData[0] || {}).join(',');
      const rows = filteredData.map(item =>
        Object.values(item).map(value => `"${value}"`).join(',')
      );
      const csvContent = [headers, ...rows].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `relatorio-${reportType}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'json') {
      const jsonContent = JSON.stringify(filteredData, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `relatorio-${reportType}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  // Estatísticas dos dados
  const statistics = useMemo(() => {
    if (filteredData.length === 0) return null;

    const numericFields = Object.keys(filteredData[0]).filter(key =>
      typeof filteredData[0][key] === 'number'
    );

    const stats: Record<string, { min: number; max: number; avg: number; sum: number }> = {};

    numericFields.forEach(field => {
      const values = filteredData.map(item => item[field]).filter(val => typeof val === 'number');
      if (values.length > 0) {
        const sum = values.reduce((acc, val) => acc + val, 0);
        stats[field] = {
          min: Math.min(...values),
          max: Math.max(...values),
          avg: sum / values.length,
          sum,
        };
      }
    });

    return stats;
  }, [filteredData]);

  return {
    data: filteredData,
    originalData: data,
    loading,
    error,
    applyFilters,
    clearFilters,
    getTableData,
    exportData,
    statistics,
    totalRecords: filteredData.length,
  };
};
