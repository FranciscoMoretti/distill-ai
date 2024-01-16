"use client";
import { type SingleEditorView, type MultiEditorView } from "@/lib/editor-view";

export function focusOnView(
  view: MultiEditorView,
  setView: (view: MultiEditorView) => void,
  newView: SingleEditorView,
) {
  // Join into a single transitionToView that takes a newView and checks current to decide if needed
  // No need to pass view and setView
  if (newView === "source") {
    transitionToSourceViewIfNeeded(view, setView);
  } else if (newView === "outline") {
    transitionToOutlineViewIfNeeded(view, setView);
  } else if (newView === "summary") {
    transitionToSummaryViewIfNeeded(view, setView);
  }
}
function transitionToSourceViewIfNeeded(
  view: MultiEditorView,
  setView: (view: MultiEditorView) => void,
) {
  if (view === "outline" || view === "summary") {
    setView("source");
  } else if (view === "outline_summary") {
    setView("source_outline");
  }
}
function transitionToOutlineViewIfNeeded(
  view: MultiEditorView,
  setView: (view: MultiEditorView) => void,
) {
  if (view === "source" || view === "summary") {
    setView("outline");
  } else if (view === "outline_summary") {
    setView("source_outline");
  }
}
function transitionToSummaryViewIfNeeded(
  view: MultiEditorView,
  setView: (view: MultiEditorView) => void,
) {
  // TODO make some smooth transition logic with CSS
  if (view === "source" || view === "outline") {
    setView("summary");
  } else if (view === "source_outline") {
    setView("outline_summary");
  }
}
