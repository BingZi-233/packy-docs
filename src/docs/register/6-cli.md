---
title: 配置 CLI 工具
icon: mdi:console
order: 6
---

PackyAPI 支持在命令行中使用 Claude Code、Codex、Grok Build。

::: warning 不提供 Gemini CLI 教程
Google 官方 **Gemini CLI** 目前稳定性较差，几乎无法正常使用，本站**不再提供**其安装与配置教程。

若需要使用 Gemini 模型，请改用 Cline、Roo Code、OpenCode 等支持 OpenAI 兼容接口的工具，详见 [Gemini 相关问题](/docs/faq/Gemini.html)。
:::

## 基础条件

开始配置 CLI 前，请先完成以下步骤：

1. 完成 [环境检查](/docs/register/5-env.html)，确保 Node.js 和 npm 可以正常使用。
2. 完成 [安装 CLI](/docs/cli/1-env.html#_2-安装cli)，安装 Claude Code、Codex 或 Grok Build。

## API 端点说明

登录控制台后，可以在“数据看板”右侧查看当前可用的 API Endpoint。

![](/assets/image/QuickStart/009.webp)

- 主站 Endpoint：`https://www.packyapi.ai`，稳定可靠，适合生产环境。
- 优化线路 Endpoint：`https://api-slb.packyapi.com`，优化线路，适合对延迟敏感的场景。

::: warning OpenAI 兼容端点需要添加 `/v1`
如果你使用的是 OpenAI 兼容格式的客户端或工具，例如 Codex、OpenAI SDK、Cherry Studio 的 OpenAI 兼容配置，请在 API 地址后添加 `/v1`：

```bash
https://www.packyapi.ai/v1
https://api-slb.packyapi.com/v1
```

如果使用的是 Claude Code 等专用配置，请以对应教程中的示例为准。
:::

::: important 推荐配置
为了让配置过程进行轻便简单，我们**极力推荐**使用 Github 开源项目 [CC-Switch](https://github.com/farion1231/cc-switch) 来对使用环境进行配置。

[CC-Switch 配置 Claude Code、Codex 教程](/docs/ccswitch/)

如果你是老鸟，或者不愿意使用此工具，可以参考以下 CLI 配置教程文档，**但我们还是极力推荐使用此工具，能省很多时间！**
:::

::: info CLI 手动配置教程传送门

注意：不管你是使用哪个 CLI，请一定先完成上方基础条件，确保 Node.js、npm 和对应 CLI 都可以正常使用。

[Claude Code配置教程](/docs/cli/2-claude.html)

[Codex配置教程](/docs/cli/3-codex.html)

[Grok Build配置教程](/docs/cli/6-grok-build.html)
:::
