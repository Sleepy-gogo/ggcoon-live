import { create } from 'zustand';

export enum ChatVariant {
  CHAT = 'CHAT',
  COMMUNITY = 'COMMUNITY',
}

interface ChatStore {
  collapsed: boolean;
  variant: ChatVariant;
  onToggle: () => void;
  setCollapsed: (collapsed: boolean) => void;
  setVariant: (variant: ChatVariant) => void;
}

export const useChat = create<ChatStore>((set) => ({
  collapsed: false,
  variant: ChatVariant.CHAT,
  onToggle: () => set((state) => ({ collapsed: !state.collapsed })),
  setCollapsed: (collapsed) => set({ collapsed }),
  setVariant: (variant: ChatVariant) => set({ variant }),
}));
