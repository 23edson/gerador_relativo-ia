export interface ReportData {
  id: string;
  name: string;
  description: string;
  type: 'vendas' | 'financeiro' | 'rh' | 'marketing';
  dataSource: 'csv' | 'xlsx' | 'api' | 'postgresql' | 'nlp';
  layout: ReportLayout;
  filters: ReportFilter[];
  visualizations: Visualization[];
  createdAt: Date;
  updatedAt: Date;
  status: 'rascunho' | 'publicado' | 'arquivado';
  createdBy: string;
}

export interface ReportLayout {
  sections: ReportSection[];
  theme: 'light' | 'dark';
  responsive: boolean;
  pageSize: 'a4' | 'letter' | 'custom';
}

export interface ReportSection {
  id: string;
  title: string;
  type: 'header' | 'content' | 'footer';
  visualizations: string[]; // IDs das visualizações
  order: number;
  visible: boolean;
}

export interface ReportFilter {
  id: string;
  field: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select' | 'multiselect';
  value: any;
  options?: FilterOption[];
  validation?: FilterValidation;
}

export interface FilterOption {
  value: any;
  label: string;
}

export interface FilterValidation {
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: string;
}

export interface Visualization {
  id: string;
  type: 'table' | 'chart' | 'metric' | 'text';
  title: string;
  config: TableConfig | ChartConfig | MetricConfig | TextConfig;
  data: any[];
  order: number;
  visible: boolean;
}

export interface TableConfig {
  columns: TableColumn[];
  pagination: boolean;
  pageSize: number;
  sorting: boolean;
  filtering: boolean;
  exportable: boolean;
}

export interface TableColumn {
  field: string;
  header: string;
  type: 'text' | 'number' | 'date' | 'currency' | 'percentage';
  sortable: boolean;
  filterable: boolean;
  width?: number;
  align?: 'left' | 'center' | 'right';
}

export interface ChartConfig {
  chartType: 'bar' | 'line' | 'pie' | 'area' | 'scatter' | 'doughnut';
  xAxis: AxisConfig;
  yAxis: AxisConfig;
  series: SeriesConfig[];
  colors: string[];
  legend: boolean;
  tooltip: boolean;
  responsive: boolean;
}

export interface AxisConfig {
  field: string;
  label: string;
  type: 'category' | 'number' | 'date';
  format?: string;
}

export interface SeriesConfig {
  field: string;
  label: string;
  color?: string;
  type?: 'line' | 'bar' | 'area';
}

export interface MetricConfig {
  value: number;
  label: string;
  unit?: string;
  format: 'number' | 'currency' | 'percentage' | 'duration';
  comparison?: {
    value: number;
    type: 'increase' | 'decrease';
    percentage: number;
  };
  icon?: string;
}

export interface TextConfig {
  content: string;
  format: 'plain' | 'markdown' | 'html';
  fontSize: number;
  fontWeight: 'normal' | 'bold';
  align: 'left' | 'center' | 'right';
  color?: string;
}

export interface ReportPreviewProps {
  reportId?: string;
  reportData?: ReportData;
  onExport?: (format: 'pdf' | 'csv' | 'json') => void;
  onShare?: () => void;
  onEdit?: () => void;
  readOnly?: boolean;
}

export interface ReportFilterState {
  filters: Record<string, any>;
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  searchQuery: string;
}

export interface ChartDataPoint {
  x: any;
  y: any;
  label?: string;
  color?: string;
}

export interface TableData {
  rows: Record<string, any>[];
  totalRows: number;
  currentPage: number;
  pageSize: number;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
}
