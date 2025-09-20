import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { Shield, Sword, Backpack, ScrollText } from "lucide-react";
import { characterData } from "../data/characterData";

export default function CharacterSheetPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-200 p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-emerald-400">Character Sheet</h1>
          <Link to="/" className="text-sm text-emerald-400 hover:underline">
            ← Back to Hub
          </Link>
        </div>

        {/* Basic Info */}
        <Card className="border-emerald-900/40 bg-gray-900/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-emerald-400">Basic Info</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4 text-sm text-gray-300">
            <p><span className="font-semibold text-emerald-300">Name:</span> {characterData.name}</p>
            <p><span className="font-semibold text-emerald-300">Ancestry:</span> {characterData.ancestry}</p>
            <p><span className="font-semibold text-emerald-300">Class:</span> {characterData.class}</p>
            <p><span className="font-semibold text-emerald-300">Level:</span> {characterData.level || 12}</p>
          </CardContent>
        </Card>

        {/* Stats + Combat */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Stats */}
          <Card className="border-emerald-900/40 bg-gray-900/90 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-400">
                <Shield className="h-5 w-5" /> Stats
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

          {/* Combat */}
          <Card className="border-emerald-900/40 bg-gray-900/90 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-emerald-400">Combat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-gray-300">
              <p><span className="text-emerald-400 font-medium">AC:</span> {characterData.ac}</p>
              <p><span className="text-emerald-400 font-medium">HP:</span> {characterData.hp}</p>
              <p>
                <span className="text-emerald-400 font-medium">Saves:</span>{" "}
                Fort {characterData.saves.fort} | Ref {characterData.saves.ref} | Will {characterData.saves.will}
              </p>
              <p><span className="text-emerald-400 font-medium">Perception:</span> {characterData.perception || "+18"}</p>
              <p><span className="text-emerald-400 font-medium">Initiative:</span> {characterData.initiative || "+16"}</p>
            </CardContent>
          </Card>
        </div>

        {/* Weapons */}
        <Card className="border-emerald-900/40 bg-gray-900/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-400">
              <Sword className="h-5 w-5" /> Weapons
            </CardTitle>
          </CardHeader>
          <CardContent>
            {characterData.weapons.map((w, i) => (
              <div key={i} className="mb-2">
                <p className="text-emerald-300 font-medium">{w.name}</p>
                <p className="text-xs text-gray-400">{w.type}</p>
                <p className="text-sm text-gray-300">{w.notes}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Gear */}
        <Card className="border-emerald-900/40 bg-gray-900/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-400">
              <Backpack className="h-5 w-5" /> Gear
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-sm text-gray-300">
              {characterData.gear.map((g, i) => (
                <li key={i}>{g}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Notes / Story */}
        <Card className="border-emerald-900/40 bg-gray-900/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-400">
              <ScrollText className="h-5 w-5" /> Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-300">{characterData.story}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
