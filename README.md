# AI 工具库

一个中文 AI 软件下载导航网站，集中提供 Codex、Claude、Cursor 等工具的官方安装包、安装命令和下载页面。

- 在线访问：<https://zoumkfl.github.io/ai-toolbox/>
- 源码仓库：<https://github.com/zoumkfl/ai-toolbox>

## 使用

下载仓库后，直接双击 `index.html` 即可打开，也可以使用任意静态文件服务器。项目使用纯 HTML、CSS 和 JavaScript，不需要 npm 依赖、构建步骤或后端服务。

页面提供关键词搜索、分类和操作系统筛选、网格与列表视图、收藏以及工具详情。收藏保存在当前浏览器中。下载入口指向软件发布方；对于需要选择版本或登录的工具，页面会打开官方安装页面。

## 项目结构

```text
index.html                    页面结构
styles.css                    页面样式与响应式布局
app.js                        搜索、筛选、收藏和详情交互
catalog.js                    软件目录数据
config.js                     站点配置
assets/                       图标和静态资源
.github/workflows/deploy.yml   GitHub Pages 自动部署
```

## 维护软件目录

在 `catalog.js` 中编辑 `window.SOFTWARE` 数组。每个工具包含名称、发布方、分类、平台、图标和 `downloads` 下载选项。

- `category`：`coding`、`assistant` 或 `local`。
- `platforms`：支持的平台，例如 `windows`、`macos`、`linux`、`web`。
- `downloads`：为每个平台维护官方链接或安装命令，沿用现有条目的字段结构。
- `kind: 'installer'`：官方安装包端点。
- `kind: 'page'`：官方下载页面或安装文档。
- `kind: 'command'`：供用户查看或复制的安装命令。

添加或更新条目时，请核对发布方的官方文档、系统要求和下载地址。不要将第三方镜像伪装成官方来源，也不要填写未经核实的版本号、文件大小或安装包链接。

在 `config.js` 中设置 GitHub 仓库链接：

```js
window.SITE_CONFIG = {
  repositoryUrl: 'https://github.com/zoumkfl/ai-toolbox'
};
```

## 部署到 GitHub Pages

1. 将源码推送到 GitHub 仓库的 `main` 分支。
2. 在仓库的 **Settings > Pages > Build and deployment** 中，将 **Source** 设为 **GitHub Actions**。
3. `Deploy to GitHub Pages` 工作流会自动发布仓库根目录。也可在 **Actions** 页面手动运行。
4. 首次部署完成后，访问 <https://zoumkfl.github.io/ai-toolbox/>。

使用其他账户或仓库名称时，需要同步修改上面的访问地址和 `config.js` 中的 `repositoryUrl`。站点使用相对资源路径，可部署到 GitHub Pages 项目路径或其他静态托管服务。

## 来源与许可证

本站不托管第三方安装包，不代表任何软件发布方。软件名称、商标、图标和安装包归各自权利人所有，下载、使用权限及订阅要求以发布方的最新说明为准。

项目原创源码使用 [MIT License](LICENSE)。随项目提供的第三方资源遵循其各自的许可证；Lucide 图标使用 ISC 许可证。
