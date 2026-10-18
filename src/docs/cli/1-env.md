---
title: 环境确认（Node.js 与 npm）
icon: mdi:tools
order: 1
redirectFrom: /docs/register/5-env.html
---

装任何 CLI 之前，先确认本机已经装好 **Node.js** 与 **npm**，并且版本满足要求。本页只做检查，不安装 CLI；每个 CLI 的安装放在它自己的页面里。

## （1）确认已经安装

在 Windows、macOS 或 Linux 终端执行：

```bash
node --version
npm --version
```

![](/assets/image/Cli/027.webp)

两条命令都能打印出版本号（上图是 `v22.22.3` 和 `11.17.0`），说明环境已经装好。

如果提示“命令未找到”或类似错误，说明 Node.js 还没装，或者装了但没有加入系统环境变量，请先看 [（3）没装或版本不够怎么办](#_3-没装或版本不够怎么办)。

## （2）版本要求与推荐

推荐直接安装 **Node.js 22 LTS** 或 **24 LTS**。npm 会随 Node.js 一起装上，不需要单独安装。

| 组件 | 推荐版本 | 说明 |
| --- | --- | --- |
| Node.js | 22 LTS（v22.23.3）或 24 LTS（v24.22.0） | 两条 LTS 线都满足下表所有 CLI 的要求 |
| npm | 随 Node.js 自带，一般不用单独装 | 官方安装包 22 LTS 自带 npm 10.9.9、24 LTS 自带 npm 11.19.1；单独升级过 npm 的话版本会更高，以 `npm --version` 实际输出为准 |

各 CLI 自己声明的 Node.js 最低版本（数据取自 npm registry 的 `engines.node` 字段）：

| CLI | npm 包 | 包版本 | 要求 |
| --- | --- | --- | --- |
| Claude Code | `@anthropic-ai/claude-code` | 2.1.302 | Node.js ≥ 22.0.0 |
| Codex | `@openai/codex` | 0.163.0 | Node.js ≥ 16 |
| Kimi Code | `@moonshot-ai/kimi-code` | 2.2.0 | Node.js ≥ 22.19.0 |

以上包版本与版本要求查询于 2026-10-18，上游发新版后以 npm registry 实际显示为准。

::: warning 要用 Kimi Code，Node.js 必须 ≥ 22.19.0
三个 CLI 里 Kimi Code 的要求最高（`≥ 22.19.0`）。低于这个版本安装 Kimi Code 会失败；22 LTS 与 24 LTS 的当前版本都满足。
:::

::: tip Grok Build 不用 npm 装
Grok Build 走官方安装脚本，不通过 npm 全局安装，安装命令见 [Grok Build配置](/docs/cli/6-grok-build.html#安装-grok-build)。
:::

## （3）没装或版本不够怎么办

1. 到 Node.js 官网下载并安装 **22 LTS** 或 **24 LTS**：<https://nodejs.org/zh-cn/download>
   想要图文步骤的话，也可以照着 [Node.js 安装教程](https://www.runoob.com/nodejs/nodejs-install-setup.html) 做。
2. 安装完成后**重新打开一个终端**，再执行一次 `node --version` 和 `npm --version`，能打印版本号就说明装好了。
3. 版本低于要求（例如要用 Kimi Code，需要 ≥ 22.19.0）时，直接安装新版覆盖旧版即可，不需要先卸载。

## 确认通过之后

环境确认通过，再去装你要用的那个 CLI，安装与配置都在各自页面里：

- [Claude Code配置](/docs/cli/2-claude.html)
- [Codex配置](/docs/cli/3-codex.html)
- [Grok Build配置](/docs/cli/6-grok-build.html)
- [Kimi Code配置](/docs/cli/7-kimi-code.html)
