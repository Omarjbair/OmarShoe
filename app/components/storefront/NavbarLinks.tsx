"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const navbarLinks = [
    {
        id:213,
        name: 'Home',
        href: '/'
    },
    {
        id:214,
        name: 'All Products',
        href: '/products/all'
    },
    {
        id:215,
        name: 'Men',
        href: '/products/men'
    },
    {
        id:216,
        name: 'Women',
        href: '/products/women'
    },
    {
        id:217,
        name: 'Kids',
        href: '/products/kids'
    },
    {
        id:218,
        name: 'Dashboard',
        href: '/dashboard'
    },
];


const NavbarLinks = () => {
    const location = usePathname();

    return (
        <div className="flex max-md:flex-col justify-center items-center gap-x-2 ml-0 md:ml-8">
            {
                navbarLinks.map((item) => (
                    <Link className={cn(location===item.href?"bg-muted":"hover:bg-muted hover:bg-opacity-75","group p-2 font-medium rounded-md duration-200 transition-colors")} key={item.id} href={item.href}>{item.name}</Link>
                ))
            }
        </div>
    );
};

export default NavbarLinks;
