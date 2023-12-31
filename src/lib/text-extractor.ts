import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import { type Node, type Parent, type Element } from "hast";
import { visit } from "unist-util-visit";
import { type Plugin, Transformer } from "unified";
import remarkStringify from "remark-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRemark from "rehype-remark";

// Define a unified plugin to extract and return bolded nodes
const extractBoldNodesPlugin: Plugin = () => {
  return (tree) => {
    // Initialize an array to store bolded nodes
    const boldNodes: any[] = findBoldNodes(tree);

    // Attach the boldNodes array to the tree's data
    tree.children = boldNodes;
  };
};

// Helper function to get the plain text content of a node
function plainTextContent(node: any): string {
  if (node.type === "text") {
    return node.value;
  } else if (node.children) {
    return node.children.map((child: any) => plainTextContent(child)).join("");
  } else {
    return "";
  }
}

// Define a function to transform bold nodes into text nodes
function transformToTextNodes(nodes: any[]): any[] {
  // Transform each bold node into a text node
  return nodes.map((node) => ({
    type: "text",
    value: plainTextContent(node),
  }));
}

// Define a unified plugin to transform bold nodes into text nodes
const transformToTextNodesPlugin: Plugin = () => {
  return (tree, file) => {
    const boldNodes: any[] = findBoldNodes(tree);

    // Transform each bold node into a text node
    const textNodes = transformToTextNodes(boldNodes);

    // Replace the original tree with the transformed text nodes
    tree.children = textNodes;
  };
};

// Define a unified plugin to create a UL with non-bolded text
const createULWithNonBoldTextPlugin: Plugin = () => {
  return (tree) => {
    // Replace the original tree with a UL node containing non-bolded text as list items
    tree.children = [
      {
        type: "element",
        tagName: "ul",
        children: tree.children.map((textNode) => ({
          type: "element",
          tagName: "li",
          children: [textNode],
        })),
      },
    ];
  };
};

function findBoldNodes(tree) {
  const boldNodes: any[] = [];

  // Visit the tree and collect bolded nodes
  visit(tree, "element", (node) => {
    if (node.tagName === "strong" || node.tagName === "b") {
      boldNodes.push(node);
    }
  });
  return boldNodes;
}

// Define a function to extract bolded text
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

  return resultMarkdown;
}

// Define a function to extract bolded text
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

  return resultHTML;
}

// Define a unified plugin to extract the title
const extractTitlePlugin: Plugin = () => {
  return (tree, file) => {
    const titleNode = findFirstTitleNode(tree);
    file.data = { title: titleNode ? plainTextContent(titleNode) : undefined };
  };
};

// Helper function to find the title node
function findFirstTitleNode(tree: any): any | undefined {
  let titleNode;

  visit(tree, "element", (node) => {
    if (
      node.tagName === "h1" ||
      node.tagName === "h2" ||
      node.tagName === "h3" ||
      node.tagName === "h4" ||
      node.tagName === "h5" ||
      node.tagName === "h6"
    ) {
      titleNode = node;
      return false; // Stop searching once the first title is found
    }
  });

  return titleNode;
}

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
}

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
}
