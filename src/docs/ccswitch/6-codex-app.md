---
title: Codex App（ChatGPT）接入
icon: hugeicons:chat-gpt
order: 6
---

完成 [Codex 配置](/docs/ccswitch/3-codex.html) 后，Codex App 通常可以直接复用 Codex CLI 的供应商配置。

## 直接使用现有配置

1. 先确认 Codex CLI 已经通过 CC Switch 切换到 PackyCode，并且在终端中可以正常对话。

2. 安装并打开 Codex App。应用读取到现有 Codex CLI 配置后，即可直接开始使用。

![](/assets/image/CC-Switch/guide/023.jpg)

## 首次启动出现登录页面

如果应用仍显示 **登录 ChatGPT**，请先关闭应用，再确认 Codex CLI 配置有效，然后重新打开 Codex App。

仍然出现登录页面时，可以按以下步骤继续：

1. 点击 **使用其他方式登录**。

![](/assets/image/CC-Switch/guide/024.jpg)

2. 将 PackyApi 的 **Codex 分组 API Key** 粘贴到 `OpenAI API 密钥`，点击 **继续**。

![](/assets/image/CC-Switch/guide/025.jpg)

3. 进入应用后发送一条测试消息，能够正常回复即表示配置生效。

![](/assets/image/CC-Switch/guide/026.jpg)

## 切换供应商后完全重启

CC Switch 中的 Codex 配置发生变更后，需要完全退出并重新打开 Codex App。只关闭窗口可能让应用继续驻留后台。

在菜单栏选择 **文件 → Quit ChatGPT**，或使用快捷键 `Ctrl + Q` 完全退出，再重新启动应用。

![](/assets/image/CC-Switch/guide/027.jpg)
