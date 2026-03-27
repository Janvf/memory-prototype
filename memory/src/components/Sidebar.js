"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, TrendingUp, User, AlertTriangle } from "lucide-react";
import { clients, challenges } from "@/data/data";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[240px] bg-sidebar-bg border-r border-border flex flex-col z-10">
      {/* Logo */}
      <div className="px-5 pt-6 pb-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
            <span className="text-white text-xs font-semibold font-mono">A</span>
          </div>
          <span className="text-[16px] font-semibold text-primary tracking-tight">
            Aurora AI
          </span>
        </Link>
      </div>

      {/* Feed link */}
      <div className="px-3 mb-2">
        <Link
          href="/"
          className={`flex items-center gap-2.5 px-2 py-1.5 rounded-md text-[13px] transition-colors ${
            pathname === "/"
              ? "text-primary font-medium bg-white shadow-card"
              : "text-secondary hover:text-primary hover:bg-white/60"
          }`}
        >
          <LayoutGrid size={15} />
          Feed
        </Link>
      </div>

      {/* Challenges link */}
      <div className="px-3 mb-2">
        <Link
          href="/challenges"
          className={`flex items-center gap-2.5 px-2 py-1.5 rounded-md text-[13px] transition-colors ${
            pathname === "/challenges"
              ? "text-primary font-medium bg-white shadow-card"
              : "text-secondary hover:text-primary hover:bg-white/60"
          }`}
        >
          <AlertTriangle size={15} />
          Challenges
          <span className="ml-auto text-[10px] font-mono bg-amber/10 text-amber px-1.5 py-0.5 rounded-full">
            {challenges.length}
          </span>
        </Link>
      </div>

      {/* Clients */}
      <div className="px-3 mt-4">
        <span className="px-2 text-[11px] font-mono uppercase text-tag-text tracking-wider">
          Clients
        </span>
        <div className="mt-2 space-y-0.5">
          {clients.map((client) => {
            const href =
              client.id === "chanel" ? "/clients/chanel" : "#";
            const isActive = pathname === `/clients/${client.id}`;

            return (
              <Link
                key={client.id}
                href={href}
                className={`flex items-center gap-2.5 px-2 py-1.5 rounded-md text-[13px] transition-colors ${
                  isActive
                    ? "text-primary font-medium bg-white shadow-card"
                    : client.active
                    ? "text-primary hover:bg-white/60"
                    : "text-tag-text hover:text-secondary"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isActive
                      ? "bg-primary"
                      : client.active
                      ? "bg-secondary"
                      : "bg-tag-text/40"
                  }`}
                />
                {client.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Personal */}
      <div className="px-3 mt-4">
        <span className="px-2 text-[11px] font-mono uppercase text-tag-text tracking-wider">
          Personal
        </span>
        <div className="mt-2 space-y-0.5">
          <Link
            href="/personal/ai-news"
            className="flex items-center gap-2.5 px-2 py-1.5 rounded-md text-[13px] transition-colors text-tag-text hover:text-secondary"
          >
            <span className="w-2 h-2 rounded-full bg-tag-text/40" />
            AI news
          </Link>
          <Link
            href="/personal/corporate-venturing"
            className="flex items-center gap-2.5 px-2 py-1.5 rounded-md text-[13px] transition-colors text-tag-text hover:text-secondary"
          >
            <span className="w-2 h-2 rounded-full bg-tag-text/40" />
            Corporate venturing news
          </Link>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Growth link */}
      <div className="px-3 mb-3">
        <Link
          href="/growth"
          className={`flex items-center gap-2.5 px-2 py-1.5 rounded-md text-[13px] transition-colors ${
            pathname === "/growth"
              ? "text-primary font-medium bg-white shadow-card"
              : "text-secondary hover:text-primary hover:bg-white/60"
          }`}
        >
          <TrendingUp size={15} />
          Growth
        </Link>
      </div>

      {/* User */}
      <div className="px-3 pb-5 border-t border-border pt-3">
        <div className="flex items-center gap-2.5 px-2">
          <div className="w-7 h-7 rounded-full bg-action flex items-center justify-center">
            <User size={14} className="text-white" />
          </div>
          <div>
            <p className="text-[13px] font-medium text-primary leading-none">
              Annie
            </p>
            <p className="text-[11px] text-secondary font-mono mt-0.5">
              Venture Architect
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
