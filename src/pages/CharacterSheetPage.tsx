import { useState } from "react";
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

  // HP state
  const [currentHP, setCurrentHP] = useState(characterData.hp);
  const [inputValue, setInputValue] = useState<number>(0);
  const [mode, setMode] = useState<"damage" | "heal">("damage");

  // Saves state
  const [lastRoll, setLastRoll] = useState<string>("");

  const handleHPChange = () => {
    if (mode === "damage") {
      setCurrentHP((prev) => Math.max(0, prev - inputValue));
    } else {
      setCurrentHP((prev) => Math.min(characterData.hp, prev + inputValue));
    }
    setInputValue(0);
  };

  const rollSave = (type: "fort" | "ref" | "will") => {
    const d20 = Math.floor(Math.random() * 20) + 1;
    const modifier = characterData.saves[type];
    const total = d20 + modifier;
    setLastRoll(
      `${type.toUpperCase()} Save: ${d20} (d20) + ${modifier} (modifier) = ${total}`
    );
    return total;
  };

  const [fortResult, setFortResult] = useState<number | null>(null);
  const [refResult, setRefResult] = useState<number | null>(null);
  const [willResult, setWillResult] = useState<number | null>(null);

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
          {activeTab === "battle" && (
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
                Battle
              </h2>

              {/* HP tracker */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Hit Points (HP)
                </label>
                <input
                  type="range"
                  min="0"
                  max={characterData.hp}
                  value={currentHP}
                  onChange={(e) => setCurrentHP(Number(e.target.value))}
                  className="w-full accent-emerald-400"
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-emerald-300 font-semibold">
                    {currentHP} / {characterData.hp}
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={inputValue}
                      onChange={(e) => setInputValue(Number(e.target.value))}
                      className="w-20 px-2 py-1 rounded bg-gray-800 border border-gray-700 text-gray-200 text-sm"
                      placeholder="0"
                    />
                    <select
                      value={mode}
                      onChange={(e) => setMode(e.target.value as "damage" | "heal")}
                      className="px-2 py-1 rounded bg-gray-800 border border-gray-700 text-gray-200 text-sm"
                    >
                      <option value="damage">Damage</option>
                      <option value="heal">Heal</option>
                    </select>
                    <button
                      onClick={handleHPChange}
                      className="px-3 py-1 bg-emerald-700 hover:bg-emerald-600 rounded text-sm font-medium"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>

              {/* AC + Saves */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded bg-gray-800/60 border border-gray-700 text-center">
                  <span className="block text-xs text-gray-400">AC</span>
                  <span className="text-lg font-semibold text-emerald-300">
                    {characterData.ac}
                  </span>
                </div>

                <button
                  onClick={() => setFortResult(rollSave("fort"))}
                  className="p-3 rounded bg-gray-800/60 border border-gray-700 text-center hover:bg-emerald-900/40 transition"
                >
                  <span className="block text-xs text-gray-400">Fort</span>
                  <span className="text-lg font-semibold text-emerald-300">
                    {fortResult ?? characterData.saves.fort}
                  </span>
                </button>

                <button
                  onClick={() => setRefResult(rollSave("ref"))}
                  className="p-3 rounded bg-gray-800/60 border border-gray-700 text-center hover:bg-emerald-900/40 transition"
                >
                  <span className="block text-xs text-gray-400">Ref</span>
                  <span className="text-lg font-semibold text-emerald-300">
                    {refResult ?? characterData.saves.ref}
                  </span>
                </button>

                <button
                  onClick={() => setWillResult(rollSave("will"))}
                  className="p-3 rounded bg-gray-800/60 border border-gray-700 text-center hover:bg-emerald-900/40 transition"
                >
                  <span className="block text-xs text-gray-400">Will</span>
                  <span className="text-lg font-semibold text-emerald-300">
                    {willResult ?? characterData.saves.will}
                  </span>
                </button>
              </div>

              {/* Last roll details */}
              {lastRoll && (
                <div className="mt-4 text-sm text-gray-400">
                  <p>{lastRoll}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "skills" && (
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-3">
                Skills
              </h2>
              <p>Her kan vi vise færdigheder, modifiers og lign.</p>
            </div>
          )}

          {activeTab === "gear" && (
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-3">
                Gear
              </h2>
              <p>Her kan vi vise alt udstyr fra characterData.gear.</p>
            </div>
          )}

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
