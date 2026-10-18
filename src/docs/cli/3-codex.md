---
title: Codex配置
icon: hugeicons:chat-gpt
order: 3
---

## 安装 Codex

::: warning 先完成环境确认
Codex 要求 Node.js ≥ 16，但如果你同时要用 Claude Code 或 Kimi Code，需要按更高那条要求准备环境。还没确认 Node.js 与 npm，先看 [环境确认（Node.js 与 npm）](/docs/cli/1-env.html)。
:::

1. 在 Windows 或 MacOS 终端执行，全局安装最新版：

```bash
npm install -g @openai/codex@latest
```

2. 确认安装成功，能打印出版本号即可（下图为 `codex-cli 0.163.0`）：

```bash
codex --version
```

![](/assets/image/Cli/029.webp)

3. 首次运行一次 `codex`，让程序在你的用户目录下生成 `.codex` 配置目录（下一步要往这个目录里写配置）：

```bash
codex
```

![](/assets/image/Cli/004.webp)

出现登录方式选择界面，说明安装成功，按 `Ctrl+C` 退出这次运行即可。

## 写入配置

::: tabs

@tab Windows

1. 键盘按下“Win+R”键，输入以下内容后回车，打开你的codex配置目录

```bash
%userprofile%\.codex
```

![](/assets/image/Cli/006.webp)

2. 目录里大多是 Codex 自己生成的会话、日志与数据库文件，我们只需要其中两个

![](/assets/image/Cli/007.webp)

  - **config.toml**：Codex的**核心配置**文件，中转服务与MCP等都在此文件配置

  - **auth.json**：用来配置你在中转站获取的ApiKey秘钥

  - **`AGENTS.md`**：用来设置codex全局工作的提示词，不接入中转服务也可以先不建

> [!important]
> 上图里只有 `config.toml` 是 Codex 自己生成的，`auth.json` 与 `AGENTS.md` 都可能不存在，没有就手动新建文件再写入内容。

@tab MacOS

1. 在访达界面按下 “Command+Shift+G”，输入以下路径并回车，打开 Codex 配置目录

```bash
~/.codex
```

![](/assets/image/Cli/011.webp)

2. 目录中可能会存在以下文件，其它文件可忽略

![](/assets/image/Cli/012.webp)

  - **config.toml**：Codex 的核心配置文件，中转服务与 MCP 等都在此文件配置

  - **auth.json**：存放中转站获取的 ApiKey 秘钥

  - **`AGENTS.md`**：Codex 全局工作的提示词，不接入中转服务也可以先不建

> [!important]
> 初次安装若未自动生成，需要手动创建上述文件并写入内容

:::

打开配置目录后的 3–6 步，Windows 与 MacOS 完全一致；`config.toml` 里的 `[windows]` 段只对 Windows 生效，macOS 可以不写。

3. 将以下内容写入 `config.toml`

```toml
disable_response_storage = true
model = "gpt-6-astra"
model_provider = "packycode"
model_reasoning_effort = "xhigh"
model_verbosity = "high"

[features]
web_search_request = true

[model_providers.packycode]
base_url = "https://cf.api.fan/v1"
name = "packycode"
requires_openai_auth = true
wire_api = "responses"

[tui]
screen_reader_detection_done = true

[windows]
sandbox = "elevated"
```

![](/assets/image/Cli/038.webp)

> [!important]
> `model` 要填 [Codex分组](/docs/token/2-group.html) 里实时展示的可用模型 ID，`gpt-5.3-codex` 及其以下版本已被官方删除。上图填的 `gpt-6-astra` 是当时 Codex 分组在售的模型，实际以该页面的实时列表为准。

> [!note]
> **Windows 沙盒装不上时可以换一档**
>
> `[windows] sandbox` 共有三种实现：`mxc`、`elevated`、`unelevated`。截图里用的是 `elevated`，它需要管理员授权完成一次初始化；如果你的电脑 UAC 被拒、或者公司电脑不允许新建本地用户、改防火墙与组策略，改成 `unelevated` 一样能跑，只是网络隔离比 `elevated` 弱一些。
>
> Windows 11 24H2（build 26100.9278）及以上可以改用 `mxc`：`elevated` 那行保持不动，在 `[features]` 里加一行 `prefer_mxc = true`，设备支持时会自动选用 MXC。
>
> 细节见官方文档 [Windows sandbox](https://developers.openai.com/codex/windows/windows-sandbox)。

4. 将以下内容写入 `auth.json`

```json
{
  "OPENAI_API_KEY": "xxx"
}
```

5. 回顾 [创建API令牌](/docs/register/4-token.html) 这一步教程，我们需要在PackyApi中创建 **Codex** 分组的令牌，然后点击右侧的复制按钮

![](/assets/image/Cli/008.webp)

把复制到的 key 填进上方 `xxx` 的位置后保存

![](/assets/image/Cli/009.webp)

6. 测试对话

在终端输入以下命令，出现图示内容，进行对话测试，如果有回复，则配置成功，开始你的Codex使用之旅~

```bash
codex
```

![](/assets/image/Cli/010.webp)

> [!tip]
> **遇到其他配置问题**
>
> 连不上服务、沙盒初始化失败、令牌分组选错等，都可以优先查看 [Codex 相关问题](/docs/faq/Codex.html) 页面，常见报错的处理方法都在里面。
