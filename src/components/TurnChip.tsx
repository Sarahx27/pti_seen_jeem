// src/components/TurnChip.tsx
import React from "react";
import { useGame } from "@/contexts/GameContext";

type Props = { className?: string; size?: "xs" | "sm" };

const TurnChip: React.FC<Props> = ({ className = "", size = "xs" }) => {
  const { teams, currentTurn } = useGame();

  const style: React.CSSProperties = {
    backgroundColor: "#F2880E20",
    borderColor:   "#F2880E80",
    color:         "#F2880E",
  };

  const pad = size === "xs" ? "px-3 py-0.5" : "px-4 py-1";
  const txt = size === "xs" ? "text-[13px]" : "text-sm md:text-base";

  return (
    <div className={`rounded-full border ${pad} ${txt} shadow-sm shrink-0 ${className}`} style={style}>
      دور: {teams[currentTurn]?.name ?? ""}
    </div>
  );
};

export default TurnChip;
