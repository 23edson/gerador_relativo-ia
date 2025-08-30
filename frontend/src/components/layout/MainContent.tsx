import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { MainContentProps, Breadcrumb } from '../../types/layout';

export const MainContent: React.FC<MainContentProps> = ({ 
  children, 
  title, 
  breadcrumbs = [] 
}) => {
  const renderBreadcrumbs = () => {
    if (breadcrumbs.length === 0) return null;

    return (
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <Home className="h-4 w-4" />
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={breadcrumb.path}>
            <ChevronRight className="h-4 w-4" />
            <span className={breadcrumb.active ? 'text-gray-900 font-medium' : 'text-gray-600'}>
              {breadcrumb.label}
            </span>
          </React.Fragment>
        ))}
      </nav>
    );
  };

  return (
    <main className="flex-1 overflow-auto bg-gray-50">
      <div className="p-6">
        {/* Breadcrumbs */}
        {renderBreadcrumbs()}

        {/* Page Header */}
        {title && (
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {breadcrumbs.length > 0 && (
              <p className="text-gray-600 mt-1">
                {breadcrumbs[breadcrumbs.length - 1]?.label}
              </p>
            )}
          </div>
        )}

        {/* Content */}
        <div className="min-h-[calc(100vh-200px)]">
          {children}
        </div>
      </div>
    </main>
  );
};
