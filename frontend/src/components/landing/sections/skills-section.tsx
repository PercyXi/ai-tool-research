import { cn } from "@/lib/utils";

const steps = [
  "选择测评类型",
  "填写工具与场景",
  "生成结构化报告",
  "复盘历史测评",
];

export function SkillsSection({ className }: { className?: string }) {
  return (
    <section id="workflow" className={cn("bg-slate-50 px-4 py-16", className)}>
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">
            测评流程
          </h2>
          <p className="mt-3 text-slate-500">
            用最少输入获得可复用的工具评估结论。
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-4 flex size-8 items-center justify-center rounded-full bg-indigo-50 text-sm font-semibold text-indigo-600">
                {index + 1}
              </div>
              <div className="font-medium text-slate-950">{step}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
