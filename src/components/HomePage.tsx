import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useGame } from "@/contexts/GameContext";

export default function HomePage() {
  const { setCurrentScreen } = useGame();

  return (
    <div className="min-h-[calc(100dvh-3rem)] flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-7xl font-black tracking-tight">سين جيم</h1>
        
        {/* زر البدء */}
        <Button
          onClick={() => setCurrentScreen("category-selection")}
          size="lg"
          className="px-12 py-6 bg-accent hover:opacity-90 text-white font-bold"
        >
          <Sparkles className="ml-2 w-5 h-5" />
          ابدأ اللعبة
        </Button>
      </div>
    </div>
  );
}