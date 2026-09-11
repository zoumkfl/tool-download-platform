# 工具下载平台

一个中文 Agent 安装包下载网站。每个卡片对应一个 Agent 安装包，配置文件后点击卡片即可在当前浏览器下载，无需跳转到其他页面。

- 在线访问：<https://zoumkfl.github.io/tool-download-platform/>
- 源码仓库：<https://github.com/zoumkfl/tool-download-platform>

当前包含 Codex、Claude Desktop、Cursor、Claude CLI 和 Hermes 五个条目。Claude Desktop、Claude CLI 和 Hermes 已提供 Windows x64 下载；Codex 和 Cursor 等待维护者上传，未配置文件时不能下载。

三个可下载文件发布在本仓库的 [installers-2026-09-11 Release](https://github.com/zoumkfl/tool-download-platform/releases/tag/installers-2026-09-11)：

| 条目 | Release 文件 | 版本 | 大小 |
| --- | --- | --- | --- |
| Claude Desktop | `Claude-Desktop-Setup.exe` | 安装器 1.0.0.0 | 6.70 MiB |
| Claude CLI | `Claude-CLI-2.1.236-windows-x64.exe` | 2.1.236 | 314.81 MiB |
| Hermes | `Hermes-Setup.exe` | 安装器 0.0.1 | 7.58 MiB |

Claude CLI 是 Claude Code 的原生命令行可执行文件，不是图形安装向导。Hermes 由 Nous Research 发布，支持使用 DeepSeek 等模型；获取文件时官网的应用版本为 0.21.1，表中的 0.0.1 是引导安装器自身的版本。文件来源、SHA-256、签名核验结果和第三方许可见 [安装包发布记录](packages/RELEASE.md)。

## 本地运行

项目使用纯 HTML、CSS 和 JavaScript，无需构建或 npm 依赖。可用任意静态 HTTP 文件服务器运行仓库根目录，例如已安装 Python 时运行：

```sh
python -m http.server 8000
```

然后访问 <http://localhost:8000>。验证下载时应通过 HTTP 服务器访问，避免直接打开本地 HTML 的浏览器限制。

## 项目结构

```text
index.html                    页面结构
styles.css                    页面样式与响应式布局
app.js                        浏览与下载交互
catalog.js                    Agent 与安装包配置
config.js                     站点配置
download-stats.json           下载量快照
download-stats.js             共享统计读取与失败回退
scripts/generate-download-stats.mjs  从 GitHub API 生成下载量快照
packages/                     同源安装包与发布记录
assets/                       图标和静态资源
.github/workflows/deploy.yml   GitHub Pages 自动部署
```

## 添加安装包

推荐使用本仓库的 GitHub Releases 托管文件，这样每个文件都有所有访客共享的下载量统计：

1. 在仓库的 **Releases** 中创建新版本或编辑对应发布，将真实文件作为附件上传。记下发布标签和完整文件名。
2. 编辑 `catalog.js` 对应条目的 `package`，填写 `release`、`fileName` 以及真实的版本、大小、系统和架构信息。
3. 发布 Release 并推送配置，等待 GitHub Pages 部署完成，再点击卡片验证文件名与下载结果。

每个条目保留名称、发布方、分类、简介、标签和图标；`package` 仅对应一个安装包：

```js
package: {
  release: 'installers-2026-09-11',
  path: '',
  fileName: 'Claude-CLI-2.1.236-windows-x64.exe',
  version: '2.1.236',
  size: '314.81 MiB',
  platform: 'windows',
  architecture: 'x64',
  kind: 'CLI 可执行文件'
}
```

`release` 与 `fileName` 根据 `config.js` 中的 `repositoryUrl` 组合为本仓库的 Release 附件直链。浏览器直接下载文件，当前页面不导航，也不会打开新窗口。`kind` 可选，用来区分命令行可执行文件等下载类型。

仍可将文件放在 `packages/` 并填写相对路径，例如 `path: 'packages/codex-windows-x64.exe'`，此时应留空或省略 `release`。这种同源文件下载不接入 GitHub Release 下载量统计。`release` 优先于 `path`；两者均为空才表示等待上传。不要填写官网页面、安装命令或 GitHub `blob` 页面地址。详细操作见 [安装包目录说明](packages/README.md)。

升级时保留以前的 Release 和附件，为新文件使用新的发布标签或文件名，再更新目录配置。页面统计的是当前配置的附件，不会将旧版文件的下载量自动累加到新版。需要同时提供多个系统或版本时，为每个文件增加一个独立条目及唯一 `id`。

## 下载量统计

页面通过 GitHub API 读取各个 Release 附件的 `download_count`，展示所有访客共享的累计数值，不使用 `localStorage` 模拟全站统计。计数覆盖该附件的所有下载入口，包括本站和 GitHub Release 页面；它代表 GitHub 记录的文件下载请求，不代表经验证的完整下载或成功安装次数。以前从 GitHub Pages 的 `packages/` 地址产生的下载无法补计。

`config.js` 的 `downloadStatsSnapshot` 指向 `download-stats.json`。页面先读取快照，再尝试获取 GitHub API 的最新值；API 失败或触发限流时保留快照数值。无 Release 附件的条目没有可统计的 Release 下载记录。

`scripts/generate-download-stats.mjs` 根据目录中的发布标签和文件名生成快照。部署工作流会在每次源码推送、手动运行及每小时第 17、47 分钟的计划任务中刷新并发布快照；GitHub Actions 的计划运行可能延迟。快照生成失败时工作流不会发布新的站点，之前已发布的版本仍可访问。

可在本地使用 Node.js 22 运行：

```sh
node scripts/generate-download-stats.mjs
```

脚本可使用环境变量 `GITHUB_TOKEN` 提高 API 额度。工作流使用 GitHub 自动提供的令牌；前端只读取公开 API 和快照，不包含令牌或其他秘密。

统计逻辑回归测试：`node --test scripts/download-stats.test.mjs`。覆盖共享 API 计数、失败回退、附件身份校验、并发刷新与未知值处理。

## 部署到 GitHub Pages

1. 将源码推送到仓库的 `main` 分支。
2. 在仓库的 **Settings > Pages > Build and deployment** 中，将 **Source** 设为 **GitHub Actions**。
3. `Deploy to GitHub Pages` 工作流会自动发布站点，也可以在 **Actions** 页面手动运行。
4. 部署完成后访问 <https://zoumkfl.github.io/tool-download-platform/>。

使用其他仓库时，同步修改本文链接和 `config.js` 的 `repositoryUrl`。资源和安装包使用相对路径，可部署在 GitHub Pages 的项目路径下。

GitHub 普通 Git 仓库会阻止超过 100 MiB 的单个文件，GitHub Pages 已发布站点大小上限为 1 GB。Claude CLI 为 314.81 MiB，必须通过 Releases 等附件托管方式发布，不能直接提交到 Git 仓库。本项目已支持本仓库的 Release 附件直链，无需把大文件提交到 `packages/`。

## 许可证

项目原创源码使用 [MIT License](LICENSE)。第三方名称、商标、图标和安装包归各自权利人所有；上传安装包前应确认其再分发许可。本站不代表任何软件发布方。
