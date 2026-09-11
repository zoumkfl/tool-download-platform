import { readFile, writeFile } from "node:fs/promises";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const context = vm.createContext({ window: {} });
vm.runInContext(await readFile(new URL("catalog.js", root), "utf8"), context);
vm.runInContext(await readFile(new URL("config.js", root), "utf8"), context);
const { SOFTWARE: software, SITE_CONFIG: config } = context.window;
const repository = config.repositoryUrl.match(/^https:\/\/github\.com\/([\w.-]+\/[\w.-]+)\/?$/)?.[1];
if (!repository) throw new Error("Invalid repository configuration");
const headers = { Accept: "application/vnd.github+json", "User-Agent": "tool-download-platform" };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
const releases = new Map();
for (const tag of new Set(software.map(tool => tool.package?.release).filter(Boolean))) {
  const response = await fetch(`https://api.github.com/repos/${repository}/releases/tags/${encodeURIComponent(tag)}`, { headers, signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`Release lookup failed: ${response.status}`);
  releases.set(tag, await response.json());
}
const entries = software.map(tool => {
  const release = tool.package?.release || null;
  const asset = tool.package?.fileName || null;
  const found = releases.get(release)?.assets?.find(item => item.name === asset && item.state === "uploaded");
  const count = release ? found?.download_count : 0;
  if (!Number.isSafeInteger(count) || count < 0) throw new Error(`Missing download statistics: ${tool.id}`);
  return [tool.id, { release, asset, count }];
});
await writeFile(new URL("download-stats.json", root), JSON.stringify({ repository, updatedAt: new Date().toISOString(), tools: Object.fromEntries(entries) }, null, 2) + "\n");
console.log(`Updated download statistics for ${entries.length} tools.`);
