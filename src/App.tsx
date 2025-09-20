import { Routes, Route } from "react-router-dom";
import KarandrasHub from "./KarandrasHub";
import StatsPage from "./pages/StatsPage";
import WeaponsPage from "./pages/WeaponsPage";
import GearPage from "./pages/GearPage";
import StoryPage from "./pages/StoryPage";
import CharacterSheetPage from "./pages/CharacterSheetPage"; // 👈 Tilføjet import

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<KarandrasHub />} />
      <Route path="/stats" element={<StatsPage />} />
      <Route path="/weapons" element={<WeaponsPage />} />
      <Route path="/gear" element={<GearPage />} />
      <Route path="/story" element={<StoryPage />} />
      <Route path="/character-sheet" element={<CharacterSheetPage />} /> {/* 👈 Ny route */}
    </Routes>
  );
}
