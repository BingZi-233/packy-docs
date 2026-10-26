---
title: Codex配置
icon: hugeicons:chat-gpt
order: 3
---

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

如需在 PackyCode 供应商卡片中显示余额，请继续查看 [用量查询配置](/docs/ccswitch/4-usage-query.html)。

## 更多 Codex 接入

- [ChatGPT 接入](/docs/ccswitch/6-codex-app.html)
- [DS接入Codex](/docs/advanced/DeepSeekCodex.html)
