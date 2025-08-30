import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  Database, 
  Copy, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { SidebarProps, NavigationItem } from '../../types/layout';
import { useNavigationStore } from '../../stores/navigationStore';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Database,
  Copy,
  Settings,
};

export const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  isCollapsed, 
  onToggle, 
  onCollapse, 
  currentPath 
}) => {
  const { navigationItems, setCurrentPath } = useNavigationStore();
  const location = useLocation();

  const handleItemClick = (path: string) => {
    setCurrentPath(path);
  };

  const renderIcon = (iconName: string, className: string = 'h-5 w-5') => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className={className} /> : null;
  };

  if (!isOpen) {
    return null;
  }

  return (
    <aside className={`
      bg-white border-r border-gray-200 transition-all duration-300 ease-in-out
      ${isCollapsed ? 'w-16' : 'w-64'}
      fixed md:relative h-full z-40
    `}>
      {/* Header da Sidebar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
        )}
        <button
          onClick={onCollapse}
          className="p-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-label={isCollapsed ? 'Expandir menu' : 'Colapsar menu'}
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Navegação */}
      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => handleItemClick(item.path)}
              className={`
                flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200
                ${isActive 
                  ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-600' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }
              `}
            >
              <div className="flex-shrink-0">
                {renderIcon(item.icon, 'h-5 w-5')}
              </div>
              {!isCollapsed && (
                <span className="font-medium">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer da Sidebar */}
      {!isCollapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            <p>Plataforma de Relatórios</p>
            <p className="mt-1">v1.0.0</p>
          </div>
        </div>
      )}
    </aside>
  );
};
