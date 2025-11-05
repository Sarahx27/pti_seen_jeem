import { useState } from "react";
import { GameProvider, useGame } from "@/contexts/GameContext";
import HomePage from "@/components/HomePage";
import CategorySelection from "@/components/CategorySelection";
import GameBoard from "@/components/GameBoard";
import QuestionScreen from "@/components/QuestionScreen";
import WinnerScreen from "@/components/WinnerScreen";
import AdminPanel from "@/components/AdminPanel";
import { Settings } from "lucide-react";

const FloatingAdminButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    title="لوحة التحكم"
    aria-label="لوحة التحكم"
    className="fixed bottom-6 end-6 rounded-full h-14 w-14 flex items-center justify-center 
               shadow-lg bg-black/80 text-white hover:bg-black focus:outline-none 
               focus-visible:ring-4 focus-visible:ring-primary/40 transition"
  >
    <Settings className="h-6 w-6" />
  </button>
);

const GameContent = () => {
  const { currentScreen } = useGame();
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div className="min-h-screen w-full text-foreground page-bg">
      <main className="w-full min-h-screen flex flex-col items-center justify-center px-4 py-6">
        {currentScreen === "start" && <HomePage />}
        {currentScreen === "category-selection" && <CategorySelection />}
        {currentScreen === "game-board" && <GameBoard />}
        {currentScreen === "question" && <QuestionScreen />}
        {currentScreen === "winner" && <WinnerScreen />}
      </main>

      {/* زر لوحة التحكم */}
      <FloatingAdminButton onClick={() => setShowAdmin(true)} />

      {/* نافذة لوحة التحكم */}
      {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}
    </div>
  );
};

const Index = () => {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
};

export default Index;