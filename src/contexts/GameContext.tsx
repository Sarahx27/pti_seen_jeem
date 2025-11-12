import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Category, Team, Question, initialCategories } from "@/data/gameData";

type Screen = "start" | "category-selection" | "game-board" | "question" | "winner";
type CurrentQ = (Question & { categoryId: number }) | null;

const STORAGE_KEY = "seenjeem_v2_state";

const initialTeams: Team[] = [
  {
    name: "الفريق 1",
    score: 0,
    helps: {
      mute: { available: true, active: false },
      double: { available: true, active: false },
      friend: { available: true, active: false },
    },
  },
  {
    name: "الفريق 2",
    score: 0,
    helps: {
      mute: { available: true, active: false },
      double: { available: true, active: false },
      friend: { available: true, active: false },
    },
  },
];

interface GameContextType {
  currentScreen: Screen;
  setCurrentScreen: (s: Screen) => void;

  allCategories: Category[];
  setAllCategories: (c: Category[]) => void;
  selectedCategories: Category[];
  setSelectedCategories: (c: Category[]) => void;

  teams: Team[];
  setTeams: (t: Team[]) => void;

  currentQuestion: CurrentQ;
  setCurrentQuestion: (q: CurrentQ) => void;

  timerValue: number;
  setTimerValue: React.Dispatch<React.SetStateAction<number>>;
  timerRunning: boolean;
  setTimerRunning: React.Dispatch<React.SetStateAction<boolean>>;

  doublePointsActive: boolean;
  setDoublePointsActive: React.Dispatch<React.SetStateAction<boolean>>;

  updateTeamScore: (teamIndex: number, points: number) => void;
  useHelp: (teamIndex: number, help: "mute" | "double" | "friend") => void;
  markQuestionUsed: (categoryId: number, questionId: number) => void;

  // 👇 إضافات الدور
  currentTurn: number; // 0 أو 1
  nextTurn: () => void;

  // شاشة الفائز
  winnerTeamIndex: number | null;

  resetGame: () => void;
  hardReset: () => void;
}

