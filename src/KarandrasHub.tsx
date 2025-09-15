import React, { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./components/Card";
import { Shield, Sword, Backpack, ScrollText } from "lucide-react";

const portraitUrl = "https://placehold.co/360x360/png?text=Karandras";

const characterData = {
  name: "Karandras",
  ancestry: "Half-elf",
  class: "Ranger",
  stats: [
    { key: "STR", label: "Strength", value: 14 },
    { key: "DEX", label: "Dexterity", value: 18 },
    { key: "CON", label: "Constitution", value: 14 },
    { key: "INT", label: "Intelligence", value: 12 },
    { key: "WIS", label: "Wisdom", value: 16 },
    { key: "CHA", label: "Charisma", value: 10 },
  ],
  weapons: [
    {
      name: "Twin Blades",
      type: "Melee",
      notes: "A pair of lean, serrated blades. Balanced for ambushes and rapid follow-through.",
    },
    {
      name: "Silent Bow",
      type: "Ranged",
      notes: "Composite bow wrapped in dark cloth; arrows vanish into the undergrowth like whispers.",
    },
  ],
  gear: [
    "Shadow‑weave Cloak (dampens sound, disrupts outlines)",
    "Hunter’s Kit (snares, chalk, oil, fine saw)",
    "Vial of Night‑moss (mask scent; stains fingers green)",
  ],
  story:
    "Few have seen Karandras move—fewer still knew they were watched. Half‑elf roots, elven patience; the forest itself holds its breath when he passes.",
};

const baseNodes = [
  { id: "stats", label: "Stats", icon: Shield, anchor: { top: "8%", left: "50%" } },
  { id: "weapons", label: "Våben", icon: Sword, anchor: { top: "50%", left: "92%" } },
  { id: "gear", label: "Gear", icon: Backpack, anchor: { top: "88%", left: "50%" } },
  { id: "story", label: "Historie", icon: ScrollText, anchor: { top: "50%", left: "8%" } },
] as const;

type NodeId = typeof baseNodes[number]["id"];

export default function KarandrasHub() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<NodeId | null>(null);

  const nodes = baseNodes;
  const center = { xPct: 50, yPct: 50 };

  const nodePositions = useMemo(() => {
    const rect = containerRef.current?.getBoundingClientRect();
    const w = rect?.width ?? 0;
    const h = rect?.height ?? 0;
    return nodes.reduce<Record<NodeId, { x: number; y: number }>>((acc, n) => {
      const xPct = parseFloat(n.anchor.left) / 100;
      const yPct = parseFloat(n.anchor.top) / 100;
      acc[n.id] = { x: w * xPct, y: h * yPct };
      return acc;
    }, {} as Record<NodeId, { x: number; y: number }>);
  }, [nodes, containerRef.current?.offsetWidth, containerRef.current?.offsetHeight]);

  const centerPx = useMemo(() => {
    const rect = containerRef.current?.getBoundingClientRect();
    const w = rect?.width ?? 0;
    const h = rect?.height ?? 0;
    return { x: (center.xPct / 100) * w, y: (center.yPct / 100) * h };
  }, [containerRef.current?.offsetWidth, containerRef.current?.offsetHeight]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-200">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-emerald-400">
              {characterData.name}
            </h1>
            <p className="text-sm text-gray-400">
              {characterData.ancestry} <span className="text-gray-300">{characterData.class}</span>
            </p>
          </div>
        </div>

        <div
          ref={containerRef}
          className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-gray-800 bg-[radial-gradient(ellipse_at_center,rgba(16,24,16,0.35),rgba(2,4,2,0.7))] shadow-[0_0_40px_rgba(16,185,129,0.08)]"
        >
          <svg className="pointer-events-none absolute inset-0 h-full w-full">
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {nodes.map((n) => {
              const isActive = active === n.id;
              const np = nodePositions[n.id] ?? centerPx;
              const x1 = centerPx.x;
              const y1 = centerPx.y;
              const x2 = np.x;
              const y2 = np.y;

              return (
                <AnimatePresence key={`line-${n.id}`}>
                  {isActive && (
                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <motion.line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#10b981"
                        strokeWidth={2}
                        strokeLinecap="round"
                        filter="url(#glow)"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                      <motion.line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#10b981"
                        strokeWidth={10}
                        strokeLinecap="round"
                        opacity={0.08}
                        filter="url(#glow)"
                        animate={{ opacity: [0.04, 0.12, 0.04] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </motion.g>
                  )}
                </AnimatePresence>
              );
            })}
          </svg>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="relative h-40 w-40 overflow-hidden rounded-full border border-gray-700 shadow-[0_0_0_6px_rgba(16,24,16,0.7)]"
              whileHover={{
                boxShadow:
                  "0 0 0 6px rgba(16,185,129,0.15), 0 0 120px rgba(16,185,129,0.08)",
              }}
            >
              <img src={portraitUrl} alt="Karandras portrait" className="h-full w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-emerald-600/20" />
            </motion.div>
          </div>

          {nodes.map((n) => {
            const Icon = n.icon;
            const isActive = active === n.id;
            const posStyle: React.CSSProperties = {
              top: n.anchor.top,
              left: n.anchor.left,
              transform: "translate(-50%, -50%)",
            };

            return (
              <div key={n.id} className="absolute" style={posStyle}>
                <button
                  onMouseEnter={() => setActive(n.id)}
                  onMouseLeave={() => setActive((prev) => (prev === n.id ? null : prev))}
                  className="group relative grid place-items-center rounded-full border border-emerald-800/40 bg-gray-900/70 p-3 backdrop-blur-sm transition focus:outline-none"
                >
                  <Icon className="h-6 w-6 text-emerald-400 transition group-hover:scale-110" />
                </button>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 260, damping: 28 }}
                      className="absolute z-10 mt-3 min-w-[240px] -translate-x-1/2 sm:min-w-[300px]"
                    >
                      <InfoCard id={n.id as NodeId} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function InfoCard({ id }: { id: NodeId }) {
  if (id === "stats") return <StatsCard />;
  if (id === "weapons") return <WeaponsCard />;
  if (id === "gear") return <GearCard />;
  return <StoryCard />;
}

function StatsCard() {
  return (
    <Card className="border-emerald-900/40 bg-gray-900/90 text-gray-200 backdrop-blur">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-emerald-400">
          <Shield className="h-4 w-4" /> Stats
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          {characterData.stats.map((s) => (
            <div
              key={s.key}
              className="rounded-xl border border-gray-800 bg-gray-950/40 p-3 text-center"
            >
              <div className="text-[10px] uppercase tracking-wide text-gray-400">{s.key}</div>
              <div className="text-lg font-semibold text-emerald-300">{s.value}</div>
              <div className="text-[10px] text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function WeaponsCard() {
  return (
    <Card className="border-emerald-900/40 bg-gray-900/90 text-gray-200 backdrop-blur">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-emerald-400">
          <Sword className="h-4 w-4" /> Våben
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {characterData.weapons.map((w, i) => (
          <div key={i} className="rounded-xl border border-gray-800 bg-gray-950/40 p-3">
            <div className="flex items-center justify-between">
              <div className="font-medium text-emerald-300">{w.name}</div>
              <div className="text-xs text-gray-400">{w.type}</div>
            </div>
            <p className="mt-1 text-sm text-gray-300">{w.notes}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function GearCard() {
  return (
    <Card className="border-emerald-900/40 bg-gray-900/90 text-gray-200 backdrop-blur">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-emerald-400">
          <Backpack className="h-4 w-4" /> Gear
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-inside list-disc space-y-1 text-sm text-gray-300">
          {characterData.gear.map((g, i) => (
            <li key={i}>{g}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function StoryCard() {
  return (
    <Card className="border-emerald-900/40 bg-gray-900/90 text-gray-200 backdrop-blur">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-emerald-400">
          <ScrollText className="h-4 w-4" /> Historie
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-gray-300">{characterData.story}</p>
      </CardContent>
    </Card>
  );
}