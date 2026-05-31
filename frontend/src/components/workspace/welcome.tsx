"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { useI18n } from "@/core/i18n/hooks";
import { cn } from "@/lib/utils";

let waved = false;

const TOOL_EVALUATION_PROMPT_EVENT = "deerflow:tool-evaluation-prompt";

const evaluationTypes = ["快速测评", "深度测评", "工具对比", "试点方案"];
const evaluationTypeDescriptions: Record<string, string> = {
  快速测评: "快速判断工具价值",
  深度测评: "全面深入评估",
  工具对比: "多工具对比分析",
  试点方案: "制定试点计划",
};

function formatFocusText(value: string): string {
  const items = value
    .split(/[、，,]/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (items.length <= 1) {
    return value.trim();
  }
  if (items.length === 2) {
    return items.join("和");
  }
  return `${items.slice(0, -1).join("、")}和${items.at(-1)}`;
}

export function Welcome({
  className,
  mode,
}: {
  className?: string;
  mode?: "ultra" | "pro" | "thinking" | "flash";
}) {
  const { t } = useI18n();
  const searchParams = useSearchParams();
  const isSkillMode = searchParams.get("mode") === "skill";
  const [evaluationType, setEvaluationType] = useState("快速测评");
  const [toolName, setToolName] = useState("Dify");
  const [scenario, setScenario] = useState(
    "内容运营团队搭建知识库和自动化工作流",
  );
  const [focus, setFocus] = useState(
    "上手成本、替代方案、落地风险、试点路径",
  );
  const [generated, setGenerated] = useState(false);
  void mode;

  useEffect(() => {
    waved = true;
  }, []);

  const handleGeneratePrompt = useCallback(() => {
    const resolvedToolName = toolName.trim();
    const resolvedScenario = scenario.trim();
    const resolvedFocus = formatFocusText(focus);
    const target =
      resolvedScenario && resolvedToolName
        ? `${resolvedToolName} 是否适合${resolvedScenario}`
        : resolvedToolName || resolvedScenario || "这个 AI 工具";
    const focusText = resolvedFocus ? `，重点看${resolvedFocus}` : "";
    const action =
      evaluationType === "深度测评"
        ? "深入评估"
        : evaluationType === "工具对比"
          ? "对比评估"
          : evaluationType === "试点方案"
            ? "评估并设计试点方案"
            : "快速评估";
    const prompt = `帮我${action} ${target}${focusText}。`;

    window.dispatchEvent(
      new CustomEvent(TOOL_EVALUATION_PROMPT_EVENT, {
        detail: { prompt },
      }),
    );
    setGenerated(true);
  }, [evaluationType, focus, scenario, toolName]);

  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-col items-center justify-center gap-3 px-4 py-3 text-center sm:px-8",
        className,
      )}
    >
      <div className="text-xl font-semibold sm:text-2xl">
        {isSkillMode ? (
          `✨ ${t.welcome.createYourOwnSkill} ✨`
        ) : (
          <div className="flex items-center justify-center gap-2">
            <div className={cn("inline-block", !waved ? "animate-wave" : "")}>
              👋
            </div>
            <span>开始 AI 工具深度测评</span>
          </div>
        )}
      </div>
      {isSkillMode ? (
        <div className="text-muted-foreground text-sm">
          {t.welcome.createYourOwnSkillDescription.includes("\n") ? (
            <pre className="font-sans whitespace-pre">
              {t.welcome.createYourOwnSkillDescription}
            </pre>
          ) : (
            <p>{t.welcome.createYourOwnSkillDescription}</p>
          )}
        </div>
      ) : (
        <>
          <div className="text-muted-foreground text-sm">
            <p>选择测评类型，填写工具与场景，生成结构化评估报告。</p>
          </div>
          <div className="border-border/70 mt-4 w-full max-w-[760px] rounded-2xl border bg-white/95 p-5 text-left shadow-[0_16px_48px_rgba(17,24,39,0.08)] backdrop-blur-sm sm:p-6">
            <div className="text-foreground text-sm font-semibold">
              AI 工具测评启动器
            </div>
            <div className="mt-4 space-y-2">
              <div className="text-muted-foreground text-xs">测评类型</div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {evaluationTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={cn(
                      "rounded-lg border px-3 py-3 text-center transition-colors",
                      evaluationType === type
                        ? "border-amber-300 bg-amber-50 text-amber-700 shadow-xs"
                        : "border-border/70 bg-white text-foreground hover:border-border",
                    )}
                    onClick={() => {
                      setEvaluationType(type);
                      setGenerated(false);
                    }}
                  >
                    <span className="block text-sm font-medium">{type}</span>
                    <span className="text-muted-foreground mt-1 block text-xs">
                      {evaluationTypeDescriptions[type]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-5 grid gap-4 text-sm">
              <label className="grid gap-2 sm:grid-cols-[120px_1fr] sm:items-center">
                <span className="text-foreground text-sm font-medium">
                  工具名称
                </span>
                <input
                  className="border-border/70 placeholder:text-muted-foreground/70 h-10 rounded-lg border bg-white px-3 text-sm outline-none transition-colors focus:border-amber-300"
                  value={toolName}
                  onChange={(event) => {
                    setToolName(event.target.value);
                    setGenerated(false);
                  }}
                  placeholder="Dify"
                />
              </label>
              <label className="grid gap-2 sm:grid-cols-[120px_1fr] sm:items-center">
                <span className="text-foreground text-sm font-medium">
                  使用场景
                </span>
                <textarea
                  className="border-border/70 placeholder:text-muted-foreground/70 min-h-10 resize-none rounded-lg border bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-amber-300"
                  value={scenario}
                  onChange={(event) => {
                    setScenario(event.target.value);
                    setGenerated(false);
                  }}
                  placeholder="内容运营团队搭建知识库和自动化工作流"
                  rows={1}
                />
              </label>
              <label className="grid gap-2 sm:grid-cols-[120px_1fr] sm:items-center">
                <span className="text-foreground text-sm font-medium">
                  关注重点
                </span>
                <textarea
                  className="border-border/70 placeholder:text-muted-foreground/70 min-h-10 resize-none rounded-lg border bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-amber-300"
                  value={focus}
                  onChange={(event) => {
                    setFocus(event.target.value);
                    setGenerated(false);
                  }}
                  placeholder="上手成本、替代方案、落地风险、试点路径"
                  rows={1}
                />
              </label>
            </div>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
              <button
                type="button"
                className="inline-flex h-9 items-center justify-center rounded-lg bg-neutral-950 px-4 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
                onClick={handleGeneratePrompt}
              >
                生成测评问题
              </button>
              <div className="text-muted-foreground text-xs">
                {generated
                  ? "已生成测评问题，可在下方输入框中确认后发送。"
                  : "生成后会填入下方输入框，确认后再发送。"}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
