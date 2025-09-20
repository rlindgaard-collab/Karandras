import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { ScrollText } from "lucide-react";
import { Link } from "react-router-dom";
import { characterData } from "../data/characterData";

export default function StoryPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-200 p-6">
      <Card className="max-w-3xl w-full border-emerald-900/40 bg-gray-900/90 backdrop-blur">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-emerald-400">
            <ScrollText className="h-5 w-5" /> Story
          </CardTitle>
          <Link to="/" className="text-sm text-emerald-400 hover:underline">
            ← Back
          </Link>
        </CardHeader>

        <CardContent className="text-gray-300 space-y-4">
          {/* Tabs */}
          <div className="flex border-b border-gray-700 mb-4">
            {characterData.storyChapters.map((chapter, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === index
                    ? "text-emerald-400 border-b-2 border-emerald-400"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {chapter.title}
              </button>
            ))}
          </div>

          {/* Active chapter content */}
          <div className="space-y-3">
            {characterData.storyChapters[activeTab].content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
