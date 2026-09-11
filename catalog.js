/*
 * Official-source software directory. Checked on 2026-09-11.
 * Package versions and sizes intentionally follow the publisher's download page.
 * `installer` links are publisher endpoints, never rehosted binaries.
 * `command` entries are displayed/copied by the UI and must never be executed here.
 *
 * Sources: https://claude.com/download
 * https://code.claude.com/docs/en/setup
 * https://code.claude.com/docs/en/desktop-linux
 * https://cursor.com/download
 * https://code.visualstudio.com/download
 * https://ollama.com/download
 * https://lmstudio.ai/download
 * OpenAI documentation returned HTTP 403 in this environment. Its official
 * documentation/download pages remain page links; no binary URL is inferred.
 * Windsurf currently redirects to Devin Desktop, so it is not listed under its
 * former product name. Claude Code provides another verified coding entry.
 */
window.SOFTWARE = [
  {
    id: 'codex',
    name: 'Codex',
    publisher: 'OpenAI',
    category: 'coding',
    tagline: '把开发任务交给 AI 编程搭档',
    description: '围绕项目理解代码、实现功能和审查变更，提供桌面应用与命令行安装入口。',
    tags: ['AI 编程', '代码审查', '终端'],
    platforms: ['windows', 'macos', 'linux'],
    icon: 'assets/codex.png',
    website: 'https://developers.openai.com/codex/',
    featured: true,
    accent: '#16765B',
    licenseLabel: '按官方套餐',
    highlights: ['代码理解与修改', '项目任务协作', '桌面与命令行'],
    downloads: [
      { platform: 'windows', label: 'Windows 桌面版', kind: 'page', url: 'https://developers.openai.com/codex/app/', note: '前往 OpenAI 官方安装页面，确认当前系统要求与账户权限。' },
      { platform: 'macos', label: 'macOS 桌面版', kind: 'page', url: 'https://developers.openai.com/codex/app/', note: '前往 OpenAI 官方安装页面，选择适合设备的版本。' },
      { platform: 'linux', label: 'Linux 命令行版', kind: 'page', url: 'https://developers.openai.com/codex/cli/', note: '此入口为 Codex CLI 官方安装文档。' }
    ]
  },
  {
    id: 'claude',
    name: 'Claude',
    publisher: 'Anthropic',
    category: 'assistant',
    tagline: '写作、分析与日常工作的 AI 助手',
    description: '在桌面上处理对话、文档与工作任务，随时调用 Claude 的写作和分析能力。',
    tags: ['AI 助手', '文档分析', '写作'],
    platforms: ['windows', 'macos', 'linux', 'web'],
    icon: 'assets/claude.png',
    website: 'https://claude.com/',
    featured: true,
    accent: '#C46D4D',
    licenseLabel: '免费 / 订阅',
    highlights: ['对话与文档处理', '桌面工作空间', 'Linux 测试版'],
    downloads: [
      { platform: 'windows', label: 'Windows 安装页面', kind: 'page', url: 'https://claude.com/download', note: '官方提供 x64 与 ARM64 版本。' },
      { platform: 'macos', label: 'macOS 安装页面', kind: 'page', url: 'https://claude.com/download', note: '在官方下载页获取桌面客户端。' },
      { platform: 'linux', label: 'Linux 测试版', kind: 'page', url: 'https://code.claude.com/docs/en/desktop-linux', note: '适用于 Ubuntu 22.04+ 或 Debian 12+；支持 x86_64 和 ARM64。' },
      { platform: 'web', label: '打开 Claude', kind: 'page', url: 'https://claude.ai/', note: '在浏览器中使用，需要登录账户。' }
    ]
  },
  {
    id: 'cursor',
    name: 'Cursor',
    publisher: 'Anysphere',
    category: 'coding',
    tagline: '把 AI 带进日常代码编辑',
    description: '集成 AI 编程与代码补全的编辑器，围绕项目上下文编辑、查找和迭代代码。',
    tags: ['AI 编辑器', '代码补全', '项目上下文'],
    platforms: ['windows', 'macos', 'linux'],
    icon: 'assets/cursor.png',
    website: 'https://cursor.com/',
    featured: true,
    accent: '#546473',
    licenseLabel: '免费 / 订阅',
    highlights: ['项目级代码上下文', 'AI 编辑与补全', '跨平台编辑器'],
    downloads: [
      { platform: 'windows', label: 'Windows x64 用户版', kind: 'installer', url: 'https://api2.cursor.sh/updates/download/golden/win32-x64-user/cursor/3.20', note: '官方当前下载页提供的 3.20 通道安装包。其他架构见官网。' },
      { platform: 'macos', label: 'macOS Apple Silicon', kind: 'installer', url: 'https://api2.cursor.sh/updates/download/golden/darwin-arm64/cursor/3.20', note: '适用于 Apple Silicon。Intel 与通用版本见官网。' },
      { platform: 'linux', label: 'Linux 下载页面', kind: 'page', url: 'https://cursor.com/download', note: '可选择 DEB、RPM 或 AppImage，以及 x64 / ARM64 架构。' }
    ]
  },
  {
    id: 'claude-code',
    name: 'Claude Code',
    publisher: 'Anthropic',
    category: 'coding',
    tagline: '直接在终端里完成开发任务',
    description: '在项目目录中与 Claude 协作，理解代码库、修改文件并处理日常开发任务。',
    tags: ['AI 编程', '命令行', '代码库'],
    platforms: ['windows', 'macos', 'linux'],
    icon: 'assets/claude.png',
    website: 'https://code.claude.com/docs/en/overview',
    featured: false,
    accent: '#AC5D42',
    licenseLabel: '订阅 / API 计费',
    highlights: ['终端开发工作流', '代码库上下文', '原生安装与自动更新'],
    downloads: [
      { platform: 'windows', label: 'Windows PowerShell', kind: 'command', url: 'https://code.claude.com/docs/en/setup', command: 'irm https://claude.ai/install.ps1 | iex', note: '在 PowerShell 中运行。需要支持 Claude Code 的订阅或 API 账户。' },
      { platform: 'macos', label: 'macOS 终端安装', kind: 'command', url: 'https://code.claude.com/docs/en/setup', command: 'curl -fsSL https://claude.ai/install.sh | bash', note: '需要 macOS 13.0 或更新版本。' },
      { platform: 'linux', label: 'Linux 终端安装', kind: 'command', url: 'https://code.claude.com/docs/en/setup', command: 'curl -fsSL https://claude.ai/install.sh | bash', note: '系统要求和发行版支持情况见官方安装文档。' }
    ]
  },
  {
    id: 'vscode',
    name: 'Visual Studio Code',
    publisher: 'Microsoft',
    category: 'coding',
    tagline: '可扩展的开发工作台',
    description: '轻量代码编辑器，集成终端、调试和 Git，并通过扩展接入 AI 编程工具。',
    tags: ['代码编辑器', '扩展生态', 'Git'],
    platforms: ['windows', 'macos', 'linux'],
    icon: 'assets/vscode.png',
    website: 'https://code.visualstudio.com/',
    featured: false,
    accent: '#197DB5',
    licenseLabel: '免费使用',
    highlights: ['终端与调试集成', '丰富的扩展生态', '可接入 AI 编程扩展'],
    downloads: [
      { platform: 'windows', label: 'Windows x64 用户版', kind: 'installer', url: 'https://update.code.visualstudio.com/latest/win32-x64-user/stable', note: '微软官方稳定版安装程序。' },
      { platform: 'macos', label: 'macOS Apple Silicon', kind: 'installer', url: 'https://update.code.visualstudio.com/latest/darwin-arm64/stable', note: '稳定版 ZIP 包。Intel 版本可从官网选择。' },
      { platform: 'linux', label: 'Linux x64 DEB', kind: 'installer', url: 'https://update.code.visualstudio.com/latest/linux-deb-x64/stable', note: '适用于 Debian / Ubuntu。其他格式和架构见官网。' }
    ]
  },
  {
    id: 'ollama',
    name: 'Ollama',
    publisher: 'Ollama',
    category: 'local',
    tagline: '让开源模型在你的设备上运行',
    description: '下载和运行本地语言模型，为本机应用与开发工作流提供模型服务。',
    tags: ['本地模型', '开源', '模型服务'],
    platforms: ['windows', 'macos', 'linux'],
    icon: 'assets/ollama.png',
    website: 'https://ollama.com/',
    featured: false,
    accent: '#586361',
    licenseLabel: '开源免费',
    highlights: ['本地模型管理', '可连接开发工具', '支持多种开源模型'],
    downloads: [
      { platform: 'windows', label: 'Windows 安装程序', kind: 'installer', url: 'https://ollama.com/download/OllamaSetup.exe', note: '需要 Windows 10 或更新版本。模型文件需另外下载。' },
      { platform: 'macos', label: 'macOS 安装包', kind: 'installer', url: 'https://ollama.com/download/Ollama.dmg', note: '系统要求及支持设备见 Ollama 官方下载页。' },
      { platform: 'linux', label: 'Linux 终端安装', kind: 'command', url: 'https://ollama.com/download/linux', command: 'curl -fsSL https://ollama.com/install.sh | sh', note: '下载与运行模型所需的内存、显存取决于模型。' }
    ]
  },
  {
    id: 'lmstudio',
    name: 'LM Studio',
    publisher: 'Element Labs',
    category: 'local',
    tagline: '通过桌面界面探索本地大模型',
    description: '在图形界面中发现、下载和运行语言模型，管理本地模型并进行对话。',
    tags: ['本地模型', '图形界面', '模型管理'],
    platforms: ['windows', 'macos', 'linux'],
    icon: 'assets/lmstudio.png',
    website: 'https://lmstudio.ai/',
    featured: false,
    accent: '#7662B3',
    licenseLabel: '免费使用',
    highlights: ['可视化模型管理', '本地聊天界面', '本机模型服务'],
    downloads: [
      { platform: 'windows', label: 'Windows x64 安装包', kind: 'installer', url: 'https://lmstudio.ai/download/latest/win32/x64', note: '模型文件单独下载，运行要求随模型而变化。' },
      { platform: 'macos', label: 'macOS Apple Silicon', kind: 'installer', url: 'https://lmstudio.ai/download/latest/darwin/arm64', note: '适用于 Apple Silicon 设备。' },
      { platform: 'linux', label: 'Linux x64 安装包', kind: 'installer', url: 'https://lmstudio.ai/download/latest/linux/x64', note: '发行版兼容性与系统要求见官方下载页面。' }
    ]
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    publisher: 'OpenAI',
    category: 'assistant',
    tagline: '随手开启对话与创作',
    description: '通过桌面应用或浏览器进行对话、写作与分析，将 AI 助手接入日常工作。',
    tags: ['AI 助手', '写作', '分析'],
    platforms: ['windows', 'macos', 'web'],
    icon: 'assets/chatgpt.png',
    website: 'https://chatgpt.com/',
    featured: false,
    accent: '#178F76',
    licenseLabel: '免费 / 订阅',
    highlights: ['日常对话与写作', '桌面快速访问', '浏览器跨设备使用'],
    downloads: [
      { platform: 'windows', label: 'Windows 下载页面', kind: 'page', url: 'https://chatgpt.com/download/', note: '前往官方下载页面，查看当前系统要求。' },
      { platform: 'macos', label: 'macOS 下载页面', kind: 'page', url: 'https://chatgpt.com/download/', note: '前往官方下载页面，选择适合设备的版本。' },
      { platform: 'web', label: '打开 ChatGPT', kind: 'page', url: 'https://chatgpt.com/', note: '无需下载客户端，在浏览器中使用。' }
    ]
  }
];
