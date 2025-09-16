import React, { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./components/Card";
import { Shield, Sword, Backpack, ScrollText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const portraitUrl = "/karandras.png"; // billedet i public/

const characterData = {
  name: "Karandras",
  ancestry: "Half-elf",
  class: "Ranger",
  stats: [
    { key: "STR", label: "Strength", value: 20 },
    { key: "DEX", label: "Dexterity", value: 18 },
    { key: "CON", label: "Constitution", value: 18 },
    { key: "INT", label: "Intelligence", value: 10 },
    { key: "WIS", label: "Wisdom", value: 16 },
    { key: "CHA", label: "Charisma", value: 10 },
  ],
};

const baseNodes = [
  { id: "stats", label: "Stats", icon: Shield, anchor: { top: "8%", left: "50%" } },
  { id: "weapons", label: "Weapons", icon: Sword, anchor: { top: "50%", left: "92%" } },
  { id: "gear", label: "Gear", icon: Backpack, anchor: { top: "88%", left: "50%" } },
  { id: "story", label: "Story", icon: ScrollText, anchor: { top: "50%", left: "8%" } },
] as const;

type NodeId = typeof baseNodes[number]["id"];

function InfoCard({ id }: { id: NodeId }) {
  if (id === "stats")
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
                <div className="text-[10px] uppercase tracking-wide text-gray-400">
                  {s.key}
                </div>
                <div className="text-lg font-semibold text-emerald-300">
                  {s.value}
                </div>
                <div className="text-[10px] text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );

  if (id === "weapons")
    return (
      <Card className="border-emerald-900/40 bg-gray-900/90 text-gray-200 backdrop-blur">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-emerald-400">
            <Sword className="h-4 w-4" /> Weapons
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-300">
            Twin Blades: A pair of lean, serrated blades...
          </p>
        </CardContent>
      </Card>
    );

  if (id === "gear")
    return (
      <Card className="border-emerald-900/40 bg-gray-900/90 text-gray-200 backdrop-blur">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-emerald-400">
            <Backpack className="h-4 w-4" /> Gear
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside text-sm text-gray-300">
            <li>Shadow-weave Cloak</li>
            <li>Hunter’s Kit</li>
            <li>Vial of Night-moss</li>
          </ul>
        </CardContent>
      </Card>
    );

  return (
    <Card className="border-emerald-900/40 bg-gray-900/90 text-gray-200 backdrop-blur">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-emerald-400">
          <ScrollText className="h-4 w-4" /> Background
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-300">
          Few have seen Karandras move—fewer still knew they were watched...
        </p>
      </CardContent>
    </Card>
  );
}

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
        <h1 className="text-3xl font-semibold text-emerald-400 mb-6">
          {characterData.name}
        </h1>
        <div
          ref={containerRef}
          className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-gray-800 bg-[radial-gradient(ellipse_at_center,rgba(16,24,16,0.35),rgba(2,4,2,0.7))] shadow-[0_0_40px_rgba(16,185,129,0.08)]"
        >
          {/* Fog-lag mellem baggrund og portræt */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="fog-layer"></div>
            <div className="fog-layer delay-1"></div>
            <div className="fog-layer delay-2"></div>
          </div>

          {/* Portræt i midten */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <img
              src={portraitUrl}
              alt="Karandras portrait"
              className="h-56 w-56 rounded-full border-4 border-emerald-700 shadow-lg object-cover object-top slow-pulse"
            />
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
                  onClick={() => navigate(`/${n.id}`)}
                  onMouseEnter={() => setActive(n.id)}
                  onMouseLeave={() =>
                    setActive((prev) => (prev === n.id ? null : prev))
                  }
                  className="group relative grid place-items-center rounded-full border border-emerald-800/40 bg-gray-900/70 p-3"
                >
                  <Icon className="h-6 w-6 text-emerald-400" />
                </button>
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 260, damping: 28 }}
                      className={[
                        "absolute z-20 w-[260px] max-w-sm",
                        n.id === "stats" &&
                          "top-full left-1/2 -translate-x-1/2 mt-2",
                        n.id === "gear" &&
                          "bottom-full left-1/2 -translate-x-1/2 mb-2",
                        n.id === "weapons" &&
                          "right-full top-1/2 -translate-y-1/2 mr-2",
                        n.id === "story" &&
                          "left-full top-1/2 -translate-y-1/2 ml-2",
                      ]
                        .filter(Boolean)
                        .join(" ")}
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
