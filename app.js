(() => {
  "use strict";

  const software = Array.isArray(window.SOFTWARE) ? window.SOFTWARE : [];
  const categories = { coding: "编程开发", assistant: "AI 助手", local: "本地模型" };
  const platforms = { windows: "Windows", macos: "macOS", linux: "Linux" };
  const storageKey = "ai-toolbox:favorites:v1";
  const byId = new Map(software.map(tool => [tool.id, tool]));
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const escape = value => String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  const icon = name => `<i data-lucide="${escape(name)}" aria-hidden="true"></i>`;
  const refreshIcons = () => window.lucide?.createIcons({ attrs: { "aria-hidden": "true" } });
  const downloading = new Set();
  let favorites = new Set();
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
    if (Array.isArray(saved)) favorites = new Set(saved.filter(id => byId.has(id)));
  } catch { /* Browser storage is optional, including when opened as a local file. */ }
  const state = { query: "", category: "all", platform: "all", view: "all", layout: "grid", sort: "recommended" };
  let toastTimer;

  function packageUrl(tool) {
    const packagePath = tool.package?.path;
    if (typeof packagePath !== "string" || !packagePath.startsWith("packages/")) return null;
    try {
      const url = new URL(packagePath, document.baseURI);
      const directory = new URL("packages/", document.baseURI);
      const decodedPath = decodeURIComponent(url.pathname);
      if (url.origin !== directory.origin || url.protocol !== directory.protocol || url.search || url.hash
        || !decodedPath.startsWith(decodeURIComponent(directory.pathname))
        || decodedPath.includes("\\") || decodedPath.split("/").some(segment => segment === ".." || segment === ".")
        || !/\.(exe|msi|msix|msixbundle|appx|appxbundle|dmg|pkg|deb|rpm|appimage|zip|7z|tgz|tar\.(gz|xz|bz2))$/i.test(decodedPath)) return null;
      return url;
    } catch { return null; }
  }

  function showToast(message) {
    clearTimeout(toastTimer);
    $("#toast").textContent = message;
    $("#toast").hidden = false;
    toastTimer = setTimeout(() => { $("#toast").hidden = true; }, 3500);
  }

  function toolCard(tool) {
    const ready = Boolean(packageUrl(tool));
    const busy = downloading.has(tool.id);
    const saved = favorites.has(tool.id);
    const favoriteLabel = `${saved ? "取消收藏" : "收藏"} ${tool.name}`;
    const metadata = [platforms[tool.package?.platform], tool.package?.architecture, tool.package?.version, tool.package?.size].filter(Boolean).join(" · ");
    const action = busy ? "正在准备…" : ready ? "下载安装包" : "安装包待上传";
    return `<article class="tool-card ${ready ? "package-ready" : "package-pending"}" data-tool-id="${escape(tool.id)}">
      <button type="button" class="card-download-target" data-download="${escape(tool.id)}" aria-label="${escape(tool.name)} ${action}" aria-disabled="${!ready || busy}" aria-busy="${busy}" title="${escape(tool.name)} · ${action}"></button>
      <div class="card-top"><span class="tool-logo ${escape(tool.id)}" aria-hidden="true"><img src="${escape(tool.icon)}" alt="" width="28" height="28" loading="lazy"><span class="logo-fallback" hidden>${escape(tool.name.slice(0, 1))}</span></span><div class="card-name"><h3>${escape(tool.name)}</h3><div class="card-publisher">${escape(tool.publisher)}</div></div><button class="icon-button favorite-button ${saved ? "saved" : ""}" data-favorite="${escape(tool.id)}" title="${escape(favoriteLabel)}" aria-label="${escape(favoriteLabel)}" aria-pressed="${saved}">${icon("bookmark")}</button></div>
      <p class="card-description">${escape(tool.description)}</p>
      <div class="card-tags"><span class="tag category">${escape(categories[tool.category] || tool.category)}</span><span class="tag">Agent</span></div>
      <div class="card-bottom"><span class="package-meta">${escape(metadata || (ready ? "安装包已就绪" : "待发布"))}</span><span class="download-button">${action}${icon(busy ? "loader-circle" : ready ? "download" : "clock-3")}</span></div>
    </article>`;
  }

  function matches(tool) {
    const query = state.query.trim().toLocaleLowerCase();
    const searchable = [tool.name, tool.publisher, tool.description, categories[tool.category], ...(tool.tags || [])].join(" ").toLocaleLowerCase();
    return (state.view !== "favorites" || favorites.has(tool.id))
      && (state.category === "all" || tool.category === state.category)
      && (state.platform === "all" || tool.package?.platform === state.platform)
      && (!query || query.split(/\s+/).every(word => searchable.includes(word)));
  }

  function render() {
    const results = software.filter(matches);
    if (state.sort === "name") results.sort((a, b) => a.name.localeCompare(b.name, "en"));
    $("#tool-grid").innerHTML = results.map(toolCard).join("");
    $("#tool-grid").classList.toggle("list-view", state.layout === "list");
    $("#empty-state").hidden = results.length !== 0;
    const emptyFavorites = state.view === "favorites" && favorites.size === 0;
    $("#empty-title").textContent = emptyFavorites ? "还没有收藏的 Agent" : "没有找到相关 Agent";
    $("#empty-description").textContent = emptyFavorites ? "你的收藏列表为空。" : state.platform !== "all" ? "该平台暂无匹配的安装包。" : "试试其他关键词，或调整筛选条件。";
    $("#result-count").textContent = results.length;
    $("#favorite-count").textContent = favorites.size;
    const title = state.view === "favorites" ? "我的收藏" : categories[state.category] || "全部 Agent";
    $("#catalog-title").firstChild.textContent = `${title} `;
    $("#breadcrumb-current").textContent = state.view === "favorites" ? "我的收藏" : categories[state.category] || "Agent 下载";
    $("#clear-search").hidden = !state.query;
    $("#results-announcement").textContent = `${title}：${results.length} 个 Agent`;
    $$("[data-filter]").forEach(button => {
      const active = button.dataset.filter === state.category;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    $$("[data-category], [data-view]").forEach(button => {
      const active = button.dataset.category ? state.category === button.dataset.category && state.view === "all" : state.view === button.dataset.view && (state.view === "favorites" || state.category === "all");
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    $$("[data-layout]").forEach(button => {
      const active = state.layout === button.dataset.layout;
      button.classList.toggle("selected", active);
      button.setAttribute("aria-pressed", String(active));
    });
    refreshIcons();
    $$(".tool-logo img").forEach(img => {
      const fallback = () => { img.hidden = true; img.nextElementSibling.hidden = false; };
      img.addEventListener("error", fallback, { once: true });
      if (img.complete && !img.naturalWidth) fallback();
    });
  }

  function toggleFavorite(id) {
    if (!byId.has(id)) return;
    const removing = favorites.has(id);
    if (removing) favorites.delete(id); else favorites.add(id);
    let persisted = true;
    try { localStorage.setItem(storageKey, JSON.stringify([...favorites])); } catch { persisted = false; }
    render();
    const replacement = $$("[data-favorite]").find(button => button.dataset.favorite === id);
    (replacement || $('[data-view="favorites"]')).focus({ preventScroll: true });
    showToast(persisted ? `${removing ? "已取消收藏" : "已收藏"} ${byId.get(id).name}` : "已更新收藏；当前浏览器无法保存，关闭页面后将重置。");
  }

  async function downloadPackage(id) {
    const tool = byId.get(id);
    if (!tool || downloading.has(id)) return;
    const url = packageUrl(tool);
    if (!url) return showToast(`${tool.name} 安装包尚未上传`);
    downloading.add(id);
    render();
    try {
      // Verify the static file without buffering a potentially large installer.
      if (url.protocol !== "file:") {
        const response = await fetch(url.href, { method: "HEAD", redirect: "error", cache: "no-store", signal: AbortSignal.timeout(15000) });
        if (!response.ok || response.status === 204 || /text\/html|application\/xhtml\+xml/i.test(response.headers.get("content-type") || "")) throw new Error("Package unavailable");
      }
      const link = document.createElement("a");
      link.href = url.href;
      link.download = tool.package.fileName || decodeURIComponent(url.pathname.split("/").pop());
      link.hidden = true;
      document.body.append(link);
      link.click();
      link.remove();
      showToast(`已请求下载 ${tool.name}`);
    } catch { showToast(`${tool.name} 安装包暂时无法下载，请稍后重试。`); }
    finally {
      downloading.delete(id);
      const restoreFocus = document.activeElement === document.body;
      render();
      if (restoreFocus) $$("[data-download]").find(button => button.dataset.download === id)?.focus({ preventScroll: true });
    }
  }

  function resetFilters() {
    Object.assign(state, { query: "", category: "all", platform: "all", view: "all" });
    $("#search").value = "";
    $("#platform").value = "all";
    render();
  }

  document.addEventListener("click", event => {
    const favorite = event.target.closest("[data-favorite]");
    if (favorite) return toggleFavorite(favorite.dataset.favorite);
    const download = event.target.closest("[data-download]");
    if (download) return downloadPackage(download.dataset.download);
    const close = event.target.closest("[data-close]");
    if (close) return close.closest("dialog").close();
    const filter = event.target.closest("[data-filter], [data-category]");
    if (filter) { state.category = filter.dataset.filter || filter.dataset.category; if (filter.dataset.category) state.view = "all"; render(); }
    const view = event.target.closest("[data-view]");
    if (view) { state.view = view.dataset.view; state.category = "all"; render(); }
    const layout = event.target.closest("[data-layout]");
    if (layout) { state.layout = layout.dataset.layout; render(); }
  });
  $("#search").addEventListener("input", event => { state.query = event.target.value; render(); });
  $("#platform").addEventListener("change", event => { state.platform = event.target.value; render(); });
  $("#sort").addEventListener("change", event => { state.sort = event.target.value; render(); });
  $("#clear-search").addEventListener("click", () => { state.query = ""; $("#search").value = ""; render(); $("#search").focus(); });
  $("#reset-filters").addEventListener("click", resetFilters);
  $("#about-button").addEventListener("click", () => $("#about-dialog").showModal());
  $("#about-dialog").addEventListener("click", event => {
    const dialog = event.currentTarget;
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  const repositoryUrl = window.SITE_CONFIG?.repositoryUrl;
  if (/^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/?$/.test(repositoryUrl || "")) {
    $$(".source-link").forEach(link => { link.href = repositoryUrl; link.hidden = false; });
  }
  const available = software.filter(tool => packageUrl(tool)).length;
  $("#tool-total").textContent = software.length;
  $("#available-count").textContent = `${available} 个安装包可下载`;
  $("#package-status").textContent = available ? `${available} 个安装包已发布` : "安装包待上传";
  $$("[data-count]").forEach(count => { count.textContent = software.filter(tool => tool.category === count.dataset.count).length; });
  render();
})();
