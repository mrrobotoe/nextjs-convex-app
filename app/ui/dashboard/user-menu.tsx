'use client';
import { useAuthActions } from '@convex-dev/auth/react';
import { api } from 'convex/_generated/api';
import { Preloaded, usePreloadedQuery, useQuery } from 'convex/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/app/ui/alert-dialog';
import { ChevronDown, SquarePenIcon } from 'lucide-react';
import { Button } from '../button';

export default function UserMenu({
  preloadedUser,
}: {
  preloadedUser: Preloaded<typeof api.users.viewer>;
}) {
  const user = usePreloadedQuery(preloadedUser);

  const { signOut } = useAuthActions();

  return (
    <>
      <AlertDialog>
        <DropdownMenu>
          <div className='flex items-center justify-between mt-2'>
            <DropdownMenuTrigger className='pl-1 px-3 text-left flex items-center rounded-sm hover:bg-black/10'>
              <div className='my-0.5 px-1 flex gap-1 items-center'>
                <div className='size-8 flex items-center'>
                  <img
                    src={user?.image}
                    alt='user-avatar'
                    className='h-6 w-6 rounded-sm'
                  />
                </div>
                <div className='flex flex-col'>
                  <h2 className='text-ellipsis overflow-hidden text-xs font-semibold'>
                    {user?.name ?? user?.email}
                  </h2>
                </div>
              </div>
              <ChevronDown className='ml-1 stroke-gray-600 size-4' />
            </DropdownMenuTrigger>
            <Button
              variant='outline'
              size='icon'
              className='shrink-0 h-7 w-7 px-1 mr-1 bg-stone-100 hover:bg-white dark:bg-slate-600 group'
            >
              <SquarePenIcon className='dark:stroke-gray-400 group-hover:dark:stroke-white' />
            </Button>
          </div>
          <DropdownMenuContent
            align='start'
            className='w-[195px] bg-white dark:bg-slate-900'
          >
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
            <AlertDialogTrigger className='w-full'>
              <DropdownMenuItem className='text-red-600 font-semibold w-full'>
                Log out
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to log out?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Please make sure you have saved any changes before logging out.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => signOut()}>
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
