// Published release assets provide direct downloads and shared download counts.
window.SOFTWARE = [
  {
    id: 'codex',
    name: 'Codex',
    publisher: 'OpenAI',
    category: 'coding',
    description: '帮助理解代码库、实现功能和审查代码变更的 AI 编程 Agent。',
    tags: ['AI 编程', '代码审查', '开发协作'],
    icon: 'assets/codex.png',
    package: { path: '', fileName: '', version: '', size: '', platform: '', architecture: '' }
  },
  {
    id: 'claude',
    name: 'Claude Desktop',
    publisher: 'Anthropic',
    category: 'assistant',
    description: '支持对话、写作、文档分析和日常工作任务的 AI 助手。',
    tags: ['AI 助手', '文档分析', '写作'],
    icon: 'assets/claude.png',
    package: { path: 'packages/Claude Setup.exe', fileName: 'Claude-Desktop-Setup.exe', version: '1.0.0.0', size: '6.70 MiB', platform: 'windows', architecture: 'x64', release: 'installers-2026-09-11' }
  },
  {
    id: 'cursor',
    name: 'Cursor',
    publisher: 'Anysphere',
    category: 'coding',
    description: '集成 AI Agent 与代码补全功能，支持结合项目上下文编辑代码的开发工具。',
    tags: ['AI 编程', '代码编辑', '项目上下文'],
    icon: 'assets/cursor.png',
    package: { path: '', fileName: '', version: '', size: '', platform: '', architecture: '' }
  },
  {
    id: 'claude-code',
    name: 'Claude CLI',
    publisher: 'Anthropic',
    category: 'coding',
    description: 'Claude Code 命令行版，可理解代码库、修改项目文件并执行开发任务。',
    tags: ['AI 编程', '命令行', '代码库'],
    icon: 'assets/claude.png',
    package: { path: '', fileName: 'Claude-CLI-2.1.236-windows-x64.exe', version: '2.1.236', size: '314.81 MiB', platform: 'windows', architecture: 'x64', release: 'installers-2026-09-11', kind: 'CLI 可执行文件' }
  },
  {
    id: 'hermes',
    name: 'Hermes',
    publisher: 'Nous Research',
    category: 'assistant',
    description: '支持 DeepSeek 等模型，具备长期记忆、技能学习与任务自动化能力的 AI Agent。',
    tags: ['DeepSeek', 'AI 助手', '长期记忆', '自动化'],
    icon: 'assets/hermes.png',
    package: { path: 'packages/Hermes-Setup.exe', fileName: 'Hermes-Setup.exe', version: '0.0.1', size: '7.58 MiB', platform: 'windows', architecture: 'x64', release: 'installers-2026-09-11' }
  }
];
