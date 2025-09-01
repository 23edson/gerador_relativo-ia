import { create } from 'zustand';
import { NavigationItem } from '../types/layout';

interface NavigationStore {
  navigationItems: NavigationItem[];
  currentPath: string;
  setCurrentPath: (path: string) => void;
  setNavigationItems: (items: NavigationItem[]) => void;
  getActiveItem: () => NavigationItem | undefined;
}

const defaultNavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/',
    icon: 'LayoutDashboard',
    active: true,
  },
  {
    id: 'reports',
    label: 'Relatórios',
    path: '/reports',
    icon: 'FileText',
    active: false,
  },
  {
    id: 'report-builder',
    label: 'Construtor',
    path: '/report-builder',
    icon: 'PlusCircle',
    active: false,
  },
  {
    id: 'report-preview',
    label: 'Preview',
    path: '/report-preview',
    icon: 'Eye',
    active: false,
  },
  {
    id: 'data-sources',
    label: 'Fontes de Dados',
    path: '/data-sources',
    icon: 'Database',
    active: false,
  },
  {
    id: 'templates',
    label: 'Templates',
    path: '/templates',
    icon: 'Copy',
    active: false,
  },
  {
    id: 'settings',
    label: 'Configurações',
    path: '/settings',
    icon: 'Settings',
    active: false,
  },
];

export const useNavigationStore = create<NavigationStore>((set, get) => ({
  navigationItems: defaultNavigationItems,
  currentPath: '/',

  setCurrentPath: (path: string) => {
    set({ currentPath: path });
    
    // Atualizar itens ativos
    const updatedItems = get().navigationItems.map(item => ({
      ...item,
      active: item.path === path,
    }));
    
    set({ navigationItems: updatedItems });
  },

  setNavigationItems: (items: NavigationItem[]) => {
    set({ navigationItems: items });
  },

  getActiveItem: () => {
    return get().navigationItems.find(item => item.active);
  },
}));
