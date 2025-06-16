import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GameState {
  coins: number;
  replantLevel: number;
  addCoins: () => void;
  addReplantLevel: () => void;
  treeLimit: number;
}

const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      coins: 0,
      replantLevel: 1,
      treeLimit: 10,
      addCoins: () =>
        set((state) => ({ coins: state.coins + state.replantLevel })),
      addReplantLevel: () =>
        set((state) => ({ replantLevel: state.replantLevel + 1 })),
    }),
    {
      name: "game-storage", // nome da chave no localStorage
    }
  )
);

export default useGameStore;
