import { useState } from "react";
import { BiPlus, BiStore } from "react-icons/bi";
import { MdLoop } from "react-icons/md";
import Upgrade from "./Upgrade";
import useGameStore from "../stores/setGameStore";

export default function Store() {
  const { replantLevel, addReplantLevel, addAutoLevel, autoLevel } =
    useGameStore();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="z-40 mt-5 left-5 p-2 bg-black rounded shadow"
        onClick={() => setIsOpen(!isOpen)}
      >
        <BiStore size={50} />
      </button>

      <div
        className={`fixed top-0 left-0 h-full bg-gray-700 shadow-lg transition-transform duration-300 ease-in-out z-50`}
        style={{
          width: "20%",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <h2 className="p-4 text-xl font-bold">Loja</h2>
        {/* Conteúdo da loja aqui */}
        <div className="p-4 flex flex-col gap-10">
          <Upgrade
            icon={<BiPlus size={50} />}
            label="Replant per click"
            level={replantLevel}
            initialPrice={1}
            increaseConstant={9}
            onClick={() => {
              addReplantLevel();
            }}
          />
          <Upgrade
            icon={<MdLoop size={50} />}
            label="Auto-plant"
            level={autoLevel}
            initialPrice={100}
            increaseConstant={12}
            onClick={() => {
              addAutoLevel();
            }}
          />
        </div>
      </div>
    </>
  );
}
