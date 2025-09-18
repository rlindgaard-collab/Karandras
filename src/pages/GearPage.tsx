import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { Backpack } from "lucide-react";
import { Link } from "react-router-dom";

export default function GearPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-200 p-6">
      <Card className="max-w-2xl w-full border-emerald-900/40 bg-gray-900/90 backdrop-blur">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-emerald-400">
            <Backpack className="h-5 w-5" /> Gear
          </CardTitle>
          <Link to="/" className="text-sm text-emerald-400 hover:underline">← Back</Link>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-3">
          <ul className="list-disc list-inside space-y-1">
            <li>Shadow-weave Armor +2 stealth</li>
            <li>Mask of the Mantis</li>
            <li>Boots of Bounding</li>
            <li>Cassisian Helmet</li>
            <li>Wand of tail wind lvl2</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}