import React, { createContext, useContext, useRef, useState } from "react";
import { type PlateEditor as PlateEditorType } from "@udecode/plate-common";
import { type MyValue } from "@/lib/plate/plate-types";
import { type MultiEditorView } from "@/lib/editor-view";
import { useCompletion } from "ai/react";

type MultiEditorStateContextType = {
  mainEditorRef: React.MutableRefObject<PlateEditorType<MyValue> | null>;
  outlineEditorRef: React.MutableRefObject<PlateEditorType<MyValue> | null>;
  summaryEditorRef: React.MutableRefObject<PlateEditorType<MyValue> | null>;
  view: MultiEditorView;
  setView: (view: MultiEditorView) => void;
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
  const [view, setView] = useState<MultiEditorView>("loading");
  const summaryCompletion = useCompletion({
    id: "ai_summary",
    api: "/api/generate",
  });

  return (
    <MultiEditorStateContext.Provider
      value={{
        mainEditorRef,
        outlineEditorRef,
        summaryEditorRef,
        view,
        setView,
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
