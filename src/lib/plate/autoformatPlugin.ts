import { type AutoformatPlugin } from "@udecode/plate-autoformat";
import { type PlatePlugin } from "@udecode/plate-common";

import { autoformatRules } from "@/lib/plate/autoformatRules";

export const autoformatPlugin: Partial<PlatePlugin<AutoformatPlugin>> = {
  options: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
    rules: autoformatRules as any,
    enableUndoOnDelete: true,
  },
};
