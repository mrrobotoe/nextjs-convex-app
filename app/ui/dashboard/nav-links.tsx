'use client';

import { cn } from '@/app/lib/utils';
import { InboxIcon, LayersIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Messages', href: '/dashboard/messages', icon: InboxIcon },
  { name: 'My Issues', href: '/dashboard/my-issues', icon: LayersIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            className={cn(
              `${pathname === link.href ? 'bg-stone-300 dark:bg-white/10' : ''}`,
              'group cursor-default px-1 pl-2 my-1 mt-2 py-1 rounded-sm flex gap-2 items-center hover:bg-stone-300 dark:hover:bg-white/10 hover:stroke-white'
            )}
            href={link.href}
            key={link.href}
          >
            <LinkIcon className='size-4 dark:stroke-gray-400 dark:group-hover:stroke-white' />
            <span className='text-sm'>{link.name}</span>
          </Link>
        );
      })}
    </>
  );
}
