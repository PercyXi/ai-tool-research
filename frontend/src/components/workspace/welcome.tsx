"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

import { useI18n } from "@/core/i18n/hooks";
import { cn } from "@/lib/utils";

import { AuroraText } from "../ui/aurora-text";

let waved = false;

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
  const colors = useMemo(() => {
    if (isUltra) {
      return ["#efefbb", "#e9c665", "#e3a812"];
    }
    return ["var(--color-foreground)"];
  }, [isUltra]);
  useEffect(() => {
    waved = true;
  }, []);
  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-col items-center justify-center gap-2 px-8 py-4 text-center",
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
            {t.welcome.description.includes("\n") ? (
              <pre className="font-sans whitespace-pre">
                {t.welcome.description}
              </pre>
            ) : (
              <p>{t.welcome.description}</p>
            )}
          </div>
          <div className="bg-background/70 border-border/70 mt-3 w-full max-w-xl rounded-xl border p-4 text-left shadow-xs backdrop-blur-sm">
            <div className="text-foreground text-sm font-semibold">
              开始一次 AI 工具测评
            </div>
            <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
              按照“工具名称 + 使用场景 + 关注重点”描述你的问题，系统会围绕工具价值、适用场景、成本风险和试点路径生成研究结论。
            </p>
            <div className="mt-3 grid gap-2 text-xs">
              <div>
                <span className="text-muted-foreground">工具名称：</span>
                <span className="text-foreground font-medium">Dify</span>
              </div>
              <div>
                <span className="text-muted-foreground">使用场景：</span>
                <span className="text-foreground">
                  内容运营团队搭建知识库和自动化工作流
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">关注重点：</span>
                <span className="text-foreground">
                  上手成本、替代方案、落地风险、试点路径
                </span>
              </div>
            </div>
            <p className="text-muted-foreground mt-3 text-xs leading-relaxed">
              你可以直接复制这个结构，在下方输入框中替换成自己的工具和场景。
            </p>
          </div>
        </>
      )}
    </div>
  );
}
