import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Volume2, Zap, Phone } from 'lucide-react';
import { toast } from 'sonner';

const GameBoard = () => {
  const {
    selectedCategories,
    setCurrentQuestion,
    setCurrentScreen,
    teams,
    updateTeamScore,
    useHelp,
  } = useGame();

  const handleQuestionClick = (categoryId: number, questionId: number) => {
    const category = selectedCategories.find((c) => c.id === categoryId);
    const question = category?.questions.find((q) => q.id === questionId);

    if (question && !question.used) {
      setCurrentQuestion({ ...question, categoryId });
      setCurrentScreen('question');
    }
  };

  const handleHelp = (
    teamIndex: number,
    helpType: 'mute' | 'double' | 'friend'
  ) => {
    const helpNames = {
      mute: 'الكتم',
      double: 'ضعف النقاط',
      friend: 'اتصال بصديق',
    } as const;

    useHelp(teamIndex, helpType);
    toast.success(`${teams[teamIndex].name} استخدم ${helpNames[helpType]}`);
  };

  const VALUES = [100, 200, 300, 400, 500];

  return (
    <div className="min-h-screen gradient-primary p-6 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">لوحة اللعبة</h2>
          <Button
            variant="outline"
            onClick={() => setCurrentScreen('category-selection')}
          >
            الرجوع لاختيار الفئات
          </Button>
        </div>

        {/* ✅ صف واحد لعناوين الفئات */}
        <div className="grid grid-cols-6 gap-2">
          {selectedCategories.map((category) => (
            <div
              key={`head-${category.id}`}
              className="bg-secondary p-4 rounded-lg text-center font-bold text-sm text-slate-800"
            >
              {category.name}
            </div>
          ))}
        </div>

        {/* ✅ صفوف القيم 100..500 بدون تكرار اسم الفئة */}
        <div className="space-y-3">
          {VALUES.map((val) => (
            <div key={`row-${val}`} className="grid grid-cols-6 gap-3">
              {selectedCategories.map((category) => {
                const q = category.questions.find((qq) => qq.value === val);

                if (!q) {
                  return (
                    <div
                      key={`${category.id}-${val}-empty`}
                      className="h-16 w-full rounded-md border border-dashed border-muted-foreground/30 bg-muted/30"
                    />
                  );
                }

                return (
                  <button
                    key={`${category.id}-${q.id}`}
                    onClick={() => handleQuestionClick(category.id, q.id)}
                    disabled={q.used}
                    className={[
                      'h-16 w-full rounded-md font-semibold text-lg flex items-center justify-center transition-all',
                      q.used
                        ? 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                        : 'bg-card hover:bg-accent hover:text-white hover:shadow-md cursor-pointer active:ring-4 active:ring-primary/40 focus-visible:ring-4 focus-visible:ring-primary/40',
                    ].join(' ')}
                  >
                    {q.value}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Teams and Helps Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {teams.map((team, index) => (
            <div key={index} className="bg-card rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3
                  className="text-2xl font-bold"
                  style={{
                    color:
                      index === 0 ? 'hsl(var(--team1))' : 'hsl(var(--team2))',
                  }}
                >
                  {team.name}
                </h3>
                <div className="text-3xl font-black">{team.score}</div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => updateTeamScore(index, 100)}
                  size="sm"
                  variant="outline"
                  className="flex-1"
                >
                  <Plus className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => updateTeamScore(index, -100)}
                  size="sm"
                  variant="outline"
                  className="flex-1"
                >
                  <Minus className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => handleHelp(index, 'mute')}
                  title="كتم الخصم"
                  disabled={!team.helps.mute.available}
                  size="sm"
                  variant={team.helps.mute.available ? 'default' : 'outline'}
                  className="flex-1"
                >
                  <Volume2 className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => handleHelp(index, 'double')}
                  title="نقطتين مضاعفة"
                  disabled={!team.helps.double.available}
                  size="sm"
                  variant={team.helps.double.available ? 'default' : 'outline'}
                  className="flex-1"
                >
                  <Zap className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => handleHelp(index, 'friend')}
                  title="اتصال بصديق"
                  disabled={!team.helps.friend.available}
                  size="sm"
                  variant={team.helps.friend.available ? 'default' : 'outline'}
                  className="flex-1"
                >
                  <Phone className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
