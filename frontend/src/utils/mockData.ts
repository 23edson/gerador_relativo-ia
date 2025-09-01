import { ReportData, Visualization, TableConfig, ChartConfig, MetricConfig, TextConfig } from '../types/report';

// Dados simulados para vendas
export const mockSalesData = [
  { id: 1, produto: 'Laptop Dell', categoria: 'Eletrônicos', vendas: 150, receita: 225000, mes: 'Jan', regiao: 'Sudeste' },
  { id: 2, produto: 'Mouse Wireless', categoria: 'Acessórios', vendas: 300, receita: 45000, mes: 'Jan', regiao: 'Sudeste' },
  { id: 3, produto: 'Teclado Mecânico', categoria: 'Acessórios', vendas: 120, receita: 72000, mes: 'Jan', regiao: 'Sul' },
  { id: 4, produto: 'Monitor 4K', categoria: 'Eletrônicos', vendas: 80, receita: 320000, mes: 'Jan', regiao: 'Nordeste' },
  { id: 5, produto: 'Headset Gamer', categoria: 'Acessórios', vendas: 200, receita: 80000, mes: 'Jan', regiao: 'Centro-Oeste' },
  { id: 6, produto: 'Laptop Dell', categoria: 'Eletrônicos', vendas: 180, receita: 270000, mes: 'Fev', regiao: 'Sudeste' },
  { id: 7, produto: 'Mouse Wireless', categoria: 'Acessórios', vendas: 350, receita: 52500, mes: 'Fev', regiao: 'Sul' },
  { id: 8, produto: 'Teclado Mecânico', categoria: 'Acessórios', vendas: 140, receita: 84000, mes: 'Fev', regiao: 'Nordeste' },
  { id: 9, produto: 'Monitor 4K', categoria: 'Eletrônicos', vendas: 95, receita: 380000, mes: 'Fev', regiao: 'Centro-Oeste' },
  { id: 10, produto: 'Headset Gamer', categoria: 'Acessórios', vendas: 220, receita: 88000, mes: 'Fev', regiao: 'Sudeste' },
];

// Dados simulados para financeiro
export const mockFinancialData = [
  { id: 1, conta: 'Receita de Vendas', tipo: 'Receita', valor: 1250000, mes: 'Jan', categoria: 'Operacional' },
  { id: 2, conta: 'Custo dos Produtos', tipo: 'Despesa', valor: -750000, mes: 'Jan', categoria: 'Operacional' },
  { id: 3, conta: 'Despesas Administrativas', tipo: 'Despesa', valor: -200000, mes: 'Jan', categoria: 'Administrativa' },
  { id: 4, conta: 'Despesas de Marketing', tipo: 'Despesa', valor: -150000, mes: 'Jan', categoria: 'Marketing' },
  { id: 5, conta: 'Receita de Vendas', tipo: 'Receita', valor: 1350000, mes: 'Fev', categoria: 'Operacional' },
  { id: 6, conta: 'Custo dos Produtos', tipo: 'Despesa', valor: -800000, mes: 'Fev', categoria: 'Operacional' },
  { id: 7, conta: 'Despesas Administrativas', tipo: 'Despesa', valor: -210000, mes: 'Fev', categoria: 'Administrativa' },
  { id: 8, conta: 'Despesas de Marketing', tipo: 'Despesa', valor: -160000, mes: 'Fev', categoria: 'Marketing' },
];

// Dados simulados para RH
export const mockHRData = [
  { id: 1, funcionario: 'João Silva', cargo: 'Desenvolvedor', departamento: 'TI', salario: 8500, dataAdmissao: '2023-01-15', performance: 4.2 },
  { id: 2, funcionario: 'Maria Santos', cargo: 'Designer', departamento: 'Marketing', salario: 7200, dataAdmissao: '2023-02-01', performance: 4.5 },
  { id: 3, funcionario: 'Pedro Costa', cargo: 'Analista', departamento: 'Financeiro', salario: 6800, dataAdmissao: '2023-01-20', performance: 4.0 },
  { id: 4, funcionario: 'Ana Oliveira', cargo: 'Desenvolvedor', departamento: 'TI', salario: 9000, dataAdmissao: '2022-11-10', performance: 4.8 },
  { id: 5, funcionario: 'Carlos Lima', cargo: 'Gerente', departamento: 'Vendas', salario: 12000, dataAdmissao: '2022-08-05', performance: 4.3 },
  { id: 6, funcionario: 'Lucia Ferreira', cargo: 'Assistente', departamento: 'RH', salario: 5500, dataAdmissao: '2023-03-01', performance: 4.1 },
];

