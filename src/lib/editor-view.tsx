export type SingleEditorView = "source" | "outline" | "summary";

export type DualEditorView = "source_outline" | "outline_summary";

export type MultiEditorView = SingleEditorView | DualEditorView | "loading";
