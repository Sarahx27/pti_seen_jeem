import { useState, useEffect } from "react";
import { useGame } from "@/contexts/GameContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Pause, Play, Eye } from "lucide-react";

const QuestionScreen = () => {
  const {
    currentQuestion,
    setCurrentScreen,
    timerValue,
    setTimerValue,
    timerRunning,
    setTimerRunning,
    teams,
    updateTeamScore,
    doublePointsActive,
    setDoublePointsActive,
    markQuestionUsed,
    selectedCategories,
  } = useGame();

  const [showAnswer, setShowAnswer] = useState(false);
  const [showResultDialog, setShowResultDialog] = useState(false);

  useEffect(() => {
    setTimerValue(30);
    setTimerRunning(true);
    setShowAnswer(false);
    return () => setTimerRunning(false);
  }, [setTimerValue, setTimerRunning]);

  useEffect(() => {
    if (timerRunning && timerValue > 0) {
      const id = setInterval(() => setTimerValue((p) => p - 1), 1000);
      return () => clearInterval(id);
    } else if (timerValue === 0) {
      setShowAnswer(true);
      setTimerRunning(false);
    }
  }, [timerRunning, timerValue, setTimerValue, setTimerRunning]);

  if (!currentQuestion) return null;

  const willAllBeDoneAfter = (categoryId: number, qid: number) =>
    selectedCategories.every((cat) =>
      cat.id !== categoryId
        ? cat.questions.every((q) => q.used)
        : cat.questions.every((q) => (q.id === qid ? true : q.used))
    );

  const finish = () => {
    if (!currentQuestion) return;
    markQuestionUsed(currentQuestion.categoryId, currentQuestion.id);
    const done = willAllBeDoneAfter(currentQuestion.categoryId, currentQuestion.id);
    setShowResultDialog(false);
    setCurrentScreen(done ? "winner" : "game-board");
  };

  const handleTeamWin = (teamIndex: number) => {
    if (!currentQuestion) return;
    const points = doublePointsActive ? currentQuestion.value * 2 : currentQuestion.value;
    updateTeamScore(teamIndex, points);
    if (doublePointsActive) setDoublePointsActive(false);
    finish();
  };

  return (
    <div className="min-h-screen gradient-primary p-8 animate-fade-in">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-card rounded-lg p-6 flex items-center justify-between">
          <div className="text-xl font-bold">
            {currentQuestion.value} نقطة {doublePointsActive && "(×2)"}
          </div>
          <div className="flex items-center gap-4">
            <div className={`text-4xl font-black ${timerValue <= 5 ? "text-destructive animate-pulse" : ""}`}>
              {timerValue}
            </div>
            <div className="flex gap-2">
              {timerRunning ? (
                <Button onClick={() => setTimerRunning(false)} size="sm" variant="outline">
                  <Pause className="w-4 h-4" />
                </Button>
              ) : (
                <Button onClick={() => setTimerRunning(true)} size="sm" variant="outline" disabled={timerValue === 0}>
                  <Play className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-12 text-center">
          <p className="text-3xl font-bold leading-relaxed">{currentQuestion.text}</p>
        </div>

        {showAnswer && (
          <div className="bg-accent/20 border-2 border-accent rounded-lg p-8 text-center animate-scale-in">
            <p className="text-2xl font-bold mb-4">الإجابة:</p>
            <p className="text-xl">{currentQuestion.answer}</p>
          </div>
        )}

        <div className="flex gap-4 justify-center">
          {!showAnswer && (
            <Button onClick={() => setShowAnswer(true)} size="lg" className="bg-accent hover:bg-accent/90 px-8">
              <Eye className="ml-2 w-5 h-5" />
              عرض الإجابة
            </Button>
          )}
          {showAnswer && (
            <Button onClick={() => setShowResultDialog(true)} size="lg" className="bg-accent hover:bg-accent/90 px-8">
              تحديد النتيجة
            </Button>
          )}
        </div>
      </div>

      <Dialog open={showResultDialog} onOpenChange={setShowResultDialog}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">من أجاب بشكل صحيح؟</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {teams.map((team, index) => (
              <Button
                key={index}
                onClick={() => handleTeamWin(index)}
                size="lg"
                style={{ backgroundColor: index === 0 ? "hsl(var(--team1))" : "hsl(var(--team2))" }}
                className="text-white font-bold"
              >
                {team.name}
              </Button>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <Button variant="secondary" onClick={finish}>
              ولا أحد جاوب
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuestionScreen;
