"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  MainEditorPanel,
  OutlineEditorPanel,
  SummaryEditorPanel,
} from "./editor-panels";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export function DualPanel({
  panel1,
  panel2,
}: {
  panel1: React.ReactNode;
  panel2: React.ReactNode;
}) {
  const defaultLayout = [50, 50];

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          sizes,
        )}`;
      }}
      className="h-full items-stretch "
    >
      <ResizablePanel defaultSize={defaultLayout[0]} minSize={30}>
        {panel1}
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        {panel2}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export function MultiEditorUi() {
  const mainPanel = <MainEditorPanel />;
  const outlinePanel = <OutlineEditorPanel />;
  const summaryPanel = <SummaryEditorPanel />;

  // TODO: When panels unmount editors refs are lost!
  return (
    <div className=" rounded bg-background">
      <Tabs defaultValue="Source" className="block md:hidden">
        <div className="flex items-center px-4 py-2">
          <TabsList className="m-auto">
            <TabsTrigger
              value="Source"
              className="text-zinc-600 dark:text-zinc-200"
            >
              {"Source"}
            </TabsTrigger>
            <TabsTrigger
              value="Outline"
              className="text-zinc-600 dark:text-zinc-200"
            >
              {"Outline"}
            </TabsTrigger>
            <TabsTrigger
              value="Summary"
              className="text-zinc-600 dark:text-zinc-200"
            >
              {"Summary"}
            </TabsTrigger>
          </TabsList>
        </div>
        <Separator />
        <TabsContent value="Source" className="m-0">
          {mainPanel}
        </TabsContent>
        <TabsContent value="Outline" className="m-0">
          {outlinePanel}
        </TabsContent>
        <TabsContent value="Summary" className="m-0">
          {summaryPanel}
        </TabsContent>
      </Tabs>
      <Tabs defaultValue="SourceOutline" className="hidden md:block">
        <div className="flex items-center px-4 py-4">
          <TabsList className="m-auto">
            <TabsTrigger
              value="SourceOutline"
              className="text-zinc-600 dark:text-zinc-200"
            >
              {"Source -> Outline"}
            </TabsTrigger>
            <TabsTrigger
              value="OutlineSummary"
              className="text-zinc-600 dark:text-zinc-200"
            >
              {"Outline -> Summary"}
            </TabsTrigger>
          </TabsList>
        </div>
        <Separator />
        <TabsContent value="SourceOutline" className="m-0">
          <DualPanel panel1={mainPanel} panel2={outlinePanel} />
        </TabsContent>
        <TabsContent value="OutlineSummary" className="m-0">
          <DualPanel panel1={outlinePanel} panel2={summaryPanel} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
