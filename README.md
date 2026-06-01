# AI Tool Research｜AI工具深度测评系统

AI Tool Research 是一个基于 DeerFlow 改造的 AI 工具测评与运营研究工作台，面向 AI 运营、AI 工具运营、AI 产品运营等场景，用于评估 AI 工具的工具价值、适用场景、上手成本、替代方案、落地风险和试点路径。

当前版本定位为作品展示 Demo，重点展示基于成熟开源 Agent 产品进行场景化改造、Prompt / Skill / Agent 工作流调优，以及面向具体业务场景的产品化表达能力。

## 项目简介

本项目不是从零开发底层 Agent 系统，而是基于 DeerFlow 的场景化产品改造。DeerFlow 原本具备 Agent 执行、研究报告、Markdown 输出、工具调用等基础能力，适合作为 AI 工具研究类产品的底座。

本项目的改造重点包括：

- 产品定位：从通用研究工具收敛为 AI 工具测评与运营研究工作台。
- Workspace 入口：增加面向 AI 工具测评场景的启动器。
- 测评启动器：支持选择测评类型，并生成自然的用户问题。
- 报告结构：引导模型输出稳定的 AI 工具测评报告。
- 执行策略：为 AI 工具测评类问题增加 Fast Evaluation Mode，减少不必要的长链路 Deep Research。
- 报告复用：支持复制报告，以及通过浏览器打印保存 PDF。

这个项目适合用于展示 AI 工具理解、Prompt / Agent 调优、产品化改造和运营研究能力。

## 核心功能

- AI 工具测评启动器
- 四种测评模式：快速测评、深度测评、工具对比、试点方案
- 结构化 AI 工具测评报告
- 测评摘要卡
- 1-9 报告结构
- 报告复制
- 保存 PDF / 打印
- 历史测评标题优化
- AI 工具测评 Fast Evaluation Mode

## 产品流程

1. 选择测评类型。
2. 输入工具名称、使用场景和关注重点。
3. 生成测评问题。
4. 用户确认后发送。
5. 系统生成结构化测评报告。
6. 复制报告或保存 PDF。

## 四种测评模式

| 测评模式 | 适合场景 | 输出重点 |
|---|---|---|
| 快速测评 | 快速判断某个 AI 工具是否值得试点 | 清晰结论、适合/不适合场景、主要风险、试点建议 |
| 深度测评 | 需要较完整评估工具价值和落地条件 | 工具定位、核心能力、上手成本、替代方案、落地风险、试点方案 |
| 工具对比 | 在多个工具或替代方案之间做选型 | 对比表、关键差异、适合团队、选型建议 |
| 试点方案 | 已确定候选工具，需要设计小范围落地路径 | 2-4 周试点计划、参与角色、执行步骤、验收指标、风险控制 |

## 技术栈

- Frontend: Next.js / React / TypeScript / Tailwind CSS
- Backend: DeerFlow 原有后端能力
- Agent / Prompt: DeerFlow Agent + Skill + Fast Evaluation Mode
- Docker: 本地开发环境
- Report: Markdown 渲染、复制、打印导出

## 主要改造点

- 首页和登录页品牌重塑
- Workspace 测评启动器
- consulting-analysis skill 扩展
- lead agent Fast Evaluation Mode
- title prompt 优化
- 报告复制和 PDF 保存
- 设置和 About 页面品牌收口

## 本地运行

以下命令以 Windows PowerShell 为例。

后端：

```powershell
$env:HOME="C:\Users\lenovo"
$env:DEER_FLOW_ROOT="D:\Projects\deer-flow"

cd D:\Projects\deer-flow
docker compose -p deer-flow-dev -f docker\docker-compose-dev.yaml up -d gateway
curl.exe http://localhost:8001/api/v1/auth/setup-status
```

前端：

```powershell
cd D:\Projects\deer-flow\frontend
pnpm exec next dev --webpack
```

访问：

```text
http://localhost:3000
```

注意：不要把真实 `.env`、API Key 或私有模型配置上传到 GitHub。

## 项目说明

- DeerFlow 是原开源项目。
- AI Tool Research 是基于 DeerFlow 做的场景化改造 Demo。
- 本项目主要用于学习、作品展示和 AI 工具测评流程验证。
- 原项目版权和协议以 DeerFlow 原仓库为准。

## 适合展示的能力

- AI 工具选型与评估能力
- AI 运营场景理解
- Prompt / Skill / Agent 工作流调优
- 产品化改造能力
- 结构化报告设计能力
- 低风险迭代和版本管理能力

## 截图

后续补充截图。
