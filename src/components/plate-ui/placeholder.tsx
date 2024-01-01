import React from "react";
import { cn } from "@udecode/cn";
import {
  createNodeHOC,
  createNodesHOC,
  type PlaceholderProps,
  usePlaceholderState,
} from "@udecode/plate-common";
import { ELEMENT_H1 } from "@udecode/plate-heading";
import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph";

export const Placeholder = (props: PlaceholderProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { children, placeholder, nodeProps } = props;

  const { enabled } = usePlaceholderState(props);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return React.Children.map(children, (child) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return React.cloneElement(child, {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      className: child.props.className,
      nodeProps: {
        ...nodeProps,
        className: cn(
          enabled &&
            "before:absolute before:cursor-text before:opacity-30 before:content-[attr(placeholder)]",
        ),
        placeholder,
      },
    });
  });
};

export const withPlaceholder = createNodeHOC(Placeholder);
export const withPlaceholdersPrimitive = createNodesHOC(Placeholder);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withPlaceholders = (components: any) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  withPlaceholdersPrimitive(components, [
    {
      key: ELEMENT_PARAGRAPH,
      placeholder: "Type a paragraph",
      hideOnBlur: true,
      query: {
        maxLevel: 1,
      },
    },
    {
      key: ELEMENT_H1,
      placeholder: "Untitled",
      hideOnBlur: false,
    },
  ]);
