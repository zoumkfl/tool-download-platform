# Agent Installers - 2026-09-11

Original Windows x64 files, unmodified. The platform downloads release assets directly; GitHub supplies cumulative asset download counts. No installer was executed during verification.

| Asset | Version | Bytes | Source |
| --- | --- | ---: | --- |
| Claude-Desktop-Setup.exe | Installer 1.0.0.0 | 7021216 | Maintainer-provided `packages/Claude Setup.exe`; valid Anthropic, PBC signature |
| Hermes-Setup.exe | Installer 0.0.1 | 7946048 | [Official Hermes Desktop](https://hermes-agent.nousresearch.com/desktop), valid Nous Research Inc. signature |
| Claude-CLI-2.1.236-windows-x64.exe | Stable 2.1.236 | 330097824 | [Official npm platform package](https://registry.npmjs.org/@anthropic-ai/claude-code-win32-x64/2.1.236), valid Anthropic, PBC signature |

Hermes is published by Nous Research and supports DeepSeek as a model provider. The website advertised Hermes Agent 0.21.1 when retrieved; 0.0.1 is the actual bootstrap installer file version, not the application version installed later. Its official download URL was <https://hermes-assets.nousresearch.com/Hermes-Setup.exe?build=2237be355906>.

Claude CLI is the native Claude Code command-line executable, not a desktop setup wizard. Its bytes match the Windows x64 entry in the [official 2.1.236 manifest](https://downloads.claude.ai/claude-code-releases/2.1.236/manifest.json). Claude Code usage is subject to [Anthropic's legal agreements](https://code.claude.com/docs/en/legal-and-compliance).

## SHA-256

```text
1d46ce8f6bc4d59ffa5b63b6f01bb88e386bb38559602e6249ecf4340a3dbcd5  Claude-Desktop-Setup.exe
cfc818adf831a748c61a407152a03c7a426ebee78f499d20a31fae2b5ac5d827  Hermes-Setup.exe
647e736f20c9ff0553c754624cbf8a6dcac196e8595509d8f63dce8bbe818757  Claude-CLI-2.1.236-windows-x64.exe
```

## Hermes License

MIT License

Copyright (c) 2025 Nous Research

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
