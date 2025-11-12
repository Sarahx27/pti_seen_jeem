import React, { useMemo } from "react";
import { useGame } from "@/contexts/GameContext";
import TurnChip from "@/components/TurnChip";
import { Phone, Zap, Volume2 } from "lucide-react";
import { VolumeX } from "lucide-react";


const GameBoard: React.FC = () => {
  const {
    selectedCategories,
    setCurrentScreen,
    setCurrentQuestion,
    teams,
    updateTeamScore,
    useHelp,
  } = useGame();

  const maxRows = useMemo(
    () => Math.max(0, ...selectedCategories.map((c) => c.questions.length)),
    [selectedCategories]
  );

  const openQuestion = (categoryId: number, rowIdx: number) => {
    const cat = selectedCategories.find((c) => c.id === categoryId);
    if (!cat) return;
    const q = cat.questions[rowIdx];
    if (!q || q.used) return;
    setCurrentQuestion({ ...q, categoryId });
    setCurrentScreen("question");
  };

  return (
    <div className="min-h-screen w-full page-bg px-4 pt-4 pb-2">
      <div className="max-w-[1400px] mx-auto">

        {/* ===== الهيدر ===== */}
        <div className="bg-card rounded-2xl px-5 py-4 mb-4 flex items-center gap-3 shadow-sm">

          <button
            onClick={() => setCurrentScreen("category-selection")}
            className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted/40"
          >
            الرجوع
          </button>

          {/* الشارة — نهاية الهيدر */}
          <div className="ms-auto">
            <TurnChip size="xs" />
          </div>

        </div>

        {/* ===== المحتوى ===== */}
        <div className="flex items-start gap-4">

          {/* يمين: بلوكات الفرق */}
          <div className="w-72 space-y-4">
            {teams.map((team, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-md space-y-3">
                
                <h3
                  className="text-xl font-bold text-center"
                  style={{ color: index === 0 ? "hsl(var(--team1))" : "hsl(var(--team2))" }}
                >
                  {team.name}
                </h3>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => updateTeamScore(index, -100)}
                    className="px-3 py-1 rounded-lg border border-border hover:bg-muted/40 text-sm"
                  >
                    −100
                  </button>

                  <div className="text-2xl font-extrabold tabular-nums">{team.score}</div>

                  <button
                    onClick={() => updateTeamScore(index, +100)}
                    className="px-3 py-1 rounded-lg border border-border hover:bg-muted/40 text-sm"
                  >
                    +100
                  </button>
                </div>

                {/* ✅ المساعدات بلون برتقالي */}
                <div className="flex items-center justify-center gap-2">
                  
                  {/* اتصال بصديق */}
                  <button
                    onClick={() => useHelp(index, "friend")}
                    disabled={!team.helps.friend.available}
                    title="اتصال بصديق"
                    className="h-10 w-10 flex items-center justify-center rounded-lg bg-[#F2880E] hover:bg-[#d8760d] text-white disabled:opacity-50"
                  >
                    <Phone className="w-5 h-5" />
                  </button>

                  {/* نقاط مضاعفة */}
                  <button
                    onClick={() => useHelp(index, "double")}
                    disabled={!team.helps.double.available}
                    title="نقاط مضاعفة"
                    className="h-10 w-10 flex items-center justify-center rounded-lg bg-[#F2880E] hover:bg-[#d8760d] text-white disabled:opacity-50"
                  >
                    <Zap className="w-5 h-5" />
                  </button>

                  {/* كتم الخصم */}
                  <button
                    onClick={() => useHelp(index, "mute")}
                    disabled={!team.helps.mute.available}
                    title="كتم الخصم"
                    className="h-10 w-10 flex items-center justify-center rounded-lg bg-[#F2880E] hover:bg-[#d8760d] text-white disabled:opacity-50"
                  >
                    <VolumeX className="w-5 h-5" />
                  </button>

                </div>
              </div>
            ))}
          </div>

          {/* يسار: الشبكة */}
          <div className="flex-1">

            {/* عناوين الفئات */}
            <div className="grid grid-cols-6 gap-2 mb-2">
              {selectedCategories.map((category) => (
                <div
                  key={category.id}
                  className="text-center bg-muted/40 text-foreground rounded-lg py-2 text-sm font-semibold"
                >
                  {category.name}
                </div>
              ))}
            </div>

            {/* شبكة الأسئلة */}
            <div className="space-y-2">
              {Array.from({ length: maxRows }).map((_, rowIdx) => (
                <div key={`row-${rowIdx}`} className="grid grid-cols-6 gap-2">
                  
                  {selectedCategories.map((cat) => {
                    const q = cat.questions[rowIdx];
                    if (!q) return <div key={`${cat.id}-empty-${rowIdx}`} />;

                    return (
                      <button
                        key={`${cat.id}-${q.id}`}
                        onClick={() => openQuestion(cat.id, rowIdx)}
                        disabled={q.used}
                        className={`h-12 rounded-lg font-bold text-base flex items-center justify-center border
                          ${q.used ? "bg-muted text-foreground/40 cursor-not-allowed" : "bg-white hover:bg-muted/30"}`}
                      >
                        {q.value}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default GameBoard;
