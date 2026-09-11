# 工具下载平台

一个中文 Agent 安装包下载网站。每个卡片对应一个 Agent 安装包，配置文件后点击卡片即可在当前浏览器下载，无需跳转到其他页面。

- 在线访问：<https://zoumkfl.github.io/tool-download-platform/>
- 源码仓库：<https://github.com/zoumkfl/tool-download-platform>

当前预留 Codex、Claude、Cursor 和 Claude Code 四个条目。安装包由站点维护者后续提供；文件未配置时显示待上传，不能下载。仓库没有附带安装包，也没有占位安装文件。

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
packages/                     后续提供的安装包
assets/                       图标和静态资源
.github/workflows/deploy.yml   GitHub Pages 自动部署
```

## 添加安装包

1. 将实际安装包放入 `packages/`，使用清晰的文件名，例如 `codex-windows-x64.exe`。这里只是命名示例，仓库未提供该文件。
2. 编辑 `catalog.js` 中对应条目的 `package`，将 `path` 填为 `packages/codex-windows-x64.exe`，并填写真实文件名、版本、大小、系统和架构。
3. 推送文件与配置，等待部署完成后点击对应卡片，确认浏览器下载到正确文件。

每个条目保留名称、发布方、分类、简介、标签和图标；`package` 仅对应一个安装包：

```js
package: {
  path: '',          // 相对站点根目录的实际文件路径
  fileName: '',      // 下载时使用的文件名
  version: '',       // 实际版本，例如 1.0.0
  size: '',          // 实际文件大小，例如 48 MB
  platform: '',      // windows、macos 或 linux
  architecture: ''   // 例如 x64、arm64 或 universal
}
```

`path` 留空表示尚未上传。不要填写虚构文件、官网页面、安装命令或 GitHub `blob` 页面地址。路径必须指向与网站同源的实际安装包；前端会拒绝外站地址，以便通过浏览器下载而不跳转。文件名和平台信息应与实际安装包一致。需要多个系统或版本时，为每个安装包增加一个独立条目及唯一 `id`。

## 部署到 GitHub Pages

1. 将源码推送到仓库的 `main` 分支。
2. 在仓库的 **Settings > Pages > Build and deployment** 中，将 **Source** 设为 **GitHub Actions**。
3. `Deploy to GitHub Pages` 工作流会自动发布站点，也可以在 **Actions** 页面手动运行。
4. 部署完成后访问 <https://zoumkfl.github.io/tool-download-platform/>。

使用其他仓库时，同步修改本文链接和 `config.js` 的 `repositoryUrl`。资源和安装包使用相对路径，可部署在 GitHub Pages 的项目路径下。

GitHub 普通 Git 仓库会阻止超过 100 MiB 的单个文件，GitHub Pages 已发布站点大小上限为 1 GB。较大安装包应使用能让页面和安装包保持同源的其他托管服务，例如同一域名下的静态文件服务；不要直接改成外站跳转链接。

## 许可证

项目原创源码使用 [MIT License](LICENSE)。第三方名称、商标、图标和安装包归各自权利人所有；上传安装包前应确认其再分发许可。本站不代表任何软件发布方。
