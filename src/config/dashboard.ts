import { type DashboardConfig } from "@/types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    // TODO: Unhide once implemented
    // {
    //   title: "Documentation",
    //   href: "/docs",
    //   disabled: true,
    // },
    // {
    //   title: "Support",
    //   href: "/support",
    //   disabled: true,
    // },
  ],
  sidebarNav: [
    {
      title: "Posts",
      href: "/dashboard",
      icon: "post",
    },
    // {
    //   title: "Billing",
    //   href: "/dashboard/billing",
    //   icon: "billing",
    //   disabled: true,
    // },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
};
