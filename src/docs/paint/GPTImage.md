---
title: GPT-Image 绘图教程
icon: material-symbols:image-outline
order: 2
---

## 前置准备

GPT-Image 系列模型全部归在 **image 分组**，`gpt-image-2`、`gpt-image-2.5-flare`、`gpt-image-2.5-sunburst` 都在这个分组里，实时模型列表见 [令牌分组介绍 → 绘图模型](/docs/token/2-group.html#绘图模型)。

参照 [创建令牌分组](/docs/register/4-token.html#%E8%BF%9B%E5%85%A5%E4%BB%A4%E7%89%8C%E7%AE%A1%E7%90%86) 教程创建令牌，**分组选择 `image`**。

::: tip 接口地址填哪个
- 全球线路（生产推荐）：`https://cf.api.fan`
- 优化线路（延迟敏感时用）：`https://slb-v1.api.fan`

按你的线路情况选一个填进客户端即可，下面所有示例统一用 `cf.api.fan`。`https://www.packyapi.ai` 是控制台网页地址，不是接口地址，不要填进去。
:::

## 调用方式

OpenAI 官方把图片相关能力分成 Responses API、Images API、Chat Completions API 三类。Packy 的 GPT-Image 模型只能走 Images API：

| API | 官方用途 | Packy 支持情况 |
|-----|----------|----------------|
| Images API | 生成图片，也可以上传图片做编辑 | 支持，本文推荐方式 |
| Responses API | 把图片作为输入，或通过 `image_generation` 工具出图 | 不支持出图，请改用 Images API |
| Chat Completions API | 分析图片输入，输出文本或音频 | 不支持出图，`size`、`quality`、`output_format` 等参数不会按图片接口生效 |

两个接口分工很简单：**只写提示词就出图**用 `/v1/images/generations`，**要先上传一张图再改**用 `/v1/images/edits`。

### 文生图：`/v1/images/generations`

```bash
curl --location 'https://cf.api.fan/v1/images/generations' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer 你的image分组令牌' \
--data '{
    "model": "gpt-image-2",
    "prompt": "一只橘猫戴着橙色围巾抱着水獭，温暖插画风格",
    "size": "1536x1024",
    "quality": "high",
    "n": 1
}'
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `model` | string | 必填。`gpt-image-2`、`gpt-image-2.5-flare`、`gpt-image-2.5-sunburst` 三选一，具体可用值以 image 分组实时列表为准。 |
| `prompt` | string | 必填。建议写清楚主体、场景、风格、比例和图上要出现的文字。 |
| `n` | integer | 仅支持 `1`。~~`n: 2`、`n: 4`~~ 这类多图数量不支持，需要多张就多发几次请求。 |
| `size` | string | `auto`（默认）或符合尺寸限制的宽高，写法见下方[尺寸与质量](#尺寸与质量)。 |
| `quality` | string | `low`、`medium`、`high`、`auto`。草稿用 `low`，正式出图用 `high`。 |
| `output_format` | string | `png` 或 `jpeg`。`webp` 也能出，但想要最好的兼容性就用 `png`。 |
| `output_compression` | integer | `0` 到 `100`，只在 `output_format` 为 `jpeg` 时使用。 |
| `background` | string | 默认值或 `opaque`。~~`transparent`~~ 不支持，需要透明底请用抠图工具后处理。 |
| `moderation` | string | `auto` 或 `low`。安全审核参数，不改变画面风格，不确定就保持默认。 |
| `user` | string | 可选，用来标记你自己的终端用户或业务来源，普通调用不用传。 |
| ~~`stream`~~、~~`partial_images`~~ | — | 不支持。开启后不会返回中间图，还可能直接报错。 |
| ~~`style`~~ | string | 旧模型参数，`gpt-image-2` 不需要传。 |

### 图片编辑：`/v1/images/edits`

`/v1/images/edits` 用 `multipart/form-data` 上传图片：`image` 是图片文件，`prompt` 写清楚希望怎么改。

```bash
curl --location 'https://cf.api.fan/v1/images/edits' \
--header 'Authorization: Bearer 你的image分组令牌' \
--form 'model="gpt-image-2"' \
--form 'prompt="保留图片主体，在右上角加一枚红色小印章，印章上写 DEMO"' \
--form 'image=@"/path/to/your-image.jpg"' \
--form 'size="1024x1024"' \
--form 'quality="high"' \
--form 'output_format="png"'
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `model` | string | 必填，同上。 |
| `prompt` | string | 必填。写清楚保留什么、改什么、最终要什么效果。 |
| `image` | file | 必填。要编辑的图片文件。GPT-Image 系列本身支持一次传多张输入图，实际使用时建议先只传 1 张，效果最容易控制。 |
| `mask` | file | 可选。局部修改时传 PNG mask，透明区域表示允许改动的位置；不传则按整图编辑理解。 |
| `n` | integer | 仅支持 `1`，同文生图。 |
| `size` | string | 同文生图。 |
| `quality` | string | `low`、`medium`、`high`、`auto`。 |
| `output_format` | string | `png` 或 `jpeg`。`webp` 也能出，但优先用 `png`。 |
| `output_compression` | integer | `0` 到 `100`，配合 `jpeg` 使用。 |
| `background` | string | 默认值或 `opaque`，不支持 `transparent`。 |
| `moderation` | string | `auto` 或 `low`。 |
| ~~`input_fidelity`~~ | string | **不要传。** `gpt-image-2` 对输入图固定按高保真处理，官方明确说明该模型不接受这个参数；只有 `gpt-image-1`、`gpt-image-1.5`、`gpt-image-1-mini` 这类老模型才需要它。 |
| `user` | string | 可选，普通调用不用传。 |
| ~~`stream`~~、~~`partial_images`~~ | — | 不支持。 |

需要局部修改时再额外传 `mask`：PNG 格式，透明的地方表示允许模型重点修改的位置。

::: tip 参数怎么选
- 最简单文生图：只传 `model`、`prompt`，`n` 填 `1`。
- 想要更清晰：加 `quality: "high"`。
- 想控制画幅：加 `size`，比如 `1024x1024`、`1536x1024`。
- 想出多张：不要调大 `n`，循环请求即可。
- 其它参数能不传就不传，只传你真正需要的，排错时也更容易定位。
:::

### 尺寸与质量

- 常用尺寸
  - **1024 × 1024**：正方形
  - **1536 × 1024**：横向
  - **1024 × 1536**：纵向
  - **2048 × 2048**：2K 正方形
  - **2048 × 1152**：2K 横向
  - **3840 × 2160**：4K 横向
  - **2160 × 3840**：4K 纵向
  - **auto**：自动（默认）

- 尺寸限制（GPT-Image 通用）
  - 最大边长 **不超过 3840 像素**
  - 宽和高都必须是 **16 的倍数**
  - 长边与短边的比例 **不能超过 3:1**
  - 总像素 **不少于 655,360**，且 **不超过 8,294,400**

- 质量选项：`low`、`medium`、`high`、`auto`（默认）。尺寸越大、质量越高，生成越慢，也越容易撞上代理的长连接限制（见文末）。

### 返回结果

正常出图会返回图片下载地址：

```json
{
  "created": 1776923999,
  "data": [
    {
      "url": "https://external-resources.packyapi.ai/file_download/xxxxxxxx-xxxx",
      "revised_prompt": "..."
    }
  ]
}
```

访问返回的 `url` 就能下载图片。`revised_prompt` 是模型实际使用的改写后提示词，看到它是正常现象。

个别线路不给 `url`，而是直接返回 Base64 数据：

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

这时需要自己把 `b64_json` 解码成图片文件。

## 在 Codex 中使用

Codex 的生图能力来自内置技能 `$CODEX_HOME/skills/.system/imagegen`（Windows 上是 `C:\Users\你的用户名\.codex\skills\.system\imagegen`），它有两套模式：

- **内置 `image_gen` 工具（默认）**：按技能自己的说明，这条路径不需要 `OPENAI_API_KEY`，也不用你填接口地址。
- **CLI 兜底 `scripts/image_gen.py`**：真正去调 Image API，需要 `OPENAI_API_KEY` 和网络。

所以在 Packy 上直接让 Codex「帮我画张图」，走的是内置工具，请求根本不会发到我们的 Images API。正确做法是让它照抄这个技能里的 CLI 脚本、把接口指到 Packy —— 内置文件不要改（技能里明确禁止修改 `image_gen.py`），所以下面直接复制一份出来单独用。

### 一次性配置

不用改内置的 `imagegen`，也不用动 `AGENTS.md`：让 Codex 给自己**新建一个生图技能**就行，只粘一次。

::: warning 粘之前先把 key 换掉
提示词里的 `OPENAI_API_KEY=sk-在这里粘贴你的image分组令牌` 是一行**占位文本**，要把 `sk-在这里粘贴…` 整段换成你自己的 `image` 分组令牌（就是[创建令牌分组](/docs/register/4-token.html#%E8%BF%9B%E5%85%A5%E4%BB%A4%E7%89%8C%E7%AE%A1%E7%90%86)那一步复制到的、`sk-` 开头那串）。不替换就直接粘，Codex 会拿这串占位文字去请求，必然鉴权失败。
:::

```text:no-line-numbers
给我新建一个生图技能，别改内置的 imagegen。

技能目录：~/.codex/skills/packy-imagegen/
1. 把内置技能的 scripts/image_gen.py 原样复制过来，不要修改它。
2. 写 .env：
   OPENAI_BASE_URL=https://cf.api.fan/v1
   OPENAI_API_KEY=sk-在这里粘贴你的image分组令牌
3. 写 SKILL.md：frontmatter 的 description 要写明
   「用户要生成或编辑图片时用本技能，走 Packy 的 Images API，
   优先于内置 image_gen 工具」；
   正文写清：跑 scripts/image_gen.py，先 source 同目录 .env，
   默认模型 gpt-image-2，输出到 output/imagegen/，
   命令超时按 600 秒算。

建好后用 --dry-run 验证一次，把请求体给我看。
```

::: tip 密钥会不会留在聊天记录里
会留一次——提示词里带的是明文。介意的话先把 `.env` 自己建好，再让 Codex 只做第 1、3 步；或者配完把这条会话删掉。
:::

建好后 Codex 会回一份清单，技能目录、`SKILL.md`、`.env`、执行脚本都在里面：

![](/assets/image/Paint/gpt-image-2/codex-skill.webp)

之后**新会话里直接说「帮我画一张……」就行**——Codex 每个会话都会带上技能列表，`description` 里写明了画图就走这个技能，不用再贴提示词，密钥也跟着技能目录走。下面就是一个新开的会话：

![](/assets/image/Paint/gpt-image-2/codex-newchat.webp)

::: tip 三个细节
- 脚本要靠 `openai` SDK 发请求，环境里没有就 `pip install openai`。
- **脚本是按 `b64_json` 落盘的**：如果这次接口返回的是图片 `url`（我们这边有渠道只给 url），脚本解不出来。这时让 Codex 用 curl 按同样的请求体取 `data[0].url` 下载即可，别去改脚本。
- **用 2.5 模型时尺寸会被脚本拦住**：脚本只对 `gpt-image-2` 放开自定义尺寸，`gpt-image-2.5-flare`、`gpt-image-2.5-sunburst` 的 `--size` 只能用 `1024x1024`、`1536x1024`、`1024x1536`、`auto`。
:::

::: warning 沙盒与代理
1. **沙盒没有网络**：Codex 默认不给命令网络权限，脚本会直接连不上接口。`~/.codex/config.toml` 里至少要有下面这段；改完重启 Codex。

```toml
approval_policy = "on-request"
sandbox_mode = "workspace-write"

[sandbox_workspace_write]
network_access = true
```

2. **代理会掐断长连接**：出图请求比聊天请求慢得多，代理在 60 秒左右主动断连时会表现为超时或空响应。把接口域名 `cf.api.fan`（或直接放行 `api.fan`）加进直连或白名单，规则写法和文末 Cherry Studio 那节一致。
:::

## 在 Cherry Studio 中使用

1. 参照 [创建令牌分组](/docs/register/4-token.html#%E8%BF%9B%E5%85%A5%E4%BB%A4%E7%89%8C%E7%AE%A1%E7%90%86) 一章的教程，创建**令牌分组**为 `image` 的令牌。创建好令牌后，点击复制按钮，将 API Key 复制到剪切板。

2. 访问 [Cherry Studio](https://www.cherry-ai.com/) 官网下载并安装软件。

3. 打开 Cherry Studio，进入 `设置` → `模型服务`，点击 `添加`，选 `自定义提供商`。

4. 在「添加自定义提供商」窗口里填三处（名字随意，截图里用的是 `PackyCode`）：

   - `提供商名称`：`PackyCode`
   - `API 密钥`：粘贴第 1 步复制的 `image` 分组令牌
   - `端点设置` 里除了默认的 `OpenAI`，还要把 `图像生成 Base URL` 和 `图像编辑 Base URL` 都填成 `https://cf.api.fan`

   填完这两个地址，窗口里会直接显示实际请求路径：`https://cf.api.fan/v1/images/generations` 和 `https://cf.api.fan/v1/images/edits`。确认无误后点 `添加`。

![](/assets/image/Paint/gpt-image-2/01.webp)

5. 保存后会直接弹出「选择模型」窗口，勾选 `GPT-Image-2`、`GPT Image 2.5 Flare`、`GPT Image 2.5 Sunburst`，再点 `添加所选模型`。

![](/assets/image/Paint/gpt-image-2/02.webp)

6. 回到提供商页面核对三项：`API 密钥` 已保存、`API 地址` 是 `https://cf.api.fan`、`模型` 列表里能看到刚添加的模型。模型少了就点 `同步模型` 再选一次。

![](/assets/image/Paint/gpt-image-2/03.webp)

7. 回到 `启动台`，在 `应用` 里点 `绘画`。

![](/assets/image/Paint/gpt-image-2/04.webp)

8. 进入绘画页：挑一个模板作为起点，或直接在下方描述框写提示词（也可以上传图片做编辑）。底部确认模型是 `GPT Image 2.5 Flare` 这类 GPT-Image 模型。

![](/assets/image/Paint/gpt-image-2/05.webp)

9. 点发送开始生成，出图后可以点 `收起提示词` 查看整张图。

![](/assets/image/Paint/gpt-image-2/06.webp)

::: tip 使用建议
- `API 地址` 和两个图像端点都填 `https://cf.api.fan` 即可，Cherry Studio 会自己拼兼容路径，不用手动补 `/v1`。
- 模型列表里没有想要的模型，先点 `同步模型` 刷新；还是画不出来，回头检查 `图像生成 Base URL`、`图像编辑 Base URL` 有没有填。
- 在普通对话页直接调 GPT-Image 模型时，建议关掉 `流式输出`；用 `绘画` 应用则不用额外处理。
:::

### 可能出现的问题

如果 Cherry Studio 弹出 `Failed to fetch`，通常是请求连接被中断，可能和本机代理或网络有关。先确认 Cherry Studio 能正常访问 `https://cf.api.fan`，再重试。

![](/assets/image/Paint/gpt-image-2/07.webp)

如果弹出 `Unexpected token '<', "<html><h"... is not valid JSON`，说明请求过程中收到了 Cloudflare 之类的页面内容，客户端按 JSON 解析就报错了。直接重试，或稍后再生成一次。

![](/assets/image/Paint/gpt-image-2/08.webp)

## 特别注意：长连接与代理设置

不管是用 API 直连还是在 Cherry Studio 里用，图片生成都比普通聊天慢得多——编辑模式、高清质量、高分辨率尤其明显。本机代理、网络工具或中间网关如果限制长连接，可能在 60 秒左右主动断开，表现为请求超时、没有返回内容，或者客户端提示 `Failed to fetch`。

下面以在 Cherry Studio 里上传图片做编辑为例：长连接被中断时，程序直接弹 `Failed to fetch`；开发者工具里能看到 `edits` 请求停在 1 分钟左右。直接调 API 时提示形式不同，但原因一样，都是连接在出图完成前被掐断。

![](/assets/image/Paint/gpt-image-2/09.webp)

确认是代理导致的，就把接口域名加进代理工具的直连或白名单规则。不同代理软件入口不一样，核心是加一条类似 `domain:api.fan` 的规则。

![](/assets/image/Paint/gpt-image-2/10.webp)

放行之后，同类请求就能等更久并正常返回：下图中请求在约 1.6 分钟后拿到图片。分辨率更高、质量更高时，时间还会更长。想少踩网络问题，绘图请求尽量直连 `cf.api.fan`，不要走会限制长连接的代理或中转。

![](/assets/image/Paint/gpt-image-2/11.webp)
