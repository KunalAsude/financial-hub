'use client';

import React from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Image from 'next/image';
import Link from 'next/link';
import { sidebarLinks } from '@/lib/constant';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const MobileNavbar = ({ user }) => {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/icons/hamburger.svg"
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-white">
          <SheetTitle />
          <SheetDescription />
          <Link
            href="/"
            className="cursor-pointer flex items-center gap-2 px-4 py-4"
          >
            <Image
              src="/icons/logo2.svg"
              alt="logo"
              width={34}
              height={34}
            />
            <h1 className="text-[26px] font-ibm-plex-serif font-bold text-black">
              Financial Hub
            </h1>
          </Link>
          <nav className="flex flex-col gap-6 pt-6">
            {sidebarLinks.map((item) => {
              const isActive =
                pathname === item.route || pathname.startsWith(item.route);

              return (
                <SheetClose asChild key={item.route}>
                  <Link
                    href={item.route}
                    className={cn('mobilenav-sheet_close w-full', {
                      'bg-bank-gradient': isActive,
                    })}
                  >
                    <Image
                      src={item.imgURL}
                      alt={item.label}
                      width={20}
                      height={20}
                      className={cn({ 'brightness-[3] invert-0': isActive })}
                    />
                    <p
                      className={cn('text-16 font-semibold text-black-2', {
                        'text-white': isActive,
                      })}
                    >
                      {item.label}
                    </p>
                  </Link>
                </SheetClose>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNavbar;
