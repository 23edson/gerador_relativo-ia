import React from 'react';
import { FileText, Search, Filter, Plus, MoreVertical, Download, Edit, Trash2 } from 'lucide-react';

export const Reports: React.FC = () => {
  const reports = [
    {
      id: 1,
      name: 'Relatório de Vendas Q1 2024',
      description: 'Análise detalhada das vendas do primeiro trimestre',
      status: 'Concluído',
      lastModified: '2024-01-15',
      createdBy: 'João Silva',
      type: 'Vendas',
    },
    {
      id: 2,
      name: 'Dashboard Financeiro',
      description: 'Visão geral da situação financeira da empresa',
      status: 'Em Processo',
      lastModified: '2024-01-14',
      createdBy: 'Maria Santos',
      type: 'Financeiro',
    },
    {
      id: 3,
      name: 'Análise de Clientes',
      description: 'Segmentação e comportamento dos clientes',
      status: 'Concluído',
      lastModified: '2024-01-13',
      createdBy: 'Pedro Costa',
      type: 'Marketing',
    },
    {
      id: 4,
      name: 'Relatório de RH',
      description: 'Indicadores de recursos humanos',
      status: 'Pendente',
      lastModified: '2024-01-12',
      createdBy: 'Ana Oliveira',
      type: 'RH',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Concluído':
        return 'bg-green-100 text-green-800';
      case 'Em Processo':
        return 'bg-yellow-100 text-yellow-800';
      case 'Pendente':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Relatórios</h1>
          <p className="text-gray-600">Gerencie e visualize seus relatórios</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Novo Relatório</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar relatórios..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
              <option value="">Todos os Status</option>
              <option value="concluido">Concluído</option>
              <option value="em-processo">Em Processo</option>
              <option value="pendente">Pendente</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
              <option value="">Todos os Tipos</option>
              <option value="vendas">Vendas</option>
              <option value="financeiro">Financeiro</option>
              <option value="marketing">Marketing</option>
              <option value="rh">RH</option>
            </select>
            <button className="btn-secondary flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filtros</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Última Modificação
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Criado por
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{report.name}</div>
                      <div className="text-sm text-gray-500">{report.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {report.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.lastModified}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.createdBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-primary-600 hover:text-primary-900 p-1">
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 p-1">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-1">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 p-1">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="bg-white rounded-lg px-6 py-3 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Mostrando <span className="font-medium">1</span> a <span className="font-medium">4</span> de{' '}
            <span className="font-medium">24</span> resultados
          </div>
          <div className="flex items-center space-x-2">
            <button className="btn-secondary px-3 py-1 text-sm">Anterior</button>
            <button className="bg-primary-600 text-white px-3 py-1 rounded text-sm">1</button>
            <button className="btn-secondary px-3 py-1 text-sm">2</button>
            <button className="btn-secondary px-3 py-1 text-sm">3</button>
            <button className="btn-secondary px-3 py-1 text-sm">Próximo</button>
          </div>
        </div>
      </div>
    </div>
  );
};
