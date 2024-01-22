import { type MyValue } from "@/lib/plate/plate-types";

export const initial_value_source: MyValue = [
  {
    type: "p",
    children: [
      {
        text: "In the vast landscape of the Source editor, this innovative tool unfolds a realm for you to transcribe the nuances of your reading experience. ",
      },
      { text: "This is a Personalized AI-powered book summarizer", bold: true },
      {
        text: " a beacon that illuminates the path to crafting a tailored and insightful summary.",
      },
    ],
    id: "qmfik",
  },
  { type: "p", align: "start", id: "0ubt4", children: [{ text: "" }] },
  {
    type: "p",
    align: "start",
    id: "7mon7",
    children: [
      {
        text: "Our journey unfolds within the Source editor, a canvas where you weave the tale of your book notes. As you embark on this literary adventure, remember to ",
      },
      { text: "Place notes in the Source editor.", bold: true },
    ],
  },
  { type: "p", align: "start", children: [{ text: "" }], id: "2bwie" },
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
    id: "dmmsn",
  },
  { type: "p", align: "start", children: [{ text: "" }], id: "qjatr" },
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
    id: "av8hl",
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
    id: "bfeup",
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
    id: "1auca",
  },
  { type: "p", align: "start", children: [{ text: "" }], id: "toccq" },
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
    id: "c8dy8",
  },
  { type: "p", align: "start", children: [{ text: "" }], id: "7vfju" },
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
    id: "qd7ug",
  },
  { type: "p", align: "start", children: [{ text: "" }], id: "461sn" },
  { type: "p", children: [{ text: "" }], id: "lyode" },
  { type: "p", children: [{ text: "" }], id: "tp3hy" },
];

export const initial_value_outline: MyValue = [
  {
    type: "p",
    listStyleType: "disc",
    indent: 1,
    children: [{ text: "This is a Personalized AI-powered book summarizer" }],
    id: "be3zk",
  },
  {
    type: "p",
    listStyleType: "disc",
    indent: 1,
    children: [{ text: "Place notes in the Source editor." }],
    id: "6qk4n",
    listStart: 2,
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
    id: "e1pv1",
    listStart: 3,
  },
  {
    type: "p",
    listStyleType: "disc",
    indent: 1,
    children: [{ text: '"Generate Outline" button creates an outline' }],
    id: "h81vs",
    listStart: 4,
  },
  {
    type: "p",
    listStyleType: "disc",
    indent: 1,
    children: [
      { text: '"Auto-generate outline" button generates in every change' },
    ],
    id: "qxl07",
    listStart: 5,
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
    id: "bsqor",
    listStart: 6,
  },
  {
    type: "p",
    listStyleType: "disc",
    indent: 1,
    children: [
      { text: '"Generate Summary" button to create a summary with AI' },
    ],
    id: "lbj7t",
    listStart: 7,
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
    id: "br5hg",
    listStart: 8,
  },
  { type: "p", children: [{ text: "" }], id: "2rm7w" },
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
