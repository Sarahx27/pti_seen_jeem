import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';
import { Sparkles } from 'lucide-react';

const HomePage = () => {
  const { setCurrentScreen } = useGame();

  return (
    <div className="min-h-[calc(100vh-64px)] gradient-primary flex flex-col items-center justify-center p-8 animate-fade-in">
      <div className="text-center space-y-8 max-w-2xl">
        {/* عنوان اللعبة فقط */}
        <div className="space-y-4">
          <h1 className="text-7xl font-black tracking-tight mb-4 animate-scale-in">
            سين جيم
          </h1>
          <p className="text-xl text-foreground/80">
            لعبة الأسئلة التقنية التنافسية
          </p>
        </div>

        <div className="w-full h-1 bg-gradient-to-r from-amber-400 to-yellow-500/70 rounded-full shadow-glow"></div>

        <Button
          onClick={() => setCurrentScreen('category-selection')}
          size="lg"
          className="text-xl px-12 py-8 bg-[#F2880E] hover:opacity-90 shadow-glow font-bold"
        >
          <Sparkles className="ml-2 w-6 h-6" />
          ابدأ اللعبة
        </Button>

        {/* ⚠️ حذف أي نص إضافي مثل "PTI" أو "زكاة العلم نشره" هنا */}
      </div>
    </div>
  );
};

export default HomePage;
