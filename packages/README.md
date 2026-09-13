# 安装包目录

安装包优先上传为本仓库的 GitHub Release 附件，以便提供浏览器直接下载和全站共享下载量。此目录也支持较小文件的同源下载，并保留[安装包发布记录](RELEASE.md)，其中包含来源、校验和与第三方许可。

## 当前发布

发布标签为 `installers-2026-09-11`，包含五个 Windows x64 文件和一个跨平台 CLI 包：

- `OpenAI.Codex_26.908.4834.0_x64__2p2nqsd0c76g0.Msix`：OpenAI Codex MSIX，版本 26.908.4834.0，739.02 MiB。
- `Claude-Desktop-Setup.exe`：Claude Desktop 安装器 1.0.0.0，6.70 MiB。
- `CursorUserSetup-x64-3.20.17.exe`：Cursor Windows x64 安装器 3.20.17，202.87 MiB。
- `Hermes-Setup.exe`：Nous Research 发布的 Hermes 引导安装器 0.0.1，7.58 MiB。获取时官网应用版本为 0.21.1；Hermes 支持 DeepSeek 等模型。
- `Claude-CLI-2.1.236-windows-x64.exe`：Claude Code 原生命令行可执行文件 2.1.236，314.81 MiB，不是图形安装向导。
- `DeepSeek-Harness-dsh-0.1.5-rc.2.tgz`：DeepSeek AI 官方 DSH CLI npm 包 0.1.5-rc.2，16.24 KiB。需先安装 Node.js，在下载目录运行 `npm install -g ./DeepSeek-Harness-dsh-0.1.5-rc.2.tgz` 后使用 `dsh web`；也可直接从 npm 安装。该文件不是双击式桌面安装器。

官方 DeepSeek Harness 目前没有公开的 Windows `.exe` 或 `.msi`。DSH 桌面版需要在官方发布环境构建，因此这里提供的是官方 npm CLI 包，不把第三方桌面构建冒充官方安装器。

## 上传 Release 附件

1. 打开仓库 **Releases**，上传真实安装包并发布对应版本。
2. 在根目录 `catalog.js` 的对应条目中，将 `package.release` 填为发布标签，`package.fileName` 填为附件的完整名称。填写真实的版本、大小、系统和架构。
3. 推送目录配置，等待部署完成后点击对应卡片验证下载。

例如 Hermes 的配置为：

```js
package: {
  release: 'installers-2026-09-11',
  path: '',
  fileName: 'Hermes-Setup.exe',
  version: '0.0.1',
  size: '7.58 MiB',
  platform: 'windows',
  architecture: 'x64'
}
```

前端根据 `release`、`fileName` 和 `config.js` 中的仓库地址生成附件直链。点击卡片后由浏览器下载，页面不导航，也不打开新窗口。`release` 配置优先于 `path`。

每个条目的数值来自当前附件的 GitHub `download_count`，包括本站与 Release 页面等入口产生的下载请求，不表示安装成功次数。升级时保留旧的 Release 和附件，为新版本使用新标签或新文件名；改用新附件后展示该附件自己的计数，旧版计数不自动合并。

## 同源文件上传

也可将较小的真实文件放在此目录。例如文件名为 `codex-windows-x64.exe` 时，`package.path` 填写 `packages/codex-windows-x64.exe`，`fileName` 填写对应文件名，`release` 留空或省略。该路径仅是命名示例，不代表已提供 Codex 安装包。

同源文件仍会直接下载，但不接入 Release 下载量统计，旧的 GitHub Pages 下载也无法补计。文件未准备好时让 `release` 和 `path` 都为空。单个文件对应一个条目；同时提供多个系统或版本时使用独立条目和唯一 `id`。

GitHub 普通 Git 单个文件上限为 100 MiB，GitHub Pages 已发布站点大小上限为 1 GB。Claude CLI 已超过单个 Git 文件上限，必须通过 Releases 托管，不要将该可执行文件提交到本目录。

## 统计快照

根目录 `scripts/generate-download-stats.mjs` 从 GitHub API 生成 `download-stats.json`，由 `config.js` 的 `downloadStatsSnapshot` 引用。部署时及每小时第 17、47 分钟的计划工作流会刷新快照，计划运行可能延迟。页面尝试获取 API 最新值，失败时保留快照；快照生成失败则保留此前已发布的网站。

计数不存入 `localStorage`，前端不需要秘密或令牌。完整配置与部署步骤见[项目说明](../README.md)。
