---
title: Codex配置
icon: hugeicons:chat-gpt
order: 3
---

1. 打开已安装的 CC Switch，你会看到如下图所示的初始界面

![](/assets/image/CC-Switch/guide/003.jpg)

2. 在顶部应用切换栏中选择 **Codex**

![](/assets/image/CC-Switch/guide/012.jpg)

3. 点击右上角 `+`，在预设供应商中选择 **PackyCode**

![](/assets/image/CC-Switch/guide/013.jpg)

4. 回顾 [创建 API 令牌](/docs/register/4-token.html)，在 PackyApi 中创建 **Codex** 分组的令牌，然后复制 API Key

![](/assets/image/CC-Switch/guide/014.jpg)

5. 在供应商配置中找到 `API Key`，填入刚才复制的 API Key，再点击右下角 **添加**

![](/assets/image/CC-Switch/guide/015.jpg)

6. 添加成功后，回到主界面找到刚配置的 PackyCode，点击右侧 **启用**；显示 **使用中** 即表示切换成功

![](/assets/image/CC-Switch/guide/016.jpg)

7. 在终端运行 `codex`，看到对话界面并能正常回复，即表示配置完成

![](/assets/image/CC-Switch/guide/017.jpg)

## 配置用量查询

CC Switch 可以直接显示 PackyCode 的已用额度和剩余额度。用量查询需要使用 PackyApi 的**系统访问令牌和用户 ID**，不是上面配置供应商时使用的 API Key。

1. 在 PackyCode 供应商卡片右侧点击 **配置用量查询**

![](/assets/image/CC-Switch/guide/018.jpg)

2. 开启 **启用用量查询**，预设模板选择 `NewAPI`

![](/assets/image/CC-Switch/guide/019.jpg)

3. 请求地址填写 `https://www.packyapi.ai`。前往 PackyApi **个人设置 → 安全设置**生成系统访问令牌；用户 ID 可在个人设置页顶部查看

![](/assets/image/CC-Switch/guide/020.jpg)

4. 将系统访问令牌和用户 ID 填入对应字段

![](/assets/image/CC-Switch/guide/021.jpg)

5. 点击 **保存配置**。返回供应商列表后，即可在 PackyCode 卡片上查看用量并手动刷新

![](/assets/image/CC-Switch/guide/022.jpg)

## 更多 Codex 接入

- [Codex App（ChatGPT）接入](/docs/ccswitch/6-codex-app.html)
- [DeepSeek 接入 Codex](/docs/ccswitch/7-deepseek-codex.html)
