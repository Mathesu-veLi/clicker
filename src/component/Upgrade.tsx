import type { ReactNode } from "react";
import useGameStore from "../stores/setGameStore";

interface Upgrade {
  onClick?: () => void;
  icon: ReactNode;
  label: string;
  initialPrice: number;
  increaseConstant: number;
  level: number;
}

export default function Upgrade({
  onClick,
  icon,
  label,
  initialPrice,
  increaseConstant,
  level,
}: Upgrade) {
  const price = () =>
    Math.round(
      calculatePrice(initialPrice, increaseConstant, level) +
        calculatePrice(initialPrice, increaseConstant, level - 1) * 0.6
    );

  const { coins, removeCoins } = useGameStore();

  const handleClick = () => {
    if (coins >= price()) {
      removeCoins(price());
      if (onClick) onClick();
      return;
    }

    alert("Você não tem dinheiro suficiente");
  };
  return (
    <button
      className="flex flex-col items-center gap-4 border-4 border-solid border-black bg-[#6A6] p-4 rounded shadow z-50"
      onClick={handleClick}
    >
      {icon}
      <p>
        {label}{" "}
        <span className="font-mono bg-gray-700 p-1 rounded-md">{level}</span>
      </p>
      <p className="font-mono bg-gray-700 p-1 rounded-md">
        {Math.round(price())}
      </p>
    </button>
  );
}

function calculatePrice(
  initialPrice: number,
  increaseConstant: number,
  level: number
): number {
  return (initialPrice + level ** 2) * increaseConstant;
}
