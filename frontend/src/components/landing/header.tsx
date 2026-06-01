import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { Locale } from "@/core/i18n/locale";
import { cn } from "@/lib/utils";

export type HeaderProps = {
  className?: string;
  homeURL?: string;
  locale?: Locale;
};

export async function Header({ className, homeURL }: HeaderProps) {
  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-20 mx-auto flex h-16 items-center justify-center px-4",
        className,
      )}
    >
      <div className="flex h-12 w-full max-w-6xl items-center justify-between rounded-2xl border border-slate-200/70 bg-white/85 px-5 shadow-sm backdrop-blur-xl">
        <Link href={homeURL ?? "/"} className="text-sm font-semibold sm:text-base">
          AI Tool Research｜AI工具深度测评系统
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
          <a className="transition hover:text-slate-950" href="#features">
            功能介绍
          </a>
          <a className="transition hover:text-slate-950" href="#workflow">
            测评流程
          </a>
          <a className="transition hover:text-slate-950" href="#about">
            关于我们
          </a>
        </nav>
        <Button asChild className="h-9 rounded-lg bg-slate-950 px-4 text-sm text-white hover:bg-slate-800">
          <Link href="/workspace">进入测评工作台</Link>
        </Button>
      </div>
    </header>
  );
}
