# Agent Installers - 2026-09-11

Original files, unmodified. The platform downloads release assets directly; GitHub supplies cumulative asset download counts. No installer was executed during verification.

| Asset | Version | Bytes | Source |
| --- | --- | ---: | --- |
| OpenAI.Codex_26.908.4834.0_x64__2p2nqsd0c76g0.Msix | 26.908.4834.0 | 774918112 | User-provided MSIX; valid OpenAI Authenticode signature |
| Claude-Desktop-Setup.exe | Installer 1.0.0.0 | 7021216 | Maintainer-provided `packages/Claude Setup.exe`; valid Anthropic, PBC signature |
| CursorUserSetup-x64-3.20.17.exe | 3.20.17 | 212724472 | [Official Cursor download endpoint](https://api2.cursor.sh/updates/download/golden/win32-x64-user/cursor/3.20); valid Anysphere, Inc. signature |
| Hermes-Setup.exe | Installer 0.0.1 | 7946048 | [Official Hermes Desktop](https://hermes-agent.nousresearch.com/desktop), valid Nous Research Inc. signature |
| Claude-CLI-2.1.236-windows-x64.exe | Stable 2.1.236 | 330097824 | [Official npm platform package](https://registry.npmjs.org/@anthropic-ai/claude-code-win32-x64/2.1.236), valid Anthropic, PBC signature |
| DeepSeek-Harness-dsh-0.1.5-rc.2.tgz | 0.1.5-rc.2 | 16630 | [Official DeepSeek npm package](https://registry.npmjs.org/@deepseek-ai/dsh/-/dsh-0.1.5-rc.2.tgz), MIT; CLI package, not a desktop installer |

Hermes is published by Nous Research and supports DeepSeek as a model provider. The website advertised Hermes Agent 0.21.1 when retrieved; 0.0.1 is the actual bootstrap installer file version, not the application version installed later. Its official download URL was <https://hermes-assets.nousresearch.com/Hermes-Setup.exe?build=2237be355906>.

Claude CLI is the native Claude Code command-line executable, not a desktop setup wizard. Its bytes match the Windows x64 entry in the [official 2.1.236 manifest](https://downloads.claude.ai/claude-code-releases/2.1.236/manifest.json). Claude Code usage is subject to [Anthropic's legal agreements](https://code.claude.com/docs/en/legal-and-compliance).

Codex is the user-provided OpenAI MSIX. Its AppxManifest identifies `OpenAI.Codex`, version `26.908.4834.0`, architecture `x64`, and display name `ChatGPT`; Authenticode verification was valid. The SHA-256 below identifies the uploaded bytes.

Cursor was downloaded from the official Cursor endpoint. The executable reports product version `3.20.17`; Authenticode verification was valid for Anysphere, Inc.

DSH means [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness). DeepSeek's official repository has no public Windows installer assets; its documented quick start is `npx @deepseek-ai/dsh web`. The release asset below is the signed npm package archive and must be installed with Node.js. The package is MIT licensed and its dependencies are resolved by npm.

## SHA-256

```text
1d46ce8f6bc4d59ffa5b63b6f01bb88e386bb38559602e6249ecf4340a3dbcd5  Claude-Desktop-Setup.exe
cfc818adf831a748c61a407152a03c7a426ebee78f499d20a31fae2b5ac5d827  Hermes-Setup.exe
647e736f20c9ff0553c754624cbf8a6dcac196e8595509d8f63dce8bbe818757  Claude-CLI-2.1.236-windows-x64.exe
AE01E44B60F3C42FADA0CF7DEB220104BB8E9111EE79CDA16BD57CE7E59C72D0  OpenAI.Codex_26.908.4834.0_x64__2p2nqsd0c76g0.Msix
EBA74B6057A83F9420960FA337349683A7B85BFB57D03D565945BF923629F81A  CursorUserSetup-x64-3.20.17.exe
F4C54839D69E82BF1C3A5A41A910C3CE1405CD9E9D97D753C0C04F406C7D7480  DeepSeek-Harness-dsh-0.1.5-rc.2.tgz
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
