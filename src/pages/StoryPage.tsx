import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { ScrollText } from "lucide-react";
import { Link } from "react-router-dom";
import { characterData } from "../data/characterData";

export default function StoryPage() {
  const chapters = characterData.storyChapters || [];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-200 p-6">
      <Card className="max-w-3xl w-full border-emerald-900/40 bg-gray-900/90 backdrop-blur">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-emerald-400">
            <ScrollText className="h-5 w-5" /> Background
          </CardTitle>
          <Link to="/" className="text-sm text-emerald-400 hover:underline">
            ← Back
          </Link>
        </CardHeader>

        <CardContent className="text-gray-300 space-y-4 leading-relaxed text-sm">
          {/* Tabs til kapitler */}
          {chapters.length > 0 && (
            <div className="flex gap-2 border-b border-gray-700 mb-4">
              {chapters.map((ch, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                    idx === activeIndex
                      ? "bg-emerald-800/40 text-emerald-300 border-b-2 border-emerald-400"
                      : "text-gray-400 hover:text-emerald-300"
                  }`}
                >
                  {ch.title}
                </button>
              ))}
            </div>
          )}

          {/* Indhold af aktivt kapitel */}
          {chapters.length > 0 ? (
            <div className="space-y-4">
              {chapters[activeIndex].content.map((p, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "text-base italic text-gray-200"
                      : "text-sm text-gray-300"
                  }
                >
                  {p}
                </p>
              ))}
            </div>
          ) : (
            <p>{characterData.story}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
