import React, { useState } from "react";
import { useGame } from "@/contexts/GameContext";
import { RotateCcw } from "lucide-react";

interface AdminPanelProps {
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const {
    allCategories,
    setAllCategories,
    selectedCategories,
    setSelectedCategories,
    teams,
    setTeams,
    timerValue,
    setTimerValue,
    resetGame,   // لو ما تستخدمينه حالياً عادي نخليه
    hardReset,
  } = useGame();

  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [activeCatId, setActiveCatId] = useState<number | null>(
    allCategories.length ? allCategories[0].id : null
  );

  // --- Auth ---
  const handleLogin = () => {
    if (password === "PTI on top") setAuthed(true);
    else alert("كلمة المرور غير صحيحة");
  };

  if (!authed) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-lg p-6 w-[360px] space-y-4">
          <h2 className="text-center text-lg font-bold">دخول الأدمن</h2>
          <input
            type="password"
            className="w-full border rounded-md px-3 py-2"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-sky-600 hover:bg-sky-700 text-white rounded-md py-2 text-sm font-medium"
          >
            دخول
          </button>
          <button
            onClick={onClose}
            className="w-full text-center text-xs text-slate-500 hover:text-slate-700"
          >
            إغلاق
          </button>
        </div>
      </div>
    );
  }

  // --- Helpers ---
  const activeCategory =
    activeCatId !== null
      ? allCategories.find((c) => c.id === activeCatId) || null
      : null;

  const updateCategoryName = (id: number, name: string) => {
    setAllCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name } : c))
    );
  };

  const addCategory = () => {
    const newId = allCategories.length
      ? Math.max(...allCategories.map((c) => c.id)) + 1
      : 1;
    const newCat = { id: newId, name: "فئة جديدة", questions: [] as any[] };
    setAllCategories((prev) => [...prev, newCat]);
    setActiveCatId(newId);
  };

  const deleteCategory = (id: number) => {
    if (!window.confirm("متأكدة من حذف الفئة؟")) return;
    setAllCategories((prev) => prev.filter((c) => c.id !== id));
    setSelectedCategories((prev) => prev.filter((c) => c.id !== id));
    const remaining = allCategories.filter((c) => c.id !== id);
    setActiveCatId(remaining.length ? remaining[0].id : null);
  };

  const addQuestion = () => {
    if (!activeCatId) return;
    setAllCategories((prev) =>
      prev.map((cat) => {
        if (cat.id !== activeCatId) return cat;
        const newId = cat.questions.length
          ? Math.max(...cat.questions.map((q: any) => q.id)) + 1
          : 1;
        return {
          ...cat,
          questions: [
            ...cat.questions,
            {
              id: newId,
              value: 100,
              text: "سؤال جديد",
              answer: "",
              used: false,
            },
          ],
        };
      })
    );
  };

  const deleteQuestion = (qid: number) => {
    if (!activeCatId) return;
    setAllCategories((prev) =>
      prev.map((cat) =>
        cat.id === activeCatId
          ? { ...cat, questions: cat.questions.filter((q: any) => q.id !== qid) }
          : cat
      )
    );
  };

  const updateQuestion = (
    qid: number,
    field: "value" | "text" | "answer",
    value: string | number
  ) => {
    if (!activeCatId) return;
    setAllCategories((prev) =>
      prev.map((cat) =>
        cat.id === activeCatId
          ? {
              ...cat,
              questions: cat.questions.map((q: any) =>
                q.id === qid ? { ...q, [field]: value } : q
              ),
            }
          : cat
      )
    );
  };

  const resetQuestionsUsage = () => {
    setAllCategories((prev) =>
      prev.map((cat) => ({
        ...cat,
        questions: cat.questions.map((q: any) => ({ ...q, used: false })),
      }))
    );
    alert("تمت إعادة تعيين حالة الأسئلة");
  };

  // --- UI ---
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-[1100px] max-h-[85vh] overflow-y-auto p-6 space-y-8">
        {/* العنوان */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold">لوحة التحكم</h2>
          <button
            onClick={onClose}
            className="text-sm text-slate-500 hover:text-slate-800"
          >
            إغلاق ✕
          </button>
        </div>

        {/* الفرق */}
        <section className="space-y-3">
          <h3 className="font-semibold text-lg">الفرق</h3>
          {teams.map((team: any, i: number) => (
            <div key={i} className="flex gap-3 items-center">
              <input
                value={team.name}
                onChange={(e) => {
                  const copy = [...teams];
                  copy[i] = { ...copy[i], name: e.target.value };
                  setTeams(copy);
                }}
                className="flex-1 border rounded-md px-3 py-2"
              />
              <input
                type="number"
                value={team.score}
                onChange={(e) => {
                  const copy = [...teams];
                  copy[i] = {
                    ...copy[i],
                    score: Number(e.target.value) || 0,
                  };
                  setTeams(copy);
                }}
                className="w-28 border rounded-md px-3 py-2"
              />
            </div>
          ))}
        </section>

        {/* الفئات */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">الفئات</h3>
            <button
              onClick={addCategory}
              className="px-3 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-sm"
            >
              + فئة جديدة
            </button>
          </div>

          <div className="flex gap-2 flex-wrap">
            {allCategories.map((cat: any) => (
              <button
                key={cat.id}
                onClick={() => setActiveCatId(cat.id)}
                className={`px-3 py-1 rounded-full text-sm border ${
                  activeCatId === cat.id
                    ? "bg-sky-500 text-white border-sky-500"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {activeCategory && (
            <div className="bg-slate-50 border rounded-lg p-4 space-y-3">
              {/* اسم الفئة + حذفها */}
              <div className="flex items-center gap-3">
                <input
                    value={activeCategory.name}
                    onChange={(e) =>
                      updateCategoryName(activeCategory.id, e.target.value)
                    }
                    className="flex-1 border rounded-md px-3 py-2"
                  />
                <button
                  onClick={() => deleteCategory(activeCategory.id)}
                  className="text-red-500 text-sm"
                >
                  حذف
                </button>
              </div>

              {/* الأسئلة */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  عدد الأسئلة: {activeCategory.questions.length}
                </p>
                <button
                  onClick={addQuestion}
                  className="px-3 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-sm"
                >
                  + سؤال جديد
                </button>
              </div>

              <div className="space-y-2 max-h-52 overflow-y-auto">
                {activeCategory.questions.map((q: any) => (
                  <div
                    key={q.id}
                    className="flex gap-3 bg-white border rounded-md p-2 items-start"
                  >
                    <input
                      type="number"
                      value={q.value}
                      onChange={(e) =>
                        updateQuestion(
                          q.id,
                          "value",
                          Number(e.target.value) || 0
                        )
                      }
                      className="w-20 border rounded-md px-2 py-1"
                    />

                    <div className="flex-1 space-y-1">
                      <input
                        value={q.text}
                        onChange={(e) =>
                          updateQuestion(q.id, "text", e.target.value)
                        }
                        className="w-full border rounded-md px-2 py-1"
                        placeholder="نص السؤال"
                      />
                      <textarea
                        value={q.answer}
                        onChange={(e) =>
                          updateQuestion(q.id, "answer", e.target.value)
                        }
                        className="w-full border rounded-md px-2 py-1 text-sm"
                        rows={2}
                        placeholder="الإجابة (اختياري)"
                      />
                    </div>

                    <button
                      onClick={() => deleteQuestion(q.id)}
                      className="text-red-500 text-sm"
                    >
                      حذف
                    </button>
                  </div>
                ))}
                {activeCategory.questions.length === 0 && (
                  <p className="text-sm text-slate-500">
                    لا يوجد أسئلة لهذه الفئة.
                  </p>
                )}
              </div>
            </div>
          )}
        </section>

        {/* الإعدادات */}
        <section className="space-y-3">
          <h3 className="font-semibold text-lg">الإعدادات</h3>
          <div className="flex gap-3 items-center flex-wrap">
            <input
              type="number"
              value={timerValue}
              onChange={(e) => setTimerValue(Number(e.target.value) || 0)}
              className="w-28 border rounded-md px-3 py-2"
            />
            <span className="text-sm text-slate-500">ثانية</span>

            <button
              onClick={resetQuestionsUsage}
              className="px-3 py-1 rounded-md bg-slate-100 text-sm"
            >
              إعادة تعيين الأسئلة
            </button>

            <button
              onClick={hardReset}
              className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:opacity-90 text-white font-medium px-4 py-2 rounded-md flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              إعادة ضبط اللعبة
            </button>
          </div>
        </section>

        <button
          onClick={onClose}
          className="w-full py-2 rounded-md bg-sky-600 text-white font-medium"
        >
          حفظ وإغلاق
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;

