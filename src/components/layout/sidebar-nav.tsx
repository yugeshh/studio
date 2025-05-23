"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Library, PlusSquare, Heart, Music2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/search", label: "Search", icon: Search },
  { href: "/library", label: "Your Library", icon: Library },
];

const playlistItems = [
  { href: "/create-playlist", label: "Create Playlist", icon: PlusSquare },
  { href: "/liked-songs", label: "Liked Songs", icon: Heart },
];

export function SidebarNav() {
  const pathname = usePathname();
  const { open } = useSidebar(); // To conditionally render text or tooltips

  return (
    <Sidebar collapsible="icon" variant="sidebar" side="left">
      <SidebarHeader className="p-4 border-b">
         <Link href="/" className={cn(
            "flex items-center gap-2 text-lg font-semibold",
            !open && "justify-center"
          )}>
            <Music2 className="h-7 w-7 text-primary" />
            {open && <span className="text-xl">Rhythmic Stream</span>}
          </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                  className="justify-start"
                >
                  <item.icon className="h-5 w-5" />
                  {open && <span className="ml-2">{item.label}</span>}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <hr className="my-4" />
        <SidebarMenu>
          {playlistItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                  className="justify-start"
                >
                  <item.icon className="h-5 w-5" />
                  {open && <span className="ml-2">{item.label}</span>}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
