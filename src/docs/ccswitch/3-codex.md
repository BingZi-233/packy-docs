---
title: Codex配置
icon: hugeicons:chat-gpt
order: 3
---

1. 打开你下载的CC Switch软件，你会看到如下图的初始界面

![](https://cdn.xf233.io/project/Packy-docs/CC-Switch/003.png)

2. 在分组条中，将分组选择至“Codex”

![](https://cdn.xf233.io/project/Packy-docs/CC-Switch/008.png)

3. 在供应商分组中，选择如图的“PakcyCode”

![](https://cdn.xf233.io/project/Packy-docs/CC-Switch/009.png)

4. 回顾 [创建API令牌](/docs/register/4-token.html)，在 PackyApi 中创建 **Codex** 分组的令牌，点击复制按钮，复制ApiKey到剪切板

![](https://cdn.xf233.io/project/Packy-docs/Cli/008.png)

5. 下拉模态框，找到“API Key”配置项，填入你刚才复制的ApiKey，再点击右下角“添加”按钮

::: important
如果你是Codex包月用户,你需要从 [包月Codex控制台](https://codex.packycode.com/api-management)获取你的**API Key**
另外下图中“**API 请求地址**”一项，需要将链接更换为`https://codex-api.packycode.com/v1`
:::

![](https://cdn.xf233.io/project/Packy-docs/CC-Switch/010.png)

6. 添加成功后，在主界面会看到我们配置的分组，在右侧点击“启用”按钮，显示“使用中”，则配置完成

![](https://cdn.xf233.io/project/Packy-docs/CC-Switch/011.png)

7. 在终端运行 `codex`，看到对话界面并能正常回复即表示配置完成

![](https://cdn.xf233.io/project/Packy-docs/Cli/010.png)
