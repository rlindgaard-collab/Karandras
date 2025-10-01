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
    fort: {
      value: 24,
      improved: true,
      note: "Warden's Endurance: On a success, treat as a critical success.",
    },
    ref: {
      value: 24,
      improved: true,
      note: "Natural Reflexes: On a success, treat as a critical success.",
    },
    will: {
      value: 22,
      improved: false,
      note: "Improved Will Save: On a success, treat as a critical success.",
    },
  },
  initiative: 26,
  speed: 50,

  // Våben med individuelle angreb og damage
  weapons: [
    {
      name: "+2 Sawtooth Saber",
      type: "Melee",
      notes: "A serrated elven saber, honed for close combat.",
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
    },
    {
      name: "Longbow +2",
      type: "Ranged",
      notes: "Composite longbow reinforced with cold iron tips.",
      attacks: {
        1: { toHit: 24, damageBonus: 6 },
        2: { toHit: 22, damageBonus: 6 },
        3: { toHit: 20, damageBonus: 6 },
      },
      damage: {
        type: "Piercing",
        dice: [{ count: 2, die: 8, type: "Piercing" }],
      },
    },
  ],

  // Starter altid med første våben valgt
  defaultWeaponIndex: 0,

  gear: ["Shadow-weave Armor", "Mask of the Mantis", "Boots of Bounding"],

  story: "Few have seen Karandras move—fewer still knew they were watched...",
  storyChapters: characterStories,
};
