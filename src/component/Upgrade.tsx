import type { ReactNode } from "react";

interface Upgrade {
  onClick?: () => void;
  icon: ReactNode;
  label: string;
  level?: number; 
}

export default function Upgrade({
  onClick,
  icon,
  label,
  level
}: Upgrade) {
  return (
    <button
      className="flex flex-col items-center gap-4 border-4 border-solid border-black bg-[#6A6] p-4 rounded shadow z-50"
      onClick={onClick}
    >
      {icon}
      <p>{label} <span className="font-mono bg-gray-700 p-1 rounded-md">{level}</span></p>
    </button>
  );
}
