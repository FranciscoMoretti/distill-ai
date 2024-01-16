import React, { createContext, useContext, useState } from "react";
import { type PlateEditorProps } from "@/components/plate-editor";

interface MultiEditorConfigContextProps {
  mainEditor: PlateEditorProps;
  outlineEditor: PlateEditorProps;
  summaryEditor: PlateEditorProps;
}

const MultiEditorConfigContext = createContext<
  MultiEditorConfigContextProps | undefined
>(undefined);

export const MultiEditorConfigProvider: React.FC<
  MultiEditorConfigContextProps & { children: React.ReactNode }
> = ({ mainEditor, outlineEditor, summaryEditor, children }) => {
  const multiEditorProps = {
    mainEditor,
    outlineEditor,
    summaryEditor,
  };

  return (
    <MultiEditorConfigContext.Provider value={multiEditorProps}>
      {children}
    </MultiEditorConfigContext.Provider>
  );
};

export const useMultiEditorConfigContext = () => {
  const context = useContext(MultiEditorConfigContext);
  if (!context) {
    throw new Error(
      "useMultiEditorConfigContext must be used within a MultiEditorConfigProvider.",
    );
  }
  return context;
};