type PersistedState = {
  currentScreen: Screen;
  allCategories: Category[];
  selectedCategories: Category[];
  teams: Team[];
  currentQuestion: CurrentQ;
  doublePointsActive: boolean;
  timer: { running: boolean; remaining: number; lastSavedAt: number };
  currentTurn?: number;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("start");
  const [allCategories, setAllCategories] = useState<Category[]>(initialCategories);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [teams, setTeams] = useState<Team[]>(initialTeams);

  const [currentQuestion, setCurrentQuestion] = useState<CurrentQ>(null);
  const [timerValue, setTimerValue] = useState<number>(30);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  const [doublePointsActive, setDoublePointsActive] = useState<boolean>(false);

  // ✅ الدور الحالي (0 = فريق 1، 1 = فريق 2)
  const [currentTurn, setCurrentTurn] = useState<number>(0);
  const nextTurn = () => setCurrentTurn((t) => (t === 0 ? 1 : 0));

  // ✅ شاشة الفائز
  const [winnerTeamIndex, setWinnerTeamIndex] = useState<number | null>(null);

  const remainingQuestionsCount = (cats: Category[]) =>
    cats.reduce((acc, c) => acc + c.questions.filter((q) => !q.used).length, 0);

  const finishGame = (teamsSnapshot: Team[]) => {
    let winner: number | null = null;
    if (teamsSnapshot[0].score > teamsSnapshot[1].score) winner = 0;
    else if (teamsSnapshot[1].score > teamsSnapshot[0].score) winner = 1;
    else winner = null;
    setWinnerTeamIndex(winner);
    setCurrentScreen("winner");
  };

  const checkAndMaybeEndGame = (teamsSnapshot = teams, catsSnapshot = selectedCategories) => {
    if (!catsSnapshot || catsSnapshot.length === 0) return;
    const remaining = remainingQuestionsCount(catsSnapshot);
    if (remaining === 0) finishGame(teamsSnapshot);
  };

  const updateTeamScore = (teamIndex: number, points: number) => {
    setTeams((prev) => {
      const next = [...prev];
      next[teamIndex] = { ...next[teamIndex], score: next[teamIndex].score + points };
      setTimeout(() => checkAndMaybeEndGame(next, selectedCategories), 0);
      return next;
    });
  };

  const useHelp = (teamIndex: number, help: "mute" | "double" | "friend") => {
    setTeams((prev) => {
      const next = [...prev];
      const t = { ...next[teamIndex] };
      const helps = { ...t.helps };

      if (help === "double" && helps.double.available) {
        helps.double = { available: false, active: true };
        setDoublePointsActive(true);
      } else if (help === "mute" && helps.mute.available) {
        helps.mute = { available: false, active: true };
      } else if (help === "friend" && helps.friend.available) {
        helps.friend = { available: false, active: true };
      }

      t.helps = helps;
      next[teamIndex] = t;
      return next;
    });
  };

  const markQuestionUsed = (categoryId: number, questionId: number) => {
    setSelectedCategories((prev) => {
      const next = prev.map((c) =>
        c.id !== categoryId
          ? c
          : {
              ...c,
              questions: c.questions.map((q) =>
                q.id === questionId ? { ...q, used: true } : q
              ),
            }
      );
      setTimeout(() => checkAndMaybeEndGame(teams, next), 0);
      return next;
    });
  };

  useEffect(() => {
    checkAndMaybeEndGame(teams, selectedCategories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories, teams]);

  const resetGame = () => {
    setCurrentScreen("start");
    setAllCategories(initialCategories);
    setSelectedCategories([]);
    setTeams(initialTeams);
    setCurrentQuestion(null);
    setTimerValue(30);
    setTimerRunning(false);
    setDoublePointsActive(false);
    setWinnerTeamIndex(null);
    setCurrentTurn(0);
  };

  const hardReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    resetGame();
  };

  // Restore
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      const saved: PersistedState = JSON.parse(raw);
      setCurrentScreen(saved.currentScreen);
      setAllCategories(saved.allCategories);
      setSelectedCategories(saved.selectedCategories);
      setTeams(saved.teams);
      setCurrentQuestion(saved.currentQuestion);
      setDoublePointsActive(saved.doublePointsActive);
      setCurrentTurn(saved.currentTurn ?? 0);

      const now = Date.now();
      let remaining = saved.timer.remaining;
      if (saved.timer.running) {
        const elapsed = Math.floor((now - saved.timer.lastSavedAt) / 1000);
        remaining = Math.max(0, remaining - elapsed);
      }
      setTimerValue(remaining);
      setTimerRunning(saved.timer.running && remaining > 0);
    } catch (e) {
      console.warn("Restore failed:", e);
    }
  }, []);

  // Persist (debounced)
  useEffect(() => {
    const id = setTimeout(() => {
      const payload: PersistedState = {
        currentScreen,
        allCategories,
        selectedCategories,
        teams,
        currentQuestion,
        doublePointsActive,
        timer: { running: timerRunning, remaining: timerValue, lastSavedAt: Date.now() },
        currentTurn,
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      } catch {}
    }, 250);
    return () => clearTimeout(id);
  }, [
    currentScreen,
    allCategories,
    selectedCategories,
    teams,
    currentQuestion,
    timerRunning,
    timerValue,
    doublePointsActive,
    currentTurn,
  ]);

  return (
    <GameContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        allCategories,
        setAllCategories,
        selectedCategories,
        setSelectedCategories,
        teams,
        setTeams,
        currentQuestion,
        setCurrentQuestion,
        timerValue,
        setTimerValue,
        timerRunning,
        setTimerRunning,
        doublePointsActive,
        setDoublePointsActive,
        updateTeamScore,
        useHelp,
        markQuestionUsed,
        currentTurn,
        nextTurn,
        winnerTeamIndex,
        resetGame,
        hardReset,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within a GameProvider");
  return ctx;
};
