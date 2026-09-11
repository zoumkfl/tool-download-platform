# 安装包目录

将后续提供的真实安装包放在这里，然后在 `catalog.js` 对应条目的 `package` 中填写路径与真实文件信息。

例如文件命名为 `codex-windows-x64.exe` 时，`path` 填写 `packages/codex-windows-x64.exe`。这只是命名示例，没有附带对应安装包。

文件未准备好时保持 `path` 为空。单个安装包对应一个条目；多个系统或版本使用独立条目。请勿放置伪装成安装包的空文件。

GitHub 普通 Git 单个文件上限为 100 MiB，GitHub Pages 已发布站点大小上限为 1 GB。超过限制的安装包需迁移到支持与站点同源访问的托管服务，详见仓库根目录 README。
