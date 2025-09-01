import React, { useState, useMemo } from 'react';
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridToolbar,
  GridPaginationModel,
  GridSortModel,
} from '@mui/x-data-grid';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Chip,
  useTheme,
} from '@mui/material';
import {
  Download as DownloadIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
} from '@mui/icons-material';
import { useTableConfig } from '../../hooks/useTableConfig';
import { TableData } from '../../types/report';

interface ReportTableProps {
  data: any[];
  reportType: string;
  onExport?: (format: 'csv' | 'json') => void;
  loading?: boolean;
  height?: number | string;
}

export const ReportTable: React.FC<ReportTableProps> = ({
  data,
  reportType,
  onExport,
  loading = false,
  height = 400,
}) => {
  const theme = useTheme();
  const { dataGridConfig, formatCellValue } = useTableConfig(reportType);
  
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: dataGridConfig.pageSize || 10,
  });
  
  const [sortModel, setSortModel] = useState<GridSortModel>([]);

  // Configurar colunas para o DataGrid
  const columns: GridColDef[] = useMemo(() => {
    if (!dataGridConfig.columns) return [];

    return dataGridConfig.columns.map((col: any) => ({
      field: col.field,
      headerName: col.headerName,
      width: col.width,
      sortable: col.sortable,
      filterable: col.filterable,
      align: col.align,
      headerAlign: col.headerAlign,
      renderCell: (params: GridValueGetterParams) => {
        const value = params.value;
        
        // Determinar o tipo da coluna baseado no nome do campo
        let columnType = 'text';
        if (col.field.includes('receita') || col.field.includes('salario') || col.field.includes('investimento')) {
          columnType = 'currency';
        } else if (col.field.includes('roi') || col.field.includes('performance')) {
          columnType = 'percentage';
        } else if (col.field.includes('data') || col.field.includes('mes')) {
          columnType = 'date';
        } else if (typeof value === 'number') {
          columnType = 'number';
        }

        return (
          <Box sx={{ width: '100%', textAlign: col.align }}>
            {formatCellValue(value, columnType)}
          </Box>
        );
      },
      renderHeader: (params) => (
        <Box sx={{ 
          width: '100%', 
          textAlign: col.headerAlign,
          fontWeight: 'bold',
          color: theme.palette.text.primary,
        }}>
          {params.field}
        </Box>
      ),
    }));
  }, [dataGridConfig, formatCellValue, theme]);

  // Dados processados para o DataGrid
  const processedData = useMemo(() => {
    return data.map((item, index) => ({
      id: item.id || index,
      ...item,
    }));
  }, [data]);

  // Função para exportar dados
  const handleExport = (format: 'csv' | 'json') => {
    if (onExport) {
      onExport(format);
    } else {
      // Exportação padrão se não houver callback
      if (format === 'csv') {
        const headers = columns.map(col => col.headerName).join(',');
        const rows = processedData.map(item =>
          columns.map(col => {
            const value = item[col.field];
            return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
          }).join(',')
        );
        const csvContent = [headers, ...rows].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `relatorio-${reportType}.csv`;
        link.click();
        URL.revokeObjectURL(url);
      } else if (format === 'json') {
        const jsonContent = JSON.stringify(processedData, null, 2);
        const blob = new Blob([jsonContent], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `relatorio-${reportType}.json`;
        link.click();
        URL.revokeObjectURL(url);
      }
    }
  };

  // Função para renderizar toolbar customizada
  const CustomToolbar = () => (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      p: 1,
      borderBottom: `1px solid ${theme.palette.divider}`,
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <FilterIcon color="action" />
        <Typography variant="body2" color="textSecondary">
          {processedData.length} registros
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Tooltip title="Exportar CSV">
          <IconButton 
            size="small" 
            onClick={() => handleExport('csv')}
            sx={{ color: theme.palette.primary.main }}
          >
            <DownloadIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Exportar JSON">
          <IconButton 
            size="small" 
            onClick={() => handleExport('json')}
            sx={{ color: theme.palette.secondary.main }}
          >
            <DownloadIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );

  // Função para renderizar células com formatação condicional
  const renderCell = (params: GridValueGetterParams) => {
    const value = params.value;
    const field = params.field;
    
    // Determinar o tipo da coluna
    let columnType = 'text';
    if (field.includes('receita') || field.includes('salario') || field.includes('investimento')) {
      columnType = 'currency';
    } else if (field.includes('roi') || field.includes('performance')) {
      columnType = 'percentage';
    } else if (field.includes('data') || field.includes('mes')) {
      columnType = 'date';
    } else if (typeof value === 'number') {
      columnType = 'number';
    }

    // Aplicar formatação baseada no tipo
    const formattedValue = formatCellValue(value, columnType);

    // Aplicar estilos condicionais
    let cellStyle: React.CSSProperties = {};
    
    if (columnType === 'currency') {
      cellStyle = {
        fontWeight: 'bold',
        color: value >= 0 ? theme.palette.success.main : theme.palette.error.main,
      };
    } else if (columnType === 'percentage') {
      cellStyle = {
        fontWeight: 'bold',
        color: value >= 3 ? theme.palette.success.main : 
               value >= 2 ? theme.palette.warning.main : 
               theme.palette.error.main,
      };
    }

    return (
      <Box sx={{ ...cellStyle, width: '100%' }}>
        {formattedValue}
      </Box>
    );
  };

  // Configurações do DataGrid
  const dataGridProps = {
    rows: processedData,
    columns: columns.map(col => ({
      ...col,
      renderCell,
    })),
    loading,
    pagination: dataGridConfig.pagination,
    paginationModel,
    onPaginationModelChange: setPaginationModel,
    pageSizeOptions: dataGridConfig.pageSizeOptions || [5, 10, 25, 50],
    sortingMode: 'server',
    sortModel,
    onSortModelChange: setSortModel,
    filterMode: 'client',
    disableColumnFilter: !dataGridConfig.filtering,
    disableColumnSelector: true,
    disableDensitySelector: true,
    slots: {
      toolbar: CustomToolbar,
    },
    slotProps: {
      toolbar: {
        showQuickFilter: true,
        quickFilterProps: { debounceMs: 500 },
      },
    },
    sx: {
      border: 'none',
      '& .MuiDataGrid-cell': {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
      '& .MuiDataGrid-columnHeaders': {
        backgroundColor: theme.palette.grey[50],
        borderBottom: `2px solid ${theme.palette.divider}`,
      },
      '& .MuiDataGrid-row:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  };

  if (loading) {
    return (
      <Paper sx={{ p: 2, height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography>Carregando dados...</Typography>
      </Paper>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Paper sx={{ p: 2, height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography color="textSecondary">Nenhum dado encontrado</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ height, overflow: 'hidden' }}>
      <DataGrid {...dataGridProps} />
    </Paper>
  );
};
