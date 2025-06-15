import { useState, useRef, useEffect } from "react";
import "./App.css";
import { Tree } from "./classes/Tree";

function App() {
  let treesLimit = 10;

  const [coins, setCoins] = useState(0);
  const treesRef = useRef<Tree[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    const lastTree = treesRef.current[treesRef.current.length - 1];

    if (lastTree.getSize() !== 100) {
      lastTree.grow();
      setCoins(coins + 1);
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
    if (coins === 0) {
      addTree();
      setCoins(coins + 1);
    }
  }, []);

  return (
    <>
      <div className="fixed inset-0">
        <button className="w-full h-full" onClick={handleClick}></button>
      </div>

      <p className="text-lime-300 font-light text-4xl absolute top-5 right-10">
        Coins: {coins}
        <br />
        Trees: {treesRef.current.length} ({treesLimit - treesRef.current.length}{" "}
        left)
      </p>

      <div
        id="tree-container"
        ref={containerRef}
        className="fixed inset-0 pointer-events-none"
      ></div>

      <div
        id="floor"
        className="w-full bg-green-500 h-4 fixed bottom-0 left-0 flex items-center justify-center"
      ></div>
    </>
  );
}

export default App;
