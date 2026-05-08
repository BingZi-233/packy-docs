---
title: GPT-Image-2 绘图教程
icon: material-symbols:image-outline
order: 2
---

## 前置准备

`gpt-image-2` 模型属于 **Sora 分组**，使用前需要创建令牌分组为 `sora` 的令牌。

参照 [创建令牌分组](/docs/register/4-token.html#%E8%BF%9B%E5%85%A5%E4%BB%A4%E7%89%8C%E7%AE%A1%E7%90%86) 教程创建令牌，**分组选择 `sora`**。

## 调用方式

`gpt-image-2` 支持两种 API 调用方式：

### 方式一：Images API（推荐）

通过 OpenAI 标准的 `/v1/images/generations` 接口调用，最为直接。

**请求示例：**

```bash
curl --location 'https://www.packyapi.com/v1/images/generations' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer 你的Sora分组令牌' \
--header 'Accept: */*' \
--header 'Host: www.packyapi.com' \
--header 'Connection: keep-alive' \
--data '{
    "model": "gpt-image-2",
    "prompt": "一只橘猫戴着橙色围巾抱着水獭，温暖插画风格",
    "size": "3840x2160",
    "quality": "high",
    "output_format": "png",
    "response_format": "b64_json",
    "n": 1
}'
```

#### 支持的尺寸与质量选项

- 常用尺寸（Popular sizes）
  - **1024 × 1024**：正方形
  - **1536 × 1024**：横向
  - **1024 × 1536**：纵向
  - **2048 × 2048**：2K 正方形
  - **2048 × 1152**：2K 横向
  - **3840 × 2160**：4K 横向
  - **2160 × 3840**：4K 纵向
  - **auto**：自动（默认）

- 尺寸限制（Size constraints）
  - 最大边长必须 **小于或等于 3840 像素**
  - 宽和高都必须是 **16 的倍数**
  - 长边与短边的比例 **不能超过 3:1**
  - 总像素数必须 **不少于 655,360**，且 **不超过 8,294,400**

- 质量选项（Quality options）
  - **low**：低质量
  - **medium**：中等质量
  - **high**：高质量
  - **auto**：自动（默认）

**返回示例：**

```json
{
  "created": 1776923999,
  "data": [
    {
      "url": "https://external-resources.packyapi.com/file_download/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
    }
  ]
}
```

返回的 `url` 即为生成的图片地址，直接访问即可下载。

**支持参数：**

| 参数 | 类型 | 说明 |
|------|------|------|
| `model` | string | 固定为 `gpt-image-2` |
| `prompt` | string | 图片描述提示词 |
| `n` | integer | 生成图片数量，默认 1 |
| `size` | string | 图片尺寸，如 `1024x1024`、`1536x1024`、`1024x1536` |

### 方式二：Chat Completions API

通过 `/v1/chat/completions` 接口调用，适用于仅支持 Chat Completions 格式的客户端。

**请求示例：**

```bash
curl 'https://www.packyapi.com/v1/chat/completions' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer 你的sora分组令牌' \
  -d '{
    "model": "gpt-image-2",
    "messages": [
      {
        "role": "user",
        "content": "生成一张可爱的猫咪图片"
      }
    ]
  }'
```

**返回示例：**

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "content": "图像生成完成\n图像 1:\n![image](https://external-resources.packyapi.com/file_download/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)",
        "role": "assistant"
      }
    }
  ],
  "model": "gpt-5-3-image",
  "object": "chat.completion"
}
```

图片 URL 包含在 `message.content` 字段中，以 Markdown 图片格式返回。

::: warning 关于 Chat Completions 方式的错误提示
部分客户端使用 Chat Completions 方式调用时，可能会显示错误信息。遇到此情况**不必惊慌**，请查看详细的返回内容——图片 URL 通常已包含在响应体中，提取 `message.content` 中的链接即可获取生成的图片。
:::

## 在 Cherry Studio 中使用

1. 参照 [创建令牌分组](/docs/register/4-token.html#%E8%BF%9B%E5%85%A5%E4%BB%A4%E7%89%8C%E7%AE%A1%E7%90%86) 一章的教程，创建**令牌分组**为 `sora` 的令牌。创建好令牌后，点击复制按钮，将 API Key 复制到剪切板。

2. 访问 [Cherry Studio](https://www.cherry-ai.com/) 官网下载并安装软件。

3. 打开 Cherry Studio，点击左下角设置按钮，进入 `模型服务` 页面，点击底部的 `添加` 按钮新增提供商。

4. 在添加提供商窗口中填写提供商名称，例如 `packyapi-gpt-image-2`，`提供商类型` 选择 `New API`，然后点击 `确定`。

![](/assets/image/Paint/gpt-image-2/01.webp)

5. 在左侧列表中找到刚添加的提供商，将第 1 步复制的 `sora` 分组 API Key 填入 `API 密钥`，`API 地址` 填写 `https://www.packyapi.com`。

