import { useState } from "react";
import tree from "./assets/tree.png";
import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  const [trees, setTrees] = useState(0);

  const handleClick = () => {
    setScore(score + 1);
    setTrees(trees + 1);

    const newTree = document.createElement("img");
    newTree.src = tree;
    newTree.className = "absolute h-16 tree";

    const randomX = Math.random() * window.innerWidth;
    newTree.style.left = `${randomX}px`;

    document.getElementById("tree-container")?.appendChild(newTree);
  };

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
