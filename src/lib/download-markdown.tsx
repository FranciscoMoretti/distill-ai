"use client";
export const downloadMarkdownFile = (markdown: string, fileName: string) => {
  // create file in browser
  const blob = new Blob([markdown], { type: "text/x-markdown" });
  const href = URL.createObjectURL(blob);

  // create "a" HTLM element with href to file
  const link = document.createElement("a");
  link.href = href;
  link.download = fileName + ".md";
  document.body.appendChild(link);
  link.click();

  // clean up "a" element & remove ObjectURL
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
};
