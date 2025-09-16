import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { ScrollText } from "lucide-react";
import { Link } from "react-router-dom";

export default function StoryPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-200 p-6">
      <Card className="max-w-2xl w-full border-emerald-900/40 bg-gray-900/90 backdrop-blur">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-emerald-400">
            <ScrollText className="h-5 w-5" /> Bagground
          </CardTitle>
          <Link to="/" className="text-sm text-emerald-400 hover:underline">← Back</Link>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-3">
          <p>Few have seen Karandras move—fewer still knew they were watched. Half-elf roots, elven patience; the forest itself holds its breath when he passes.</p>
          <p>På denne underside kan du skrive længere lore eller historiske events.</p>
        </CardContent>
      </Card>
    </div>
  );
}