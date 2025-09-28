import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { Swords, ListChecks, Backpack, StickyNote, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { characterData } from "../data/characterData";

const tabs = [
  { id: "battle", label: "Battle", icon: Swords },
  { id: "skills", label: "Skills", icon: ListChecks },
  { id: "gear", label: "Gear", icon: Backpack },
  { id: "notes", label: "Notes", icon: StickyNote },
] as const;

type TabId = typeof tabs[number]["id"];
type RollResult = { d20: number; total: number };
type BreakdownLine = { text: string; type?: string };

export default function CharacterSheetPage() {
  const [activeTab, setActiveTab] = useState<TabId>("battle");

  // HP state
  const [currentHp, setCurrentHp] = useState<number>(() => {
    const saved = localStorage.getItem("currentHp");
    return saved ? parseInt(saved, 10) : characterData.hp;
  });
  const [pendingHp, setPendingHp] = useState<number | null>(null);

  // Saves & Initiative
  const [fortResult, setFortResult] = useState<RollResult | null>(null);
  const [refResult, setRefResult] = useState<RollResult | null>(null);
  const [willResult, setWillResult] = useState<RollResult | null>(null);
  const [initiativeResult, setInitiativeResult] = useState<RollResult | null>(null);
  const [lastRoll, setLastRoll] = useState<string>("");

  // Tooltip
  const [tooltip, setTooltip] = useState<{ from: "fort" | "ref" | "will"; text: string } | null>(
    null
  );

  // Attack state
  const [attackCount, setAttackCount] = useState(1);
  const [attackResult, setAttackResult] = useState<RollResult | null>(null);
  const [attackLog, setAttackLog] = useState<string>("");

  // Damage state
  const [damageResult, setDamageResult] = useState<number | null>(null);
  const [damageBreakdown, setDamageBreakdown] = useState<BreakdownLine[]>([]);

  // Weapon state med localStorage support
  const [activeWeaponIndex, setActiveWeaponIndex] = useState(() => {
    const saved = localStorage.getItem("activeWeaponIndex");
    return saved ? parseInt(saved, 10) : characterData.defaultWeaponIndex;
  });

  const activeWeapon = characterData.weapons[activeWeaponIndex];

  useEffect(() => {
    localStorage.setItem("activeWeaponIndex", activeWeaponIndex.toString());
  }, [activeWeaponIndex]);

  useEffect(() => {
    localStorage.setItem("currentHp", currentHp.toString());
  }, [currentHp]);

  const applyChange = () => {
    if (pendingHp !== null) {
      setCurrentHp(pendingHp);
      setPendingHp(null);
    }
  };

  const effectiveHp = pendingHp !== null ? pendingHp : currentHp;
  const diff = pendingHp !== null ? pendingHp - currentHp : 0;

  // Save/init rul
  const rollCheck = (
    type: "fort" | "ref" | "will" | "initiative",
    current: RollResult | null,
    setResult: React.Dispatch<React.SetStateAction<RollResult | null>>,
    modifier: number
  ) => {
    if (current !== null) {
      setResult(null);
      setLastRoll("");
      return;
    }

    const d20 = Math.floor(Math.random() * 20) + 1;
    const total = d20 + modifier;
    setResult({ d20, total });

    setLastRoll(
      `${type.toUpperCase()} Check\n` +
        `d20 Roll: ${d20}\n` +
        `Modifier: ${modifier >= 0 ? `+${modifier}` : modifier}\n` +
        `-----------------\n` +
        `Total: ${total}`
    );
  };

  // Attack rul
  const rollAttack = () => {
    if (!activeWeapon) return;

    if (attackResult) {
      setAttackResult(null);
      setAttackCount((prev) => prev + 1);
      setDamageResult(null);
      setDamageBreakdown([]);
      return;
    }

    const step = attackCount > 3 ? 3 : attackCount;
    const { toHit, damageBonus } = activeWeapon.attacks[step as 1 | 2 | 3];
    const d20 = Math.floor(Math.random() * 20) + 1;
    const total = d20 + toHit;

    setAttackResult({ d20, total });

    setAttackLog(
      `Attack ${attackCount}\n` +
        `d20 Roll: ${d20}\n` +
        `To-Hit Bonus: ${toHit >= 0 ? `+${toHit}` : toHit}\n` +
        `-----------------\n` +
        `Total: ${total}`
    );

    // Damage rul
    let totalDmg = damageBonus;
    const breakdownLines: BreakdownLine[] = [];

    activeWeapon.damage.dice.forEach((dieDef) => {
      const rolls: number[] = [];
      for (let i = 0; i < dieDef.count; i++) {
        const roll = Math.floor(Math.random() * dieDef.die) + 1;
        rolls.push(roll);
        totalDmg += roll;
      }
      breakdownLines.push({
        text: `${dieDef.count}d${dieDef.die} (${dieDef.type}): [${rolls.join(", ")}]`,
        type: dieDef.type,
      });
    });

    breakdownLines.push({ text: `Damage Bonus: +${damageBonus}` });
    breakdownLines.push({ text: `-----------------` });
    breakdownLines.push({ text: `Total Damage: ${totalDmg}` });

    setDamageResult(totalDmg);
    setDamageBreakdown(breakdownLines);
  };

  const resetAttack = () => {
    setAttackCount(1);
    setAttackResult(null);
    setAttackLog("");
    setDamageResult(null);
    setDamageBreakdown([]);
  };

  // Save button
  const SaveButton = ({
    label,
    result,
    setResult,
    data,
  }: {
    label: "fort" | "ref" | "will";
    result: RollResult | null;
    setResult: React.Dispatch<React.SetStateAction<RollResult | null>>;
    data: { value: number; improved: boolean; note: string };
  }) => {
    let classes =
      "w-full p-3 rounded border text-center transition-all bg-gray-800/60 border-gray-700 hover:bg-emerald-900/40";

    if (result) {
      if (result.d20 === 1) {
        classes =
          "w-full p-3 rounded border text-center transition-all bg-red-900/60 border-red-400";
      } else {
        classes =
          "w-full p-3 rounded border text-center transition-all bg-emerald-900/60 border-emerald-400";
      }
    }

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => rollCheck(label, result, setResult, data.value)}
          className={classes}
        >
          <span className="block text-xs text-gray-400">
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </span>
          <span
            className={`text-lg font-semibold ${
              result?.d20 === 1 ? "text-red-300" : "text-emerald-300"
            }`}
          >
            {result ? result.total : data.value}
          </span>
        </button>
        {data.improved && (
          <span
            onClick={() =>
              setTooltip(tooltip?.from === label ? null : { from: label, text: data.note })
            }
            className="absolute -top-2 -right-2 text-emerald-400 cursor-pointer text-lg"
          >
            Λ
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-200 p-4 sm:p-6">
      <Card className="w-full max-w-4xl border-emerald-900/40 bg-gray-900/90 backdrop-blur rounded-xl shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center flex-wrap gap-2">
            <CardTitle className="flex items-center gap-2 text-emerald-400 text-lg sm:text-xl">
              Character Sheet
            </CardTitle>
            <Link to="/" className="text-sm text-emerald-400 hover:underline whitespace-nowrap">
              ← Back
            </Link>
          </div>
          <div className="mt-4 flex gap-2 border-b border-gray-700 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-sm sm:text-base font-medium rounded-t-lg transition-all flex-shrink-0 ${
                    isActive
                      ? "bg-emerald-800/40 text-emerald-300 border-b-2 border-emerald-400"
                      : "text-gray-400 hover:text-emerald-300"
                  }`}
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" /> {tab.label}
                </button>
              );
            })}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {activeTab === "battle" && (
            <div>
              {/* AC + Speed */}
              <div className="mb-6 p-3 rounded bg-gray-800/60 border border-gray-700 text-center">
                <span className="block text-xs text-gray-400">AC</span>
                <span className="text-lg font-semibold text-emerald-300">{characterData.ac}</span>
                <span className="block text-xs text-gray-400 mt-1">
                  Speed: {characterData.speed} ft
                </span>
              </div>

              {/* HP Slider */}
              <div className="mb-6 relative">
                <label className="block text-sm text-gray-400 mb-2">Hit Points</label>
                {diff !== 0 && (
                  <div
                    className={`absolute -top-6 left-1/2 -translate-x-1/2 text-sm font-bold animate-pulse ${
                      diff > 0 ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {diff > 0 ? `+${diff}` : diff}
                  </div>
                )}
                <input
                  type="range"
                  min={0}
                  max={characterData.hp}
                  value={effectiveHp}
                  onChange={(e) => setPendingHp(parseInt(e.target.value, 10))}
                  className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(
                      to right,
                      ${
                        diff > 0
                          ? "rgba(16,185,129,0.7)"
                          : diff < 0
                          ? "rgba(239,68,68,0.7)"
                          : "rgba(16,185,129,0.5)"
                      } ${(effectiveHp / characterData.hp) * 100}%,
                      rgba(31,41,55,0.8) ${(effectiveHp / characterData.hp) * 100}%
                    )`,
                  }}
                />
                <div className="flex justify-between items-center mt-2 text-sm">
                  <span>
                    {effectiveHp} / {characterData.hp}
                  </span>
                  {pendingHp !== null && (
                    <button
                      type="button"
                      onClick={applyChange}
                      className="ml-4 px-3 py-1 rounded bg-emerald-700 hover:bg-emerald-600 text-sm font-medium"
                    >
                      Apply
                    </button>
                  )}
                </div>
              </div>

              {/* Saves + Initiative */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <SaveButton
                  label="fort"
                  result={fortResult}
                  setResult={setFortResult}
                  data={characterData.saves.fort}
                />
                <SaveButton
                  label="ref"
                  result={refResult}
                  setResult={setRefResult}
                  data={characterData.saves.ref}
                />
                <SaveButton
                  label="will"
                  result={willResult}
                  setResult={setWillResult}
                  data={characterData.saves.will}
                />
                <button
                  type="button"
                  onClick={() =>
                    rollCheck(
                      "initiative",
                      initiativeResult,
                      setInitiativeResult,
                      characterData.initiative
                    )
                  }
                  className={`p-3 rounded border text-center ${
                    initiativeResult
                      ? initiativeResult.d20 === 1
                        ? "bg-red-900/60 border-red-400"
                        : "bg-emerald-900/60 border-emerald-400"
                      : "bg-gray-800/60 border-gray-700 hover:bg-emerald-900/40"
                  }`}
                >
                  <span className="block text-xs text-gray-400">Init</span>
                  <span
                    className={`text-lg font-semibold ${
                      initiativeResult?.d20 === 1 ? "text-red-300" : "text-emerald-300"
                    }`}
                  >
                    {initiativeResult ? initiativeResult.total : characterData.initiative}
                  </span>
                </button>
              </div>

              {/* Weapon selector */}
              <div className="mt-6 flex gap-2">
                {characterData.weapons.map((w, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveWeaponIndex(idx)}
                    className={`flex-1 px-3 py-2 rounded text-sm font-medium border transition-all ${
                      idx === activeWeaponIndex
                        ? "bg-emerald-700 text-white border-emerald-400 shadow"
                        : "bg-gray-800/60 text-gray-300 border-gray-700 hover:bg-emerald-800/40 hover:text-emerald-300"
                    }`}
                  >
                    {w.name}
                  </button>
                ))}
              </div>

              {/* Attack Knapsystem */}
              <div className="relative mt-6">
                <button
                  type="button"
                  onClick={rollAttack}
                  className={`w-full p-3 rounded border text-center ${
                    attackResult
                      ? attackResult.d20 === 1
                        ? "bg-red-900/60 border-red-400"
                        : "bg-emerald-900/60 border-emerald-400"
                      : "bg-gray-800/60 border-gray-700 hover:bg-emerald-900/40"
                  }`}
                >
                  <span className="block text-xs text-gray-400">Attack {attackCount}</span>
                  <span className="text-lg font-semibold text-emerald-300">
                    {attackResult
                      ? `AC ${attackResult.total}`
                      : (() => {
                          const step = attackCount > 3 ? 3 : attackCount;
                          return `+${activeWeapon.attacks[step as 1 | 2 | 3].toHit}`;
                        })()}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={resetAttack}
                  className="absolute top-2 right-2 p-1 rounded-full bg-gray-700 hover:bg-gray-600 border border-gray-500"
                >
                  <RotateCcw className="w-4 h-4 text-gray-300" />
                </button>
              </div>

              {attackLog && (
                <pre className="mt-2 text-sm text-gray-400 whitespace-pre-line">{attackLog}</pre>
              )}

              {/* Damage Box */}
              <div className="mt-4 space-y-2">
                <div className="w-full p-3 rounded border text-center bg-gray-800/60 border-gray-700 shadow">
                  <span className="block text-xs text-gray-400">Damage</span>

                  {damageResult !== null ? (
                    <>
                      <span className="text-2xl font-bold text-emerald-300">
                        {damageResult}
                      </span>
                      <span className="block text-xs text-gray-400 mt-1">
                        Using {activeWeapon.name}
                      </span>
                      <span className="block text-xs text-emerald-400 mt-1">
                        Damage Type: {activeWeapon.damage.type}
                      </span>
                    </>
                  ) : (
                    <span className="text-lg font-semibold text-emerald-400">
                      {activeWeapon.name}
                    </span>
                  )}
                </div>

                {damageResult !== null && (
                  <div className="text-sm space-y-1">
                    {damageBreakdown.map((line, idx) => {
                      let color = "text-gray-300";
                      if (line.type === "Slashing") color = "text-red-400";
                      if (line.type === "Piercing") color = "text-yellow-400";
                      if (line.type === "Spirit") color = "text-purple-400";
                      if (line.type === "Mental") color = "text-blue-400";
                      if (line.type === "Fire") color = "text-orange-400";

                      return (
                        <div key={idx} className={color}>
                          {line.text}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {tooltip && (
                <div className="mt-4 p-3 rounded bg-gray-800/90 border border-emerald-500 text-sm text-emerald-200 shadow-lg">
                  {tooltip.text}
                </div>
              )}

              {lastRoll && (
                <pre className="mt-4 text-sm text-gray-400 whitespace-pre-line" aria-live="polite">
                  {lastRoll}
                </pre>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
