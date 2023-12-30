"use client";
import React, {
  type MutableRefObject,
  useRef,
  useState,
  useEffect,
} from "react";

import { cn } from "@udecode/cn";
import { Plate } from "@udecode/plate-common";
import { CommentsProvider } from "@udecode/plate-comments";
import { HTML5Backend } from "react-dnd-html5-backend";

import { MentionCombobox } from "@/components/plate-ui/mention-combobox";
import { CommentsPopover } from "@/components/plate-ui/comments-popover";
import { CursorOverlay } from "@/components/plate-ui/cursor-overlay";
import { Editor } from "@/components/plate-ui/editor";
import { FixedToolbar } from "@/components/plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "@/components/plate-ui/fixed-toolbar-buttons";
import { FloatingToolbar } from "@/components/plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "@/components/plate-ui/floating-toolbar-buttons";
import { plugins } from "@/lib/plate/plate-plugins";
import { DndProvider } from "react-dnd";
import { type PlateEditor as PlateEditorType } from "@udecode/plate-common";
import useLocalStorage from "@/lib/hooks/use-local-storage";

const initialValue = [
  {
    id: "1",
    type: "p",
    children: [{ text: "HI, World!" }],
  },
];

export function PlateEditor({
  editorRef,
  storageKey,
}: {
  storageKey: string;
  editorRef: MutableRefObject<null | PlateEditorType>;
}) {
  // const [editor] = useState(() => withReact(createEditor()));
  const containerRef = useRef(null);
  const [storageContent, setStorageContent] = useLocalStorage(
    storageKey,
    initialValue,
  );

  useEffect(() => {
    // Load storage content after server render
    const editor = editorRef.current;
    if (storageContent && editor) {
      // TODO replace with a proper Transform
      editor.children = storageContent;
      // Trigger a re-render
      // Reference: https://docs.slatejs.org/walkthroughs/06-saving-to-a-database#:~:text=If%20you%20want%20to%20update,transform%20the%20value%2C%20for%20example%3A
      editor.onChange();
    }
  }, [editorRef.current]);

  return (
    <DndProvider backend={HTML5Backend}>
      <CommentsProvider users={{}} myUserId="1">
        <Plate
          plugins={plugins}
          initialValue={undefined}
          editorRef={editorRef}
          onChange={(value) => {
            if (!editorRef.current) {
              return;
            }
            const isAstChange = editorRef.current.operations.some(
              (op) => "set_selection" !== op.type,
            );
            if (isAstChange) {
              setStorageContent(value);
            }
          }}
        >
          <div
            ref={containerRef}
            className={cn(
              // Block selection
              "[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4",
            )}
          >
            <FixedToolbar>
              <FixedToolbarButtons />
            </FixedToolbar>

            <Editor
              className="px-[96px] py-16"
              autoFocus
              focusRing={false}
              variant="ghost"
              size="md"
            />

            <FloatingToolbar>
              <FloatingToolbarButtons />
            </FloatingToolbar>
            {/* // TODO: add mentionables for mention combobox @my_mention */}
            <MentionCombobox items={[]} />
            <CommentsPopover />

            <CursorOverlay containerRef={containerRef} />
          </div>
        </Plate>
      </CommentsProvider>
    </DndProvider>
  );
}
