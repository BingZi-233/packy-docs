---
title: 常见问题（FAQ）
index: false
icon: mingcute:question-fill
category:
  - 常见问题
date: 2025-11-25
---

## ::material-icon-theme:claude:: Claude Code 相关

### 如何在Vscode CC插件中使用PackyApi

::: tabs

@tab Windows
1. 确保你已进行 [环境检查](/docs/cli/1-env.html) 并保证你的claude code cli是没问题的，如果有问题，请按照教程进行配置

2. 键盘按下“Win+R”键，输入以下内容后回车，打开Claude Code配置目录

```bash
%userprofile%\.claude
```

![](https://cdn.xf233.io/project/Packy-docs/Cli/013.png)

3. 目录内容如图所示，如果目录中没有 `config.json`，你需要手动创建后打开

- **config.json**：配置Vscode的Claude Code插件的一些行为

![](https://cdn.xf233.io/project/Packy-docs/Cli/014.png)

4. 在`config.json`中写入以下内容后保存

```json
{
  "primaryApiKey": "PackyApi"
}
```

5. 重启你的Vscode，开始愉快使用吧！

@tab MacOS

1. 确保你已进行 [环境检查](/docs/cli/1-env.html) 并保证你的claude code cli是没问题的，如果有问题，请按照教程进行配置

2. 在访达界面按下 “Command+Shift+G”，输入以下路径后回车，打开配置目录

```bash
~/.claude
```

![](https://cdn.xf233.io/project/Packy-docs/Cli/017.png)

3. 目录内容如图所示，如果目录中没有 `config.json`，你需要手动创建后打开

- **config.json**：配置Vscode的Claude Code插件的一些行为

![](https://cdn.xf233.io/project/Packy-docs/Cli/018.png)

4. 在`config.json`中写入以下内容后保存

```json
{
  "primaryApiKey": "PackyApi"
}
```

5. 重启你的Vscode，开始愉快使用吧！

:::

### Claude Code 中常用命令

| 命令 | 功能说明 |
| --- | --- |
| /claude | 在当前目录启动交互式 REPL，对话式使用 Claude Code。 |
| /claude "解释这个项目" | 启动 REPL 并带上初始问题，一进来就让 Claude 分析项目。 |
| /claude -p "解释这个函数" | 使用 print 模式一次性问答，输出结果后直接退出，便于脚本/CI 调用。 |
| /cat logs.txt \| claude -p "帮我总结错误" | 将文件或命令输出通过管道喂给 Claude，再配合 `-p` 做总结、分析。 |
| /claude -c | 继续当前目录最近的一次会话，在原有上下文里接着聊。 |
| /claude -c -p "检查类型错误" | 在最近会话上下文中执行一次性请求，常用于自动化检查。 |
| /claude -r "abc123" "把这个 PR 完成" | 通过会话 ID 恢复指定会话，并继续执行新的任务。 |
| /claude update | 将 Claude Code CLI 更新到最新版本。 |
| /claude mcp | 管理和配置 MCP 服务器，让 Claude 能访问外部数据源和工具。 |
| /claude --add-dir ../apps ../lib | 为 Claude 额外添加可访问的代码目录，支持跨多个路径读代码。 |
| /claude --agents '{"reviewer":{...}}' | 通过 JSON 临时定义子 Agent，例如 code-reviewer、debugger 等。 |
| /claude -p "生成接口文档" --output-format json | 使用 JSON 格式输出回答，方便后续脚本解析处理。 |
| /claude --model sonnet | 指定会话使用的模型（如 sonnet / opus 或具体模型名）。 |
| /claude --verbose | 打开详细日志，显示工具调用和内部步骤，便于调试。 |
| /claude --resume abc123 "继续修这个 Bug" | 通过会话 ID 恢复会话，在任意目录继续之前的工作。 |
| /claude --continue | 载入当前目录最近的一次会话，相当于“继续上次对话”。 |
| /claude --append-system-prompt "始终使用 TypeScript" | 在默认系统提示后追加自定义规则，不影响默认行为。 |
| /claude --dangerously-skip-permissions | 跳过权限确认，让 Claude 自动执行读写文件/运行命令（高风险，仅在完全信任环境使用）。 |

### claude code 无法连接到 Anthropic 服务

::: info 注意事项
**如果你是首次配置根据链接跳转到这一步，直接按照下面的教程运行命令即可**
:::

使用npm安装完claude之后。
在命令行输入claude报了如下错误：
```text
Unable to connect to Anthropic services
Failed to connect to api.anthropic.com: ERR BAD REQUEST
lease check your internet connection and network settings.
Note: Claude Code might not be available in your country, Check supported countries atnttps://anthropic.com/supported-countriesS E:ltoollclaude code>
```

![](https://cdn.xf233.io/project/Packy-docs/FAQ/CC/001.jpg)

或是在你初次配置时出现以下问题：

![](https://cdn.xf233.io/project/Packy-docs/FAQ/CC/003.png)

::: tabs

@tab Windows

1. 按下键盘 `Win + R` 键，输入 `cmd` 后回车，打开命令行程序

2. 在命令行中运行以下命令后回车

```bash
powershell -Command "$f='%USERPROFILE%\.claude.json';$j=Get-Content $f|ConvertFrom-Json;$j|Add-Member -NotePropertyName 'hasCompletedOnboarding' -NotePropertyValue $true -Force;$j|ConvertTo-Json|Set-Content $f"
```

3. 重启你的Claude Cli

@tab MacOS

1. 在APP列表中找到终端程序，点击运行
![](https://cdn.xf233.io/project/Packy-docs/FAQ/CC/002.png)

2. 在终端中运行以下命令后回车

```bash
jq '. + {"hasCompletedOnboarding": true}' ~/.claude.json > /tmp/tmp.json && mv /tmp/tmp.json ~/.claude.json
```

> [!tip]
> 注意，如果提示未找到jq，可以输入 `brew install jq` 进行安装

3. 重启你的Claude Cli
:::

## ::hugeicons:chat-gpt:: Codex 相关

### ::ic:round-whatshot:: 一点点技巧，如何更高效地使用Codex

> 很多人可能会在使用过一段时间Codex后认为模型不如以前好用，也就是出现所谓的“降智”现象
> 而就目前我的使用体验来看，Codex中提供的模型经过很多次升级，其实都没有出现“降智”，关键是在于**你如何合理地去使用模型**

1. **任务划分：** 任何时候，都不要去提交一个非常笼统的任务，例如 `请帮我写一个管理系统后台` 等，这样使用必然降智！Codex模型的特点是**严谨有序，指哪打哪**，这就意味着你需要对你的任务进行拆分

2. **掌控之内：** 在你开始一个任务之前，你需要对这个任务进行评估，思考这个任务是否已经拆分的足够细致，是否符合“模块化”开发的准则。在任务提交之前，你应该有能力预估Codex这次改动会修改哪些文件，产生哪些变动。一定不要让AI脱离你的认知与掌控之内，不然最终结局就是项目越改越乱，直到从原点重新开始

::: info 一些碎碎念
有一说一，AI时代让很多东西都变得十分简单，但是基础知识决定着你使用AI的上限，目前阶段的AI只算作是一个十分优秀的Copilot角色。这也导致同样的AI在不同的人手里会有不一样的发挥~
:::

3. **避免压缩：** 在多数场景下，你的任务其实最多使用Codex大概60%的上下文就能解决。如果你的任务超过了60%的上下文仍未解决，甚至还需要压缩，那么你这次任务执行之前的拆分工作算是失败了，你需要更加精细地拆分你的任务。一个优秀的Codex Vibe Coding选手几乎不用进行内容压缩！

### 在Windows系统下，丝滑使用Codex！

> [!important]
> 此方法同时解决**读写文件、乱码、Token耗费高、项目无记忆**等多个痛点

1. 确保你的`Codex CLI `与`Vscode Codex`插件正常运行，即你已经能顺利在Vscode的Codex插件上与模型进行对话

2. 我们需要安装两个MCP工具：
 - **Serena：** 功能强大的编码代理工具包，提供语义检索和项目记忆功能 [Github](https://github.com/oraios/serena)

 - **Desktop-Commander：** 一个优秀的文件操作工具 [Github](https://github.com/wonderwhy-er/DesktopCommanderMCP)

::: tabs
@tab Serena
1. 确保你的电脑已经安装了Python，在终端中输入`python`会有交互产生
![](https://cdn.xf233.io/project/Packy-docs/FAQ/Codex/006.png)

2. 在终端输入以下命令来安装`uv`管理器
```bash
pip install uv
```

3. 安装完成之后，会弹出`uv`的命令提示

![](https://cdn.xf233.io/project/Packy-docs/FAQ/Codex/007.png)

4. 在终端中运行`git`命令，如果提示“命令未找到”，则需要你去安装，待安装好后进入下一步

[Git下载地址](https://git-scm.com/)

5. 在D盘或者其他你存放代码的目录新建一个MCP目录，然后在目录下运行cmd命令行，输入以下命令拉取Serena的仓库
```bash
git clone https://github.com/oraios/serena.git
```

完成后`cd serena`进入目录

6. 运行以下命令启动Serena Mcp
```bash
uv run serena start-mcp-server --context codex --transport streamable-http --port 9121
```

此时你的浏览器应该会自动弹出Serena的网页控制台

@tab Desktop-Commander
> [!important]
> 这个MCP工具存在一个BUG，会导致安装失败，作者到现在都没进行修复。为了能成功安装，流程会稍微复杂一些

1. 请先在终端运行以下命令，观察是否能安装成功，若安装成功，则如图中所示。若安装成功，直接进入教程第三步，此步骤余下内容直接跳过

```bash
npx @wonderwhy-er/desktop-commander@latest setup
```
![](https://cdn.xf233.io/project/Packy-docs/FAQ/Codex/008.png)

2. 如果报错了，请你下载 [rg.exe](https://cdn.xf233.io/project/Packy-docs/FAQ/Codex/rg.exe) 到本地

3. 键盘按下“Win+R”键，输入以下内容后回车，打开你的用户目录

```bash
%userprofile%
```

4. 在此目录下，寻找是否有`.cargo`文件夹，若不存在，则手动进行创建

5. 进入`.cargo`目录，之后创建`bin`目录，将刚才下载的`rg.exe`文件复制或剪切进入`bin`目录中

6. 重新启动你的cmd终端窗口，输入以下命令
```bash
npx @wonderwhy-er/desktop-commander@latest setup
```

7. 此时，你应该已经安装成功

![](https://cdn.xf233.io/project/Packy-docs/FAQ/Codex/008.png)

:::

3. 键盘按下“Win+R”键，输入以下内容后回车，打开你的用户目录

```bash
%userprofile%\.codex
```

4. 找到目录中的`config.toml`文件，打开并编辑，在最后加上两个MCP设置，你的配置文件应该如下
```toml
model_provider = "packycode"
model = "gpt-5.1-codex"
model_reasoning_effort = "high"
network_access = "enabled"
disable_response_storage = true
windows_wsl_setup_acknowledged = true
model_verbosity = "high"

[model_providers.packycode]
name = "packycode"
base_url = "https://www.packyapi.com/v1"
wire_api = "responses"
requires_openai_auth = true

[mcp_servers.desktop-commander]
type = "stdio"
command = "cmd"
args = ["/c", "npx", "-y", "@wonderwhy-er/desktop-commander@latest","--no-onboarding"]

[mcp_servers.desktop-commander.env]
SystemRoot = 'C:\Windows'

[mcp_servers.Serena]
type = "http"
url = "http://127.0.0.1:9121/mcp"
```

> [!important]
> 注意如果你是Codex包月用户，模板之中的base_url应该填写`https://codex-api.packycode.com/v1`

5. 打开目录下`AGENTS.md`文件（如果没有请手动创建），在里面写入以下内容后保存
```markdown
# Codex全局工作指南

## 回答风格:
 - 回答必须使用中文
 - 对总结、Plan、Task、以及长内容的输出，优先进行逻辑整理后使用美观的Table格式整齐输出;普通内容正常输出

## 工具使用:
1. 文件与代码检索:使用serena mcp来进行文件与代码的检索
2. 文件相关操作:对文件的创建、读取、编辑、删除等操作
    - 优先使用apply_patch工具进行
    - 读文件，apply_patch工具报错或出现问题的情况下使用desktop-commander mcp
    - 任何情况下，禁止使用cmd、powershell或者python来进行文件相关操作
```

> [!important]
> **注意，此提示词是为适配Vscode Codex插件专门配置的，因为apply_patch工具只有Codex插件才有，在CLI中不适用！**

6. 运行你的Vscode，打开Codex插件用起来，看看有什么不一样吧~

### Codex 中常用命令
| 命令       | 说明                                       |
| ---------- | ------------------------------------------ |
| /model     | 选择当前使用的模型                         |
| /approvals | 设置本会话的审批规则                       |
| /review    | 让 Codex 审查当前工作区变更                |
| /resume    | 从历史会话列表中选择并继续一个之前的交互会话 |
| /new       | 在当前 CLI 会话中开启新对话                |
| /init      | 在当前目录生成 AGENTS.md 模板              |
| /compact   | 总结对话内容以释放上下文                   |
| /undo      | 撤销 Codex 的上一次操作                    |
| /diff      | 查看当前 git diff（含未跟踪文件）          |
| /mention   | 将指定文件或目录加入对话上下文             |
| /status    | 查看会话配置和 token 使用情况              |
| /mcp       | 列出当前可用的 MCP 工具                    |
| /exit      | 退出 Codex CLI                             |

### Codex在windows系统下乱码问题

1. 按下快捷键`Win + R`，打开左下脚运行窗口，输入以下命令后回车

```bash
intl.cpl
```

![](https://cdn.xf233.io/project/Packy-docs/FAQ/command.png)

2. 点击上侧选项卡“管理”，再点击红色箭头所示的“更改系统区域设置”按钮

![](https://cdn.xf233.io/project/Packy-docs/FAQ/Codex/001.png)

3. 勾选红色箭头所指选项，点击确定。然后在刚才的窗口也点击确定，之后重启一下你的电脑再使用codex，即可避免乱码

![](https://cdn.xf233.io/project/Packy-docs/FAQ/Codex/002.png)


### Vscode Codex插件中设置最新模型

::: tabs

@tab Windows

1. 按下快捷键`Win + R`，打开左下脚运行窗口，输入以下命令后回车

```bash
%userprofile%\.vscode\extensions
```

![](https://cdn.xf233.io/project/Packy-docs/FAQ/command.png)

@tab MacOS

1. 在访达界面按下 “Command+Shift+G”，输入以下路径并回车，打开VsCode插件目录

```bash
~/.vscode/extensions
```

![](https://cdn.xf233.io/project/Packy-docs/FAQ/Codex/009.png)

:::

2. 找到以`openai.chatgpt`开头的文件夹，后面的数字是版本号，如果存在多个这种开头的目录，选择版本号最新的目录进入

![](https://cdn.xf233.io/project/Packy-docs/FAQ/Codex/003.png)

3. 依次进入`webview\assets`文件夹，你会看到一大堆js文件

![](https://cdn.xf233.io/project/Packy-docs/FAQ/Codex/004.png)

4. 下载**替换脚本**后解压，将这个js文件复制到刚才有一大堆js文件的目录

<div class="codex-download-card" v-cloak>
  <div class="codex-download-card__header">
    <div>
      <div class="codex-download-card__title">替换脚本下载</div>
      <p class="codex-download-card__desc">自动读取最新版本号与文件名，直接点击即可下载</p>
    </div>
    <span class="codex-download-card__badge" :class="{'is-loading': loading}">
      {{ loading ? '读取中…' : (version ? '支持的Codex插件版本 v' + version : '待获取') }}
    </span>
  </div>

  <div v-if="description" class="codex-download-card__notice">
    {{ description }}
  </div>

  <div class="codex-download-card__info">
    <div class="codex-download-card__row">
      <span class="codex-download-card__mono">
        {{ loading ? '文件名' : (fileName || '文件名') }}
      </span>
      <button
        class="codex-download-card__btn"
        :disabled="!downloadUrl || loading"
        @click="handleDownload"
      >
        立即下载
      </button>
    </div>
  </div>

  <p v-if="error" class="codex-download-card__error">获取失败：{{ error }}</p>
</div>

5. 重启你的vscode，你就能看见现在能选择最新模型啦！

### Codex如何配置全局提示词

1. 请你查看 [Codex CLI 配置](/docs/cli/3-codex.html) 中的前两步

2. 教程中提到的`AGENTS.md`文件就是Codex的全局提示词文件，如果没有这个文件，你同样需要手动创建这个文件，然后写入提示词

3. 写入提示词保存，重启你的Codex或者vscode，提示词即生效

### Codex开启内置网络搜索

1. 请你查看 [Codex CLI 配置](/docs/cli/3-codex.html) 中的前两步

2. 打开教程中提到的`config.toml`文件，在里面加入以下内容

```toml
[features]
web_search_request = true
```

3. 运行Codex，进行尝试

![](https://cdn.xf233.io/project/Packy-docs/FAQ/Codex/010.png)

### Codex 在容器或CLI沙盒中的网络连接问题

> 当Codex在CLI沙盒或容器（如tun模式）中运行时遇到网络连接问题（如无法拉取安装包），且其他工具（如终端、Claude Code）正常，这通常是由于MTU设置不当引起的。

**解决方案：**

- 将MTU值改为1500，此设置通常可在您的Clash客户端中进行更改。

- 对于在Linux上找不到Clash MTU设置的用户，可以参考此链接：https://linux.do/t/topic/1220328

### Connection failed 问题

报错信息类似为：

```txt
Connection failed: error sending request for url (https://www.packycode.com/v1/responses)
```

出现这种情况是你本机网络出现了问题，按以下步骤排查
1. 检查本机网络是否通畅，能否访问其他页面

2. 检查你的电脑是否使用了`网络代理（梯子）`工具，如果存在请你关闭

3. 使用终端，运行`codex`命令，尝试在CLI中发送对话信息，判断是否是Vscode Codex插件问题，如是，请你重启vscode进行尝试

4. 如果还不行，带上你的报错截图，在群内咨询客服或群友

### 401报错问题

报错信息类似为：

```txt
exceeded retry limit, last status: 401 Unauthorized, request id: xxxxxx
```

1. 在Windows或MacOS的终端运行以下命令，判断是否存在环境变量

::: tabs

@tab Windows

```bash
cmd /c "echo ================= OPENAI ENV CHECK ================= & ^
if defined OPENAI_API_KEY (echo OPENAI_API_KEY  = OK) else (echo OPENAI_API_KEY  = MISSING) & ^
if defined OPENAI_BASE_URL (echo OPENAI_BASE_URL = OK) else (echo OPENAI_BASE_URL = MISSING) & ^
echo ========================================================="
```

如果输出以下内容，则直接进入第2步
```txt
OPENAI_API_KEY  = MISSING
OPENAI_BASE_URL = MISSING
```

如果输出内容不同，请在终端运行以下命令后进入第二步
```bash
cmd /c "setx OPENAI_API_KEY \"\" & setx OPENAI_BASE_URL \"\""
```

@tab macOS

```bash
echo "================= OPENAI ENV CHECK ================="
if [ -z "$OPENAI_API_KEY" ]; then
  echo "OPENAI_API_KEY  = MISSING"
else
  echo "OPENAI_API_KEY  = OK"
fi

if [ -z "$OPENAI_BASE_URL" ]; then
  echo "OPENAI_BASE_URL = MISSING"
else
  echo "OPENAI_BASE_URL = OK"
fi
echo "========================================================"
```

如果输出以下内容，则直接进入第2步

```txt
OPENAI_API_KEY  = MISSING
OPENAI_BASE_URL = MISSING
```

如果输出内容不同，请在终端运行以下命令后进入第二步

```bash
unset OPENAI_API_KEY OPENAI_BASE_URL
```
:::

2. 查看 [Codex在CLI中的配置](/docs/cli/3-codex.html) 一章

::: important
**你需要：**

1. 检查~/.codex/auth.json中的 **ApiKey** 配置是否正确

2. 检查~/.codex/config.toml中的 **请求地址** 是否正确

:::

### 403报错问题

报错信息类似为：

```txt
unexpected status 403 Forbidden: {"error":{"message":"Usage not included in your
plan","type":"usage_not_included","param":null,"code":null,"plan_type":"basic"}}
```

出现这种情况是号池中的这个账号出现问题，你需要：

1. 使用`Ctrl+C`来打断你的对话，如在vscode中，请点击停止按钮

2. 重新发起对话进行尝试，观察是否再次出现此问题

3. 如果重试3次以上无效，带上你的报错截图，在群内咨询客服或群友

<script setup>
import { computed, onMounted, ref } from 'vue'

const VERSION_URL = 'https://cdn.xf233.io/project/Packy-docs/FAQ/Codex/version.txt'
const BASE_URL = 'https://cdn.xf233.io/project/Packy-docs/FAQ/Codex/'

const version = ref('')
const fileName = ref('')
const description = ref('')
const loading = ref(false)
const error = ref('')

const downloadUrl = computed(() =>
  fileName.value ? `${BASE_URL}${fileName.value}` : ''
)

const parseVersionText = (text) => {
  const lines = text.trim().split(/\r?\n/)
  return {
    version: lines[0]?.trim() || '',
    fileName: lines[1]?.trim() || '',
    description: lines[2]?.trim() || '',
  }
}

const loadVersion = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await fetch(VERSION_URL, {
      cache: 'no-store',
      mode: 'cors',
      credentials: 'omit',
    })
    if (!res.ok) throw new Error(`网络异常（${res.status}）`)
    const text = await res.text()
    const parsed = parseVersionText(text)
    if (!parsed.version || !parsed.fileName)
      throw new Error('版本文件格式不正确')
    version.value = parsed.version
    fileName.value = parsed.fileName
    description.value = parsed.description
  } catch (err) {
    error.value = err?.message || '获取版本信息失败'
    version.value = ''
    fileName.value = ''
    description.value = ''
  } finally {
    loading.value = false
  }
}

const handleDownload = () => {
  if (!downloadUrl.value) return
  window.open(downloadUrl.value, '_blank', 'noopener,noreferrer')
}

onMounted(loadVersion)
</script>

<style scoped>
[v-cloak] {
  display: none;
}
.codex-download-card {
  background: radial-gradient(circle at 20% 20%, #1f8bff22, #ffffff 55%),
    linear-gradient(135deg, #f5f7ff, #ffffff);
  border: 1px solid #e5e8f0;
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 10px 30px #1f8bff14;
  color: #1d2b3a;
}
.codex-download-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
.codex-download-card__title {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
}
.codex-download-card__desc {
  margin: 4px 0 0;
  color: #526072;
  font-size: 13px;
}
.codex-download-card__badge {
  padding: 6px 10px;
  border-radius: 10px;
  background: #e6f2ff;
  color: #1f8bff;
  font-weight: 600;
  font-size: 13px;
}
.codex-download-card__badge.is-loading {
  background: #fff6e5;
  color: #f59e0b;
}
.codex-download-card__notice {
  margin: 12px 0 0;
  padding: 10px 14px;
  background: linear-gradient(90deg, #fff7ed, #fef3c7);
  border-left: 4px solid #f59e0b;
  border-radius: 6px;
  color: #92400e;
  font-size: 14px;
  font-weight: 500;
}
.codex-download-card__info {
  margin: 16px 0;
  border: 1px dashed #d7dce6;
  border-radius: 10px;
  padding: 12px 14px;
  background: #f9fbff;
}
.codex-download-card__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  gap: 12px;
  font-size: 14px;
}
.codex-download-card__mono {
  font-family: 'JetBrains Mono', 'SFMono-Regular', Consolas, 'Liberation Mono',
    Menlo, monospace;
  color: #1d2b3a;
}
.codex-download-card__link {
  color: #1f8bff;
  text-decoration: underline;
  word-break: break-all;
}
.codex-download-card__muted {
  color: #94a3b8;
}
.codex-download-card__actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.codex-download-card__btn {
  border: none;
  background: linear-gradient(135deg, #1f8bff, #5ac8fa);
  color: #ffffff;
  padding: 10px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  box-shadow: 0 6px 16px #1f8bff33;
  transition: transform 0.1s ease, box-shadow 0.2s ease;
}
.codex-download-card__btn:hover:enabled {
  transform: translateY(-1px);
  box-shadow: 0 10px 20px #1f8bff33;
}
.codex-download-card__btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
.codex-download-card__btn.ghost {
  background: #ffffff;
  color: #1f8bff;
  border: 1px solid #c9deff;
  box-shadow: none;
}
.codex-download-card__error {
  margin: 12px 0 0;
  color: #d14343;
  font-size: 13px;
}
</style>


## ::vscode-icons:file-type-gemini:: Gemini相关

### ::vscode-icons:file-type-gemini:: Gemini CLI 使用难题与建议

::: warning 现状说明
Gemini CLI 目前存在多种使用问题，例如可能无法正常调用模型、无法粘贴图片。  
因此通常不建议将 Gemini-3 接入 Gemini CLI。
:::

::: tip 更推荐的方式
- 优先使用 Roo Code 等第三方 VSCode 插件
- 如必须使用 Gemini CLI，建议使用 Antigravity 分组渠道（兼容性更好）
:::

![](https://cdn.xf233.io/project/Packy-docs/FAQ/Gemini/001.png)

> [!important]
> 如果你不会使用 Roo Code，我们推荐你使用 Antigravity 分组渠道的模型在 Gemini CLI 使用，能比较好地适配 CLI。特别提醒：该分组的 Gemini-3 模型名称可能与其他分组不同，详情查看 [Antigravity 分组说明](/docs/token/2-token.html#antigravity分组) 内容，避免配置时出现“无可用渠道”或“模型不存在”问题。

::: info 特别提醒
- 在 Roo Code 等第三方使用时，选取 `OpenAI Response` 请求格式
- Antigravity 分组的模型通常不自带联网功能，可能需要借助 MCP 等工具实现
:::

### 如何在 Cline 使用 Gemini-3

#### 软件要求

| 软件 | 版本要求 | 下载链接 |
| --- | --- | --- |
| **VSCode** | 1.80.0+ | [下载 VSCode](https://code.visualstudio.com/) |

#### 1. 创建 Gemini 分组令牌

按照 [创建 API 令牌](/docs/register/4-token.html) 一章提到的方法，创建如下图中 `gemini` 分组的令牌：

![创建 API 选择分组示意图](https://cdn.xf233.io/project/Packy-docs/FAQ/Gemini/002.png)

#### 2. 安装 Cline 插件

- 打开 VSCode
- 单击左侧边栏的 **扩展** 图标（或按 `Ctrl+Shift+X` / `Cmd+Shift+X`）
- 在搜索框输入 **Cline**
- 找到 Cline 插件，单击 **安装**

::: info 安装提示
- 安装完成后，左侧边栏会出现 Cline 图标
- 首次使用需要配置 API Key
- 建议安装最新版本以获得最佳体验
:::

#### 3. 打开 Cline 界面

安装完成后，有两种方式打开 Cline：

**方式一：侧边栏图标**

- 单击 VSCode 左侧边栏的 Cline 图标

**方式二：命令面板**

- 按 `Ctrl+Shift+P` (Windows/Linux) 或 `Cmd+Shift+P` (macOS)
- 输入 `Cline: Open`
- 按 Enter

#### 4. 首次配置

打开 Cline 界面后，按以下步骤配置：

1. 单击 **API Configuration** 按钮
2. 按下方填写配置信息

```yaml
API Provider: OpenAI-compatible
Base URL: https://www.packyapi.com/v1
API Key: sk-*****
Model ID: gemini-3-pro-preview
```

![Cline 配置界面示意图](https://cdn.xf233.io/project/Packy-docs/FAQ/Gemini/003.png)

::: warning 安全提醒
请妥善保管你的 `API Key`，不要在群聊或公开截图中泄露。
:::

::: details 已有用户提示
如果您之前使用过 Cline，请单击右上角的 **⚙️ 设置**按钮进入配置界面。
:::

**配置参数说明**

| 配置项 | 推荐值 | 说明 |
| --- | --- | --- |
| **API Provider** | `OpenAI-compatible` | 推荐选择此项，支持更多模型 |
| **Base URL** | `https://www.packyapi.com/v1` | PackyAPI 的兼容端点 |
| **API Key** | `sk-******` | 您的 Packy API Key |
| **Model ID** | `gemini-3-pro-preview` | 推荐使用代码专精模型 |

#### 5. 完成配置

单击右上角 **Done**。

