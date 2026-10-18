---
title: 用量查询配置
icon: mdi:chart-line
order: 4
---

CC Switch 可以在 PackyCode 供应商卡片上直接显示 **余额**。用量查询用的是 PackyApi 的**系统访问令牌 + 用户 ID**，不是配置供应商时填的 API Key。

1. 打开 CC Switch，左侧栏选 **Claude Code**（Codex 面板操作完全一样），在 PackyCode 卡片右侧点 **`...`**，菜单里选 **配置用量查询**

![](/assets/image/CC-Switch/guide/v4/usage-query-menu.webp)

2. 打开右上角 **启用用量查询**，**预设模板** 选 `NewAPI`

![](/assets/image/CC-Switch/guide/v4/usage-query-template.webp)

3. 填好三项凭证，其余保持默认

   - **请求地址** 填 `https://www.packyapi.ai`
   - **访问令牌**：在 PackyApi **个人设置 → 安全设置** 生成系统访问令牌，粘贴进来
   - **用户 ID**：个人设置页顶部显示的用户 ID

   **超时时间** 保持 `10` 秒，**自动查询间隔** 保持 `5` 分钟（填 `0` 表示不自动查询）。下面的 **提取器代码** 由 `NewAPI` 模板自动带好，不用改。

![](/assets/image/CC-Switch/guide/v4/usage-query-filled.webp)

::: warning 这里的请求地址，和供应商配置里的不是同一个
[Claude Code 配置](/docs/ccswitch/2-claude.html) 和 [Codex 配置](/docs/ccswitch/3-codex.html) 里，供应商的请求地址填的是接口端点 `https://cf.api.fan`（Codex 还要带 `/v1`）；用量查询这里填的是控制台地址 `https://www.packyapi.ai`，两边不要互相照抄。

面板右上角写着「留空则自动使用供应商配置」，三项留空就会退回用供应商那栏的接口地址和 API Key 去查，余额取不到，所以这三项都要自己填。
:::

4. 点右下角 **保存配置**，回到供应商列表，PackyCode 卡片上就会出现 **余额**

![](/assets/image/CC-Switch/guide/v4/usage-query-balance.webp)
