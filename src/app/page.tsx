import { CrudShowcase } from "@/app/CrudShowcase";
import { Workspace } from "./workspace";
import { api } from "@/trpc/server";
import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";

export default async function Home() {
  const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <main className="flex h-full flex-1 flex-col items-center justify-stretch bg-muted">
      {/* // TODO: Consider setting a container again for nice width*/}
      <div className=" flex w-full flex-1 flex-col items-center gap-12 px-4 py-16 ">
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white">
            {hello ? hello.greeting : "Loading tRPC query..."}
          </p>

          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl text-white">
              {session && <span>Logged in as {session.user?.name}</span>}
            </p>
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
          </div>
        </div>
        <CrudShowcase />
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
