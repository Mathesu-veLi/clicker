import { useRef, useEffect } from "react";
import "./App.css";
import { Tree } from "./classes/Tree";
import Store from "./component/Store";
import useGameStore from "./stores/setGameStore";

function App() {
  const gameStore = useGameStore();

  const treesLimit = gameStore.treeLimit;

  const treesRef = useRef<Tree[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    const lastTree = treesRef.current[treesRef.current.length - 1];
    if (lastTree.getSize() < Tree.getMaxSize()) {
      lastTree.grow(gameStore.replantLevel);
      gameStore.addCoins();
      return;
    }

    if (treesRef.current.length === treesLimit) resetTrees();

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
      console.log(gameStore.coins);
      return;
    }
  }, []);

  return (
    <>
      <div className="fixed inset-0" onClick={handleClick}>
        <Store />
      </div>

      <p className="text-lime-300 font-light text-4xl absolute top-5 right-10">
        Coins: {gameStore.coins}
        <br />
        Trees: {treesRef.current.length} ({treesLimit - treesRef.current.length}{" "}
        left)
      </p>

      <div
        id="tree-container"
        ref={containerRef}
        className="fixed inset-0 pointer-events-none z-10"
      ></div>

      <div
        id="floor"
        className="w-full bg-green-500 h-4 fixed bottom-0 left-0 flex items-center justify-center"
      ></div>
    </>
  );
}

export default App;
