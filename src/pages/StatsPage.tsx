import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { characterData } from "../data/characterData";

export default function StatsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-200 p-6">
      <Card className="max-w-3xl w-full border-emerald-900/40 bg-gray-900/90 backdrop-blur">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-emerald-400">
            <Shield className="h-5 w-5" /> Stats
          </CardTitle>
          <Link to="/" className="text-sm text-emerald-400 hover:underline">
            ← Back
          </Link>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          <p>
            Ranger lvl 13.
          </p>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-3">
            {characterData.stats.map((s) => (
              <div
                key={s.key}
                className="rounded-xl border border-gray-800 bg-gray-950/40 p-4 text-center"
              >
                <div className="text-xs uppercase tracking-wide text-gray-400">
                  {s.key}
                </div>
                <div className="text-xl font-semibold text-emerald-300">
                  {s.value}
                </div>
                <div className="text-xs text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Extra stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-gray-800 bg-gray-950/40 p-4">
              <p>
                <span className="text-emerald-400 font-medium">AC:</span>{" "}
                {characterData.ac}
              </p>
              <p>
                <span className="text-emerald-400 font-medium">HP:</span>{" "}
                {characterData.hp}
              </p>
            </div>
            <div className="rounded-xl border border-gray-800 bg-gray-950/40 p-4">
              <p>
                <span className="text-emerald-400 font-medium">Saves:</span>
              </p>
              <p>Fort: {characterData.saves.fort.value}</p>
              <p>Ref: {characterData.saves.ref.value}</p>
              <p>Will: {characterData.saves.will.value}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
