import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { Swords, ListChecks, Backpack, StickyNote } from "lucide-react";
import { Link } from "react-router-dom";
import { characterData } from "../data/characterData";

const tabs = [
  { id: "battle", label: "Battle", icon: Swords },
  { id: "skills", label: "Skills", icon: ListChecks },
  { id: "gear", label: "Gear", icon: Backpack },
  { id: "notes", label: "Notes", icon: StickyNote },
] as const;

type TabId = typeof tabs[number]["id"];

export default function CharacterSheetPage() {
  const [activeTab, setActiveTab] = useState<TabId>("battle");

  // HP state with localStorage
  const [currentHp, setCurrentHp] = useState<number>(() => {
    const saved = localStorage.getItem("currentHp");
    return saved ? parseInt(saved) : characterData.hp;
  });
  const [changeValue, setChangeValue] = useState<number>(0);
  const [mode, setMode] = useState<"damage" | "heal">("damage");

  // Saves state
  const [fortResult, setFortResult] = useState<number | null>(null);
  const [refResult, setRefResult] = useState<number | null>(null);
  const [willResult, setWillResult] = useState<number | null>(null);
  const [initiativeResult, setInitiativeResult] = useState<number | null>(null);
  const [lastRoll, setLastRoll] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("currentHp", currentHp.toString());
  }, [currentHp]);

  const applyChange = () => {
    if (mode === "damage") {
      setCurrentHp((hp) => Math.max(0, hp - changeValue));
    } else {
      setCurrentHp((hp) => Math.min(characterData.hp, hp + changeValue));
    }
    setChangeValue(0);
  };

  const rollCheck = (
    type: "fort" | "ref" | "will" | "initiative",
    current: number | null,
    setResult: React.Dispatch<React.SetStateAction<number | null>>,
    modifier: number
  ) => {
    if (current !== null) {
      // Reset
      setResult(null);
      setLastRoll("");
      return;
    }

    const d20 = Math.floor(Math.random() * 20) + 1;
    const total = d20 + modifier;
    setResult(total);
    setLastRoll(
      `${type.charAt(0).toUpperCase() + type.slice(1)}: ${d20} (d20) + ${modifier} (modifier) = ${total}`
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-200 p-4 sm:p-6">
      <Card className="w-full max-w-4xl border-emerald-900/40 bg-gray-900/90 backdrop-blur rounded-xl shadow-lg">
        {/* Header */}
        <CardHeader>
          <div className="flex justify-between items-center flex-wrap gap-2">
            <CardTitle className="flex items-center gap-2 text-emerald-400 text-lg sm:text-xl">
              Character Sheet
            </CardTitle>
            <Link
              to="/"
              className="text-sm text-emerald-400 hover:underline whitespace-nowrap"
            >
              ← Back
            </Link>
          </div>

          {/* Tabs */}
          <div className="mt-4 flex gap-2 border-b border-gray-700 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-sm sm:text-base font-medium rounded-t-lg transition-all flex-shrink-0 ${
                    isActive
                      ? "bg-emerald-800/40 text-emerald-300 border-b-2 border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                      : "text-gray-400 hover:text-emerald-300"
                  }`}
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" /> {tab.label}
                </button>
              );
            })}
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="min-h-[300px] sm:min-h-[400px] text-gray-300 text-sm sm:text-base leading-relaxed space-y-6">
          {/* BATTLE TAB */}
          {activeTab === "battle" && (
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
                Battle
              </h2>

              {/* AC + Speed */}
              <div className="mb-6 p-3 rounded bg-gray-800/60 border border-gray-700 text-center">
                <span className="block text-xs text-gray-400">AC</span>
                <span className="text-lg font-semibold text-emerald-300">
                  {characterData.ac}
                </span>
                <span className="block text-xs text-gray-400 mt-1">
                  Speed: {characterData.speed} ft
                </span>
              </div>

              {/* HP Slider + controls */}
              <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-2">
                  Hit Points
                </label>
                <input
                  type="range"
                  min={0}
                  max={characterData.hp}
                  value={currentHp}
                  onChange={(e) => setCurrentHp(parseInt(e.target.value))}
                  className="w-full accent-emerald-500"
                />
                <div className="flex justify-between items-center mt-2 text-sm">
                  <span>
                    {currentHp} / {characterData.hp}
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={changeValue}
                      onChange={(e) => setChangeValue(Number(e.target.value))}
                      className="w-20 rounded bg-gray-800 border border-gray-700 p-1 text-center text-gray-200"
                    />
                    <select
                      value={mode}
                      onChange={(e) =>
                        setMode(e.target.value as "damage" | "heal")
                      }
                      className="rounded bg-gray-800 border border-gray-700 p-1 text-gray-200"
                    >
                      <option value="damage">Damage</option>
                      <option value="heal">Heal</option>
                    </select>
                    <button
                      onClick={applyChange}
                      className="px-3 py-1 rounded bg-emerald-700 hover:bg-emerald-600 text-sm font-medium"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>

              {/* Saves + Initiative */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* Fort Save */}
                <button
                  onClick={() =>
                    rollCheck("fort", fortResult, setFortResult, characterData.saves.fort)
                  }
                  className={`p-3 rounded border text-center transition-all ${
                    fortResult !== null
                      ? "bg-emerald-900/60 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.8)]"
                      : "bg-gray-800/60 border-gray-700 hover:bg-emerald-900/40"
                  }`}
                >
                  <span className="block text-xs text-gray-400">Fort</span>
                  <span className="text-lg font-semibold text-emerald-300">
                    {fortResult ?? characterData.saves.fort}
                  </span>
                </button>

                {/* Ref Save */}
                <button
                  onClick={() =>
                    rollCheck("ref", refResult, setRefResult, characterData.saves.ref)
                  }
                  className={`p-3 rounded border text-center transition-all ${
                    refResult !== null
                      ? "bg-emerald-900/60 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.8)]"
                      : "bg-gray-800/60 border-gray-700 hover:bg-emerald-900/40"
                  }`}
                >
                  <span className="block text-xs text-gray-400">Ref</span>
                  <span className="text-lg font-semibold text-emerald-300">
                    {refResult ?? characterData.saves.ref}
                  </span>
                </button>

                {/* Will Save */}
                <button
                  onClick={() =>
                    rollCheck("will", willResult, setWillResult, characterData.saves.will)
                  }
                  className={`p-3 rounded border text-center transition-all ${
                    willResult !== null
                      ? "bg-emerald-900/60 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.8)]"
                      : "bg-gray-800/60 border-gray-700 hover:bg-emerald-900/40"
                  }`}
                >
                  <span className="block text-xs text-gray-400">Will</span>
                  <span className="text-lg font-semibold text-emerald-300">
                    {willResult ?? characterData.saves.will}
                  </span>
                </button>

                {/* Initiative */}
                <button
                  onClick={() =>
                    rollCheck("initiative", initiativeResult, setInitiativeResult, characterData.initiative)
                  }
                  className={`p-3 rounded border text-center transition-all ${
                    initiativeResult !== null
                      ? "bg-emerald-900/60 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.8)]"
                      : "bg-gray-800/60 border-gray-700 hover:bg-emerald-900/40"
                  }`}
                >
                  <span className="block text-xs text-gray-400">Init</span>
                  <span className="text-lg font-semibold text-emerald-300">
                    {initiativeResult ?? characterData.initiative}
                  </span>
                </button>
              </div>

              {/* Roll details */}
              {lastRoll && (
                <div className="mt-4 text-sm text-gray-400">{lastRoll}</div>
              )}
            </div>
          )}

          {/* SKILLS TAB */}
          {activeTab === "skills" && (
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-3">
                Skills
              </h2>
              <p>Her kan vi vise færdigheder, modifiers og lign.</p>
            </div>
          )}

          {/* GEAR TAB */}
          {activeTab === "gear" && (
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-3">
                Gear
              </h2>
              <ul className="list-disc list-inside space-y-1">
                {characterData.gear.map((g, i) => (
                  <li key={i}>{g}</li>
                ))}
              </ul>
            </div>
          )}

          {/* NOTES TAB */}
          {activeTab === "notes" && (
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-3">
                Notes
              </h2>
              <p>Her kan du skrive kampagnenotater eller ting du vil huske.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
