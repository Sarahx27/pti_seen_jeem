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
    className="fixed bottom-6 end-6 rounded-full h-14 w-14 flex items-center justify-center shadow-lg bg-black/80 text-white hover:bg-black focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40"
  >
    <Settings className="h-6 w-6" />
  </button>
);

const GameContent = () => {
  const { currentScreen } = useGame();
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <main className="container mx-auto px-4 py-6">
        {currentScreen === "start" && <HomePage />}
        {currentScreen === "category-selection" && <CategorySelection />}
        {currentScreen === "game-board" && <GameBoard />}
        {currentScreen === "question" && <QuestionScreen />}
        {currentScreen === "winner" && <WinnerScreen />}
      </main>

      <FloatingAdminButton onClick={() => setShowAdmin(true)} />
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
