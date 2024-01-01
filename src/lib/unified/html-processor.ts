import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";
import { extractTitlePlugin } from "./html-plugins";

import {
  extractBoldNodesPlugin,
  transformToTextNodesPlugin,
  createULWithNonBoldTextPlugin,
} from "./html-plugins";

// Define a function to extract bolded text

export function extractTitleHTML(htmlString: string): string | undefined {
  // Parse the HTML tree
  let resultHTML = undefined;
  unified()
    .use(rehypeParse, { fragment: true })
    .use(extractTitlePlugin)
    .use(rehypeStringify)
    .process(htmlString, (err, file) => {
      if (err) throw err;
      resultHTML = file?.data?.title;
    });

  return resultHTML;
} // Define a function to extract bolded text

export function extractBoldTextHMTL(htmlString: string): string {
  // Parse the HTML tree
  let resultHTML = undefined;
  unified()
    .use(rehypeParse, { fragment: true })
    .use(extractBoldNodesPlugin)
    .use(transformToTextNodesPlugin)
    .use(createULWithNonBoldTextPlugin)
    .use(rehypeStringify)
    .process(htmlString, (err, file) => {
      if (err) throw err;
      resultHTML = String(file);
    });

  if (resultHTML == undefined) {
    throw Error("Unfinished html conversion");
  }
  return resultHTML;
}
