import rehypeRemark from "rehype-remark";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import {
  extractBoldNodesPlugin,
  transformToTextNodesPlugin,
  createULWithNonBoldTextPlugin,
  extractTitlePlugin,
} from "./html-plugins";

// Define a function to extract bolded text

export function extractTitleMD(markdown: string): string | undefined {
  // Parse the HTML tree
  let resultMarkdown = undefined;
  // TODO: simplify by operating in markdown
  unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(extractTitlePlugin)
    .use(rehypeRemark)
    .use(remarkStringify)
    .process(markdown, (err, file) => {
      if (err) throw err;
      resultMarkdown = file?.data?.title;
    });

  return resultMarkdown;
} // Define a function to extract bolded text

export function extractBoldTextMD(markdown: string): string {
  // Parse the HTML tree
  let resultMarkdown = undefined;
  // TODO: simplify by operating in markdown
  unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(extractBoldNodesPlugin)
    .use(transformToTextNodesPlugin)
    .use(createULWithNonBoldTextPlugin)
    .use(rehypeRemark)
    .use(remarkStringify)
    .process(markdown, (err, file) => {
      if (err) throw err;
      resultMarkdown = String(file);
    });
  if (resultMarkdown == undefined) {
    throw Error("Unfinished markdown conversion");
  }

  return resultMarkdown;
}
