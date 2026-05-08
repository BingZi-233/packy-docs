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

通过 OpenAI 标准的 Images API 调用，分为文生图和图片编辑两个接口：

- 文生图：`POST https://www.packyapi.com/v1/images/generations`
- 图片编辑 / 图生图：`POST https://www.packyapi.com/v1/images/edits`

下面的参数说明参考 OpenAI Images API，并已按 Packy 的 `gpt-image-2` 实际调用结果标注。对新手来说，只要先照着示例传 `model`、`prompt`，并把 `n` 设为 `1`；需要上传图片时再使用 `image` 字段即可。

#### 文生图：`/v1/images/generations`

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
    "response_format": "url",
    "n": 1
}'
```

#### 图片编辑 / 图生图：`/v1/images/edits`

`/v1/images/edits` 使用 `multipart/form-data` 上传图片。`image` 是二进制图片文件，`prompt` 写清楚希望怎么修改图片。

**请求示例：**

```bash
curl --location 'https://www.packyapi.com/v1/images/edits' \
--header 'Authorization: Bearer 你的Sora分组令牌' \
--header 'Accept: */*' \
--form 'model="gpt-image-2"' \
--form 'prompt="把图片里的主体保留，在右上角加一枚红色小印章，印章上写测试"' \
--form 'image=@"/path/to/your-image.jpg"' \
--form 'size="1024x1024"' \
--form 'quality="high"' \
--form 'output_format="png"' \
--form 'response_format="url"'
```

如果需要局部修改，可以额外传 `mask`。`mask` 建议使用 PNG 图片，透明区域表示允许模型重点修改的位置；不传 `mask` 时，模型会根据提示词对整张图进行编辑。

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

#### 返回结果怎么看

默认返回图片下载地址：

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

如果请求里传了 `"response_format": "b64_json"`，返回内容会变成 Base64 图片数据：

```json
{
  "created": 1776923999,
  "data": [
    {
      "b64_json": "iVBORw0KGgoAAAANSUhEUgAA...",
      "revised_prompt": "..."
    }
  ]
}
```

这时响应里通常没有 `url`，需要客户端自己把 `b64_json` 解码成图片文件。普通用户更推荐使用默认的 `url`，最容易保存和分享。

`revised_prompt` 是模型实际使用前改写过的提示词，看到它是正常现象，不是报错。

#### 文生图参数支持情况

| 参数 | 类型 | 支持情况 | 说明 |
|------|------|----------|------|
| `model` | string | 支持 | 固定填写 `gpt-image-2`。 |
| `prompt` | string | 支持 | 图片描述提示词，建议写清楚主体、场景、风格、比例和文字内容。 |
| `n` | integer | 仅支持 `1` | 只支持一次返回 1 张图。~~`n: 2`、`n: 4`~~ 这类多图数量不支持；实测即使传 `2`，也只返回 1 张。 |
| `size` | string | 支持 | 支持 `auto` 和符合限制的尺寸，如 `1024x1024`、`1536x1024`、`1024x1536`、`1536x864`、`3840x2160`。 |
| `quality` | string | 支持 | 可选 `low`、`medium`、`high`、`auto`。测试或草稿建议用 `low`，正式出图建议用 `high`。 |
| `response_format` | string | 支持 | 可选 `url`、`b64_json`。默认建议用 `url`；`b64_json` 适合程序自行保存图片。 |
| `output_format` | string | 部分支持 | 推荐 `png` 或 `jpeg`。~~`webp`~~ 不建议使用；实测请求成功但仍返回 PNG。 |
| `output_compression` | integer | 支持 | 输出为 `jpeg` 时可传 `0` 到 `100` 控制压缩质量，数字越大文件越清晰也越大。 |
| `background` | string | 部分支持 | 建议使用默认值或 `opaque`。~~`transparent`~~ 当前不支持，实测会返回 `Transparent background is not supported for this model.` |
| `moderation` | string | 支持 | 可选 `auto`、`low`。不确定时保持默认即可。 |
| `user` | string | 支持 | 可选，用于标记你自己的终端用户或业务来源，普通调用可以不传。 |
| ~~`stream`~~ | boolean | 不支持 | 文生图接口实测无法正常返回流式结果，请不要开启。 |
| ~~`partial_images`~~ | integer | 不支持 | 依赖 `stream` 的中间图返回能力，当前不支持。 |
| ~~`style`~~ | string | 不支持 | 这是旧模型常见参数，`gpt-image-2` 不需要也不建议传。 |

#### 图片编辑参数支持情况

| 参数 | 类型 | 支持情况 | 说明 |
|------|------|----------|------|
| `model` | string | 支持 | 固定填写 `gpt-image-2`。 |
| `prompt` | string | 支持 | 写清楚要保留什么、修改什么、最终希望得到什么。 |
| `image` | file | 支持 | 必填，上传要编辑的图片二进制文件。当前文档只保证单张图片上传方式。 |
| `mask` | file | 支持 | 可选，局部修改时使用 PNG mask；不传则按整图编辑理解。 |
| `n` | integer | 仅支持 `1` | 只支持一次返回 1 张图。~~多张结果~~ 不支持；实测传 `2` 也只返回 1 张。 |
| `size` | string | 支持 | 同文生图，支持 `auto` 和符合限制的尺寸。 |
| `quality` | string | 支持 | 可选 `low`、`medium`、`high`、`auto`。 |
| `response_format` | string | 支持 | 可选 `url`、`b64_json`。默认建议用 `url`。 |
| `output_format` | string | 部分支持 | 推荐 `png` 或 `jpeg`。~~`webp`~~ 不建议使用。 |
| `output_compression` | integer | 支持 | 输出为 `jpeg` 时可传 `0` 到 `100`。 |
| `background` | string | 部分支持 | 建议使用默认值或 `opaque`。~~`transparent`~~ 当前不支持。 |
| `moderation` | string | 支持 | 可选 `auto`、`low`。 |
| `input_fidelity` | string | 支持 | 图片编辑时可传 `high`，让模型尽量保留原图主体和细节。 |
| `user` | string | 支持 | 可选，普通调用可以不传。 |
| ~~`stream`~~ | boolean | 不支持 | 实测不会返回 OpenAI 标准流式事件，建议关闭。 |
| ~~`partial_images`~~ | integer | 不支持 | 依赖 `stream` 的中间图返回能力，当前不支持。 |

::: tip 参数怎么选
- 最简单文生图：只传 `model`、`prompt`，并把 `n` 设为 `1`。
- 想控制清晰度：加 `quality: "high"`。
- 想控制尺寸：加 `size`，比如 `1024x1024` 或 `1536x1024`。
- 想拿图片链接：使用默认 `response_format: "url"`。
- 想让程序自己保存图片：使用 `response_format: "b64_json"`。
- 不要把 `n` 设置成大于 `1`，多张图片需要自己循环请求。
:::

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
