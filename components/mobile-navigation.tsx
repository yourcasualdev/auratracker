"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, CircleUser, House, Search } from "lucide-react";

const items = [
  { name: "Home", href: "/", icon: House },
  { name: "Search", href: "/search", icon: Search },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Profile", href: "/profile", icon: CircleUser },
];

export function MobileNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-14 items-center justify-between border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex flex-row items-center justify-around space-x-2 w-full">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex h-10 w-10 items-center justify-center rounded-full"
            >
              <item.icon
                className="h-6 w-6 text-black"
                strokeWidth={isActive ? 3 : 2}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
