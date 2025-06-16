import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GameState {
  coins: number;
  replantLevel: number;
  autoLevel: number
  addCoins: () => void;
  addReplantLevel: () => void;
  addAutoLevel: () => void;
  treeLimit: number;
}

const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      coins: 0,
      replantLevel: 1,
      treeLimit: 10,
      autoLevel: 0,
      addCoins: () =>
        set((state) => ({ coins: state.coins + state.replantLevel })),
      addReplantLevel: () =>
        set((state) => ({ replantLevel: state.replantLevel + 1 })),
      addAutoLevel: () =>
        set((state) => ({ autoLevel: state.autoLevel + 1})),
    }),
    {
      name: "game-storage", // nome da chave no localStorage
    }
  )
);

export default useGameStore;
