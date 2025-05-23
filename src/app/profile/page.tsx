"use client";

import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Edit3, ShieldCheck, LogOut } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    const names = name.split(" ");
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({ title: "Signed Out", description: "You have been successfully signed out." });
      router.push("/"); 
    } catch (error) {
      console.error("Error signing out:", error);
      toast({ title: "Error", description: "Failed to sign out.", variant: "destructive"});
    }
  };

  if (loading) {
    return (
      <div className="space-y-8 max-w-3xl mx-auto">
        <Skeleton className="h-12 w-1/2 mb-4" />
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Skeleton className="h-20 w-20 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
            <Skeleton className="h-10 w-32 mt-4" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    // Should ideally be protected by middleware or redirect
    router.push("/auth/sign-in");
    return null;
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold flex items-center gap-3">
        <User className="h-8 w-8 text-primary" /> Account Settings
      </h1>

      <Card className="shadow-lg">
        <CardHeader className="items-center text-center pb-4">
          <Avatar className="h-24 w-24 mb-3 ring-2 ring-primary ring-offset-2">
            <AvatarImage src={user.photoURL || undefined} alt={user.displayName || "User"} />
            <AvatarFallback className="text-3xl">{getInitials(user.displayName)}</AvatarFallback>
          </Avatar>
          <Button variant="outline" size="sm">
            <Edit3 className="mr-2 h-4 w-4" /> Change Photo
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="displayName">Display Name</Label>
            <Input id="displayName" defaultValue={user.displayName || ""} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue={user.email || ""} disabled className="mt-1 bg-muted/50" />
          </div>
          <Button className="w-full sm:w-auto">
            <Edit3 className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ShieldCheck className="h-6 w-6 text-primary"/> Security</CardTitle>
          <CardDescription>Manage your account security settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline">Change Password</Button>
          <p className="text-sm text-muted-foreground">
            Ensure your account is secure with a strong, unique password.
          </p>
        </CardContent>
      </Card>
      
      <Separator />

      <Button variant="destructive" onClick={handleSignOut} className="w-full sm:w-auto">
        <LogOut className="mr-2 h-4 w-4" /> Log Out
      </Button>
       <p className="mt-8 text-xs text-muted-foreground text-center">
        This is a placeholder page. Profile editing features are not fully implemented.
      </p>
    </div>
  );
}
