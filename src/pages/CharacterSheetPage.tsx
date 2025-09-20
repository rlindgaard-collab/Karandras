import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { Swords, ListChecks, Backpack, StickyNote } from "lucide-react";
import { Link } from "react-router-dom";

const tabs = [
  { id: "battle", label: "Battle", icon: Swords },
  { id: "skills", label: "Skills", icon: ListChecks },
  { id: "gear", label: "Gear", icon: Backpack },
  { id: "notes", label: "Notes", icon: StickyNote },
] as const;

type TabId = typeof tabs[number]["id"];

export default function CharacterSheetPage() {
  const [activeTab, setActiveTab] = useState<TabId>("battle");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-200 p-6">
      <Card className="max-w-4xl w-full border-emerald-900/40 bg-gray-900/90 backdrop-blur">
        {/* Header med faner */}
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2 text-emerald-400">
              Character Sheet
            </CardTitle>
            <Link to="/" className="text-sm text-emerald-400 hover:underline">
              ← Back
            </Link>
          </div>

          {/* Tabs */}
          <div className="mt-4 flex gap-2 border-b border-gray-700">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-all ${
                    isActive
                      ? "bg-emerald-800/40 text-emerald-300 border-b-2 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                      : "text-gray-400 hover:text-emerald-300"
                  }`}
                >
                  <Icon className="h-4 w-4" /> {tab.label}
                </button>
              );
            })}
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="min-h-[400px] text-gray-300">
          {activeTab === "battle" && (
            <div>
              <h2 className="text-xl font-semibold text-emerald-400 mb-3">
                Battle
              </h2>
              <p>Her kan vi vise AC, HP, Saves, våben mv.</p>
            </div>
          )}
          {activeTab === "skills" && (
            <div>
              <h2 className="text-xl font-semibold text-emerald-400 mb-3">
                Skills
              </h2>
              <p>Her kan vi vise færdigheder, modifiers og lign.</p>
            </div>
          )}
          {activeTab === "gear" && (
            <div>
              <h2 className="text-xl font-semibold text-emerald-400 mb-3">
                Gear
              </h2>
              <p>Her kan vi vise alt udstyr fra characterData.gear.</p>
            </div>
          )}
          {activeTab === "notes" && (
            <div>
              <h2 className="text-xl font-semibold text-emerald-400 mb-3">
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
