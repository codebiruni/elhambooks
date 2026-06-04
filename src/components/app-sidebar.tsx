"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import { data } from "@/app/data/nav-data";
import useContextData from "@/defaults/custom-component/useContextData";
import { usePathname, useRouter } from "next/navigation";
// Import a loader icon if you want, or use text
import { Loader2 } from "lucide-react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // 1. Pull your session loading state from context
  const { UserData, loading } = useContextData();
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (loading) return;

    if (!UserData) {
      router.push("/");
      return;
    }

    const role = UserData.role;

    if (role === "user") {
      if (!pathname.startsWith("/profile")) {
        router.push("/profile");
      }
    } else {
      if (!pathname.startsWith("/dashboard")) {
        router.push("/dashboard");
      }
    }
  }, [UserData, loading, pathname, router]); // Add loading to dependencies

  // 4. Optional: Render a loading state so the screen doesn't flicker or break layout
  if (loading) {
    return (
      <Sidebar collapsible="icon" {...props}>
        <div className="flex h-full w-full items-center justify-center bg-sidebar">
          <Loader2 className="h-6 w-6 animate-spin text-sidebar-foreground/50" />
        </div>
      </Sidebar>
    );
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}