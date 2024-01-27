import { create } from 'zustand';

interface DashboardSidebarStore {
  collapsed: boolean;
  onToggle: () => void;
  setCollapsed: (collapsed: boolean) => void;
}

export const useDashboardSidebar = create<DashboardSidebarStore>((set) => ({
  collapsed: false,
  onToggle: () => set((state) => ({ collapsed: !state.collapsed })),
  setCollapsed: (collapsed) => set({ collapsed }),
}));
