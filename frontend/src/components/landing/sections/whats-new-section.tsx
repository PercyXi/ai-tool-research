"use client";

import MagicBento, { type BentoCardProps } from "@/components/ui/magic-bento";
import { cn } from "@/lib/utils";

import { Section } from "../section";

const COLOR = "#0a0a0a";
const features: BentoCardProps[] = [
  {
    color: COLOR,
    label: "Evaluation",
    title: "AI 工具测评",
    description: "围绕工具价值、适用场景和落地条件形成判断",
  },
  {
    color: COLOR,
    label: "Workflow",
    title: "工具选型流程",
    description:
      "支持快速测评、深度测评、工具对比和试点方案",
  },
  {
    color: COLOR,
    label: "Report",
    title: "结构化报告",
    description:
      "输出包含摘要卡、风险判断、替代方案和最终建议的 Markdown 报告",
  },

  {
    color: COLOR,
    label: "Risk",
    title: "落地风险识别",
    description: "关注成本、权限安全、维护复杂度和团队采用风险",
  },
  {
    color: COLOR,
    label: "Pilot",
    title: "2-4 周试点方案",
    description: "把测评结论转化为可执行的试点目标和验收指标",
  },
  {
    color: COLOR,
    label: "Reuse",
    title: "报告复用",
    description: "支持复制 Markdown 和通过浏览器保存 PDF",
  },
];

export function WhatsNewSection({ className }: { className?: string }) {
  return (
    <Section
      className={cn("", className)}
      title="AI Tool Research 工作台能力"
      subtitle="面向 AI 运营团队的工具测评、选型研究、风险判断和试点方案生成。"
    >
      <div className="flex w-full items-center justify-center">
        <MagicBento data={features} />
      </div>
    </Section>
  );
}
