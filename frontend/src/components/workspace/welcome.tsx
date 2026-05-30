"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useI18n } from "@/core/i18n/hooks";
import { cn } from "@/lib/utils";

import { AuroraText } from "../ui/aurora-text";

let waved = false;

const TOOL_EVALUATION_PROMPT_EVENT = "deerflow:tool-evaluation-prompt";

const evaluationTypes = ["快速测评", "深度测评", "工具对比", "试点方案"];

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
  const isUltra = useMemo(() => mode === "ultra", [mode]);
  const [evaluationType, setEvaluationType] = useState("快速测评");
  const [toolName, setToolName] = useState("Dify");
  const [scenario, setScenario] = useState(
    "内容运营团队搭建知识库和自动化工作流",
  );
  const [focus, setFocus] = useState(
    "上手成本、替代方案、落地风险、试点路径",
  );
  const [generated, setGenerated] = useState(false);
  const colors = useMemo(() => {
    if (isUltra) {
      return ["#efefbb", "#e9c665", "#e3a812"];
    }
    return ["var(--color-foreground)"];
  }, [isUltra]);
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
        "mx-auto flex w-full flex-col items-center justify-center gap-3 px-8 py-6 text-center",
        className,
      )}
    >
      <div className="text-2xl font-bold">
        {isSkillMode ? (
          `✨ ${t.welcome.createYourOwnSkill} ✨`
        ) : (
          <div className="flex items-center gap-2">
            <div className={cn("inline-block", !waved ? "animate-wave" : "")}>
              {isUltra ? "🚀" : "👋"}
            </div>
            <AuroraText colors={colors}>{t.welcome.greeting}</AuroraText>
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
            <p>输入工具名称、使用场景和关注重点，生成结构化测评报告。</p>
          </div>
          <div className="bg-background/70 border-border/70 mt-4 w-full max-w-xl rounded-xl border p-5 text-left shadow-xs backdrop-blur-sm">
            <div className="flex flex-col gap-3 border-b border-border/60 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-foreground text-sm font-semibold">
                AI 工具测评启动器
              </div>
              <div className="grid grid-cols-2 gap-1 rounded-lg bg-muted/50 p-1 text-xs sm:flex">
                {evaluationTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={cn(
                      "rounded-md px-2.5 py-1.5 transition-colors",
                      evaluationType === type
                        ? "bg-background text-foreground shadow-xs"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                    onClick={() => {
                      setEvaluationType(type);
                      setGenerated(false);
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4 grid gap-3 text-sm">
              <label className="bg-muted/40 grid gap-1.5 rounded-md px-3 py-3">
                <span className="text-muted-foreground text-xs">工具名称</span>
                <input
                  className="text-foreground placeholder:text-muted-foreground/70 bg-transparent outline-none"
                  value={toolName}
                  onChange={(event) => {
                    setToolName(event.target.value);
                    setGenerated(false);
                  }}
                  placeholder="Dify"
                />
              </label>
              <label className="bg-muted/40 grid gap-1.5 rounded-md px-3 py-3">
                <span className="text-muted-foreground text-xs">使用场景</span>
                <textarea
                  className="text-foreground placeholder:text-muted-foreground/70 min-h-12 resize-none bg-transparent outline-none"
                  value={scenario}
                  onChange={(event) => {
                    setScenario(event.target.value);
                    setGenerated(false);
                  }}
                  placeholder="内容运营团队搭建知识库和自动化工作流"
                  rows={2}
                />
              </label>
              <label className="bg-muted/40 grid gap-1.5 rounded-md px-3 py-3">
                <span className="text-muted-foreground text-xs">关注重点</span>
                <textarea
                  className="text-foreground placeholder:text-muted-foreground/70 min-h-12 resize-none bg-transparent outline-none"
                  value={focus}
                  onChange={(event) => {
                    setFocus(event.target.value);
                    setGenerated(false);
                  }}
                  placeholder="上手成本、替代方案、落地风险、试点路径"
                  rows={2}
                />
              </label>
            </div>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
              <button
                type="button"
                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors"
                onClick={handleGeneratePrompt}
              >
                生成测评问题
              </button>
              <div className="text-muted-foreground text-xs">
                {generated
                  ? "已生成测评问题，可在下方输入框中确认后发送。"
                  : "生成后会填入下方输入框，不会自动发送。"}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
