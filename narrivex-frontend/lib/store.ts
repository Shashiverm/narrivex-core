import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Asset {
  symbol: string;
  name: string;
}

interface AppStore {
  assets: Asset[];
  addAsset: (asset: Asset) => void;
  removeAsset: (symbol: string) => void;
  setAssets: (assets: Asset[]) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      assets: [],
      addAsset: (asset) => set((state) => ({ assets: [...state.assets, asset] })),
      removeAsset: (symbol) => set((state) => ({ assets: state.assets.filter((a) => a.symbol !== symbol) })),
      setAssets: (assets) => set({ assets }),
    }),
    {
      name: 'narrivex-store',
    }
  )
);