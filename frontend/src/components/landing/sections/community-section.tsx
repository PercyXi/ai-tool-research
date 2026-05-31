"use client";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { AuroraText } from "@/components/ui/aurora-text";
import { Button } from "@/components/ui/button";

import { Section } from "../section";

export function CommunitySection() {
  return (
    <Section
      title={
        <AuroraText colors={["#60A5FA", "#A5FA60", "#A560FA"]}>
          Open Source Foundation
        </AuroraText>
      }
      subtitle="AI Tool Research is a scenario-focused demo built on the original DeerFlow open-source project."
    >
      <div className="flex justify-center">
        <Button className="text-xl" size="lg" asChild>
          <Link
            href="https://github.com/bytedance/deer-flow"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubLogoIcon />
            查看 DeerFlow 原项目源码
          </Link>
        </Button>
      </div>
    </Section>
  );
}