// Dados simulados para marketing
export const mockMarketingData = [
  { id: 1, campanha: 'Black Friday', canal: 'Google Ads', investimento: 50000, cliques: 15000, conversoes: 450, roi: 3.2, mes: 'Nov' },
  { id: 2, campanha: 'Natal', canal: 'Facebook', investimento: 35000, cliques: 12000, conversoes: 380, roi: 2.8, mes: 'Dez' },
  { id: 3, campanha: 'Ano Novo', canal: 'Instagram', investimento: 25000, cliques: 8000, conversoes: 220, roi: 2.5, mes: 'Jan' },
  { id: 4, campanha: 'Carnaval', canal: 'TikTok', investimento: 30000, cliques: 10000, conversoes: 280, roi: 2.9, mes: 'Fev' },
  { id: 5, campanha: 'Páscoa', canal: 'Google Ads', investimento: 40000, cliques: 14000, conversoes: 420, roi: 3.1, mes: 'Mar' },
];

// Configurações de tabelas
export const tableConfigs: Record<string, TableConfig> = {
  vendas: {
    columns: [
      { field: 'produto', header: 'Produto', type: 'text', sortable: true, filterable: true, width: 200 },
      { field: 'categoria', header: 'Categoria', type: 'text', sortable: true, filterable: true, width: 150 },
      { field: 'vendas', header: 'Vendas', type: 'number', sortable: true, filterable: true, width: 100, align: 'center' },
      { field: 'receita', header: 'Receita (R$)', type: 'currency', sortable: true, filterable: true, width: 150, align: 'right' },
      { field: 'mes', header: 'Mês', type: 'text', sortable: true, filterable: true, width: 100, align: 'center' },
      { field: 'regiao', header: 'Região', type: 'text', sortable: true, filterable: true, width: 150 },
    ],
    pagination: true,
    pageSize: 10,
    sorting: true,
    filtering: true,
    exportable: true,
  },
  financeiro: {
    columns: [
      { field: 'conta', header: 'Conta', type: 'text', sortable: true, filterable: true, width: 200 },
      { field: 'tipo', header: 'Tipo', type: 'text', sortable: true, filterable: true, width: 120 },
      { field: 'valor', header: 'Valor (R$)', type: 'currency', sortable: true, filterable: true, width: 150, align: 'right' },
      { field: 'mes', header: 'Mês', type: 'text', sortable: true, filterable: true, width: 100, align: 'center' },
      { field: 'categoria', header: 'Categoria', type: 'text', sortable: true, filterable: true, width: 150 },
    ],
    pagination: true,
    pageSize: 8,
    sorting: true,
    filtering: true,
    exportable: true,
  },
  rh: {
    columns: [
      { field: 'funcionario', header: 'Funcionário', type: 'text', sortable: true, filterable: true, width: 180 },
      { field: 'cargo', header: 'Cargo', type: 'text', sortable: true, filterable: true, width: 150 },
      { field: 'departamento', header: 'Departamento', type: 'text', sortable: true, filterable: true, width: 150 },
      { field: 'salario', header: 'Salário (R$)', type: 'currency', sortable: true, filterable: true, width: 150, align: 'right' },
      { field: 'dataAdmissao', header: 'Data Admissão', type: 'date', sortable: true, filterable: true, width: 150, align: 'center' },
      { field: 'performance', header: 'Performance', type: 'number', sortable: true, filterable: true, width: 120, align: 'center' },
    ],
    pagination: true,
    pageSize: 6,
    sorting: true,
    filtering: true,
    exportable: true,
  },
  marketing: {
    columns: [
      { field: 'campanha', header: 'Campanha', type: 'text', sortable: true, filterable: true, width: 150 },
      { field: 'canal', header: 'Canal', type: 'text', sortable: true, filterable: true, width: 120 },
      { field: 'investimento', header: 'Investimento (R$)', type: 'currency', sortable: true, filterable: true, width: 150, align: 'right' },
      { field: 'cliques', header: 'Cliques', type: 'number', sortable: true, filterable: true, width: 100, align: 'center' },
      { field: 'conversoes', header: 'Conversões', type: 'number', sortable: true, filterable: true, width: 120, align: 'center' },
      { field: 'roi', header: 'ROI', type: 'percentage', sortable: true, filterable: true, width: 100, align: 'center' },
      { field: 'mes', header: 'Mês', type: 'text', sortable: true, filterable: true, width: 100, align: 'center' },
    ],
    pagination: true,
    pageSize: 5,
    sorting: true,
    filtering: true,
    exportable: true,
  },
};

