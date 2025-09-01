import { useMemo } from 'react';
import { TableConfig, TableColumn } from '../types/report';
import { getTableConfigByType } from '../utils/mockData';

export const useTableConfig = (reportType: string = 'vendas') => {
  // Obter configuração da tabela
  const tableConfig = useMemo(() => {
    return getTableConfigByType(reportType);
  }, [reportType]);

  // Configuração para Material UI DataGrid
  const dataGridConfig = useMemo(() => {
    if (!tableConfig) return {};

    const columns = tableConfig.columns.map((col: TableColumn) => ({
      field: col.field,
      headerName: col.header,
      width: col.width || 150,
      sortable: col.sortable,
      filterable: col.filterable,
      align: col.align || 'left',
      headerAlign: col.align || 'left',
      renderCell: (params: any) => {
        const value = params.value;
        
        switch (col.type) {
          case 'currency':
            return new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(value);
          
          case 'percentage':
            return `${value}%`;
          
          case 'date':
            return new Date(value).toLocaleDateString('pt-BR');
          
          case 'number':
            return new Intl.NumberFormat('pt-BR').format(value);
          
          default:
            return value;
        }
      },
    }));

    return {
      columns,
      pagination: tableConfig.pagination,
      pageSize: tableConfig.pageSize,
      pageSizeOptions: [5, 10, 25, 50],
      sorting: tableConfig.sorting,
      filtering: tableConfig.filtering,
      exportable: tableConfig.exportable,
    };
  }, [tableConfig]);

  // Função para formatar valor da célula
  const formatCellValue = (value: any, columnType: string) => {
    switch (columnType) {
      case 'currency':
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(value);
      
      case 'percentage':
        return `${value}%`;
      
      case 'date':
        return new Date(value).toLocaleDateString('pt-BR');
      
      case 'number':
        return new Intl.NumberFormat('pt-BR').format(value);
      
      default:
        return value;
    }
  };

  // Função para obter largura da coluna
  const getColumnWidth = (field: string) => {
    if (!tableConfig) return 150;
    
    const column = tableConfig.columns.find(col => col.field === field);
    return column?.width || 150;
  };

  // Função para verificar se a coluna é ordenável
  const isColumnSortable = (field: string) => {
    if (!tableConfig) return false;
    
    const column = tableConfig.columns.find(col => col.field === field);
    return column?.sortable || false;
  };

  // Função para verificar se a coluna é filtrável
  const isColumnFilterable = (field: string) => {
    if (!tableConfig) return false;
    
    const column = tableConfig.columns.find(col => col.field === field);
    return column?.filterable || false;
  };

  // Função para obter alinhamento da coluna
  const getColumnAlign = (field: string) => {
    if (!tableConfig) return 'left';
    
    const column = tableConfig.columns.find(col => col.field === field);
    return column?.align || 'left';
  };

  // Função para obter opções de filtro para uma coluna
  const getFilterOptions = (field: string, data: any[]) => {
    if (!tableConfig) return [];
    
    const column = tableConfig.columns.find(col => col.field === field);
    if (!column?.filterable) return [];

    // Obter valores únicos para a coluna
    const uniqueValues = [...new Set(data.map(item => item[field]))];
    
    return uniqueValues.map(value => ({
      value,
      label: formatCellValue(value, column.type),
    }));
  };

  // Função para aplicar filtros personalizados
  const applyCustomFilters = (data: any[], filters: Record<string, any>) => {
    if (!tableConfig) return data;

    let filteredData = [...data];

    Object.entries(filters).forEach(([field, filterValue]) => {
      if (filterValue && filterValue !== '') {
        const column = tableConfig.columns.find(col => col.field === field);
        if (column?.filterable) {
          filteredData = filteredData.filter(item => {
            const itemValue = item[field];
            
            if (typeof filterValue === 'string') {
              return String(itemValue).toLowerCase().includes(filterValue.toLowerCase());
            }
            
            if (typeof filterValue === 'number') {
              return itemValue === filterValue;
            }
            
            if (Array.isArray(filterValue)) {
              return filterValue.includes(itemValue);
            }
            
            return itemValue === filterValue;
          });
        }
      }
    });

    return filteredData;
  };

  // Função para ordenar dados
  const sortData = (data: any[], field: string, direction: 'asc' | 'desc') => {
    if (!tableConfig) return data;
    
    const column = tableConfig.columns.find(col => col.field === field);
    if (!column?.sortable) return data;

    return [...data].sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      if (aValue instanceof Date && bValue instanceof Date) {
        return direction === 'asc' ? aValue.getTime() - bValue.getTime() : bValue.getTime() - aValue.getTime();
      }

      return 0;
    });
  };

  return {
    tableConfig,
    dataGridConfig,
    formatCellValue,
    getColumnWidth,
    isColumnSortable,
    isColumnFilterable,
    getColumnAlign,
    getFilterOptions,
    applyCustomFilters,
    sortData,
    columns: tableConfig?.columns || [],
    pagination: tableConfig?.pagination || false,
    pageSize: tableConfig?.pageSize || 10,
    sorting: tableConfig?.sorting || false,
    filtering: tableConfig?.filtering || false,
    exportable: tableConfig?.exportable || false,
  };
};
