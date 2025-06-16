import { useRef, useEffect } from "react";
import "./App.css";
import { Tree } from "./classes/Tree";
import Store from "./component/Store";
import useGameStore from "./stores/setGameStore";

function App() {
  const INITIAL_TREES_STOCK = 10;

  const gameStore = useGameStore();
  const treesStock = Math.round((gameStore.treeStockLevel / 1.5) * INITIAL_TREES_STOCK);

  const treesRef = useRef<Tree[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    const lastTree = treesRef.current[treesRef.current.length - 1];
    if (lastTree.getSize() < Tree.getMaxSize()) {
      lastTree.grow(gameStore.replantLevel);
      gameStore.addCoins();
      return;
    }

    if (treesRef.current.length >= treesStock) resetTrees();

    addTree();
  };

  const addTree = () => {
    if (containerRef.current) {
      const newTree = new Tree(containerRef.current);
      treesRef.current.push(newTree);
    }
  };

  const resetTrees = () => {
    treesRef.current.forEach((tree) => {
      tree.destroy();
    });
    treesRef.current = [];
  };

  useEffect(() => {
    if (treesRef.current.length === 0) {
      addTree();
      gameStore.addCoins();
    }
  }, []);

  useEffect(() => {
    if (gameStore.autoLevel > 0) {
      const interval = setInterval(() => {
        handleClick();
      }, 10000 / gameStore.autoLevel);
      return () => clearInterval(interval);
    }
  }, [gameStore.autoLevel, gameStore.replantLevel]);

  return (
    <>
      <div className="fixed inset-0 z-0" onClick={handleClick}></div>

      <Store />

      <p className="text-lime-300 font-light text-4xl absolute top-5 right-10 z-20">
        Coins: {gameStore.coins}
        <br />
        Trees: {treesRef.current.length} ({Math.round(treesStock - treesRef.current.length)}{" "}
        left)
      </p>

      <div
        id="tree-container"
        ref={containerRef}
        className="fixed inset-0 pointer-events-none z-10"
      ></div>

      <div
        id="floor"
        className="w-full bg-green-500 h-4 fixed bottom-0 left-0 flex items-center justify-center z-10"
      ></div>
    </>
  );
}

export default App;
