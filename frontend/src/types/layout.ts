export interface LayoutState {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  currentPage: string;
  breadcrumbs: Breadcrumb[];
}

export interface Breadcrumb {
  label: string;
  path: string;
  active: boolean;
}

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon: string;
  children?: NavigationItem[];
  active: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

export interface HeaderProps {
  onMenuToggle: () => void;
  onSearch: (query: string) => void;
  user?: User;
}

export interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onToggle: () => void;
  onCollapse: () => void;
  currentPath: string;
}

export interface MainContentProps {
  children: React.ReactNode;
  title?: string;
  breadcrumbs?: Breadcrumb[];
}
