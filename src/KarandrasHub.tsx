import React, { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./components/Card";
import { Shield, Sword, Backpack, ScrollText } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
                  onClick={() => navigate(`/${n.id}`)}
                  onMouseEnter={() => setActive(n.id)}
                  onMouseLeave={() => setActive((prev) => (prev === n.id ? null : prev))}
                  className="group relative grid place-items-center rounded-full border border-emerald-800/40 bg-gray-900/70 p-3 backdrop-blur-sm transition focus:outline-none"
                >
                  <Icon className="h-6 w-6 text-emerald-400 transition group-hover:scale-110" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
