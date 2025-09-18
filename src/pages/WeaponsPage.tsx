import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { Sword } from "lucide-react";
import { Link } from "react-router-dom";

export default function WeaponsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-200 p-6">
      <Card className="max-w-2xl w-full border-emerald-900/40 bg-gray-900/90 backdrop-blur">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-emerald-400">
            <Sword className="h-5 w-5" /> Weapons
          </CardTitle>
          <Link to="/" className="text-sm text-emerald-400 hover:underline">← Back</Link>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-3">
          <p><strong>Twin Blades</strong>: A pair of lean, serrated blades. Balanced for ambushes and rapid follow-through.</p>
          +2 Weapon Striking (Greater) Cold iron Sawtooth Saber</p>
          Nightmare and Astral runes</p>
        </CardContent>
      </Card>
    </div>
  );
}