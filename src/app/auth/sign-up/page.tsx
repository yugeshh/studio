"use client";

import { AuthForm } from "@/components/auth/auth-form";
import { auth } from "@/lib/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSignUp = async ({ email, password }: { email: string; password: string }) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast({
        title: "Account Created",
        description: "You have successfully signed up!",
      });
      router.push("/"); // Redirect to home page after successful sign-up
    } catch (error: any) {
      // Error is handled by AuthForm, but re-throw to fulfill promise type for AuthForm
      throw error;
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem-1px)] flex-col items-center justify-center p-4">
      <AuthForm mode="signUp" onSubmit={handleSignUp} />
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/auth/sign-in" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
