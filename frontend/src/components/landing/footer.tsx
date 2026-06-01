import { cn } from "@/lib/utils";

export type FooterProps = {
  className?: string;
};

export function Footer({ className }: FooterProps) {
  return (
    <footer
      id="about"
      className={cn("border-t border-slate-200 bg-white px-4 py-8", className)}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="font-semibold text-slate-950">
            AI Tool Research｜AI工具深度测评系统
          </div>
          <div className="mt-1">基于 DeerFlow 的场景化改造版本</div>
        </div>
        <div>© 2026 AI Tool Research. All rights reserved.</div>
      </div>
    </footer>
  );
}
