// Add a same-origin package path only after the installer has been uploaded.
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
    name: 'Claude',
    publisher: 'Anthropic',
    category: 'assistant',
    description: '支持对话、写作、文档分析和日常工作任务的 AI 助手。',
    tags: ['AI 助手', '文档分析', '写作'],
    icon: 'assets/claude.png',
    package: { path: '', fileName: '', version: '', size: '', platform: '', architecture: '' }
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
    name: 'Claude Code',
    publisher: 'Anthropic',
    category: 'coding',
    description: '面向开发任务的 AI 编程 Agent，可理解代码库并协助修改项目文件。',
    tags: ['AI 编程', '命令行', '代码库'],
    icon: 'assets/claude.png',
    package: { path: '', fileName: '', version: '', size: '', platform: '', architecture: '' }
  }
];
