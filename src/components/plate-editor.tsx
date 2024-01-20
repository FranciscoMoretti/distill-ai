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
import { useDebouncedCallback } from "use-debounce";

import { MentionCombobox } from "@/components/plate-ui/mention-combobox";
import { CommentsPopover } from "@/components/plate-ui/comments-popover";
import { CursorOverlay } from "@/components/plate-ui/cursor-overlay";
import { Editor } from "@/components/plate-ui/editor";
import { type Editor as EditorType } from "slate";
import { FixedToolbar } from "@/components/plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "@/components/plate-ui/fixed-toolbar-buttons";
import { FloatingToolbar } from "@/components/plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "@/components/plate-ui/floating-toolbar-buttons";
import { plugins } from "@/lib/plate/plate-plugins";
import { type PlateEditor as PlateEditorType } from "@udecode/plate-common";
import useLocalStorage from "@/lib/hooks/use-local-storage";
import { resetNodes } from "@/lib/plate/transforms/reset-nodes";
import { type MyValue } from "@/lib/plate/plate-types";
import { ScrollArea } from "@/components/ui/scroll-area";

const defaultValue: MyValue = [
  {
    id: "1",
    type: "p",
    children: [{ text: "Hello, World!" }],
  },
];

export type PlateEditorProps = {
  storageKey?: string;
  editorRef: MutableRefObject<null | PlateEditorType<MyValue>>;
  initialValue?: MyValue | undefined;
  onChange?: ((value: MyValue) => void | Promise<void>) | undefined;
  onDebouncedUpdate?: ((value: MyValue) => void | Promise<void>) | undefined;
  /**
   * The duration (in milliseconds) to debounce the onDebouncedUpdate callback.
   * Defaults to 750.
   */
  debounceDuration?: number;
  /**
   * Disable local storage read/save.
   * Defaults to false.
   */
  disableLocalStorage?: boolean;
  completionApi?: string;
  completionId?: string;
};

export function PlateEditor({
  editorRef,
  storageKey = "plate__content",
  disableLocalStorage = false,
  initialValue,
  onChange,
  onDebouncedUpdate,
  debounceDuration = 750,
  completionApi,
  completionId,
}: PlateEditorProps) {
  const containerRef = useRef(null);
  const [storageContent, setStorageContent] = useLocalStorage<MyValue>(
    storageKey,
    initialValue ?? defaultValue,
  );
  const debouncedUpdates = useDebouncedCallback<
    (value: MyValue) => void | Promise<void>
  >(async (value) => {
    if (onDebouncedUpdate) {
      await onDebouncedUpdate(value);
    }

    if (!disableLocalStorage) {
      updateLocalStorage(value);
    }
  }, debounceDuration);
  const [saveStatus, setSaveStatus] = useState("Saved");

  function updateLocalStorage(value: MyValue) {
    if (!editorRef.current) {
      return;
    }
    setStorageContent(value);
  }

  useEffect(() => {
    // Load storage content after server render
    const editor = editorRef.current;
    if (!disableLocalStorage && storageContent && editor) {
      resetNodes(editor as EditorType, {
        nodes: storageContent,
      });
    }
  }, [editorRef]);

  return (
    <CommentsProvider users={{}} myUserId="1">
      <Plate
        plugins={plugins}
        initialValue={disableLocalStorage ? initialValue : undefined}
        editorRef={editorRef}
        onChange={async (value: MyValue) => {
          if (!editorRef.current) {
            return;
          }
          const isAstChange = editorRef.current.operations.some(
            (op) => "set_selection" !== op.type,
          );
          if (isAstChange) {
            // Only update if the change is not a selection change
            if (onChange) {
              await onChange(value);
            }
            setSaveStatus("Saving...");
            await debouncedUpdates(value);
            // Simulate a delay in saving.
            setTimeout(() => {
              setSaveStatus("Saved");
            }, 500);
          }
        }}
      >
        <div
          ref={containerRef}
          className={cn(
            // Block selection
            "flex h-full flex-col [&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4",
          )}
        >
          <FixedToolbar className="flex-col">
            <div className="flex flex-row gap-2 px-4 py-2">
              <div className="text-sm ">{saveStatus}</div>
            </div>
            <FixedToolbarButtons />
          </FixedToolbar>
          {/* // TODO: Editor height should be set in only one place (there is a max-h-[1000px] in a ancestor) */}
          <ScrollArea className=" h-full max-h-[800px] flex-1 overflow-hidden">
            <Editor
              className="px-[96px] py-16"
              autoFocus
              focusRing={false}
              variant="ghost"
              size="md"
            />
          </ScrollArea>
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
  );
}
