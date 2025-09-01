// ===== INTERFACES EXISTENTES =====

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

// ===== INTERFACES PARA O CONSTRUTOR DE RELATÓRIOS =====

export interface ReportBuilder {
  id: string;
  name: string;
  description: string;
  dataSource: string;
  layout: ReportBuilderLayout;
  elements: ReportElement[];
  filters: ReportBuilderFilter[];
  groupings: ReportBuilderGrouping[];
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface ReportBuilderLayout {
  width: number;
  height: number;
  gridSize: number;
  sections: ReportBuilderSection[];
  theme: 'light' | 'dark';
  responsive: boolean;
}

export interface ReportBuilderSection {
  id: string;
  title: string;
  type: 'header' | 'content' | 'footer';
  elements: string[]; // IDs dos elementos
  order: number;
  visible: boolean;
}

export interface ReportElement {
  id: string;
  type: 'field' | 'table' | 'chart' | 'metric' | 'text' | 'filter' | 'grouping';
  title: string;
  position: ElementPosition;
  size: ElementSize;
  config: ElementConfig;
  data: any;
  order: number;
  visible: boolean;
  locked: boolean;
}

export interface ElementPosition {
  x: number;
  y: number;
  z: number;
}

export interface ElementSize {
  width: number;
  height: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
}

export interface ElementConfig {
  field?: string;
  chartType?: 'bar' | 'line' | 'pie' | 'area' | 'scatter';
  tableConfig?: Partial<TableConfig>;
  chartConfig?: Partial<ChartConfig>;
  metricConfig?: Partial<MetricConfig>;
  textConfig?: Partial<TextConfig>;
  filterConfig?: FilterConfig;
  groupingConfig?: GroupingConfig;
}

export interface FilterConfig {
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'greater_than' | 'less_than' | 'between' | 'in' | 'not_in';
  value: any;
  value2?: any; // Para operadores como 'between'
  enabled: boolean;
}

export interface GroupingConfig {
  field: string;
  order: 'asc' | 'desc';
  level: number;
  enabled: boolean;
}

export interface ReportBuilderFilter {
  id: string;
  field: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select' | 'multiselect';
  value: any;
  options?: FilterOption[];
  validation?: FilterValidation;
  enabled: boolean;
}

export interface ReportBuilderGrouping {
  id: string;
  field: string;
  label: string;
  type: 'field' | 'date' | 'numeric';
  order: 'asc' | 'desc';
  level: number;
  enabled: boolean;
}

export interface ReportBuilderProps {
  reportId?: string;
  reportData?: ReportBuilder;
  onSave?: (report: ReportBuilder) => void;
  onPreview?: () => void;
  onExport?: () => void;
  readOnly?: boolean;
}

export interface DragItem {
  id: string;
  type: string;
  data: any;
  source: 'toolbox' | 'canvas';
}

export interface DropResult {
  id: string;
  position: ElementPosition;
  targetId?: string;
  success: boolean;
}

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: 'sales' | 'financial' | 'hr' | 'marketing' | 'custom';
  thumbnail: string;
  elements: ReportElement[];
  layout: ReportBuilderLayout;
  tags: string[];
}

export interface ToolboxItem {
  id: string;
  type: string;
  label: string;
  description: string;
  icon: string;
  category: 'fields' | 'visualizations' | 'filters' | 'groupings' | 'templates';
  draggable: boolean;
  data: any;
}

export interface CanvasDropZone {
  id: string;
  accepts: string[];
  position: ElementPosition;
  size: ElementSize;
  highlight: boolean;
}
