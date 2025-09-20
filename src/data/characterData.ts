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
  gear: [
    "Shadow-weave Armor",
    "Mask of the Mantis",
    "Boots of Bounding",
  ],
  story: "Few have seen Karandras move—fewer still knew they were watched...",

  // Nyt felt: flere kapitler til Story
  storyChapters: [
    {
      title: "Prolog",
      content: "Few have seen Karandras move—fewer still knew they were watched...",
    },
    {
      title: "Kapitel 1: Skyggernes Jagt",
      content: "Karandras begyndte sin rejse i de dybe skove, hvor hver skygge kunne være ven eller fjende...",
    },
    {
      title: "Kapitel 2: Den Tyste Alliance",
      content: "Efter mange kampe fandt han uventede allierede blandt dem, der levede udenfor civilisationens lys...",
    },
  ],
};
