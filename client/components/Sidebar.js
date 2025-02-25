'use client';
import { sidebarLinks } from '@/lib/constant';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Sidebar = ({ user }) => {
    const pathname = usePathname();

    return (
        <section className='sidebar'>
            <nav className='flex flex-col gap-4'>
                <Link
                    href='/'
                    className='mb-12 cursor-pointer flex items-center gap-2'>
                    <Image
                        src='/icons/logo2.svg'
                        alt='logo'
                        width={50}
                        height={50}
                        className='size-[50px] max-xl:size-25' />
                    <h1 className='sidebar-logo'>
                        Financial Hub
                    </h1>
                </Link>
                {sidebarLinks.map((item) => {
                    const isActive = pathname === item.route; // Exact match for active route

                    return (
                        <Link href={item.route} key={item.label}
                            className={cn('sidebar-link', {
                                'bg-cyan-700': isActive // Apply the active background color
                            })}
                        >
                            <div className='relative size-6'>
                                <Image
                                    src={item.imgURL}
                                    alt={item.label}
                                    fill
                                    className={cn({ 'brightness-[3] invert-0': isActive })}
                                />
                            </div>
                            <p className={cn(
                                'sidebar-label', {
                                    '!text-white': isActive // Change text color when active
                                }
                            )}>{item.label}</p>
                        </Link>
                    )
                })}
                {/* User Section (Optional) */}
                <div className='sidebar-user'>
                    <p>{user?.firstName || 'Guest'}</p>
                </div>
            </nav>

            {/* Footer Section (Optional) */}
            <footer className='sidebar-footer'>
                Footer Content
            </footer>
        </section>
    );
};

export default Sidebar;
