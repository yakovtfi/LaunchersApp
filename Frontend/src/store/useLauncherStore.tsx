import { create } from 'zustand';
import type { Launcher } from '../types/Launcher';

interface LauncherStore {
  launchers: Launcher[];
  setLaunchers: (launchers: Launcher[]) => void;
}

export const useLauncherStore = create<LauncherStore>((set) => ({
  launchers: [],
  setLaunchers: (launchers) => set({ launchers }),
}));


