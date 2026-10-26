---
title: CC-Switch使用教程
index: false
icon: fluent:table-switch-16-filled
category:
  - CC-Switch
date: 2025-11-23
---

## 通用步骤

### CC-Switch介绍

<div align="center">

<h3>Claude Code / Codex 全方位辅助工具</h3>

[![Version](https://img.shields.io/github/v/release/farion1231/cc-switch?color=blue&label=version)](https://github.com/farion1231/cc-switch/releases)
[![Trending](https://img.shields.io/badge/🔥_TypeScript_Trending-Daily%20%7C%20Weekly%20%7C%20Monthly-ff6b6b.svg)](https://github.com/trending/typescript)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg)](https://github.com/farion1231/cc-switch/releases)
[![Built with Tauri](https://img.shields.io/badge/built%20with-Tauri%202-orange.svg)](https://tauri.app/)
[![Downloads](https://img.shields.io/endpoint?url=https://api.pinstudios.net/api/badges/downloads/farion1231/cc-switch/total)](https://github.com/farion1231/cc-switch/releases/latest)

<a href="https://trendshift.io/repositories/15372" target="_blank"><img src="https://trendshift.io/api/badge/repositories/15372" alt="farion1231%2Fcc-switch | Trendshift" style="width: 250px; height: 55px;" width="250" height="55"/></a>

[::mdi:clipboard-text-history::更新日志](https://github.com/farion1231/cc-switch/blob/main/CHANGELOG.md) | [::fa-solid:cloud-download-alt::下载地址](https://github.com/farion1231/cc-switch/releases/latest)

**从供应商切换器到 AI CLI 一体化管理平台**

**统一管理 Claude Code、Codex 等 CLI 的供应商配置、MCP 服务器、Skills 扩展和系统提示词。**
</div>

使用 CC-Switch，您可以：
- ✅ 一键切换 API 配置 - 在多个 API 提供商之间快速切换
- ✅ 可视化配置管理 - 通过图形界面轻松管理所有配置
- ✅ 内置 PackyAPI 模板 - 预设了 PackyAPI 的配置模板
- ✅ MCP / Skills / 提示词统一管理 - 一处维护，同步到多个 CLI
- ✅ 会话与用量 - 会话过程可读，用量和额度一屏看全

::: tip 温馨提示
CC-Switch 已经内置了 PackyAPI 的快捷配置模板，无需手动编辑配置文件！
:::

### 软件下载

::: tabs

@tab Windows
1. 点击下载链接→[传送门](https://github.com/farion1231/cc-switch/releases/latest)←，进入 CC-Switch 的 GitHub Releases 页面

2. 鼠标滚动到页面底部，在 `Assets` 中选择适合自己系统的安装包。Windows 系统推荐下载普通 `.msi` 安装包（`CC-Switch-v版本号-Windows.msi`）；不想安装可以选择免安装版 `CC-Switch-v版本号-Windows-Portable.zip`；ARM 机器选文件名里带 `arm64` 的那几个

![](/assets/image/CC-Switch/guide/v4/release-assets.webp)

3. 安装完成后运行 CC-Switch 主程序，界面如下

![](/assets/image/CC-Switch/guide/v4/main-interface.webp)

@tab MacOS
- MacOS安装推荐使用HomeBrew，Cask 源里已经有 `cc-switch`，不需要先添加 tap

- 开启终端后，运行以下命令：
```bash
# 安装 CC-Switch
brew install --cask cc-switch

# 以后升级到最新版本
brew upgrade --cask cc-switch
```

- 也可以直接下载安装包：`CC-Switch-v版本号-macOS.dmg`（推荐）或 `.zip`。macOS 版是 Universal 包，Apple 芯片与 Intel 芯片通用，且已通过 Apple 签名与公证，可以直接打开

@tab Linux
> [!important]
> 从 4.0 开始安装包文件名自带版本号和架构，形如 `CC-Switch-v版本号-Linux-x86_64.deb`。下面的命令里版本号单独提出来做变量，请先到 [GitHub Releases](https://github.com/farion1231/cc-switch/releases/latest) 页面确认当前版本号再替换。

Debian/Ubuntu 系统：
```bash
# 版本号以 Releases 页面为准；普通电脑用 x86_64，ARM 机器用 arm64
VER=x.x.x
ARCH=x86_64

# 下载 .deb 包
wget https://github.com/farion1231/cc-switch/releases/download/v${VER}/CC-Switch-v${VER}-Linux-${ARCH}.deb

# 安装
sudo dpkg -i CC-Switch-v${VER}-Linux-${ARCH}.deb
```

Fedora 等 RPM 系统把文件名里的 `.deb` 换成 `.rpm` 即可；其他发行版也可以在同目录下载 `CC-Switch-v版本号-Linux-架构.AppImage` 直接运行。

Arch Linux 用 AUR：
```bash
paru -S cc-switch-bin
```

:::

::: warning 系统要求
- **Windows**：Windows 10 及以上
- **macOS**：macOS 12（Monterey）及以上
- **Linux**：x86_64 或 ARM64，需要 glibc 2.35+ 与 WebKitGTK 4.1（如 Ubuntu 22.04+、Debian 12+、较新的 Fedora）；RHEL / Rocky / Alma 8–9 暂不支持
:::

### 环境检查

::: warning
**请你最好进行此步的环境检查步骤！！！
如果你有经验，能确认你的 Nodejs 环境以及 Claude Code、Codex 的 CLI 安装没问题，配置目录也都存在，可以忽略这一步，直接进入以下的 CC Switch 配置**

点击右侧传送门查看 [如何进行环境检查？](/docs/cli/1-env.html)
:::

::: warning 不提供 Gemini CLI 教程
本站不再提供 Gemini CLI 的配置教程（该工具几乎无法正常使用）。CC-Switch 若仍显示 Gemini 入口，请忽略；使用 Gemini 模型请改用 Cline / Roo Code 等，见 [Gemini 相关问题](/docs/faq/Gemini.html)。
:::



## ::material-icon-theme:claude:: Claude Code配置

1. 打开 CC Switch，在左侧栏选择 **Claude Code**。页面上方有三个连接模式标签：**直连 / 路由 / 聚合**，本教程全程使用 **直连**（点标签只是切换查看，不会改配置）

2. 点击右上角 **添加供应商**

![](/assets/image/CC-Switch/guide/v4/claude-add-supplier.webp)

3. 在搜索框输入 `packycode`，在「第三方平台」分类里选择 **PackyCode**

![](/assets/image/CC-Switch/guide/v4/claude-presets.webp)

4. 回顾 [创建 API 令牌](/docs/register/4-token.html)，在 PackyApi 中创建 **CC** 分组的令牌，提交后在弹窗里复制完整密钥（只显示一次，关掉就看不到了）

![](/assets/image/QuickStart/010.webp)

5. 把复制到的 Key 粘贴到 **API Key**；再把 **请求地址** 改成 `https://cf.api.fan`，最后点击右下角 **添加**

![](/assets/image/CC-Switch/guide/v4/claude-supplier-form.webp)

::: warning 请求地址必须改
PackyCode 预设默认填的请求地址是 `https://www.packyapi.ai`，那是浏览器打开的控制台网页地址，不能当接口地址用。CC Switch 会把它当成上游端点，照着默认值添加，调用就会失败。

真正能填的接口地址只有两个，按自己的网络情况二选一：

- `https://cf.api.fan`（全球，本文示例统一用它）
- `https://slb-v1.api.fan`（优化线路，延迟敏感用户推荐）

两个地址的说明见 [API 端点说明](/docs/register/6-cli.html#api-端点说明)。
:::

6. 添加成功后回到供应商列表，点击 PackyCode 卡片右侧的 **切换**（箭头所指的 ▷ 图标）；卡片显示 **使用中** 即表示切换成功

![](/assets/image/CC-Switch/guide/v4/claude-switch.webp)

7. 在终端运行 `claude`，如果出现安全确认提示，用方向键选中 `Yes, I trust this folder` 后回车

```bash
claude
```

![](/assets/image/Cli/036.webp)

进入对话界面后随便发一句话测试，能收到回复即表示配置成功

![](/assets/image/Cli/037.webp)

::: warning CC 分组只能用直连，不要开启路由
如果你用的是 [CC 分组](/docs/token/2-group.html#cc分组)，请注意该分组**不支持第三方接入**。

CC Switch 的「路由」模式会把请求先转到本机的 CC Switch，再由它转发给上游，等于在 Claude Code 和 PackyApi 之间加了一层中转，属于第三方接入。所以使用 CC 分组时：

- 顶部标签保持在 **直连**，不要点 **开始路由**
- 配置是否成功，直接以 Claude Code 里的实际对话结果为准
:::


## ::hugeicons:chat-gpt:: Codex配置

1. 打开 CC Switch，在左侧栏选择 **Codex**。页面上方同样是 **直连 / 路由 / 聚合** 三个标签，本教程全程使用 **直连**

2. 点击右上角 **添加供应商**

![](/assets/image/CC-Switch/guide/v4/codex-add-supplier.webp)

3. 在搜索框输入 `packycode`，在「第三方平台」分类里选择 **PackyCode**

![](/assets/image/CC-Switch/guide/v4/codex-presets.webp)

4. 回顾 [创建 API 令牌](/docs/register/4-token.html)，在 PackyApi 中创建 **Codex** 分组的令牌，提交后在弹窗里复制完整密钥（只显示一次，关掉就看不到了）

![](/assets/image/QuickStart/010.webp)

5. 把复制到的 Key 粘贴到 **API Key**；把 **API 请求地址** 改成 `https://cf.api.fan/v1`；**模型列表** 点 **+ 手动添加** 补齐两行；**自动审批模型** 选成 `Codex 默认 (codex-auto-review)`；最后点击右下角 **添加**

![](/assets/image/CC-Switch/guide/v4/codex-supplier-form.webp)

::: warning 请求地址必须带 /v1
Codex 走 OpenAI 兼容端点，地址要带 `/v1`，这一点和 [Claude Code 配置](/docs/ccswitch/2-claude.html) 里的 `https://cf.api.fan` 不一样。PackyCode 预设填的是控制台网页地址 `https://www.packyapi.ai/v1`，不能当接口地址用，按自己的网络情况二选一：

- `https://cf.api.fan/v1`（全球，本文示例统一用它）
- `https://slb-v1.api.fan/v1`（优化线路，延迟敏感用户推荐）

两个地址的说明见 [API 端点说明](/docs/register/6-cli.html#api-端点说明)。
:::

::: warning 模型要手动加，自动获取拿不到
点 **获取模型列表** 会失败，拿不到 PackyCode 的模型列表，直接点 **+ 手动添加** 自己填两行：

- 第一行填你要用的主模型，比如 `gpt-5.6-sol`：菜单显示名与实际请求模型填同一个模型 ID，可用的 ID 以 [Codex 分组](/docs/token/2-group.html) 页面实时展示为准
- 第二行两列都填 `codex-auto-review`，和上面的 **自动审批模型** 对应上

截图里这两行都框出来了，照着填即可。
:::

6. 添加成功后回到供应商列表，点击 PackyCode 卡片右侧的 **切换**（箭头所指的 ▷ 图标）；卡片显示 **使用中**、顶部提示变成「直连生效中 · 直接连接 PackyCode」即表示切换成功

![](/assets/image/CC-Switch/guide/v4/codex-switch.webp)

7. 切换后 CC Switch 顶部会出现一条黄色提示：**切换前就开着的 Codex 可能还在用之前的账号或模型列表**。按提示把 Codex 彻底重启一遍：终端里的 `codex` 会话退出重开，桌面版要彻底退出再打开（macOS 用 ⌘Q，只关窗口不行），编辑器插件要重开窗口

![](/assets/image/CC-Switch/guide/v4/codex-restart.webp)

8. 在终端运行 `codex`，出现对话界面后随便发一句话，能收到回复即表示配置完成

```bash
codex
```

![](/assets/image/Cli/010.webp)

## ::material-icon-theme:claude:: Claude Desktop配置

::: tip 和上面的"Claude Code配置"是两回事
Claude Desktop（桌面客户端）和 Claude Code（命令行/VSCode 插件）在 CC Switch 里是两个独立入口，配置文件互不相通，需要分别配置。
:::

1. 打开 CC Switch，在左侧应用切换器中选择 **Claude Desktop** 入口。还没装客户端的话，先看 [Claude Desktop 下载与安装](/docs/advanced/ClaudeDesktop.html)

2. 点击右上角 **添加供应商**，搜索 `packyCode`，在「第三方平台」分类里选择 **PackyCode**

3. **API Key** 填 **CC** 分组令牌，**请求地址** 改成 `https://cf.api.fan`，**接入方式** 保持 **直连**

4. 模型列表可以点 **获取模型列表** 自动拉取；拉不到就点 **添加模型**，到 [模型广场](https://www.packyapi.ai/pricing) 复制模型名粘贴进来

5. 点 **添加** 后启动 Claude Desktop，顶部的网关告警无视，**能收到回复就是生效了**

::: warning 一定要完全重启 Claude Desktop
Claude Desktop **不会像 Claude Code 那样热重载配置**，切换供应商后要彻底退出程序（不是关窗口）再打开才会生效。
:::

详细步骤和截图见 [CC Switch · Claude Desktop 配置](/docs/ccswitch/4-claude-desktop.html)

## 用量查询配置

CC Switch 可以在 PackyCode 供应商卡片中显示已用额度和剩余额度。具体设置方法请查看 [用量查询配置](/docs/ccswitch/4-usage-query.html)。

## ChatGPT 接入

完成上面的 Codex CLI 配置后，ChatGPT 通常可以直接复用现有供应商配置。首次启动仍出现登录页、需要使用 API Key 登录，或切换供应商后配置未生效时，请查看 [ChatGPT 接入](/docs/ccswitch/6-codex-app.html)。

## DS接入Codex

需要在 Codex CLI 或 ChatGPT 中使用 PackyApi 的 DeepSeek 分组时，请查看 [DS接入Codex](/docs/advanced/DeepSeekCodex.html)。

## CC Switch CLI 使用

CC-Switch CLI 同时提供完整 CLI 命令和完整 TUI 界面，适合服务器、SSH、macOS 终端和自动化场景使用。你也可以让 Claude Code / Codex 直接调用 `cc-switch` 命令来检查、切换和修复配置。

查看详细教程：[CC Switch CLI 使用](/docs/ccswitch/5-ccs_cli.html)
