"use client";

import {
  BarChart3Icon,
  Clock3Icon,
  FileTextIcon,
  GitCompareIcon,
  Layers3Icon,
} from "lucide-react";

import { cn } from "@/lib/utils";

const features = [
  {
    icon: Layers3Icon,
    title: "多维测评",
    description: "从价值、场景、成本、风险等角度全面评估。",
  },
  {
    icon: GitCompareIcon,
    title: "四种测评模式",
    description: "快速测评、深度测评、工具对比、试点方案。",
  },
  {
    icon: FileTextIcon,
    title: "结构化报告",
    description: "生成专业评估报告，支持复制与 PDF 导出。",
  },
  {
    icon: BarChart3Icon,
    title: "试点建议",
    description: "提供 2-4 周试点路径，降低落地风险。",
  },
  {
    icon: Clock3Icon,
    title: "历史管理",
    description: "保存测评记录，便于复盘与跟踪。",
  },
];

export function WhatsNewSection({ className }: { className?: string }) {
  return (
    <section
      id="features"
      className={cn("bg-white px-4 py-20", className)}
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
            为 AI 运营团队而设计
          </h2>
          <p className="mt-3 text-base text-slate-500 md:text-lg">
            从工具测评到试点方案，覆盖完整研究流程。
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <feature.icon className="size-6" />
              </div>
              <h3 className="text-base font-semibold text-slate-950">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
