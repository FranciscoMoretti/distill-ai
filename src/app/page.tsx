import { Workspace } from "./workspace";

export default async function Home() {
  return (
    <main className="flex h-full flex-1 flex-col items-center justify-stretch bg-muted">
      {/* // TODO: Consider setting a container again for nice width*/}
      <div className=" flex w-full flex-1 flex-col items-center gap-12 px-4 py-16 ">
        {/* <a
          href="https://github.com/FranciscoMoretti/destill-ai"
          target="_blank"
          className="absolute bottom-5 left-5 z-10 max-h-fit rounded-lg p-2 transition-colors duration-200 hover:bg-stone-100 sm:bottom-auto sm:top-5"
        >
          <Github />
        </a> */}
        {/* <Menu /> */}
        {/* // TODO: Add hero section */}

        <Workspace className="h-full flex-1" />
      </div>
    </main>
  );
}
