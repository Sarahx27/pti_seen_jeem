import React from "react";
import { useGame } from "@/contexts/GameContext";
import { Trash2 } from "lucide-react";

const Header: React.FC = () => {
  const { hardReset } = useGame();

  return (
    <header className="w-full bg-white/70 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-3 px-6">
        {/* يمين: اللوقوين + النص */}
        <div className="flex flex-row-reverse items-center gap-6">
          <div className="flex flex-col text-right leading-none">
            <h1 className="text-2xl font-bold text-slate-900">PTI</h1>
            <p className="text-sm text-slate-500 mt-1">لأن زكاة العلم نشره</p>
          </div>
          <img src="/club-logo.png" alt="شعار النادي" className="h-20 w-auto object-contain" />
          <img src="/seenjeem-logo.png" alt="شعار سين جيم" className="h-24 w-auto object-contain" />
        </div>
      </div>
    </header>
  );
};

export default Header;  
