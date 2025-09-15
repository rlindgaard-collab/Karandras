import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

export default function StatsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-200 p-6">
      <Card className="max-w-2xl w-full border-emerald-900/40 bg-gray-900/90 backdrop-blur">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-emerald-400">
            <Shield className="h-5 w-5" /> Stats
          </CardTitle>
          <Link to="/" className="text-sm text-emerald-400 hover:underline">← Tilbage</Link>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-3">
          <p>Her kan du uddybe stats med detaljer, baggrund og level progression.</p>
        </CardContent>
      </Card>
    </div>
  );
}
