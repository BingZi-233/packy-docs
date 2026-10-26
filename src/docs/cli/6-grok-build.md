---
title: Grok Build配置
icon: simple-icons:x
order: 6
---

Grok Build 是 xAI 推出的终端编码助手。它的主要配置文件是用户目录下的 `config.toml`（Windows 为 `%USERPROFILE%\.grok\config.toml`，macOS 为 `~/.grok/config.toml`），把模型请求指向 PackyAPI 的 OpenAI 兼容端点即可使用。

::: warning 不要把真实 Key 发给别人
下面示例里的 `xxx` 只是占位符。请用你在 PackyAPI 控制台创建的令牌替换它，不要在截图、聊天记录、公开仓库或工单里展示真实 API Key。
:::

## 安装 Grok Build

Grok Build 走官方安装脚本，不经过 npm，也不依赖 Node.js；如果你只用 Grok Build，可以跳过 [环境确认（Node.js 与 npm）](/docs/cli/1-env.html)。

1. Windows 打开 PowerShell，执行官方安装命令：

```powershell
irm https://x.ai/cli/install.ps1 | iex
```

macOS / Linux / WSL 打开终端，执行官方安装命令：

```bash
curl -fsSL https://x.ai/cli/install.sh | bash
```

2. 安装完成后执行以下命令确认可用；如果提示找不到命令，重新打开一个终端再试：

```bash
grok --version
```

![](/assets/image/Cli/039.webp)

出现形如 `grok 1.0.62 (1474f9cbdd91)` 的版本号，说明安装成功。

## 写入配置

安装脚本会把程序装进 `~/.grok`（Windows 为 `%USERPROFILE%\.grok`），配置文件 `config.toml` 也在这个目录里。

::: tabs

@tab Windows

1. 键盘按下“Win+R”键，输入以下内容后回车，打开 Grok Build 配置目录

```text
%userprofile%\.grok
```

![](/assets/image/Cli/040.webp)

@tab MacOS / Linux / WSL

1. 在终端执行以下命令，创建 Grok Build 配置目录

```bash
mkdir -p ~/.grok
```

macOS 也可以在访达按下 “Command+Shift+G”，输入 `~/.grok` 后回车打开。

:::

打开配置目录后的 2–5 步，Windows 与 MacOS 完全一致。

2. 目录里是安装脚本放进去的 `bin`、`completions`、`docs`、`downloads`，我们只需要其中的 `config.toml`

- **config.toml**：Grok Build 的**核心配置**文件，模型网关、模型清单与 API Key 都在这里配置

> [!important]
> 目录里没有 `config.toml` 时，手动新建一个同名文件再写入内容。

3. 将以下内容写入 `config.toml`；如果文件里已经有安装脚本写入的 `[cli]` 段，把上面这些模型配置补进去即可，`[cli]` 那两行不用重复写

```toml
[models]
default = "grok-4.7"
web_search = "grok-4.7"

[endpoints]
models_base_url = "https://cf.api.fan/v1"

[model."grok-4.7"]
model = "grok-4.7"
name = "Grok 4.7"
description = "Grok 4.7 via PackyAPI"
api_key = "xxx"
api_backend = "responses"
context_window = 500000
supports_reasoning_effort = true   # 开启后可用 /effort 调整思考等级
supports_backend_search = false    # 关闭后端搜索，避免网关不支持时报错

[cli]
installer = "internal"
```

![](/assets/image/Cli/041.webp)

> [!important]
> 模型 ID 以 [模型广场](/docs/token/1-intro.html) 里该分组实时展示的为准。上图填的 `grok-4.7` 是当时 **grok-officially** 分组在售的模型，上游发新版后按页面实时列表替换即可。

4. 回顾 [创建 API 令牌](/docs/register/4-token.html)，在 PackyAPI 中创建 **grok-officially** 分组的令牌，提交后在弹窗里复制完整密钥（只显示一次，关掉就看不到了）

![](/assets/image/QuickStart/010.webp)

把复制到的 Key 填进上方 `api_key` 的 `xxx` 位置后保存

![](/assets/image/Cli/043.webp)

> [!note]
> 文件末尾的 `[marketplace]` 段不属于本教程要写的配置，保留即可，不用手写。

5. 在终端运行 `grok`，随便发一句话测试，能收到回复即表示配置成功

