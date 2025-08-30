import React, { useEffect } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { MainContent } from './MainContent';
import { useLayout } from '../../hooks/useLayout';
import { useResponsive } from '../../hooks/useResponsive';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const {
    sidebarOpen,
    sidebarCollapsed,
    handleSidebarToggle,
    collapseSidebar,
    isMobile,
  } = useLayout();

  const { isMobile: responsiveIsMobile } = useResponsive();

  // Ajustar sidebar baseado no tamanho da tela
  useEffect(() => {
    if (responsiveIsMobile) {
      // Em mobile, sempre fechar sidebar
      if (sidebarOpen) {
        handleSidebarToggle();
      }
    }
  }, [responsiveIsMobile]);

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // TODO: Implementar busca de relatórios
  };

  const handleSidebarCollapse = () => {
    if (responsiveIsMobile) {
      handleSidebarToggle();
    } else {
      collapseSidebar();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        isCollapsed={sidebarCollapsed}
        onToggle={handleSidebarToggle}
        onCollapse={handleSidebarCollapse}
        currentPath="/"
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          onMenuToggle={handleSidebarToggle}
          onSearch={handleSearch}
          user={{
            id: '1',
            name: 'Usuário Demo',
            email: 'usuario@demo.com',
            role: 'admin'
          }}
        />

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          <MainContent>
            {children}
          </MainContent>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && responsiveIsMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={handleSidebarToggle}
        />
      )}
    </div>
  );
};
