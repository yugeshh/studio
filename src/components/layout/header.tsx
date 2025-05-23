"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { UserAvatar } from "@/components/auth/user-avatar";
import { SidebarTrigger } from "@/components/ui/sidebar"; 
import { Music2 } from "lucide-react";

export function Header() {
  const { user, loading } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <div className="md:hidden">
             <SidebarTrigger />
          </div>
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-xl">
            <Music2 className="h-6 w-6 text-primary" />
            <span>Rhythmic Stream</span>
          </Link>
        </div>

        <nav className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/premium">Premium</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/support">Support</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/download">Download</Link>
          </Button>
        </nav>

        <div className="flex items-center gap-2">
          {loading ? (
            <div className="h-10 w-24 animate-pulse rounded-md bg-muted"></div>
          ) : user ? (
            <UserAvatar />
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/auth/sign-up">Sign Up</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/sign-in">Log In</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
