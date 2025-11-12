import React, { useMemo } from "react";
import { useGame } from "@/contexts/GameContext";
import { Button } from "@/components/ui/button";

const CategorySelection: React.FC = () => {
  const {
    allCategories,
    selectedCategories,
    setSelectedCategories,
    teams,
    setTeams,
    setCurrentScreen,
  } = useGame();

  // هل مختارة 6 بالضبط؟
  const canStart = selectedCategories.length === 6;

  // اختيار/إلغاء اختيار فئة (حتى 6 فقط)
  const toggleCategory = (catId: number) => {
    const isSelected = selectedCategories.some((c) => c.id === catId);
    if (isSelected) {
      setSelectedCategories(selectedCategories.filter((c) => c.id !== catId));
    } else {
      if (selectedCategories.length >= 6) return; // لا تتعدى 6
      const cat = allCategories.find((c) => c.id === catId);
      if (cat) setSelectedCategories([...selectedCategories, cat]);
    }
  };

  // شبكة فئات مرنة:
  // sm: 2 أعمدة، md: 3، lg: 4، xl: 5 (هذا يلبي شرط 18 => 5x4 تقريباً)
  const gridClasses =
    "grid gap-4 justify-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";

  // للمساعدة: ids المختارة
  const selectedIds = useMemo(
    () => new Set(selectedCategories.map((c) => c.id)),
    [selectedCategories]
  );

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto p-6">
        {/* العنوان */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10">
          اختر 6 فئات للعبة
        </h1>

        {/* شبكة الفئات */}
        <div className={gridClasses}>
          {allCategories.map((category) => {
            const active = selectedIds.has(category.id);
            return (
              <button
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                className={[
                  "px-6 py-4 rounded-xl font-bold text-lg transition duration-300 transform",
                  "min-w-[180px] text-center shadow-sm hover:shadow-md",
                  active
                    ? "bg-accent text-white shadow-glow scale-105"
                     : "bg-white/70 border border-accent/20 text-foreground/80 hover:bg-accent/10 hover:scale-105 backdrop-blur-sm",
                ].join(" ")}

              >
                {category.image ? <img src={category.image} alt="" className="mx-auto mb-2 h-16 object-contain" /> : null}{category.name}
              </button>
            );
          })}
        </div>

        {/* أسماء الفرق */}
        <div className="mt-12 space-y-4">
          <h2 className="text-2xl font-bold text-center mb-4">أسماء الفرق</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teams.map((team, i) => (
              <div key={i} className="bg-transparent p-0">
                <label className="block text-sm text-foreground/70 mb-2">
                  {i === 0 ? "الفريق الأول" : "الفريق الثاني"}
                </label>
                <input
                  className="w-full rounded-xl border border-accent/30 bg-white/80 px-4 py-3 outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
                  value={team.name}
                  onChange={(e) => {
                    const copy = [...teams];
                    copy[i] = { ...copy[i], name: e.target.value };
                    setTeams(copy);
                  }}
                  placeholder={i === 0 ? "الفريق 1" : "الفريق 2"}
                />
              </div>
            ))}
          </div>
        </div>

        {/* زر البدء */}
        <div className="mt-10 flex items-center justify-center">
          <Button
            disabled={!canStart}
            onClick={() => setCurrentScreen("game-board")}
            className="px-12 py-6 text-xl font-bold bg-gradient-to-r from-[#F2880E] via-[#D4AE53] to-[#357738] text-white rounded-2xl hover:opacity-90 disabled:opacity-50 transition shadow-glow"
          >
            ابدأ اللعب ({selectedCategories.length}/6)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategorySelection;
