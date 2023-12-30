import { PlateEditor } from "@/components/plate-editor";
import { Github } from "@/components/custom-icons";
import Menu from "@/components/menu";
import MultiEditor from "@/components/multi-editor";
import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/plate-ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[rgb(21,22,44)] ">
      {/* // TODO: Consider setting a container again for nice width*/}
      <div className="flex w-full flex-col items-center gap-12 px-4 py-16 ">
        {/* <a
          href="https://github.com/FranciscoMoretti/destill-ai"
          target="_blank"
          className="absolute bottom-5 left-5 z-10 max-h-fit rounded-lg p-2 transition-colors duration-200 hover:bg-stone-100 sm:bottom-auto sm:top-5"
        >
          <Github />
        </a> */}
        {/* <Menu /> */}
        {/* // TODO: Add hero section */}

        <div className="w-full max-w-[1336px] rounded-lg border bg-background shadow">
          {/* <PlateEditor /> */}
        </div>
        <MultiEditor />
      </div>
    </main>
  );
}
