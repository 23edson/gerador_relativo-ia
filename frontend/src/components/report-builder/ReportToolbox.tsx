import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  Tabs, 
  Tab, 
  useTheme,
  Tooltip,
  IconButton,
  Collapse,
  Chip
} from '@mui/material';
import {
  TableChart as TableIcon,
  BarChart as ChartIcon,
  Functions as MetricIcon,
  TextFields as TextIcon,
  FilterList as FilterIcon,
  GroupWork as GroupIcon,
  Add as AddIcon,
  ExpandMore as ExpandIcon,
  ExpandLess as CollapseIcon,
  DragIndicator as DragIcon,
} from '@mui/icons-material';
import { ToolboxItem, DRAG_TYPES } from '../../utils/dragAndDrop';

interface ReportToolboxProps {
  onDragStart: (item: ToolboxItem) => void;
  onDragEnd: () => void;
}

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
      id={`toolbox-tabpanel-${index}`}
      aria-labelledby={`toolbox-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

export const ReportToolbox: React.FC<ReportToolboxProps> = ({ 
  onDragStart, 
  onDragEnd 
}) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    fields: true,
    visualizations: true,
    filters: true,
    groupings: true,
    templates: true,
  });

  // Dados da toolbox
  const toolboxItems: Record<string, ToolboxItem[]> = {
    fields: [
      {
        id: 'field-text',
        type: DRAG_TYPES.FIELD,
        label: 'Campo de Texto',
        description: 'Campo para exibir texto simples',
        icon: 'TextFields',
        category: 'fields',
        draggable: true,
        data: { title: 'Campo de Texto' },
      },
      {
        id: 'field-number',
        type: DRAG_TYPES.FIELD,
        label: 'Campo Numérico',
        description: 'Campo para exibir valores numéricos',
        icon: 'Functions',
        category: 'fields',
        draggable: true,
        data: { title: 'Campo Numérico' },
      },
      {
        id: 'field-date',
        type: DRAG_TYPES.FIELD,
        label: 'Campo de Data',
        description: 'Campo para exibir datas',
        icon: 'Event',
        category: 'fields',
        draggable: true,
        data: { title: 'Campo de Data' },
      },
      {
        id: 'field-currency',
        type: DRAG_TYPES.FIELD,
        label: 'Campo de Moeda',
        description: 'Campo para exibir valores monetários',
        icon: 'AttachMoney',
        category: 'fields',
        draggable: true,
        data: { title: 'Campo de Moeda' },
      },
    ],
    visualizations: [
      {
        id: 'table',
        type: DRAG_TYPES.TABLE,
        label: 'Tabela',
        description: 'Tabela de dados com colunas e linhas',
        icon: 'TableChart',
        category: 'visualizations',
        draggable: true,
        data: { title: 'Tabela de Dados' },
      },
      {
        id: 'bar-chart',
        type: DRAG_TYPES.CHART,
        label: 'Gráfico de Barras',
        description: 'Gráfico de barras para comparações',
        icon: 'BarChart',
        category: 'visualizations',
        draggable: true,
        data: { title: 'Gráfico de Barras', chartType: 'bar' },
      },
      {
        id: 'line-chart',
        type: DRAG_TYPES.CHART,
        label: 'Gráfico de Linha',
        description: 'Gráfico de linha para tendências',
        icon: 'ShowChart',
        category: 'visualizations',
        draggable: true,
        data: { title: 'Gráfico de Linha', chartType: 'line' },
      },
      {
        id: 'pie-chart',
        type: DRAG_TYPES.CHART,
        label: 'Gráfico de Pizza',
        description: 'Gráfico de pizza para proporções',
        icon: 'PieChart',
        category: 'visualizations',
        draggable: true,
        data: { title: 'Gráfico de Pizza', chartType: 'pie' },
      },
      {
        id: 'metric',
        type: DRAG_TYPES.METRIC,
        label: 'Métrica',
        description: 'Exibição de valor único com contexto',
        icon: 'Functions',
        category: 'visualizations',
        draggable: true,
        data: { title: 'Métrica' },
      },
      {
        id: 'text',
        type: DRAG_TYPES.TEXT,
        label: 'Texto',
        description: 'Bloco de texto formatado',
        icon: 'TextFields',
        category: 'visualizations',
        draggable: true,
        data: { title: 'Texto' },
      },
    ],
    filters: [
      {
        id: 'text-filter',
        type: DRAG_TYPES.FILTER,
        label: 'Filtro de Texto',
        description: 'Filtro para campos de texto',
        icon: 'FilterList',
        category: 'filters',
        draggable: true,
        data: { title: 'Filtro de Texto', filterType: 'text' },
      },
      {
        id: 'number-filter',
        type: DRAG_TYPES.FILTER,
        label: 'Filtro Numérico',
        description: 'Filtro para campos numéricos',
        icon: 'FilterList',
        category: 'filters',
        draggable: true,
        data: { title: 'Filtro Numérico', filterType: 'number' },
      },
      {
        id: 'date-filter',
        type: DRAG_TYPES.FILTER,
        label: 'Filtro de Data',
        description: 'Filtro para campos de data',
        icon: 'FilterList',
        category: 'filters',
        draggable: true,
        data: { title: 'Filtro de Data', filterType: 'date' },
      },
      {
        id: 'select-filter',
        type: DRAG_TYPES.FILTER,
        label: 'Filtro de Seleção',
        description: 'Filtro com opções pré-definidas',
        icon: 'FilterList',
        category: 'filters',
        draggable: true,
        data: { title: 'Filtro de Seleção', filterType: 'select' },
      },
    ],
    groupings: [
      {
        id: 'field-grouping',
        type: DRAG_TYPES.GROUPING,
        label: 'Agrupamento por Campo',
        description: 'Agrupar dados por campo específico',
        icon: 'GroupWork',
        category: 'groupings',
        draggable: true,
        data: { title: 'Agrupamento por Campo' },
      },
      {
        id: 'date-grouping',
        type: DRAG_TYPES.GROUPING,
        label: 'Agrupamento por Data',
        description: 'Agrupar dados por período',
        icon: 'GroupWork',
        category: 'groupings',
        draggable: true,
        data: { title: 'Agrupamento por Data' },
      },
      {
        id: 'numeric-grouping',
        type: DRAG_TYPES.GROUPING,
        label: 'Agrupamento Numérico',
        description: 'Agrupar dados por faixas numéricas',
        icon: 'GroupWork',
        category: 'groupings',
        draggable: true,
        data: { title: 'Agrupamento Numérico' },
      },
    ],
    templates: [
      {
        id: 'sales-dashboard',
        type: DRAG_TYPES.TEMPLATE,
        label: 'Dashboard de Vendas',
        description: 'Template completo para análise de vendas',
        icon: 'Dashboard',
        category: 'templates',
        draggable: true,
        data: { title: 'Dashboard de Vendas', templateId: 'sales-dashboard' },
      },
      {
        id: 'financial-report',
        type: DRAG_TYPES.TEMPLATE,
        label: 'Relatório Financeiro',
        description: 'Template para relatórios financeiros',
        icon: 'AccountBalance',
        category: 'templates',
        draggable: true,
        data: { title: 'Relatório Financeiro', templateId: 'financial-report' },
      },
      {
        id: 'hr-dashboard',
        type: DRAG_TYPES.TEMPLATE,
        label: 'Dashboard de RH',
        description: 'Template para análise de recursos humanos',
        icon: 'People',
        category: 'templates',
        draggable: true,
        data: { title: 'Dashboard de RH', templateId: 'hr-dashboard' },
      },
    ],
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleDragStart = (item: ToolboxItem) => {
    onDragStart(item);
  };

  const handleDragEnd = () => {
    onDragEnd();
  };

  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, React.ComponentType> = {
      TextFields: TextIcon,
      Functions: MetricIcon,
      Event: AddIcon,
      AttachMoney: AddIcon,
      TableChart: TableIcon,
      BarChart: ChartIcon,
      ShowChart: ChartIcon,
      PieChart: ChartIcon,
      FilterList: FilterIcon,
      GroupWork: GroupIcon,
      Dashboard: AddIcon,
      AccountBalance: AddIcon,
      People: AddIcon,
    };

    return iconMap[iconName] || AddIcon;
  };

  const renderToolboxItem = (item: ToolboxItem) => {
    const IconComponent = getIconComponent(item.icon);
    const isExpanded = expandedCategories[item.category];

    return (
      <Collapse key={item.id} in={isExpanded} timeout="auto" unmountOnExit>
        <ListItem disablePadding>
          <ListItemButton
            draggable={item.draggable}
            onDragStart={(e) => {
              e.dataTransfer.setData('application/json', JSON.stringify(item));
              handleDragStart(item);
            }}
            onDragEnd={handleDragEnd}
            sx={{
              cursor: 'grab',
              '&:active': { cursor: 'grabbing' },
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <ListItemIcon>
              <IconComponent color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              secondary={item.description}
              primaryTypographyProps={{
                variant: 'body2',
                fontWeight: 500,
              }}
              secondaryTypographyProps={{
                variant: 'caption',
                color: 'text.secondary',
              }}
            />
            <DragIcon color="action" fontSize="small" />
          </ListItemButton>
        </ListItem>
      </Collapse>
    );
  };

  const tabLabels = [
    { label: 'Campos', value: 0, category: 'fields' },
    { label: 'Visualizações', value: 1, category: 'visualizations' },
    { label: 'Filtros', value: 2, category: 'filters' },
    { label: 'Agrupamentos', value: 3, category: 'groupings' },
    { label: 'Templates', value: 4, category: 'templates' },
  ];

  return (
    <Paper
      elevation={2}
      sx={{
        width: 320,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Ferramentas
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Arraste elementos para o canvas
        </Typography>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ minHeight: 48 }}
        >
          {tabLabels.map((tab) => (
            <Tab
              key={tab.value}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {tab.label}
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCategory(tab.category);
                    }}
                    sx={{ p: 0.5 }}
                  >
                    {expandedCategories[tab.category] ? (
                      <CollapseIcon fontSize="small" />
                    ) : (
                      <ExpandIcon fontSize="small" />
                    )}
                  </IconButton>
                </Box>
              }
              sx={{ minHeight: 48, fontSize: '0.75rem' }}
            />
          ))}
        </Tabs>
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {tabLabels.map((tab) => (
          <TabPanel key={tab.value} value={activeTab} index={tab.value}>
            <List dense disablePadding>
              {toolboxItems[tab.category]?.map(renderToolboxItem)}
            </List>
          </TabPanel>
        ))}
      </Box>

      {/* Footer */}
      <Box sx={{ p: 1, borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="caption" color="text.secondary" align="center">
          Arraste elementos para o canvas
        </Typography>
      </Box>
    </Paper>
  );
};
