import React, { createContext, useContext } from "react";
import { type PlateEditorProps } from "@/components/plate-editor";

export type editorsIds = "mainEditor" | "outlineEditor" | "summaryEditor";

interface MultiEditorContextProps {
  mainEditor: PlateEditorProps;
  outlineEditor: PlateEditorProps;
  summaryEditor: PlateEditorProps;
}

const MultiEditorContext = createContext<MultiEditorContextProps | undefined>(
  undefined,
);

export const MultiEditorProvider: React.FC<
  MultiEditorContextProps & { children: React.ReactNode }
> = ({ mainEditor, outlineEditor, summaryEditor, children }) => {
  const multiEditorProps = {
    mainEditor,
    outlineEditor,
    summaryEditor,
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
