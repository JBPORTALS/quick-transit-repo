"use client";

import {
  auth,
  SignInButton,
  useClerk,
  useSession,
  useSignIn,
} from "@clerk/nextjs";

import { Button } from "@acme/ui/button";

export function AuthShowcase() {
  const { session } = useSession();
  const { openSignIn, signOut } = useClerk();
  const { signIn } = useSignIn();

  if (!session) {
    return <SignInButton />;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        {session && <span>Logged in as {session?.user?.firstName}</span>}
      </p>

      <form>
        <Button
          size="lg"
          formAction={() => {
            signOut();
          }}
        >
          Sign out
        </Button>
      </form>
    </div>
  );
}
