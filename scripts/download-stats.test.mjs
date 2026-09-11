import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../download-stats.js", import.meta.url), "utf8");
const software = [{ id: "ready", package: { release: "v1", fileName: "agent.exe" } }, { id: "pending", package: {} }];
const snapshot = { repository: "owner/repo", updatedAt: "2026-09-11T00:00:00Z", tools: { ready: { release: "v1", asset: "agent.exe", count: 6 } } };
const release = count => ({ tag_name: "v1", assets: [{ name: "agent.exe", state: "uploaded", download_count: count }] });
const response = (body, status = 200) => ({ ok: status === 200, json: async () => body });

function setup(handler) {
  const calls = [];
  const window = { SOFTWARE: software, SITE_CONFIG: { repositoryUrl: "https://github.com/owner/repo" }, dispatchEvent() {} };
  const context = vm.createContext({ window, Event, AbortSignal, fetch: async url => { calls.push(url); return handler(url); } });
  vm.runInContext(source, context);
  return { stats: window.DownloadStats, calls };
}

test("independent visitors read identical shared counts; pending files remain zero", async () => {
  const handler = url => response(url.startsWith("https:") ? release(42) : snapshot);
  const first = setup(handler), second = setup(handler);
  await Promise.all([first.stats.refresh(), second.stats.refresh()]);
  assert.equal(first.stats.count("ready"), 42);
  assert.equal(second.stats.count("ready"), 42);
  assert.equal(first.stats.count("pending"), 0);
  assert.equal(first.stats.cached, false);
});

test("API failure preserves snapshot and later success replaces it", async () => {
  let fail = true;
  const { stats } = setup(url => url.startsWith("https:") ? response(release(9), fail ? 403 : 200) : response(snapshot));
  await stats.refresh();
  assert.equal(stats.count("ready"), 6);
  assert.equal(stats.cached, true);
  fail = false;
  await stats.refresh(true);
  assert.equal(stats.count("ready"), 9);
  assert.equal(stats.cached, false);
  fail = true;
  await stats.refresh(true);
  assert.equal(stats.count("ready"), 9);
});

test("unknown or mismatched asset data is never reported as a real zero", async () => {
  const wrong = structuredClone(snapshot);
  wrong.tools.ready.asset = "old-agent.exe";
  const { stats } = setup(url => url.startsWith("https:") ? response({}, 403) : response(wrong));
  await stats.refresh();
  assert.equal(stats.count("ready"), null);
  assert.equal(stats.count("pending"), 0);
  const invalid = setup(url => response(url.startsWith("https:") ? release(-1) : {}));
  await invalid.stats.refresh();
  assert.equal(invalid.stats.count("ready"), null);
  assert.equal(invalid.stats.updatedAt, null);
});

test("concurrent and repeated automatic refreshes do not multiply API requests", async () => {
  const { stats, calls } = setup(url => response(url.startsWith("https:") ? release(3) : snapshot));
  await Promise.all([stats.refresh(), stats.refresh(), stats.refresh(true)]);
  await stats.refresh();
  assert.equal(calls.length, 2);
  assert.equal(stats.loading, false);
  await stats.refresh(true);
  assert.equal(calls.length, 3);
});
