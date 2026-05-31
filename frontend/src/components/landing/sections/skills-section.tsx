"use client";

import { cn } from "@/lib/utils";

import ProgressiveSkillsAnimation from "../progressive-skills-animation";
import { Section } from "../section";

export function SkillsSection({ className }: { className?: string }) {
  return (
    <Section
      className={cn("h-[calc(100vh-64px)] w-full bg-white/2", className)}
      title="Agent Skills"
      subtitle={
        <div>
          Agent Skills help the system focus on the right evaluation workflow —
          only what&apos;s needed, when it&apos;s needed.
          <br />
          AI Tool Research uses them to guide tool evaluation, landing risk,
          pilot planning, and structured report output.
        </div>
      }
    >
      <div className="relative overflow-hidden">
        <ProgressiveSkillsAnimation />
      </div>
    </Section>
  );
}
