import { useState, useRef, useEffect } from "react";
import "./App.css";
import { Tree } from "./classes/Tree";

function App() {
  let treesLimit = 10;

  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const treesRef = useRef<Tree[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    const lastTree = treesRef.current[treesRef.current.length - 1];

    if (lastTree.getSize() !== 100) {
      lastTree.grow();
      setScore(score + 1);
      return;
    }

    if (treesRef.current.length === treesLimit) levelUp();

    addTree();
  };

  const addTree = () => {
    if (containerRef.current) {
      const newTree = new Tree(containerRef.current);
      treesRef.current.push(newTree);
    }
  };

  const levelUp = () => {
    resetTrees();

    Tree.upgradeMaxSize();
    treesLimit += 5;
    setLevel(level + 1);
  };

  const resetTrees = () => {
    treesRef.current.forEach((tree) => {
      tree.destroy();
    });
    treesRef.current = [];
  };

  useEffect(() => {
    addTree();
    setScore(score + 1);
  }, []);

  return (
    <>
      <div className="fixed inset-0">
        <button className="w-full h-full" onClick={handleClick}></button>
      </div>

      <h1 className="text-4xl font-bold absolute top-5 right-10">
        Score: {score}
        <br />
        Level: {level}
      </h1>

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
