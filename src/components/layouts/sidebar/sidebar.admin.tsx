"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "@/components/ui/team-switcher";
import { NavMain } from "@/components/ui/nav-main";
import { NavUser } from "@/components/ui/nav-user";
import { adminMenuItems } from "@/types/type";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={adminMenuItems.teams}></TeamSwitcher>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={adminMenuItems.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={adminMenuItems.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
