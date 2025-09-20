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
        "I was no hero. I was barely a warrior.
My years in the forests around Xer had taught me to hunt deer and bring down wolves, but the demon that burst forth from the earth’s wounds was something else entirely. It bore the fungi like a shield, its eyes burned with fire, and I felt fear freeze me in place.

I ran.
And still, it found me.

I remember the claw tearing through my chest. The ground that received me, cold and wet. The spores that sank into my blood. Everything faded to black, and I thought: This is how it ends. I die as a boy, forgotten in the forest.

But when the darkness closed in, the light came. Not warm, but hard and cold. And in that light I saw them: two serrated sabers, driven into the earth like gravestones. I reached out with a hand that already felt dead.

And when my fingers touched the steel, the voice burned into my mind.
“Rise. We are not finished yet.”

I screamed, but it was as if the scream never left me. Memories, centuries of battles, flooded into me. I saw demons fall, I heard cities burn, I felt blood on hands that were not my own.

“I am Karandras,” the voice said. “And now, so are you.”

I rose.
Not because I could, but because we could. The sabers fit in my hands, and the demon before me faltered, as if it knew the legacy better than I did. I struck. Not with my strength alone, but with ours. And in its shriek, I heard how something ancient had been reborn in my blood.

When the battle was over and the demon lay broken at my feet, I knew I would never be alone again.
I was no longer the boy from Xer.
I was Karandras.",
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
