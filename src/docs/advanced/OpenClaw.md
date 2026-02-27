---
title: OpenClaw
icon: noto:lobster
---
::: tip
**此教程适合Linux云服务器、MacOS系统用户**
:::

## 安装与初始化

1. 登录服务器SSH，或在MacOS打开你的终端程序，输入以下命令开始安装，耐心等待安装流程结束。等出现以下界面提示后，选择 `yes` 选项回车确认

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

![](https://cdn.xf233.io/project/Packy-docs/Advanced/OpenClaw/01.png)

2. 之后我们选择 `QuickStart` 回车确认

![](https://cdn.xf233.io/project/Packy-docs/Advanced/OpenClaw/02.png)

3. 在选择供应商部分我们先选择 `Skip for now` 回车确认，跳过设置

![](https://cdn.xf233.io/project/Packy-docs/Advanced/OpenClaw/03.png)

4. 在适配器选择部分，选择 `anthropic`

![](https://cdn.xf233.io/project/Packy-docs/Advanced/OpenClaw/04.png)

5. 在模型选择部分，我们选择 `opus-4.5`

![](https://cdn.xf233.io/project/Packy-docs/Advanced/OpenClaw/05.png)

6. 这里选择社交软件适配器，看个人需要，我们测试选择 `Telegram`

![](https://cdn.xf233.io/project/Packy-docs/Advanced/OpenClaw/06.png)

7. 输入Bot Token，然后回车

8. 这里选择安装Skill，这个先跳过，后续可以通过网页进行安装

![](https://cdn.xf233.io/project/Packy-docs/Advanced/OpenClaw/07.png)

9. 这里选择Hook，使用空格键全选，然后回车确认，之后过程会有GateWay安装，请耐心等待

![](https://cdn.xf233.io/project/Packy-docs/Advanced/OpenClaw/08.png)

10. 打开方式这里，这里我们先选择跳过

![](https://cdn.xf233.io/project/Packy-docs/Advanced/OpenClaw/09.png)

11. 安装Shell补全脚本，这里选择 `yes` 回车确认，至此我们完成安装

![](https://cdn.xf233.io/project/Packy-docs/Advanced/OpenClaw/10.png)


## 渠道与模型配置
::: tip
Packy专门为OpenClaw配置写了一个配置脚本，Github地址为：[openclaw-configurator](https://github.com/packyme/openclaw-configurator)，通过此脚本，可以快速帮助我们配置Packy的API。

目前脚本还不支持配置Gemini渠道，正在施工中~~~
:::

1. 在你的SSH控制台，或者MacOS终端输入以下命令安装配置器

```bash
curl -fsSL https://github.com/packyme/openclaw-configurator/releases/latest/download/index.js -o /tmp/openclaw-config.js && node /tmp/openclaw-config.js

```

2. 选择 `添加供应商`，然后选择 `PackyCode`

![](https://cdn.xf233.io/project/Packy-docs/Advanced/OpenClaw/11.png)

3. 这里以Opus为例，在获取的模型中选择 `Claude Opus 4.5`

![](https://cdn.xf233.io/project/Packy-docs/Advanced/OpenClaw/12.png)

4. 输入 [创建API令牌](/docs/register/4-token.html) 一节中你创建的相关分组的令牌，复制后填入

::: tip
**目前推荐在OpenClaw使用的分组：**

- **GPT：[codex分组](/docs/token/2-token.html#codex分组)、[gpt-officially分组](/docs/token/2-token.html#gpt-officially分组)**
- **Claude：[aws-q分组](/docs/token/2-token.html#aws-q分组)、[aws分组](/docs/token/2-token.html#aws分组)、[claude-officially分组](/docs/token/2-token.html#claude-officially分组)**

- **Gemini**：[gemini-slb分组](/docs/token/2-token.html#gemini-slb分组)

**请您创建正确分组的APIKEY后填入**
:::

![](https://cdn.xf233.io/project/Packy-docs/Advanced/OpenClaw/13.png)

5. 选择 `选择模型`，然后选中我们刚才配置的模型，回车确认

![](https://cdn.xf233.io/project/Packy-docs/Advanced/OpenClaw/14.png)

6. 选择 `退出`，回到我们的控制台

7. 在控制台输入以下命令，重启GateWay

```bash
openclaw gateway restart
```

![](https://cdn.xf233.io/project/Packy-docs/Advanced/OpenClaw/15.png)

8. 重启成功后，控制台输入以下命令，进入TUI界面，测试模型是否能正常输出。测试正常则输入 `/quit` 退出TUI界面

```bash
openclaw tui
```

![](https://cdn.xf233.io/project/Packy-docs/Advanced/OpenClaw/16.png)

## 浏览器访问

1. 在控制台输入以下命令，获取 `Dashboard URL`，在浏览器进行访问
:::tip
**如何你是在服务器运行，请使用nginx或其他反向代理工具来反代服务，并设置SSL证书**

另外需要修改 `~/.openclaw` 下的 `openclaw.json`文件，在 `gateway` 字段下添加以下内容
```json
"controlUi":{
    "allowInsecureAuth":true
}
```

![](https://cdn.xf233.io/project/Packy-docs/Advanced/OpenClaw/17.png)

修改完毕后回到控制台输入以下命令重启网关
```bash
openclaw gateway restart
```

:::

2. 访问带有Token的 `Dashboard URL` 链接，进入后台界面

![](https://cdn.xf233.io/project/Packy-docs/Advanced/OpenClaw/18.png)

## 配置Telegram Bot访问权限

1. 回到之前创建机器人的 @BotFather 的对话中，点击我们的机器人链接，进行对话

2. 首次对话拿到我们所需的 `Pairing code`

![](https://cdn.xf233.io/project/Packy-docs/Advanced/OpenClaw/19.png)

3. 在控制台输入以下命令允许您跟Bot进行互动

```bash
openclaw pairing approve telegram 你的Pairing code
```

![](https://cdn.xf233.io/project/Packy-docs/Advanced/OpenClaw/20.png)