import React, { createContext, useContext, useState } from "react";
import { type PlateEditorProps } from "@/components/plate-editor";
import { type MultiEditorView } from "@/lib/editor-view";

interface MultiEditorProviderProps {
  mainEditor: PlateEditorProps;
  outlineEditor: PlateEditorProps;
  summaryEditor: PlateEditorProps;
}

interface MultiEditorContextProps {
  mainEditor: PlateEditorProps;
  outlineEditor: PlateEditorProps;
  summaryEditor: PlateEditorProps;
  view: MultiEditorView;
  setView: (view: MultiEditorView) => void;
}

const MultiEditorContext = createContext<MultiEditorContextProps | undefined>(
  undefined,
);

export const MultiEditorProvider: React.FC<
  MultiEditorProviderProps & { children: React.ReactNode }
> = ({ mainEditor, outlineEditor, summaryEditor, children }) => {
  const [view, setView] = useState<MultiEditorView>("source");

  const multiEditorProps = {
    mainEditor,
    outlineEditor,
    summaryEditor,
    view,
    setView,
  };

  return (
    <MultiEditorContext.Provider value={multiEditorProps}>
      {children}
    </MultiEditorContext.Provider>
  );
};

export const useMultiEditorContext = () => {
  const context = useContext(MultiEditorContext);
  if (!context) {
    throw new Error(
      "useMultiEditorContext must be used within a MultiEditorProvider",
    );
  }
  return context;
};
