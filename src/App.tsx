import { useState, useRef, useEffect } from "react";
import "./App.css";
import { Tree } from "./classes/Tree";

function App() {
  const [score, setScore] = useState(0);
  const treesRef = useRef<Tree[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const addTree = () => {
    if (containerRef.current) {
      const newTree = new Tree(containerRef.current);
      treesRef.current.push(newTree);
    }
  };

  const handleClick = () => {
    if (treesRef.current[treesRef.current.length - 1].getSize() === 100) {
      addTree();
      return;
    }
    treesRef.current[treesRef.current.length - 1].grow();
    setScore(score + 1);
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
