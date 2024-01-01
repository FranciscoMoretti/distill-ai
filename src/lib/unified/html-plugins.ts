import { visit } from "unist-util-visit";
import { type Element, type Comment, type Root, type Text } from "hast";
import { type VFile } from "node_modules/rehype-remark/lib";

// Define a unified plugin to extract and return bolded nodes
export const extractBoldNodesPlugin = () => {
  return (tree: Root) => {
    // Initialize an array to store bolded nodes
    const boldNodes: Element[] = findBoldNodes(tree);

    // Attach the boldNodes array to the tree's data
    tree.children = boldNodes;
  };
};

// Helper function to get the plain text content of a node
function plainTextContent(node: Text | Element | Comment): string {
  if (node.type === "text") {
    return node.value;
  } else if (node.type == "element" && node.children) {
    return (
      node.children
        // @ts-expect-error loose handling of hast types
        .map((child: Text | Element | Comment) => plainTextContent(child))
        .join("")
    );
  } else {
    return "";
  }
}

// Define a function to transform bold nodes into text nodes
function transformToTextNodes(nodes: Element[]): Text[] {
  // Transform each bold node into a text node
  return nodes.map<Text>((node) => ({
    type: "text",
    value: plainTextContent(node),
  }));
}

// Define a unified plugin to transform bold nodes into text nodes
export const transformToTextNodesPlugin = () => {
  return (tree: Root) => {
    const boldNodes = findBoldNodes(tree);

    // Transform each bold node into a text node
    const textNodes = transformToTextNodes(boldNodes);

    // Replace the original tree with the transformed text nodes
    tree.children = textNodes;
  };
};

// Define a unified plugin to create a UL with non-bolded text
export const createULWithNonBoldTextPlugin = () => {
  return (tree: Root) => {
    // Replace the original tree with a UL node containing non-bolded text as list items
    tree.children = [
      {
        type: "element",
        tagName: "ul",
        // @ts-expect-error Unsafe assignment
        children: tree.children.map((textNode) => ({
          type: "element",
          tagName: "li",
          children: [textNode],
        })),
      },
    ];
  };
};

function findBoldNodes(tree: Root): Element[] {
  const boldNodes: Element[] = [];

  // Visit the tree and collect bolded nodes
  visit(tree, "element", (node) => {
    if (node.tagName === "strong" || node.tagName === "b") {
      boldNodes.push(node);
    }
  });
  return boldNodes;
}

// Define a unified plugin to extract the title
export const extractTitlePlugin = () => {
  return (tree: Root, file: VFile) => {
    const titleNode = findFirstTitleNode(tree);
    file.data = { title: titleNode ? plainTextContent(titleNode) : undefined };
  };
};

// Helper function to find the title node
function findFirstTitleNode(tree: Root): Element | undefined {
  let titleNode;

  visit(tree, "element", (node: Element) => {
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
