"use client"

import * as React from "react"
import {
  AudioWaveform,
  CheckSquare,
  Command,
  GalleryVerticalEnd,
  FolderKanban,
  LayoutDashboard,
  Users2,
  Bell,
  FileText,
  History,
} from "lucide-react"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { createClient } from "@/client/client"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
      isCollapsible: false,
    },
    {
      title: "My Tasks",
      url: "/tasks",
      icon: CheckSquare,
      isCollapsible: false,
    },
    {
      title: "Projects",
      url: "/projects",
      icon: FolderKanban,
      isCollapsible: true,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Teams",
      url: "/teams",
      icon: Users2,
      isCollapsible: true,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
    {
      title: "Files",
      url: "/files",
      icon: FileText,
      isCollapsible: false,
    },
    {
      title: "Activity Log",
      url: "/activity-log",
      icon: History,
      isCollapsible: false,
    },
    {
      title: "Notifications",
      url: "/notifications",
      icon: Bell,
      isCollapsible: false,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const supabase =  React.useMemo(() => createClient(), [])
  const [user, setUser] = React.useState<{
    name: string
    email: string
    avatar: string
  } | null>(null)

  React.useEffect(() => {
    supabase.auth
      .getUser()
      .then(({ data: { user } }) => {
        if (user) {
          setUser({
            name: user.user_metadata?.name ?? user.email?.split("@")[0],
            email: user.email ?? "",
            avatar: user.user_metadata?.avatar_url ?? "/avatars/default.jpg",
          })
        }
      })
  }, [supabase])

  // fallback while loading
  if (!user) return null

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
