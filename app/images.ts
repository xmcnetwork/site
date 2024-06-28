export interface Image {
  large: string;
  small?: string;
  author: string;
  year: number;
  tags: string[];
  alt: string;
}

export const screenshots: Image[] = [
  {
    large: "/screenshots/sheraton-1.png",
    // small: "/screenshots/sheraton-1.sm.png",
    author: "SheratonXIX",
    year: 2024,
    tags: ["winter"],
    alt: "A snowy landscape showcasing many shops and structures. It is daytime. There is a snow-covered mountain range in the distance.",
  },
  {
    large: "/screenshots/evanlo-1.png",
    author: "EvanLo",
    year: 2021,
    tags: ["cave"],
    alt: "An underground Hobbit-hole-like structure. There is a path leading to a circular wooden door. The door is carved into a cave with stone walls and ceiling, and a grass floor.",
  },
  {
    large: "/screenshots/evanlo-2.png",
    author: "EvanLo",
    year: 2021,
    tags: ["structure"],
    alt: "A tall stone brick tower atop a hill overlooking plains. The tower has blue accents (warped planks) and a roof of the same material. Foliage can be seen draping one side of the structure. There are minimal windows.",
  },
  {
    large: "/screenshots/sofie-1.png",
    author: "OmgSofie",
    year: 2023,
    tags: ["structure"],
    alt: "A small waterfront cottage with front landscaping. The building has two stories and an underground garage or stable.",
  },
  {
    large: "/screenshots/sofie-2.png",
    author: "OmgSofie",
    year: 2020,
    tags: ["landscape"],
    alt: "A small bridge crosses the narrow portion of a large ravine. A brick observatory-like structure is visible in the background.",
  },
  {
    large: "/screenshots/sofie-3.png",
    author: "OmgSofie",
    year: 2023,
    tags: ["structure"],
    alt: "A cubic structure made of cobblestone, stone bricks, and other stone-type blocks. It has a small balcony made of spruce trapdoors overlooking the water.",
  },
  {
    large: "/screenshots/shay-1.png",
    author: "drshayy",
    year: 2024,
    tags: ["winter", "structure"],
    alt: "A wooden cabin on the side of a snowy mountain.",
  },
  {
    large: "/screenshots/shay-2.png",
    author: "drshayy",
    year: 2024,
    tags: ["structure"],
    alt: "A two-level horse barn made of dark oak. The top layer is a pasture with hay bales and grass, while the bottom layer has stalls showcasing the horses currently for sale.",
  },
];
