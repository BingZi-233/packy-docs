---
title: 通用步骤
icon: fluent:table-switch-16-filled
order: 1
---

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
**请你最好进行此步的环境检查步骤！！！**
如果你有经验，能确认你的 Nodejs 环境以及 Claude Code、Codex 的 CLI 安装没问题，配置目录也都存在，可以忽略这一步，直接进入后续的 CC Switch 配置

点击右侧传送门查看 [如何进行环境检查？](/docs/cli/1-env.html)
:::
