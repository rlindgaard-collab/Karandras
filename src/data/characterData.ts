// src/data/characterData.ts
import { characterStories } from "./characterStories";

export const characterData = {
  name: "Karandras",
  ancestry: "Half-elf",
  class: "Ranger",
  stats: [
    { key: "STR", label: "Strength", value: 20 },
    { key: "DEX", label: "Dexterity", value: 18 },
    { key: "CON", label: "Constitution", value: 18 },
    { key: "INT", label: "Intelligence", value: 10 },
    { key: "WIS", label: "Wisdom", value: 16 },
    { key: "CHA", label: "Charisma", value: 10 },
  ],
  ac: 34,
  hp: 203,
  saves: {
    fort: { value: 24, improved: true, note: "Warden's Endurance..." },
    ref: { value: 24, improved: true, note: "Natural Reflexes..." },
    will: { value: 22, improved: false, note: "Improved Will Save..." },
  },
  initiative: 26,
  speed: 50,
  attacks: {
    1: { toHit: 26, damageBonus: 11 },
    2: { toHit: 24, damageBonus: 14 },
    3: { toHit: 22, damageBonus: 14 },
  },
  damage: {
    type: "Cold Iron",
    dice: [
      { count: 3, die: 6, type: "Slashing" },
      { count: 1, die: 6, type: "Mental" },
      { count: 1, die: 6, type: "Spirit" },
    ],
  },
  weapons: [
    { name: "Twin Blades", type: "Melee", notes: "A pair of lean, serrated blades..." },
  ],
  gear: ["Shadow-weave Armor", "Mask of the Mantis", "Boots of Bounding"],
  story: "Few have seen Karandras move—fewer still knew they were watched...",
  storyChapters: characterStories, // 👈 importeret udefra
};
