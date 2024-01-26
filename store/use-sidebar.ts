import { create } from 'zustand';

interface SidebarStore {
  collapsed: boolean;
  onToggle: () => void;
  setCollapsed: (collapsed: boolean) => void;
}

export const useSidebar = create<SidebarStore>((set) => ({
  collapsed: false,
  onToggle: () => set((state) => ({ collapsed: !state.collapsed })),
  setCollapsed: (collapsed) => set({ collapsed }),
}));