// Configurações de gráficos
export const chartConfigs: Record<string, ChartConfig> = {
  vendas: {
    chartType: 'bar',
    xAxis: { field: 'produto', label: 'Produtos', type: 'category' },
    yAxis: { field: 'vendas', label: 'Vendas', type: 'number' },
    series: [{ field: 'vendas', label: 'Vendas' }],
    colors: ['#3B82F6', '#1D4ED8', '#1E40AF'],
    legend: true,
    tooltip: true,
    responsive: true,
  },
  financeiro: {
    chartType: 'line',
    xAxis: { field: 'mes', label: 'Mês', type: 'category' },
    yAxis: { field: 'valor', label: 'Valor (R$)', type: 'number' },
    series: [
      { field: 'receita', label: 'Receita', type: 'line' },
      { field: 'despesa', label: 'Despesa', type: 'line' },
    ],
    colors: ['#10B981', '#EF4444'],
    legend: true,
    tooltip: true,
    responsive: true,
  },
  rh: {
    chartType: 'pie',
    xAxis: { field: 'departamento', label: 'Departamento', type: 'category' },
    yAxis: { field: 'funcionarios', label: 'Funcionários', type: 'number' },
    series: [{ field: 'funcionarios', label: 'Funcionários' }],
    colors: ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#3B82F6'],
    legend: true,
    tooltip: true,
    responsive: true,
  },
  marketing: {
    chartType: 'area',
    xAxis: { field: 'mes', label: 'Mês', type: 'category' },
    yAxis: { field: 'roi', label: 'ROI', type: 'number' },
    series: [{ field: 'roi', label: 'ROI', type: 'area' }],
    colors: ['#F59E0B', '#F97316'],
    legend: true,
    tooltip: true,
    responsive: true,
  },
};

// Configurações de métricas
export const metricConfigs: Record<string, MetricConfig[]> = {
  vendas: [
    {
      value: 1500,
      label: 'Total de Vendas',
      unit: 'unidades',
      format: 'number',
      comparison: { value: 1200, type: 'increase', percentage: 25 },
      icon: 'TrendingUp',
    },
    {
      value: 1250000,
      label: 'Receita Total',
      unit: 'R$',
      format: 'currency',
      comparison: { value: 1000000, type: 'increase', percentage: 25 },
      icon: 'DollarSign',
    },
  ],
  financeiro: [
    {
      value: 300000,
      label: 'Lucro Líquido',
      unit: 'R$',
      format: 'currency',
      comparison: { value: 250000, type: 'increase', percentage: 20 },
      icon: 'TrendingUp',
    },
    {
      value: 15.2,
      label: 'Margem de Lucro',
      unit: '%',
      format: 'percentage',
      comparison: { value: 14.8, type: 'increase', percentage: 2.7 },
      icon: 'Percent',
    },
  ],
  rh: [
    {
      value: 6,
      label: 'Total de Funcionários',
      unit: 'pessoas',
      format: 'number',
      comparison: { value: 5, type: 'increase', percentage: 20 },
      icon: 'Users',
    },
    {
      value: 4.3,
      label: 'Performance Média',
      unit: '/5',
      format: 'number',
      comparison: { value: 4.1, type: 'increase', percentage: 4.9 },
      icon: 'Star',
    },
  ],
  marketing: [
    {
      value: 3.1,
      label: 'ROI Médio',
      unit: 'x',
      format: 'number',
      comparison: { value: 2.8, type: 'increase', percentage: 10.7 },
      icon: 'TrendingUp',
    },
    {
      value: 140000,
      label: 'Investimento Total',
      unit: 'R$',
      format: 'currency',
      comparison: { value: 120000, type: 'increase', percentage: 16.7 },
      icon: 'DollarSign',
    },
  ],
};

