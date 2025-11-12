// src/components/QuestionScreen.tsx
import { useEffect, useMemo, useState } from "react";
import { useGame } from "@/contexts/GameContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Phone, Zap, VolumeX, Play, Pause, RotateCcw } from "lucide-react";
import TurnChip from "@/components/TurnChip";
import type { Question } from "@/data/gameData";

const formatSecs = (s: number) => {
  const mm = Math.floor(s / 60).toString().padStart(2, "0");
  const ss = (s % 60).toString().padStart(2, "0");
  return `${mm}:${ss}`;
};

const QuestionScreen = () => {
  const {
    currentQuestion,
    selectedCategories,
    setCurrentScreen,
    timerValue,
    setTimerValue,
    timerRunning,
    setTimerRunning,
    teams,
    updateTeamScore,
    markQuestionUsed,
    useHelp,
    nextTurn,
  } = useGame();

  const [showAnswer, setShowAnswer] = useState(false);
  const [showResultDialog, setShowResultDialog] = useState(false);

  useEffect(() => {
    setTimerValue(30);
    setTimerRunning(true);
    setShowAnswer(false);
    return () => setTimerRunning(false);
  }, [setTimerRunning, setTimerValue]);

  useEffect(() => {
    if (timerRunning && timerValue > 0) {
      const id = setInterval(() => setTimerValue((p) => p - 1), 1000);
      return () => clearInterval(id);
    }
    if (timerValue === 0) setTimerRunning(false);
  }, [timerRunning, timerValue, setTimerValue, setTimerRunning]);

  if (!currentQuestion) return null;

  const cq = currentQuestion as Question & {
    categoryId: number;
    image?: string;
    video?: string;
    answerImage?: string;
  };

  const questionText = cq.text || "";
  const answerText = cq.answer || "";

  const questionCategory = useMemo(
    () => selectedCategories.find((c) => c.id === cq.categoryId),
    [selectedCategories, cq.categoryId]
  );

  const primaryAction = () => {
    if (!showAnswer) {
      setShowAnswer(true);
      setTimerRunning(false);
    } else {
      setShowResultDialog(true);
    }
  };

  const finishAndBack = () => {
    nextTurn();
    setCurrentScreen("game-board");
  };

  const handleTeamWin = (teamIndex: number) => {
    updateTeamScore(teamIndex, cq.value);
    markQuestionUsed(cq.categoryId, cq.id);
    setShowResultDialog(false);
    finishAndBack();
  };

  const handleNoOne = () => {
    markQuestionUsed(cq.categoryId, cq.id);
    setShowResultDialog(false);
    finishAndBack();
  };

  return (
    <div className="min-h-screen page-bg px-4 pt-4 pb-4">
      <div className="w-full max-w-none mx-auto">
        {/* الهيدر */}
        <div className="bg-card rounded-2xl px-6 py-4 mb-4 flex items-center gap-4 shadow-sm">
          <div className="flex items-baseline gap-3">
            <div className="text-xl font-extrabold tabular-nums">
              {cq.value} نقطة
            </div>
            {questionCategory && (
              <span className="text-sm text-foreground/70">
                — {questionCategory.name}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 ms-auto">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setTimerRunning((v) => !v)}
              className="h-10 w-10"
            >
              {timerRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </Button>

            <div className="min-w-[110px] text-center bg-muted rounded-lg px-4 py-2 text-lg font-bold">
              {formatSecs(timerValue)}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setTimerValue(30)}
              className="h-10 w-10"
            >
              <RotateCcw className="w-5 h-5" />
            </Button>

            <TurnChip size="sm" className="ms-4" />
          </div>
        </div>

        {/* المحتوى الرئيسي: عمودان — الأول يمين (الفرق)، الثاني يسار (السؤال) */}
        <div className="grid grid-cols-[20rem_1fr] gap-10">
          {/* العمود الأيمن: بلوكات الفرق */}
          <aside className="space-y-6">
            {teams.map((team, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-border min-h-[180px] space-y-4"
              >
                <h3
                  className="text-xl font-bold text-center"
                  style={{ color: index === 0 ? "hsl(var(--team1))" : "hsl(var(--team2))" }}
                >
                  {team.name}
                </h3>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => updateTeamScore(index, -100)}
                    className="h-10 px-4 rounded-lg border border-border hover:bg-muted/40 text-base"
                  >
                    −100
                  </button>

                  <div className="text-3xl font-extrabold tabular-nums">{team.score}</div>

                  <button
                    onClick={() => updateTeamScore(index, +100)}
                    className="h-10 px-4 rounded-lg border border-border hover:bg-muted/40 text-base"
                  >
                    +100
                  </button>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => useHelp(index, "friend")}
                    disabled={!team.helps.friend.available}
                    className="h-10 w-10 rounded-lg bg-[#F2880E] hover:bg-[#d8760d] disabled:opacity-50 text-white flex items-center justify-center"
                  >
                    <Phone className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => useHelp(index, "double")}
                    disabled={!team.helps.double.available}
                    className="h-10 w-10 rounded-lg bg-[#F2880E] hover:bg-[#d8760d] disabled:opacity-50 text-white flex items-center justify-center"
                  >
                    <Zap className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => useHelp(index, "mute")}
                    disabled={!team.helps.mute.available}
                    className="h-10 w-10 rounded-lg bg-[#F2880E] hover:bg-[#d8760d] disabled:opacity-50 text-white flex items-center justify-center"
                  >
                    <VolumeX className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </aside>

          {/* العمود الأيسر: مربع السؤال */}
          <section className="flex-1">
            <div className="bg-card rounded-[28px] px-24 py-10 min-h-[380px] w-full shadow-md flex">
              <div className="m-auto w-full text-center space-y-8">
                {cq.image && (
                  <img
                    src={cq.image}
                    alt="صورة السؤال"
                    className="w-full max-w-[600px] mx-auto rounded-xl object-contain max-h-[45vh]"
                  />
                )}

                {questionText && (
                  <div className="text-3xl leading-relaxed text-foreground/80 font-medium">
                    {questionText}
                  </div>
                )}

                {showAnswer && (
                  <div className="inline-block text-2xl bg-muted/30 border border-border rounded-xl px-8 py-5 space-y-4">
                    <div>
                      <span className="font-semibold">الإجابة:</span> {answerText}
                    </div>
                    {cq.answerImage && (
                      <img
                        src={cq.answerImage}
                        alt="صورة الإجابة"
                        className="w-full max-w-[500px] mx-auto rounded-xl border border-border"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center mt-5">
              <Button size="lg" className="px-12 h-14 text-xl" onClick={primaryAction}>
                {showAnswer ? "تحديد النتيجة" : "إظهار الإجابة"}
              </Button>
            </div>
          </section>
        </div>

        {/* حوار اختيار الفائز */}
        <Dialog open={showResultDialog} onOpenChange={setShowResultDialog}>
          <DialogContent className="sm:max-w-[520px]">
            <DialogHeader>
              <DialogTitle className="text-2xl text-center">من أجاب بشكل صحيح؟</DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4 mt-4">
              {teams.map((team, index) => (
                <Button
                  key={index}
                  onClick={() => handleTeamWin(index)}
                  size="lg"
                  className="text-white font-bold"
                  style={{ backgroundColor: index === 0 ? "hsl(var(--team1))" : "hsl(var(--team2))" }}
                >
                  {team.name}
                </Button>
              ))}
            </div>

            <div className="mt-4 flex justify-center">
              <Button variant="secondary" onClick={handleNoOne}>
                ولا أحد جاوب
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default QuestionScreen;
