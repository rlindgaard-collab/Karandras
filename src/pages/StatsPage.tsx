import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { key: "STR", label: "Strength", value: 20 },
  { key: "DEX", label: "Dexterity", value: 18 },
  { key: "CON", label: "Constitution", value: 18 },
  { key: "INT", label: "Intelligence", value: 10 },
  { key: "WIS", label: "Wisdom", value: 16 },
  { key: "CHA", label: "Charisma", value: 10 },
];

export default function StatsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-200 p-6">
      <Card className="max-w-2xl w-full border-emerald-900/40 bg-gray-900/90 backdrop-blur">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-emerald-400">
            <Shield className="h-5 w-5" /> Stats
          </CardTitle>
          <Link to="/" className="text-sm text-emerald-400 hover:underline">← Back</Link>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          <p>Her kan du uddybe stats med detaljer, baggrund og level progression.</p>

          {/* Grid med stats i samme stil som hub’en */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map((s) => (
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
    </div>
  );
}
