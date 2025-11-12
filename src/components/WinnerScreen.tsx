import { useGame } from "@/contexts/GameContext";
import { Button } from "@/components/ui/button";

const WinnerScreen = () => {
  const { teams, winnerTeamIndex, setCurrentScreen, resetGame } = useGame();

  const isTie = winnerTeamIndex === null;
  const title = isTie ? "تعادل!" : `الفريق الفائز: ${teams[winnerTeamIndex!].name}`;
  const score = isTie
    ? `${teams[0].score} - ${teams[1].score}`
    : `${teams[winnerTeamIndex!].score} نقطة`;

  return (
    <div className="min-h-screen page-bg p-8 flex items-center justify-center">
      <div className="w-full max-w-3xl mx-auto space-y-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold">{title}</h1>

        <div className="bg-card rounded-3xl p-10 md:p-14 shadow-lg">
          <div className="text-2xl md:text-3xl mb-6">
            {isTie ? "المباراة انتهت بتعادل." : "مبروك!"}
          </div>

          <div className="text-3xl md:text-4xl font-bold">{score}</div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button variant="secondary" onClick={() => setCurrentScreen("game-board")}>
              الرجوع للوحة اللعبة
            </Button>
            <Button onClick={resetGame}>بدء لعبة جديدة</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teams.map((t, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
              <div
                className="text-xl font-bold mb-2"
                style={{ color: i === 0 ? "hsl(var(--team1))" : "hsl(var(--team2))" }}
              >
                {t.name}
              </div>
              <div className="text-3xl font-extrabold tabular-nums">{t.score}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WinnerScreen;
