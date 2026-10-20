---
title: Claude Desktop
icon: material-icon-theme:claude
---

## 软件下载

1. 点击 [Claude Desktop下载链接](https://claude.com/download) ，进入下载页面

![](/assets/image/Advanced/ClaudeDesktop/01.webp)

2. 在如上图 `Desktop` 一块，根据自己的系统，下载对应的安装包

## 软件安装

::: tabs

@tab Windows

1. Windows系统下软件安装需要请求Anthropic官方，需要你用梯子挂 **全局服务（TUN模式）** ，或是用命令行来运行安装程序，使其强制走代理，否则会出现以下报错

![](/assets/image/Advanced/ClaudeDesktop/02.webp)

2. 如果出现以上报错无法安装，请在 Claude Desktop安装程序所在目录运行 `cmd` 命令行

3. 确认你当前使用梯子的端口号，比如我使用的是 `Clash Verge` ，则端口号为 `7897`

![](/assets/image/Advanced/ClaudeDesktop/03.webp)

4. 在命令行中分别输入以下命令，运行安装程序，此时能够正常安装

```bash
set HTTP_PROXY=http://127.0.0.1:7897
set HTTPS_PROXY=http://127.0.0.1:7897
"Claude Setup.exe"
```

![](/assets/image/Advanced/ClaudeDesktop/04.webp)

5. 正常安装

![](/assets/image/Advanced/ClaudeDesktop/05.webp)

@tab MacOS

1. MacOS系统下直接正常安装即可

![](/assets/image/Advanced/ClaudeDesktop/06.webp)

:::

## 开启开发者模式

::: tip 菜单语言和你看到的可能不一样
Claude Desktop 按系统语言显示菜单，位置是一样的：中文界面是 `帮助` → `故障排查` → `启用开发者模式`，英文界面就是 `Help` → `Troubleshooting` → `Enable developer mode`。本文截图是中文界面，对照你界面上的同名菜单项即可。
:::

1. 打开软件，会先停在登录界面。我们不登录官方账号，后面配置第三方推理时会直接绕过它

![](/assets/image/Advanced/ClaudeDesktop/07.webp)

2. 开启开发者模式

::: tabs

@tab Windows

1. 鼠标点击邮箱输入框获取焦点，键盘 Tab 跳到左上角菜单，按下回车依次进入 → 帮助 → 故障排查 → 启用开发者模式

![](/assets/image/Advanced/ClaudeDesktop/08.webp)

2. 弹窗里点 `启用`

![](/assets/image/Advanced/ClaudeDesktop/09.webp)

3. 软件会自动重启

@tab MacOS

1. 在左上角菜单依次进入 → 帮助 → 故障排查 → 启用开发者模式

![](/assets/image/Advanced/ClaudeDesktop/10.webp)

2. 弹窗里点 `启用`，等待软件重启

:::

## 配置第三方推理

1. 同样的方法打开菜单，依次进入 开发者 → 配置第三方推理...

![](/assets/image/Advanced/ClaudeDesktop/11.webp)

2. `Gateway base URL` 填 `https://cf.api.fan`

3. `Gateway API key` 填 PackyAPI 里 **CC 分组** 的令牌（还没建令牌，见 [创建API令牌](/docs/register/4-token.html)）

4. 其余项都不用动，保持默认：`Credential kind` = `Static API key`，`Gateway auth scheme` = `bearer`

![](/assets/image/Advanced/ClaudeDesktop/12.webp)

::: warning 这里的 Test connection 一定不会通过，不用点
用 CC 分组令牌点 `Test connection`，网关会直接返回 403，提示这个接口只允许官方 Claude CLI 调用：

![](/assets/image/Advanced/ClaudeDesktop/13.webp)

这不是你哪里填错了，也不用改上面的任何配置。**看到这条报错跳过就行**，能不能用只看最后能不能正常对话。
:::

5. 处理模型列表。点 MODELS 卡片右上角的 `Test model discovery`，结果分两种：

**能通过**：`Model discovery` 开关保持打开（默认就是开的），模型会自动拉取，不用手动加。卡片底部会提示发现了多少个模型：

![](/assets/image/Advanced/ClaudeDesktop/14.webp)

![](/assets/image/Advanced/ClaudeDesktop/15.webp)

**没通过**：关掉 `Model discovery` 开关，点 `Add model` 手动加一个模型，`Model ID` 和 `Display name` 都填模型名，比如 `claude-sonnet-5-5`：

![](/assets/image/Advanced/ClaudeDesktop/16.webp)

6. 点右下角 `Save changes`，再点 `Apply changes`，配置保存并生效

## 开始对话

1. 回到对话页，顶部可能会弹出一条 `Couldn't sign in to Gateway` 之类的告警，忽略即可，不影响使用

![](/assets/image/Advanced/ClaudeDesktop/17.webp)

2. 打开模型选择器，确认能选到模型。下图是手动添加的 `claude-sonnet-5-5`（因为勾了 `Offer 1M-context variant`，列表里会多出一个 1M 上下文的同名选项）：

![](/assets/image/Advanced/ClaudeDesktop/18.webp)

3. 随便发一条消息，**能收到正常回复就说明配置生效了**

![](/assets/image/Advanced/ClaudeDesktop/19.webp)

::: tip 判断生效与否的唯一标准
这个配置页走的是第三方网关，不是 Anthropic 官方账号登录校验，所以不会有、也不用等"连接成功/测试通过"的提示。**能收到回复 = 配好了**，测试按钮报错与此无关。
:::

::: tip 提示
新建对话、发第一条消息后，你可能会在消费记录里看到一笔和你选的模型不一样的小额调用——这是软件自己在帮你给对话起标题，钱很少，正常现象，不用管。详细说明见 [Claude Code 相关问题](/docs/faq/CC.html)。
:::
