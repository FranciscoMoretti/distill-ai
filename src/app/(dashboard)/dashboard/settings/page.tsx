import { redirect } from "next/navigation";

import { authOptions } from "@/server/auth";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { UserNameForm } from "@/components/user-name-form";
import { getServerAuthSession } from "@/server/auth";
import { NotionInfoForm } from "@/components/notion-info-form";

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
};

export default async function SettingsPage() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect(authOptions?.pages?.signIn ?? "/api/auth/signin");
  }
  const user = session.user;

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
        <UserNameForm user={{ id: user.id, name: user.name ?? "" }} />
        <NotionInfoForm />
      </div>
    </DashboardShell>
  );
}
