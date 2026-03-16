import { create } from 'zustand';
import { Launcher } from '../types/types';

interface LauncherStore {
  launchers: Launcher[];
  setLaunchers: (launchers: Launcher[]) => void;
}

export const useLauncherStore = create<LauncherStore>((set) => ({
  launchers: [],
  setLaunchers: (launchers) => set({ launchers }),
}));