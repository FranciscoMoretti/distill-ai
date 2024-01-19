import { type MyValue } from "@/lib/plate/plate-types";

export const initial_value_source: MyValue = [
  {
    type: "p",
    align: "start",
    children: [
      {
        text: "Our journey unfolds within the Source editor, a canvas where you weave the tale of your book notes. As you embark on this literary adventure, remember to ",
      },
      { text: "Place notes in the Source editor.", bold: true },
    ],
    id: "vrxq3",
  },
  { type: "p", align: "start", children: [{ text: "" }], id: "8fex0" },
  {
    type: "p",
    align: "start",
    children: [
      {
        text: "In this realm of ideas, creativity flows freely. When you come across a pivotal insight, seize it and ",
      },
      {
        text: "Bold text in Source with ctrl+B or Bold button to include in the Outline",
        bold: true,
      },
      {
        text: ". These bolded passages will guide you, shaping the very fabric of your narrative.",
      },
    ],
    id: "qa71k",
  },
  { type: "p", align: "start", children: [{ text: "" }], id: "0mxb7" },
  {
    type: "p",
    align: "start",
    children: [
      {
        text: 'As the plot thickens, you\'ll encounter the "Generate Outline"—a magical artifact. The ',
      },
      { text: '"Generate Outline" button creates an outline', bold: true },
      {
        text: ". Click it, and witness the skeleton of your narrative emerge.",
      },
    ],
    id: "lsz8u",
  },
  {
    type: "p",
    align: "start",
    children: [
      { text: "\nFor those who seek an ever-evolving storyline, the " },
      {
        text: '"Auto-generate outline" button generates in every change',
        bold: true,
      },
      {
        text: ". With every twist and turn in your notes, it diligently crafts an updated outline on every change, ensuring your story remains fluid and responsive.\n",
      },
    ],
    id: "2exo0",
  },
  {
    type: "p",
    align: "start",
    children: [
      {
        text: "Now, with the raw outline laid before you, it's time to sculpt and refine. Venture into the Outline editor, where you can ",
      },
      {
        text: "Edit Outline further with summarization, thoughts, titles, or indentation.",
        bold: true,
      },
      {
        text: " Shape your narrative, add depth, and let your story flourish.",
      },
    ],
    id: "o8g3k",
  },
  { type: "p", align: "start", id: "ecelb", children: [{ text: "" }] },
  {
    type: "p",
    align: "start",
    children: [
      { text: "As the final chapters beckon, the climax awaits. Click the " },
      {
        text: '"Generate Summary" button to create a summary with AI',
        bold: true,
      },
      {
        text: ". Like a master storyteller, the AI weaves its magic, creating a captivating book summary in the Summary editor.",
      },
    ],
    id: "js7af",
  },
  { type: "p", align: "start", children: [{ text: "" }], id: "bp1to" },
  {
    type: "p",
    align: "start",
    children: [
      { text: "The tale is complete, but the adventure doesn't end here. " },
      {
        text: "Copy your crafted narrative, download it for safekeeping, or export it to Notion ",
        bold: true,
      },
      {
        text: "for a grand showcase. Should you wish to revisit this literary realm, return to Distill AI and witness your story anew.",
      },
    ],
    id: "xc7om",
  },
  { type: "p", align: "start", children: [{ text: "" }], id: "wbqv5" },
];

export const initial_value_outline: MyValue = [
  {
    type: "p",
    listStyleType: "disc",
    indent: 1,
    children: [{ text: "Place notes in the Source editor." }],
    id: "0btxb",
  },
  {
    type: "p",
    listStyleType: "disc",
    indent: 1,
    children: [
      {
        text: "Bold text in Source with ctrl+B or Bold button to include in the Outline",
      },
    ],
    id: "9d6om",
    listStart: 2,
  },
  {
    type: "p",
    listStyleType: "disc",
    indent: 1,
    children: [{ text: '"Generate Outline" button creates an outline' }],
    id: "rmsd0",
    listStart: 3,
  },
  {
    type: "p",
    listStyleType: "disc",
    indent: 1,
    children: [
      { text: '"Auto-generate outline" button generates in every change' },
    ],
    id: "z02hk",
    listStart: 4,
  },
  {
    type: "p",
    listStyleType: "disc",
    indent: 1,
    children: [
      {
        text: "Edit Outline further with summarization, thoughts, titles, or indentation.",
      },
    ],
    id: "ur4ia",
    listStart: 5,
  },
  {
    type: "p",
    listStyleType: "disc",
    indent: 1,
    children: [
      { text: '"Generate Summary" button to create a summary with AI' },
    ],
    id: "nk7n5",
    listStart: 6,
  },
  {
    type: "p",
    listStyleType: "disc",
    indent: 1,
    children: [
      {
        text: "Copy your crafted narrative, download it for safekeeping, or export it to Notion",
      },
    ],
    id: "x0p0g",
    listStart: 7,
  },
  { type: "p", children: [{ text: "" }], id: "xshyl" },
];

export const initial_value_summary: MyValue = [
  {
    id: "1",
    type: "p",
    children: [{ text: "This will be completed by AI" }],
  },
];

export const empty_content: MyValue = [
  {
    id: "1",
    type: "p",
    children: [{ text: "" }],
  },
];
