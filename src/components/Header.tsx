// src/components/Header.tsx
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white/70 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto flex items-center justify-start gap-4 py-3 px-6">

        {/* ✅ يمين: لوقو سين جيم */}
        <img
          src="/seenjeem-logo.png"
          alt="شعار سين جيم"
          className="h-20 w-auto object-contain"
        />

        {/* ✅ يسار قليلاً: لوقو النادي + العبارة تحته */}
        <div className="flex flex-col items-start text-right">
          <img
            src="/club-logo.png"
            alt="شعار النادي"
            className="h-20 w-auto object-contain"
          />
          <p className="text-sm text-slate-600 mt-1 text-right">
            لأن زكاة العلم نشره
          </p>
        </div>

      </div>
    </header>
  );
};

export default Header;
