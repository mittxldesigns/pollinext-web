"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, brand } from "@/lib/content";

export function Nav({ links = nav.links }: { links?: typeof nav.links }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`w-full max-w-6xl rounded-2xl border border-line px-4 py-3 transition-all duration-300 ${
          scrolled ? "bg-black/75 backdrop-blur-xl" : "bg-black/30 backdrop-blur-md"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <a href="/" aria-label={`${brand.name} — home`} className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt={brand.name} className="h-7 w-auto sm:h-8" />
          </a>

          <ul className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm text-muted transition-colors hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a href={nav.cta.href} className="btn-gold hidden px-4 py-2 text-sm sm:inline-block">
              {nav.cta.label}
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-lg border border-line text-white lg:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="mt-3 flex flex-col gap-1 border-t border-line pt-3 lg:hidden">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <a
              href={nav.cta.href}
              onClick={() => setOpen(false)}
              className="btn-gold mt-1 px-4 py-2.5 text-center text-sm"
            >
              {nav.cta.label}
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