![](/assets/image/Paint/gpt-image-2/02.webp)

6. 点击模型区域右侧的 `获取模型列表`，刷新后添加 `gpt-image-2` 模型。添加完成后，可以在提供商配置页中看到模型列表里已经出现 `gpt-image-2`。

7. 点击 `gpt-image-2` 右侧的编辑按钮，进入编辑模型窗口，将 `端点类型` 设置为 `图像生成（OpenAI）`，然后点击 `保存`。

![](/assets/image/Paint/gpt-image-2/03.webp)

8. 回到首页，点击顶部的 `+` 按钮，在应用列表中选择 `绘画`。

![](/assets/image/Paint/gpt-image-2/04.webp)

9. 进入绘画页面后，左侧 `提供商` 选择刚才添加的供应商，`模型` 选择 `gpt-image-2`。首次使用建议先将 `图片尺寸`、`质量`、`敏感度` 等选项保持为 `自动`，`生成数量` 保持为 `1`。

![](/assets/image/Paint/gpt-image-2/05.webp)

10. 如果只需要根据提示词生成图片，顶部选择 `绘图` 模式，输入提示词后点击发送按钮即可开始生成。

11. 如果需要上传参考图进行图生图或局部修改，顶部切换到 `编辑` 模式，在左侧 `输入图片` 中上传参考图，再输入修改要求后点击发送按钮。

![](/assets/image/Paint/gpt-image-2/06.webp)

::: tip 使用建议
- `API 地址` 直接填写 `https://www.packyapi.com` 即可，Cherry Studio 会自动拼接兼容端点，无需手动补 `/v1`。
- 如果模型列表中没有 `gpt-image-2`，请先在 `管理` 中刷新模型；如果仍无法正常绘图，请检查 `端点类型` 是否为 `图像生成（OpenAI）`。
- 使用 `绘图` 模式可以进行文生图；使用 `编辑` 模式可以上传参考图进行图生图或局部修改。
- 如果你在普通对话页中直接调用 `gpt-image-2`，建议关闭 `流式输出`，避免返回内容解析异常。使用 `绘画` 应用时通常不需要额外处理。
:::

### 可能出现的问题

如果 Cherry Studio 弹出 `Failed to fetch`，通常是请求连接被中断，可能与本机代理或网络环境有关。可以先检查代理设置，确认 Cherry Studio 能正常访问 `https://www.packyapi.com` 后再重试。

![](/assets/image/Paint/gpt-image-2/07.webp)

如果 Cherry Studio 弹出 `Unexpected token '<', "<html><h"... is not valid JSON`，通常是请求过程中收到了 Cloudflare 等页面内容，客户端按 JSON 解析时显示异常。遇到这种情况可以直接重试，或稍后再重新生成。

![](/assets/image/Paint/gpt-image-2/08.webp)
