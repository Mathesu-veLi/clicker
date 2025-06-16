import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GameState {
  coins: number;
  replantLevel: number;
  autoLevel: number;
  treeStockLevel: number;
  addCoins: () => void;
  removeCoins: (amount: number) => void;
  increaseReplantLevel: () => void;
  increaseAutoLevel: () => void;
  increaseTreeStockLevel: () => void;
}

const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      coins: 0,
      replantLevel: 1,
      treeStockLevel: 1,
      autoLevel: 0,
      addCoins: () =>
        set((state) => ({ coins: state.coins + state.replantLevel })),
      removeCoins: (amount: number) =>
        set((state) => ({ coins: state.coins - amount })),
      increaseReplantLevel: () =>
        set((state) => ({ replantLevel: state.replantLevel + 1 })),
      increaseAutoLevel: () =>
        set((state) => ({ autoLevel: state.autoLevel + 1 })),
      increaseTreeStockLevel: () =>
        set((state) => ({ treeStockLevel: state.treeStockLevel * 1.5 })),
    }),
    {
      name: "game-storage", // nome da chave no localStorage
    }
  )
);

export default useGameStore;
