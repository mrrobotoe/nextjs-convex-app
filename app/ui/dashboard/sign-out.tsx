"use client";
import { Button } from '@/app/ui/button';
import { useAuthActions } from "@convex-dev/auth/react";
import { LogOut } from "lucide-react";

export default function SignOut() {
  const { signOut } = useAuthActions();
  return (
    <form
      className='mt-auto bg-gray-50'
      action={async () => {
        signOut();
      }}
    >
      <Button
        className='flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'
        variant='outline'
        type='submit'
        size='icon'
      >
        <LogOut />
        Sign out
      </Button>
    </form>
  );
}
