"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useState } from "react";

import { SignInMethodDivider } from "@/app/ui/signin-divider";
import { Input } from "@/app/ui/input";
import { Toaster } from "@/app/ui/toaster";
import { useToast } from "@/app/ui/use-toast";
import { Button } from "@/app/ui/button";

const LoginForm = () => {
  const [step, setStep] = useState<"signIn" | "linkSent">("signIn");

  return (
    <div className="my-auto flex size-full">
      <div className="m-auto flex max-w-[384px] flex-1 flex-col gap-4 pb-8">
        {step === "signIn" ? (
          <>
            <h2 className="text-2xl font-semibold tracking-tight">
              Sign in or create an account
            </h2>
            <SignInWithGitHub />
            <SignInWithGoogle />
            <SignInMethodDivider />
            <SignInWithMagicLink handleLinkSent={() => setStep("linkSent")} />
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold tracking-tight">
              Check your email
            </h2>
            <p>A sign-in link has been sent to your email address.</p>
            <Button
              className="self-start p-0"
              variant="link"
              onClick={() => setStep("signIn")}
            >
              Cancel
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export function SignInWithGitHub() {
  const { signIn } = useAuthActions();
  return (
    <Button
      className="flex-1"
      variant="outline"
      type="button"
      onClick={() => void signIn("github", { redirectTo: "/dashboard" })}
    >
      <GitHubLogoIcon className="mr-2 size-4" /> GitHub
    </Button>
  );
}

export function SignInWithGoogle() {
  const { signIn } = useAuthActions();
  return (
    <Button
      className="flex-1"
      variant="outline"
      type="button"
      onClick={() => void signIn("google", { redirectTo: "/app" })}
    >
      {/* <img alt="google-icon" src={GoggleIcon} className="mr-1.5 size-5" />{" "} */}
      Google
    </Button>
  );
}

function SignInWithMagicLink({
  handleLinkSent,
}: {
  handleLinkSent: () => void;
}) {
  const { signIn } = useAuthActions();
  const { toast } = useToast();
  return (
    <form
      className="flex flex-col"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        signIn("resend", formData)
          .then(handleLinkSent)
          .catch((error) => {
            console.error(error);
            toast({
              title: "Could not send sign-in link",
              variant: "destructive",
            });
          });
      }}
    >
      <label htmlFor="email">Email</label>
      <Input name="email" id="email" className="mb-4" autoComplete="email" />
      <Button type="submit">Send sign-in link</Button>
      <Toaster />
    </form>
  );
}

export { LoginForm };
