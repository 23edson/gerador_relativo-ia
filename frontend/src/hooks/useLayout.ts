import { useLayoutStore } from '../stores/layoutStore';

export const useLayout = () => {
  const {
    sidebarOpen,
    sidebarCollapsed,
    currentPage,
    breadcrumbs,
    toggleSidebar,
    collapseSidebar,
    setCurrentPage,
    setBreadcrumbs,
    resetLayout,
  } = useLayoutStore();

  const isMobile = () => {
    return window.innerWidth < 768;
  };

  const handleSidebarToggle = () => {
    if (isMobile()) {
      toggleSidebar();
    } else {
      collapseSidebar();
    }
  };

  const updateBreadcrumbs = (newBreadcrumbs: typeof breadcrumbs) => {
    setBreadcrumbs(newBreadcrumbs);
  };

  const addBreadcrumb = (breadcrumb: typeof breadcrumbs[0]) => {
    const updatedBreadcrumbs = [...breadcrumbs, breadcrumb];
    setBreadcrumbs(updatedBreadcrumbs);
  };

  const removeBreadcrumb = (index: number) => {
    const updatedBreadcrumbs = breadcrumbs.slice(0, index + 1);
    setBreadcrumbs(updatedBreadcrumbs);
  };

  return {
    // State
    sidebarOpen,
    sidebarCollapsed,
    currentPage,
    breadcrumbs,
    
    // Actions
    toggleSidebar,
    collapseSidebar,
    setCurrentPage,
    setBreadcrumbs,
    resetLayout,
    
    // Computed
    isMobile,
    handleSidebarToggle,
    updateBreadcrumbs,
    addBreadcrumb,
    removeBreadcrumb,
  };
};
