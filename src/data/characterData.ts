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
    fort: 24,
    ref: 24,
    will: 22,
  },
  weapons: [
    {
      name: "Twin Blades",
      type: "Melee",
      notes: "A pair of lean, serrated blades...",
    },
  ],
  gear: ["Shadow-weave Armor", "Mask of the Mantis", "Boots of Bounding"],

  // gammel story (fallback)
  story: "Few have seen Karandras move—fewer still knew they were watched...",

  // ny struktur med kapitler
  storyChapters: [
    {
      title: "Origins",
      content: [
        "Few have seen Karandras move—fewer still knew they were watched.",
        "Born of half-elf lineage, he walks both worlds but belongs to none.",
      ],
    },
    {
      title: "The Hunt",
      content: [
        "With serrated twin blades, Karandras stalks his prey.",
        "The forest itself seems to hold its breath when he strikes.",
      ],
    },
    {
      title: "Shadows",
      content: [
        "Legends whisper of his mask, the Mantis visage.",
        "To see it is to know the end is near.",
      ],
    },
  ],
};
