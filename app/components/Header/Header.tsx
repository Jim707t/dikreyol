'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Akèy", href: "/" },
  { name: "Alfabè", href: "/alphabet" },
  { name: "Istwa", href: "/istwa" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur border-b border-mist">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 min-h-14 sm:min-h-16">
        <Link href="/" className="flex items-center gap-2 group whitespace-nowrap">
          <span className="flex flex-col gap-[3px]" aria-hidden="true">
            <span className="w-5 h-[7px] rounded-sm bg-blueht" />
            <span className="w-5 h-[7px] rounded-sm bg-redht" />
          </span>
          <span className="font-display font-bold text-lg sm:text-xl tracking-tight group-hover:text-blueht transition-colors">
            Diksyonè Kreyòl
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2 mx-auto sm:mx-0">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-sm whitespace-nowrap transition-colors ${
                pathname === link.href
                  ? "bg-blueht text-white"
                  : "text-ink-soft hover:text-blueht hover:bg-blueht-soft"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <a
            href="https://add.diksyonekreyol.org"
            className="ml-1 px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-sm whitespace-nowrap border border-redht text-redht hover:bg-redht hover:text-white transition-colors"
          >
            + Ajoute
          </a>
        </nav>
      </div>
    </header>
  );
}
