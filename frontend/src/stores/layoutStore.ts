import { create } from 'zustand';
import { LayoutState, Breadcrumb } from '../types/layout';

interface LayoutStore extends LayoutState {
  // Actions
  toggleSidebar: () => void;
  collapseSidebar: () => void;
  setCurrentPage: (page: string) => void;
  setBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void;
  resetLayout: () => void;
}

const initialState: LayoutState = {
  sidebarOpen: true,
  sidebarCollapsed: false,
  currentPage: 'dashboard',
  breadcrumbs: [
    { label: 'Dashboard', path: '/', active: true }
  ],
};

export const useLayoutStore = create<LayoutStore>((set, get) => ({
  ...initialState,

  toggleSidebar: () => {
    set((state) => ({ sidebarOpen: !state.sidebarOpen }));
  },

  collapseSidebar: () => {
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }));
  },

  setCurrentPage: (page: string) => {
    set({ currentPage: page });
  },

  setBreadcrumbs: (breadcrumbs: Breadcrumb[]) => {
    set({ breadcrumbs });
  },

  resetLayout: () => {
    set(initialState);
  },
}));
