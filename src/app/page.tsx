import { Github } from "@/components/icons";
import Menu from "@/components/menu";
import MultiEditor from "@/components/multi-editor";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className=" container flex min-h-screen flex-col items-center gap-12 px-4 py-16 ">
        <a
          href="https://github.com/steven-tey/novel"
          target="_blank"
          className="absolute bottom-5 left-5 z-10 max-h-fit rounded-lg p-2 transition-colors duration-200 hover:bg-stone-100 sm:bottom-auto sm:top-5"
        >
          <Github />
        </a>
        <Menu />
        <MultiEditor />
      </div>
    </main>
  );
}
