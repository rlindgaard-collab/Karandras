import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { Swords, ListChecks, Backpack, StickyNote, Shield } from "lucide-react";
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
  const [currentHP, setCurrentHP] = useState(characterData.hp);

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

          {/* Tabs – mobilvenlige */}
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

              {/* HP Slider */}
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-400">
                  Hit Points (HP)
                </label>
                <input
                  type="range"
                  min={0}
                  max={characterData.hp}
                  value={currentHP}
                  onChange={(e) => setCurrentHP(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
                <div className="flex justify-between mt-1 text-sm">
                  <span className="text-red-400">0</span>
                  <span className="text-emerald-300 font-semibold">
                    {currentHP} / {characterData.hp}
                  </span>
                </div>
              </div>

              {/* AC + Saves */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg border border-gray-800 bg-gray-950/40">
                  <p className="text-gray-400 text-sm">Armor Class (AC)</p>
                  <p className="text-2xl font-bold text-emerald-400">
                    {characterData.ac}
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-gray-800 bg-gray-950/40">
                  <p className="text-gray-400 text-sm mb-1">Saves</p>
                  <p className="text-sm">
                    <span className="text-emerald-400 font-medium">Fort:</span>{" "}
                    {characterData.saves.fort}
                  </p>
                  <p className="text-sm">
                    <span className="text-emerald-400 font-medium">Ref:</span>{" "}
                    {characterData.saves.ref}
                  </p>
                  <p className="text-sm">
                    <span className="text-emerald-400 font-medium">Will:</span>{" "}
                    {characterData.saves.will}
                  </p>
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
