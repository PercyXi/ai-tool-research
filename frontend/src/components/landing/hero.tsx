"use client";

import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "relative flex min-h-[680px] overflow-hidden bg-white px-4 pt-24",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.18),transparent_28%),radial-gradient(circle_at_78%_30%,rgba(59,130,246,0.16),transparent_26%),linear-gradient(135deg,#ffffff_0%,#f8f7ff_48%,#eef5ff_100%)]" />
      <div className="absolute inset-0 opacity-45 [background-image:radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:20px_20px]" />
      <div className="absolute -right-24 top-20 size-72 rounded-full border border-indigo-100/80" />
      <div className="absolute -bottom-28 left-10 size-80 rounded-full border border-blue-100/80" />
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-center py-20">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex rounded-full border border-indigo-100 bg-white/70 px-3 py-1 text-sm text-indigo-700 shadow-sm">
            AI 运营团队的工具研究工作台
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-slate-950 md:text-7xl">
            AI Tool Research
            <span className="mt-3 block text-4xl md:text-6xl">
              AI工具深度测评系统
            </span>
          </h1>
          <p className="mt-7 text-2xl font-medium text-slate-800">
            面向 AI 运营团队的工具测评与研究工作台
          </p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
            围绕 AI 工具价值、适用场景、上手成本、替代方案与落地风险，
            生成结构化研究结论和试点建议。
          </p>
          <Button asChild className="mt-8 h-12 rounded-xl bg-slate-950 px-6 text-base text-white shadow-lg shadow-slate-950/10 hover:bg-slate-800">
            <Link href="/workspace">
              进入测评工作台
              <ArrowRightIcon className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
