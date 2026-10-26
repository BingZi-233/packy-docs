---
title: Claude Code配置
icon: material-icon-theme:claude
order: 2
---

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
