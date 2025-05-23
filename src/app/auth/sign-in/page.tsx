"use client";

import { AuthForm } from "@/components/auth/auth-form";
import { auth } from "@/lib/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSignIn = async ({ email, password }: { email: string; password: string }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Signed In",
        description: "Welcome back!",
      });
      router.push("/"); // Redirect to home page after successful sign-in
    } catch (error: any) {
      // Error is handled by AuthForm, but re-throw to fulfill promise type for AuthForm
      throw error;
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem-1px)] flex-col items-center justify-center p-4">
      <AuthForm mode="signIn" onSubmit={handleSignIn} />
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/auth/sign-up" className="font-medium text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
