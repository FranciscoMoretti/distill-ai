import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { type PlateEditor as PlateEditorType } from "@udecode/plate-common";
import { type MyValue } from "@/lib/plate/plate-types";
import {
  type SingleEditorView,
  type MultiEditorTabsValues,
  type EditorLayout,
} from "@/lib/editor-view";
import { useCompletion } from "ai/react";
import { toast } from "sonner";
import { useWindowSize } from "usehooks-ts";

type MultiEditorStateContextType = {
  mainEditorRef: React.MutableRefObject<PlateEditorType<MyValue> | null>;
  outlineEditorRef: React.MutableRefObject<PlateEditorType<MyValue> | null>;
  summaryEditorRef: React.MutableRefObject<PlateEditorType<MyValue> | null>;

  setCurrentEditor: (view: SingleEditorView) => void;
  multiEditorTab: MultiEditorTabsValues;
  setMultiEditorTab: (view: MultiEditorTabsValues) => void;

  editorLayout: EditorLayout;
  setEditorLayout: (layout: EditorLayout) => void;
  summaryCompletion: ReturnType<typeof useCompletion>;
};

const MultiEditorStateContext = createContext<
  MultiEditorStateContextType | undefined
>(undefined);

export const MultiEditorRefsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const mainEditorRef = useRef<PlateEditorType<MyValue> | null>(null);
  const outlineEditorRef = useRef<PlateEditorType<MyValue> | null>(null);
  const summaryEditorRef = useRef<PlateEditorType<MyValue> | null>(null);

  const [multiEditorTab, setMultiEditorTab] =
    useState<MultiEditorTabsValues>("first");
  const [editorLayout, setEditorLayout] = useState<EditorLayout>("unknown");

  const { width } = useWindowSize();

  useEffect(() => {
    if (width >= 1024) {
      setEditorLayout("dual");
      if (multiEditorTab === "third") setMultiEditorTab("second");
    } else {
      setEditorLayout("single");
    }
  }, [width]);

  function setCurrentEditor(value: SingleEditorView) {
    if (!editorLayout) return;
    if (editorLayout === "single") {
      if (value === "source") {
        setMultiEditorTab("first");
      } else if (value === "outline") {
        setMultiEditorTab("second");
      } else {
        // if(value === "outline")
        setMultiEditorTab("third");
      }
    } else if (editorLayout === "dual") {
      if (value === "source") {
        setMultiEditorTab("first");
      } else {
        // if(value === "summary")
        setMultiEditorTab("second");
      }
    }
  }

  const summaryCompletion = useCompletion({
    id: "ai_summary",
    api: "/api/generate",
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <MultiEditorStateContext.Provider
      value={{
        mainEditorRef,
        outlineEditorRef,
        summaryEditorRef,

        setCurrentEditor,
        multiEditorTab,
        setMultiEditorTab,
        editorLayout,
        setEditorLayout,

        summaryCompletion,
      }}
    >
      {children}
    </MultiEditorStateContext.Provider>
  );
};

export const useMultiEditorStateContext = (): MultiEditorStateContextType => {
  const context = useContext(MultiEditorStateContext);
  if (!context) {
    throw new Error(
      "useMultiEditorStateContext must be used within an MultiEditorRefsProvider",
    );
  }
  return context;
};
