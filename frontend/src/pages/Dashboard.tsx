import React from 'react';
import { 
  FileText, 
  Database, 
  TrendingUp, 
  Clock,
  BarChart3,
  Users,
  PlusCircle
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total de Relatórios',
      value: '24',
      change: '+12%',
      changeType: 'positive',
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      title: 'Fontes de Dados',
      value: '8',
      change: '+2',
      changeType: 'positive',
      icon: Database,
      color: 'bg-green-500',
    },
    {
      title: 'Relatórios Gerados',
      value: '156',
      change: '+23%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
    {
      title: 'Tempo Médio',
      value: '2.3s',
      change: '-0.5s',
      changeType: 'positive',
      icon: Clock,
      color: 'bg-orange-500',
    },
  ];

  const recentReports = [
    { id: 1, name: 'Relatório de Vendas Q1', status: 'Concluído', date: '2024-01-15' },
    { id: 2, name: 'Análise de Clientes', status: 'Em Processo', date: '2024-01-14' },
    { id: 3, name: 'Dashboard Financeiro', status: 'Concluído', date: '2024-01-13' },
    { id: 4, name: 'Relatório de RH', status: 'Pendente', date: '2024-01-12' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Bem-vindo à Plataforma de Relatórios</h1>
        <p className="text-primary-100">
          Crie, visualize e exporte relatórios dinâmicos com facilidade
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4">
              <span className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-600 ml-1">vs mês anterior</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Relatórios Recentes</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{report.name}</p>
                    <p className="text-sm text-gray-500">{report.date}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  report.status === 'Concluído' ? 'bg-green-100 text-green-800' :
                  report.status === 'Em Processo' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {report.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow cursor-pointer">
          <PlusCircle className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Novo Relatório</h3>
          <p className="text-gray-600">Crie um relatório personalizado</p>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow cursor-pointer">
          <Database className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Conectar Dados</h3>
          <p className="text-gray-600">Adicione novas fontes de dados</p>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow cursor-pointer">
          <BarChart3 className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Templates</h3>
          <p className="text-gray-600">Use templates prontos</p>
        </div>
      </div>
    </div>
  );
};
