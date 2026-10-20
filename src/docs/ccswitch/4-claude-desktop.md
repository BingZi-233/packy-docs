---
title: Claude Desktop配置
icon: material-icon-theme:claude
order: 4
---

::: tip 和"Claude Code配置"是两回事
Claude Desktop（桌面客户端）和 Claude Code（命令行/VSCode 插件）在 CC Switch 里是两个独立入口，配置文件互不相通，需要分别配置。这一页说的是桌面客户端。
:::

::: tip 还没装 Claude Desktop？
先到 [Claude Desktop 下载页](https://claude.com/download)，在 `Desktop` 一块按自己的系统下载安装包：

![](/assets/image/Advanced/ClaudeDesktop/01.webp)

Windows 上安装如果报错，按 [Claude Desktop · 软件安装](/docs/advanced/ClaudeDesktop.html#软件安装) 里的命令行带代理方式装，装好后再回来配置。
:::

1. 打开 CC Switch，在左侧应用切换器中选择 **Claude Desktop**。右侧是供应商列表，初始只有官方的 `Claude Desktop Official`

2. 点击右上角 **添加供应商**

![](/assets/image/CC-Switch/guide/v4/claude-desktop-panel.webp)

3. 在搜索框输入 `packyCode`，在「第三方平台」分类里选择 **PackyCode**

![](/assets/image/CC-Switch/guide/v4/claude-desktop-presets.webp)

4. 把 PackyApi 里 **CC** 分组的令牌粘贴到 **API Key**（还没建令牌，见 [创建API令牌](/docs/register/4-token.html)），**请求地址** 改成 `https://cf.api.fan`，**接入方式** 保持 **直连**

![](/assets/image/CC-Switch/guide/v4/claude-desktop-form.webp)

::: warning 请求地址要改，接入方式只能选直连
PackyCode 预设带的请求地址是 `https://www.packyapi.ai`，那是浏览器打开的控制台网页地址，不能当接口地址用；这里要确认填的是 `https://cf.api.fan`，结尾不要带斜杠。其它可用地址见 [API 端点说明](/docs/register/6-cli.html#api-端点说明)。

CC 分组不支持第三方接入，**接入方式只能选直连**，不要用路由或聚合。
:::

5. 填模型列表，两种方式任选：

- 点 **获取模型列表** 自动拉取，能拉到就不用管了
- 拉取失败，或只想保留部分模型：点 **添加模型**，到 [模型广场](https://www.packyapi.ai/pricing) 选中你在用的令牌分组，点模型卡片右上角的复制按钮拿到模型名，粘贴回来；该模型支持 1M 上下文就把右侧 **1M** 勾上

![](/assets/image/CC-Switch/guide/v4/claude-desktop-models-copy.webp)

6. 点右下角 **添加**，CC Switch 会写入配置并启动 Claude Desktop

如果回到列表发现 PackyCode 还没被选中（顶部仍提示「未选择」），点卡片右侧的 ▷ 图标切换一下再启动。Claude Desktop 只在启动时读配置，改完配置记得先退出程序再打开。

7. 顶部可能弹出一条 `Couldn't sign in to Gateway` 之类的告警，**和手动配置一样，无视它直接对话**：

![](/assets/image/CC-Switch/guide/v4/claude-desktop-warning.webp)

8. 随便发一条消息，**能收到回复就说明配置生效了**

![](/assets/image/CC-Switch/guide/v4/claude-desktop-chat.webp)

::: tip 判断生效与否的唯一标准
能收到回复 = 配好了。这条告警是网关模式的常规误报，不是 Key 或请求地址填错。
:::

## 其它注意事项

- 配置由 CC Switch 写入，不建议手动改 Claude Desktop 的配置文件，下次切换会被覆盖
- 想恢复官方登录，在供应商列表里切回 `Claude Desktop Official` 即可，不需要 API Key
