import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Grid,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
  Refresh as RefreshIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';
import { ReportFilterState } from '../../types/report';
import { getReportDataByType } from '../../utils/mockData';

interface ReportControlsProps {
  reportType: string;
  onFiltersChange: (filters: ReportFilterState) => void;
  onRefresh?: () => void;
  onSettings?: () => void;
}

export const ReportControls: React.FC<ReportControlsProps> = ({
  reportType,
  onFiltersChange,
  onRefresh,
  onSettings,
}) => {
  const theme = useTheme();
  const [filters, setFilters] = useState<ReportFilterState>({
    filters: {},
    dateRange: { start: null, end: null },
    searchQuery: '',
  });

  const [availableFields, setAvailableFields] = useState<string[]>([]);
  const [fieldValues, setFieldValues] = useState<Record<string, any[]>>({});

  // Carregar campos disponíveis e valores únicos
  useEffect(() => {
    const data = getReportDataByType(reportType);
    if (data.length > 0) {
      const fields = Object.keys(data[0]);
      setAvailableFields(fields);

      // Obter valores únicos para cada campo
      const uniqueValues: Record<string, any[]> = {};
      fields.forEach(field => {
        const values = [...new Set(data.map(item => item[field]))];
        uniqueValues[field] = values;
      });
      setFieldValues(uniqueValues);
    }
  }, [reportType]);

  // Aplicar filtros
  const applyFilters = () => {
    onFiltersChange(filters);
  };

  // Limpar filtros
  const clearFilters = () => {
    const clearedFilters: ReportFilterState = {
      filters: {},
      dateRange: { start: null, end: null },
      searchQuery: '',
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  // Atualizar filtro de campo
  const updateFieldFilter = (field: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        [field]: value,
      },
    }));
  };

  // Atualizar filtro de data
  const updateDateFilter = (type: 'start' | 'end', value: Date | null) => {
    setFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [type]: value,
      },
    }));
  };

  // Atualizar busca
  const updateSearch = (value: string) => {
    setFilters(prev => ({
      ...prev,
      searchQuery: value,
    }));
  };

  // Função para renderizar campo de filtro baseado no tipo de dados
  const renderFilterField = (field: string) => {
    const values = fieldValues[field] || [];
    const currentValue = filters.filters[field];

    // Determinar o tipo de campo baseado no nome e valores
    let fieldType = 'text';
    if (field.includes('data') || field.includes('mes')) {
      fieldType = 'date';
    } else if (typeof values[0] === 'number') {
      fieldType = 'number';
    } else if (values.length <= 10) {
      fieldType = 'select';
    }

    switch (fieldType) {
      case 'select':
        return (
          <FormControl key={field} fullWidth size="small">
            <InputLabel>{field}</InputLabel>
            <Select
              value={currentValue || ''}
              label={field}
              onChange={(e) => updateFieldFilter(field, e.target.value)}
            >
              <MenuItem value="">
                <em>Todos</em>
              </MenuItem>
              {values.map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      case 'number':
        return (
          <TextField
            key={field}
            label={field}
            type="number"
            value={currentValue || ''}
            onChange={(e) => updateFieldFilter(field, e.target.value)}
            size="small"
            fullWidth
            placeholder={`Filtrar por ${field}`}
          />
        );

      case 'date':
        return (
          <LocalizationProvider key={field} dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <DatePicker
              label={field}
              value={filters.dateRange.start}
              onChange={(value) => updateDateFilter('start', value)}
              slotProps={{
                textField: {
                  size: 'small',
                  fullWidth: true,
                },
              }}
            />
          </LocalizationProvider>
        );

      default:
        return (
          <TextField
            key={field}
            label={field}
            value={currentValue || ''}
            onChange={(e) => updateFieldFilter(field, e.target.value)}
            size="small"
            fullWidth
            placeholder={`Filtrar por ${field}`}
          />
        );
    }
  };

  // Função para renderizar filtros ativos
  const renderActiveFilters = () => {
    const activeFilters: string[] = [];

    // Filtros de campo
    Object.entries(filters.filters).forEach(([field, value]) => {
      if (value && value !== '') {
        activeFilters.push(`${field}: ${value}`);
      }
    });

    // Filtros de data
    if (filters.dateRange.start) {
      activeFilters.push(`Data início: ${filters.dateRange.start.toLocaleDateString('pt-BR')}`);
    }
    if (filters.dateRange.end) {
      activeFilters.push(`Data fim: ${filters.dateRange.end.toLocaleDateString('pt-BR')}`);
    }

    // Filtro de busca
    if (filters.searchQuery) {
      activeFilters.push(`Busca: "${filters.searchQuery}"`);
    }

    if (activeFilters.length === 0) return null;

    return (
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          Filtros ativos:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {activeFilters.map((filter, index) => (
            <Chip
              key={index}
              label={filter}
              size="small"
              onDelete={() => {
                // Remover filtro específico
                if (filter.includes('Busca:')) {
                  updateSearch('');
                } else if (filter.includes('Data início:')) {
                  updateDateFilter('start', null);
                } else if (filter.includes('Data fim:')) {
                  updateDateFilter('end', null);
                } else {
                  const field = filter.split(':')[0];
                  updateFieldFilter(field, '');
                }
              }}
              color="primary"
              variant="outlined"
            />
          ))}
        </Box>
      </Box>
    );
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      {/* Header dos controles */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterIcon color="primary" />
          <Typography variant="h6">Controles do Relatório</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Configurações">
            <IconButton size="small" onClick={onSettings}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Atualizar">
            <IconButton size="small" onClick={onRefresh}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Busca global */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Buscar em todos os campos"
          value={filters.searchQuery}
          onChange={(e) => updateSearch(e.target.value)}
          placeholder="Digite para buscar..."
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
          size="medium"
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Filtros de campo */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Filtros por Campo
        </Typography>
        <Grid container spacing={2}>
          {availableFields.slice(0, 6).map((field) => (
            <Grid item xs={12} sm={6} md={4} key={field}>
              {renderFilterField(field)}
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Filtros de data */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Filtros por Período
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
              <DatePicker
                label="Data de início"
                value={filters.dateRange.start}
                onChange={(value) => updateDateFilter('start', value)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: 'small',
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
              <DatePicker
                label="Data de fim"
                value={filters.dateRange.end}
                onChange={(value) => updateDateFilter('end', value)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: 'small',
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Box>

      {/* Botões de ação */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Button
          variant="contained"
          onClick={applyFilters}
          startIcon={<FilterIcon />}
          sx={{ minWidth: 120 }}
        >
          Aplicar Filtros
        </Button>
        
        <Button
          variant="outlined"
          onClick={clearFilters}
          startIcon={<ClearIcon />}
          sx={{ minWidth: 120 }}
        >
          Limpar Filtros
        </Button>
      </Box>

      {/* Filtros ativos */}
      {renderActiveFilters()}

      {/* Estatísticas dos filtros */}
      <Box sx={{ mt: 3, p: 2, backgroundColor: theme.palette.grey[50], borderRadius: 1 }}>
        <Typography variant="body2" color="textSecondary">
          <strong>Dica:</strong> Use os filtros para refinar os dados do relatório. 
          Os filtros podem ser combinados para obter resultados mais específicos.
        </Typography>
      </Box>
    </Paper>
  );
};
