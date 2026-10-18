---
title: Claude Code配置
icon: material-icon-theme:claude
order: 2
---

## 安装 Claude Code

::: warning 先完成环境确认
Claude Code 要求 Node.js ≥ 22.0.0。还没确认 Node.js 与 npm，先看 [环境确认（Node.js 与 npm）](/docs/cli/1-env.html)。
:::

1. 在 Windows 或 MacOS 终端执行，全局安装最新版。如果 npm 提示需要允许安装脚本，先执行第一行，把这个包加进用户级的 `allow-scripts` 配置：

```bash
npm config set allow-scripts=@anthropic-ai/claude-code --location=user
npm install -g @anthropic-ai/claude-code
```

2. 确认安装成功，能打印出版本号即可：

```bash
claude --version
```

![](/assets/image/Cli/028.webp)

3. 首次运行一次 `claude`，让程序在你的用户目录下生成 `.claude` 配置目录（下一步要往这个目录里写配置）：

```bash
claude
```

![](/assets/image/Cli/031.webp)

出现安全确认提示（`Accessing workspace:` 后面显示的就是你的用户目录），说明安装成功；图下方红框里就是这一次运行生成的 `.claude` 目录。Windows 下按两次 `Esc` 即可退出这次运行。

> [!important]
> 首次运行如果提示连不上 Anthropic 服务，先按 [claude code 无法连接到 Anthropic 服务](/docs/faq/CC.html#claude-code-无法连接到-anthropic-服务) 处理，再继续下面的配置。

## 写入配置

::: tabs

@tab Windows

1. 键盘按下“Win+R”键，输入以下内容后回车，打开Claude Code配置目录

```bash
%userprofile%\.claude
```

![](/assets/image/Cli/013.webp)

2. 目录内容如图所示，如果目录中没有 `settings.json`，你需要手动创建后打开

- **settings.json**：Claude 主要的配置文件，用来配置中转站地址、ApiKey，以及 hooks、plugins 等

![](/assets/image/Cli/032.webp)

@tab MacOS

1. 在访达界面按下 “Command+Shift+G”，输入以下路径后回车，打开配置目录

```bash
~/.claude
```

![](/assets/image/Cli/017.webp)

2. 若目录不存在 `settings.json`，需要你手动进行创建

- **settings.json**：Claude 主要的配置文件，用来配置中转站地址、ApiKey，以及 hooks、plugins 等

![](/assets/image/Cli/018.webp)

> [!tip]
> macOS 版与 Windows 版内容完全一致：配置文件与令牌的截图两边通用；终端截图以 Windows 界面为例，macOS 上把路径换成 `~/.claude` 即可。

:::

打开 `.claude` 配置目录后的 3–5 步，Windows 与 MacOS 完全一致。

3. 将以下内容写入 `settings.json`

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://cf.api.fan",
    "ANTHROPIC_AUTH_TOKEN": "xxx",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
    "CLAUDE_CODE_DISABLE_TERMINAL_TITLE": "1",
    "CLAUDE_CODE_NEW_INIT": "1",
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1",
    "DISABLE_AUTOUPDATER": "1",
    "DISABLE_TELEMETRY": "1",
    "DISABLE_BUG_COMMAND": "1",
    "DISABLE_ERROR_REPORTING": "1",
    "ENABLE_TOOL_SEARCH": "false",
    "CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS": "1",
    "CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS": "1"
  },
  "includeCoAuthoredBy": false,
  "language": "Chinese-simplified"
}
```

![](/assets/image/Cli/033.webp)

4. 回顾 [创建API令牌](/docs/register/4-token.html)，在 PackyApi 中创建 **CC** 分组的令牌，点击右侧的复制按钮

![](/assets/image/Cli/034.webp)

把复制到的 key 填进上方 `ANTHROPIC_AUTH_TOKEN` 的 `xxx` 位置

![](/assets/image/Cli/035.webp)

5. 在终端运行 `claude`，如果出现安全确认提示，用方向键选中 `Yes, I trust this folder` 后回车

```bash
claude
```

![](/assets/image/Cli/036.webp)

进入对话界面后随便发一句话测试，能收到回复即表示配置成功

![](/assets/image/Cli/037.webp)

::: tip 遇到其他配置问题
比如连不上服务、提示需要登录等，都可以优先查看 [Claude Code 相关问题](/docs/faq/CC.html) 页面，常见报错的处理方法都在里面。
:::

## 配置项说明

### 必填项

| 配置项 | 说明 |
| --- | --- |
| `ANTHROPIC_BASE_URL` | 中转站地址，固定为 `https://cf.api.fan` |
| `ANTHROPIC_AUTH_TOKEN` | PackyApi 中 **CC** 分组的 API 令牌，替换示例中的 `xxx` |

### env 完整说明

| 环境变量 | 推荐值 | 作用 |
| --- | --- | --- |
| `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` | `"1"` | 关闭非必要网络请求，降低异常流量 |
| `CLAUDE_CODE_DISABLE_TERMINAL_TITLE` | `"1"` | 禁止修改终端标题 |
| `CLAUDE_CODE_NEW_INIT` | `"1"` | 启用新版初始化流程 |
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` | `"1"` | 启用实验性 Agent Teams |
| `DISABLE_AUTOUPDATER` | `"1"` | 关闭自动更新，避免更新检查走官方通道 |
| `DISABLE_TELEMETRY` | `"1"` | 关闭遥测上报 |
| `DISABLE_BUG_COMMAND` | `"1"` | 禁用内置 bug 反馈命令 |
| `DISABLE_ERROR_REPORTING` | `"1"` | 关闭错误自动上报 |
| `ENABLE_TOOL_SEARCH` | `"false"` | 关闭 Tool Search（按需开启可改为 `"true"`） |
| `CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS` | `"1"` | 关闭实验性 Beta 能力，提升稳定性 |
| `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS` | `"1"` | 关闭内置 Git 相关系统指令 |

### 其它常用顶层配置

| 配置项 | 推荐值 | 作用 |
| --- | --- | --- |
| `includeCoAuthoredBy` | `false` | 提交信息中不自动附加 Claude 共同作者标记 |
| `language` | `"Chinese-simplified"` | 界面与回复倾向简体中文 |

::: tip 最小可用配置
如果只想先跑通，至少保留 `ANTHROPIC_BASE_URL` 与 `ANTHROPIC_AUTH_TOKEN` 两项即可；其余项为推荐增强，可按需增减。
:::