// Configurações de texto
export const textConfigs: Record<string, TextConfig[]> = {
  vendas: [
    {
      content: 'Relatório de Vendas - Q1 2024',
      format: 'plain',
      fontSize: 24,
      fontWeight: 'bold',
      align: 'center',
      color: '#1F2937',
    },
    {
      content: 'Este relatório apresenta o desempenho de vendas do primeiro trimestre de 2024, incluindo análise por produto, categoria e região.',
      format: 'plain',
      fontSize: 14,
      fontWeight: 'normal',
      align: 'left',
      color: '#6B7280',
    },
  ],
  financeiro: [
    {
      content: 'Relatório Financeiro - Q1 2024',
      format: 'plain',
      fontSize: 24,
      fontWeight: 'bold',
      align: 'center',
      color: '#1F2937',
    },
    {
      content: 'Análise detalhada da situação financeira da empresa, incluindo receitas, despesas e indicadores de rentabilidade.',
      format: 'plain',
      fontSize: 14,
      fontWeight: 'normal',
      align: 'left',
      color: '#6B7280',
    },
  ],
  rh: [
    {
      content: 'Relatório de Recursos Humanos - Q1 2024',
      format: 'plain',
      fontSize: 24,
      fontWeight: 'bold',
      align: 'center',
      color: '#1F2937',
    },
    {
      content: 'Visão geral da força de trabalho, incluindo distribuição por departamento, salários e indicadores de performance.',
      format: 'plain',
      fontSize: 14,
      fontWeight: 'normal',
      align: 'left',
      color: '#6B7280',
    },
  ],
  marketing: [
    {
      content: 'Relatório de Marketing - Q1 2024',
      format: 'plain',
      fontSize: 24,
      fontWeight: 'bold',
      align: 'center',
      color: '#1F2937',
    },
    {
      content: 'Análise das campanhas de marketing, incluindo investimentos, performance e retorno sobre investimento (ROI).',
      format: 'plain',
      fontSize: 14,
      fontWeight: 'normal',
      align: 'left',
      color: '#6B7280',
    },
  ],
};

// Função para obter dados por tipo de relatório
export const getReportDataByType = (type: string): any[] => {
  switch (type) {
    case 'vendas':
      return mockSalesData;
    case 'financeiro':
      return mockFinancialData;
    case 'rh':
      return mockHRData;
    case 'marketing':
      return mockMarketingData;
    default:
      return mockSalesData;
  }
};

// Função para obter configuração de tabela por tipo
export const getTableConfigByType = (type: string): TableConfig => {
  return tableConfigs[type] || tableConfigs.vendas;
};

// Função para obter configuração de gráfico por tipo
export const getChartConfigByType = (type: string): ChartConfig => {
  return chartConfigs[type] || chartConfigs.vendas;
};

// Função para obter métricas por tipo
export const getMetricsByType = (type: string): MetricConfig[] => {
  return metricConfigs[type] || metricConfigs.vendas;
};

// Função para obter textos por tipo
export const getTextsByType = (type: string): TextConfig[] => {
  return textConfigs[type] || textConfigs.vendas;
};
