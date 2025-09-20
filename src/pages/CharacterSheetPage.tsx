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
type Mode = "damage" | "healing";

export default function CharacterSheetPage() {
  const [activeTab, setActiveTab] = useState<TabId>("battle");

  // HP state
  const [currentHP, setCurrentHP] = useState(characterData.hp);
  const [changeAmount, setChangeAmount] = useState<number>(0);
  const [mode, setMode] = useState<Mode>("damage");

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
        <CardContent className="min-h-[300px] sm:min-h-[400px] text-gray-300 text-sm sm:text-base leading-relaxed space-y-4">
          {activeTab === "battle" && (
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-emerald-400 mb-4">
                Battle
              </h2>

              {/* HP Controls */}
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-400">
                  Hit Points (HP)
                </label>

                {/* Slider */}
                <input
                  type="range"
                  min={0}
                  max={characterData.hp}
                  value={currentHP}
                  onChange={(e) => setCurrentHP(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />

                {/* Display */}
                <div className="text-center mt-2 text-sm text-emerald-300 font-semibold">
                  {currentHP} / {characterData.hp}
                </div>

                {/* Input + Controls */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-3">
                  {/* Number input */}
                  <input
                    type="number"
                    value={changeAmount}
                    onChange={(e) => setChangeAmount(Number(e.target.value))}
                    className="w-28 text-center bg-gray-900 border border-gray-700 rounded text-emerald-300 px-2 py-1"
                    placeholder="0"
                  />

                  {/* Toggle */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setMode("damage")}
                      className={`px-3 py-1 rounded ${
                        mode === "damage"
                          ? "bg-red-700 text-white"
                          : "bg-gray-800 text-gray-400"
                      }`}
                    >
                      Damage
                    </button>
                    <button
                      onClick={() => setMode("healing")}
                      className={`px-3 py-1 rounded ${
                        mode === "healing"
                          ? "bg-emerald-700 text-white"
                          : "bg-gray-800 text-gray-400"
                      }`}
                    >
                      Heal
                    </button>
                  </div>

                  {/* Apply */}
                  <button
                    onClick={() => {
                      if (mode === "damage") {
                        setCurrentHP((hp) => Math.max(0, hp - changeAmount));
                      } else {
                        setCurrentHP((hp) =>
                          Math.min(characterData.hp, hp + changeAmount)
                        );
                      }
                      setChangeAmount(0);
                    }}
                    className="px-4 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded shadow"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* AC and Saves */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-3 border border-gray-800 rounded-lg bg-gray-950/40">
                  <div className="text-xs uppercase text-gray-400">AC</div>
                  <div className="text-lg font-semibold text-emerald-300">
                    {characterData.ac}
                  </div>
                </div>
                <div className="p-3 border border-gray-800 rounded-lg bg-gray-950/40">
                  <div className="text-xs uppercase text-gray-400">Fort</div>
                  <div className="text-lg font-semibold text-emerald-300">
                    {characterData.saves.fort}
                  </div>
                </div>
                <div className="p-3 border border-gray-800 rounded-lg bg-gray-950/40">
                  <div className="text-xs uppercase text-gray-400">Ref</div>
                  <div className="text-lg font-semibold text-emerald-300">
                    {characterData.saves.ref}
                  </div>
                </div>
                <div className="p-3 border border-gray-800 rounded-lg bg-gray-950/40">
                  <div className="text-xs uppercase text-gray-400">Will</div>
                  <div className="text-lg font-semibold text-emerald-300">
                    {characterData.saves.will}
                  </div>
                </div>
              </div>
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