```bash
grok
```

![](/assets/image/Cli/044.webp)

::: tip 遇到其他配置问题
连不上服务、提示模型不存在、思考等级不生效等，都可以优先查看 [Grok Build 相关问题](/docs/faq/GrokBuild.html) 页面，常见报错的处理方法都在里面。
:::

## 配置项说明

| 配置项 | 说明 |
| --- | --- |
| `[models] default` | 新会话默认使用的模型 |
| `[models] web_search` | Grok Build 内置 `web_search` 工具使用的模型 |
| `[endpoints] models_base_url` | 统一模型网关入口，填写 PackyAPI 的 OpenAI 兼容端点 `https://cf.api.fan/v1` |
| `[model."<id>"]` | 一个自定义模型配置块，表名里的 `<id>` 与 `[models] default` 保持一致 |
| `model` | 真正发给接口的模型 ID，需与 PackyAPI 控制台里的模型名一致 |
| `name` / `description` | 模型选择器里展示的名称与描述 |
| `api_key` | 该模型使用的 PackyAPI 令牌；不想写死时改用 `env_key = "PACKY_API_KEY"`，读环境变量 |
| `api_backend` | 请求协议，可选 `chat_completions`、`responses`、`messages`；`grok-4.7` 走 Responses |
| `context_window` | 模型上下文长度，数值会影响自动压缩的触发时机；`grok-4.7` 为 `500000` |
| `supports_reasoning_effort` | 声明该模型支持调整思考等级；不写这行时 `/effort` 命令与 `--effort` 参数对它不可用 |
| `supports_backend_search` | 声明该端点是否支持 Grok 服务端搜索；PackyAPI 网关不提供该能力，设为 `false` |
| `[cli] installer` | 安装方式记录：官方安装脚本写入 `internal`，npm 包 `@xai-official/grok` 写入 `npm`。由安装过程自动生成，升级方式与它对应（`internal` 用 `grok update`，npm 装的用 npm 升级），一般不用手改 |

::: tip 也可以把 Key 放进环境变量
如果不想把令牌写进 `config.toml`，可以把 `api_key = "xxx"` 换成：

```toml
env_key = "PACKY_API_KEY"
```

然后在系统环境变量里配置 `PACKY_API_KEY`。注意：`env_key` 填的是环境变量名，不是 API Key 本身。
:::

## 调整思考等级

模型配置里写入 `supports_reasoning_effort = true` 之后，就能在「快速回答」和「深入思考」之间切换。

- 在 TUI 会话中，用 `/effort` 调整当前模型的思考等级：

```text
/effort
```

- 切换模型用 `/model <名称>`，例如 `/model grok-4.7`。
- 在无头模式（`-p`）下，使用 `--effort` 参数：

```text
grok -p "只回复 ok" -m grok-4.7 --effort <档位>
```

::: tip 档位以菜单展示为准
`--effort` 后面的档位名以 `/effort` 菜单里列出的为准；不同模型支持的档位范围可能不同。改完配置后需要重启 Grok Build 才会重新加载。
:::

## 检查配置是否生效

1. 先确认 Grok Build 读到了配置。下面的命令会列出它在当前目录发现的内容，包括配置来源、指令、技能、插件、hooks 与 MCP 服务器：

```bash
grok inspect
```

2. 再发一次最小请求，能返回 `ok` 就说明网关与令牌都通了：

```bash
grok -p "只回复 ok" -m grok-4.7
```

## 官方参考

Grok Build 更新较快，完整字段与命令以官方文档为准：

- [Getting Started](https://docs.x.ai/build/overview)：安装脚本与自定义模型写法
- [Settings Reference](https://docs.x.ai/build/settings/reference)：`config.toml` 各段字段与环境变量
- [CLI Reference](https://docs.x.ai/build/cli/reference)：子命令与常用参数
- [Headless & Scripting](https://docs.x.ai/build/cli/headless-scripting)：`-p`、`--effort` 等无头模式用法
- [Modes and Commands](https://docs.x.ai/build/modes-and-commands)：`/effort`、`/model` 等 TUI 命令
- [install.sh](https://x.ai/cli/install.sh) / [install.ps1](https://x.ai/cli/install.ps1)：安装脚本，会在 `config.toml` 里写入 `[cli] installer`
