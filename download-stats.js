(() => {
  "use strict";

  const software = window.SOFTWARE || [];
  const repo = window.SITE_CONFIG?.repositoryUrl?.match(/^https:\/\/github\.com\/([\w.-]+\/[\w.-]+)\/?$/)?.[1];
  const counts = new Map(software.map(tool => [tool.id, tool.package?.release ? null : 0]));
  let updatedAt = null;
  let cached = false;
  let loading = false;
  let lastAttempt = 0;
  const notify = () => window.dispatchEvent(new Event("downloadstatschange"));

  async function getJson(url) {
    const response = await fetch(url, { cache: "no-store", credentials: "omit", referrerPolicy: "no-referrer", signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error("Statistics unavailable");
    return response.json();
  }

  async function refresh(force = false) {
    if (loading || (!force && Date.now() - lastAttempt < 60000)) return;
    loading = true;
    lastAttempt = Date.now();
    notify();
    try {
      if (!updatedAt) {
        try {
          const snapshot = await getJson(window.SITE_CONFIG?.downloadStatsSnapshot || "download-stats.json");
          if (snapshot.repository === repo && Number.isFinite(Date.parse(snapshot.updatedAt))) {
            for (const tool of software) {
              const entry = snapshot.tools?.[tool.id];
              if (entry?.release === (tool.package?.release || null) && entry?.asset === (tool.package?.fileName || null)
                && Number.isSafeInteger(entry.count) && entry.count >= 0) counts.set(tool.id, entry.count);
            }
            updatedAt = snapshot.updatedAt;
            cached = true;
            notify();
          }
        } catch { /* Live data can still succeed when a snapshot is unavailable. */ }
      }
      if (!repo) throw new Error("Repository unavailable");
      const tags = [...new Set(software.map(tool => tool.package?.release).filter(Boolean))];
      const releases = await Promise.all(tags.map(tag => getJson(`https://api.github.com/repos/${repo}/releases/tags/${encodeURIComponent(tag)}`)));
      const nextCounts = new Map(counts);
      for (const tool of software) {
        if (!tool.package?.release) continue;
        const release = releases.find(item => item.tag_name === tool.package.release);
        const asset = release?.assets?.find(item => item.name === tool.package.fileName && item.state === "uploaded");
        if (!asset || !Number.isSafeInteger(asset.download_count) || asset.download_count < 0) throw new Error("Asset statistics unavailable");
        nextCounts.set(tool.id, asset.download_count);
      }
      nextCounts.forEach((value, id) => counts.set(id, value));
      updatedAt = new Date().toISOString();
      cached = false;
    } catch {
      cached = Boolean(updatedAt);
    } finally {
      loading = false;
      notify();
    }
  }

  window.DownloadStats = {
    count: id => counts.get(id) ?? null,
    get updatedAt() { return updatedAt; },
    get cached() { return cached; },
    get loading() { return loading; },
    refresh
  };
})();
