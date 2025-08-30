import React from 'react';
import { Database, Plus, Settings, TestTube, Trash2, Edit, Eye } from 'lucide-react';

export const DataSources: React.FC = () => {
  const dataSources = [
    {
      id: 1,
      name: 'Banco de Vendas',
      type: 'PostgreSQL',
      status: 'Conectado',
      lastSync: '2024-01-15 10:30',
      records: '125,430',
      description: 'Banco principal de vendas da empresa',
    },
    {
      id: 2,
      name: 'Planilha Clientes',
      type: 'Excel',
      status: 'Conectado',
      lastSync: '2024-01-15 09:15',
      records: '45,280',
      description: 'Lista de clientes em Excel',
    },
    {
      id: 3,
      name: 'API Financeira',
      type: 'REST API',
      status: 'Erro',
      lastSync: '2024-01-14 16:45',
      records: 'N/A',
      description: 'API externa de dados financeiros',
    },
    {
      id: 4,
      name: 'CSV Produtos',
      type: 'CSV',
      status: 'Conectado',
      lastSync: '2024-01-15 08:00',
      records: '12,450',
      description: 'Catálogo de produtos em CSV',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Conectado':
        return 'bg-green-100 text-green-800';
      case 'Erro':
        return 'bg-red-100 text-red-800';
      case 'Desconectado':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'PostgreSQL':
        return '🐘';
      case 'Excel':
        return '📊';
      case 'REST API':
        return '🔌';
      case 'CSV':
        return '📄';
      default:
        return '💾';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fontes de Dados</h1>
          <p className="text-gray-600">Gerencie suas conexões de dados</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Nova Fonte</span>
        </button>
      </div>

      {/* Data Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataSources.map((source) => (
          <div key={source.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{getTypeIcon(source.type)}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{source.name}</h3>
                  <p className="text-sm text-gray-500">{source.type}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(source.status)}`}>
                {source.status}
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-4">{source.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Registros:</span>
                <span className="font-medium text-gray-900">{source.records}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Última sincronização:</span>
                <span className="font-medium text-gray-900">{source.lastSync}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                  <Settings className="h-4 w-4" />
                </button>
              </div>
              <button className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors">
            <Database className="h-8 w-8 text-primary-600" />
            <div className="text-left">
              <h3 className="font-medium text-gray-900">Conectar Banco</h3>
              <p className="text-sm text-gray-600">Adicionar conexão PostgreSQL</p>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors">
            <TestTube className="h-8 w-8 text-green-600" />
            <div className="text-left">
              <h3 className="font-medium text-gray-900">Testar Conexões</h3>
              <p className="text-sm text-gray-600">Verificar status das fontes</p>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors">
            <Settings className="h-8 w-8 text-purple-600" />
            <div className="text-left">
              <h3 className="font-medium text-gray-900">Configurações</h3>
              <p className="text-sm text-gray-600">Ajustar parâmetros globais</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
