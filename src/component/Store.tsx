import { useState } from "react";
import { BiPlus, BiStore } from "react-icons/bi";
import { MdLoop } from "react-icons/md";
import Upgrade from "./Upgrade";
import useGameStore from "../stores/setGameStore";
import { PiCursorClick } from "react-icons/pi";

export default function Store() {
  const {
    replantLevel,
    autoLevel,
    treeStockLevel,
    increaseReplantLevel,
    increaseAutoLevel,
    increaseTreeStockLevel,
  } = useGameStore();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="z-40 mt-5 left-5 p-2 bg-black rounded shadow fixed"
        onClick={() => setIsOpen(!isOpen)}
      >
        <BiStore size={50} />
      </button>

      <div
        className={`fixed top-0 left-0 h-full bg-gray-700 shadow-lg transition-transform duration-300 ease-in-out z-50`}
        style={{
          width: "80%",
          maxWidth: "300px",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <h2 className="p-4 text-xl font-bold">Loja</h2>
        <div className="p-4 flex flex-col gap-10">
          <Upgrade
            icon={<PiCursorClick size={50} />}
            label="Replant per click"
            level={replantLevel}
            initialPrice={1}
            increaseConstant={5}
            onClick={() => {
              increaseReplantLevel();
            }}
          />

          <Upgrade
            icon={<BiPlus size={50} />}
            label="Trees stock"
            level={treeStockLevel}
            initialPrice={25}
            increaseConstant={6}
            onClick={() => {
              increaseTreeStockLevel();
            }}
          />

          <Upgrade
            icon={<MdLoop size={50} />}
            label="Auto-plant"
            level={autoLevel}
            initialPrice={100}
            increaseConstant={8}
            onClick={() => {
              increaseAutoLevel();
            }}
          />
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
