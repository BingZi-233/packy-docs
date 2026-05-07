---
title: DS接入CC
icon: simple-icons:deepseek
---

## 前置准备

本教程用于将 **DeepSeek** 分组接入 **Claude Code** 使用。开始前请先确认本地已经完成 Claude Code 安装；如果还没有安装，可以先参考 [Claude Code配置](/docs/cli/2-claude.html) 中的安装与基础配置步骤。

## 创建 DeepSeek 令牌

1. 回顾 [创建 API 令牌](/docs/register/4-token.html)，在 PackyApi 中创建新的 API 令牌。

2. 名称可以填写 `deepseek-officially`，令牌分组请选择 `deepseek-officially`。创建完成后，复制生成的 API Key，后续配置会用到。

![](/assets/image/Advanced/DeepSeekClaudeCode/01.webp)

## 使用 CC Switch 配置

::: tip 推荐方式
如果你不熟悉 Claude Code 的 `settings.json`，建议优先使用 CC Switch 配置。
:::

1. 打开 CC Switch，在 Claude Code 配置中点击 `添加供应商`。

2. 按照下方内容填写供应商信息：

    - **供应商名称**：`PackyCode`
    - **官网链接**：`https://www.packyapi.com`
    - **API Key**：填写刚才创建的 `deepseek-officially` 分组 API Key
    - **请求地址**：`https://www.packyapi.com`
    - **API 格式**：`Anthropic Messages（原生）`
    - **主模型**：开启 1m 上下文时填写 `deepseek-v4-pro[1m]`，未开启时填写 `deepseek-v4-pro`
    - **推理模型（Thinking）**：开启 1m 上下文时填写 `deepseek-v4-pro[1m]`，未开启时填写 `deepseek-v4-pro`
    - **Haiku 默认模型**：`deepseek-v4-flash`
    - **Sonnet 默认模型**：开启 1m 上下文时填写 `deepseek-v4-pro[1m]`，未开启时填写 `deepseek-v4-pro`
    - **Opus 默认模型**：开启 1m 上下文时填写 `deepseek-v4-pro[1m]`，未开启时填写 `deepseek-v4-pro`

![](/assets/image/Advanced/DeepSeekClaudeCode/02.webp)

::: important 模型填写说明
只有在 DeepSeek 分组已开启 `1m` 上下文时，模型名才需要填写 `deepseek-v4-pro[1m]`；如果没有开启 `1m`，请填写 `deepseek-v4-pro`，不要带 `[1m]` 后缀。

Flash 模型同理：请以你创建令牌时实际可用的模型名称为准。
:::

## 手动配置 settings.json

如果你希望手动配置 Claude Code，也可以直接编辑 Claude Code 的 `settings.json` 文件。

::: tabs

@tab Windows

配置文件通常位于：

```bash
%userprofile%\.claude\settings.json
```

@tab MacOS

配置文件通常位于：

```bash
~/.claude/settings.json
```

:::

将下面内容写入 `settings.json`，并把 `{{新建的令牌}}` 替换为刚才复制的 `deepseek-officially` 分组 API Key：

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://www.packyapi.com",
    "ANTHROPIC_AUTH_TOKEN": "{{新建的令牌}}",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "deepseek-v4-flash",
    "ANTHROPIC_MODEL": "deepseek-v4-pro[1m]",
    "ANTHROPIC_REASONING_MODEL": "deepseek-v4-pro[1m]",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "deepseek-v4-pro[1m]",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "deepseek-v4-pro[1m]"
  }
}
```

::: warning
手动配置时请保持模型名称与令牌分组实际支持的模型一致。只有开启 `1m` 上下文时才使用 `deepseek-v4-pro[1m]`；没有开启时请将上方所有 `deepseek-v4-pro[1m]` 改为 `deepseek-v4-pro`。
:::

## 验证配置

1. 重新打开终端，运行 `claude` 启动 Claude Code。

2. 在 Claude Code 界面确认左侧显示的模型名称是否为刚才配置的 DeepSeek 模型。开启 1m 时通常显示 `deepseek-v4-pro[1m]`，未开启时应显示 `deepseek-v4-pro`。

3. 直接在 Claude Code 中发送一条测试消息，能够正常回复即表示配置完成。

![](/assets/image/Advanced/DeepSeekClaudeCode/03.webp)

::: warning 使用提醒
DeepSeek 接入 Claude Code 的配置是否生效，请直接以 Claude Code 内的实际对话结果为准。不要在 CC Switch 中使用该供应商的测试功能作为最终判断。
:::
