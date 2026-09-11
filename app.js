(() => {
  "use strict";

  const software = Array.isArray(window.SOFTWARE) ? window.SOFTWARE : [];
  const categories = { coding: "编程开发", assistant: "AI 助手", local: "本地模型" };
  const platforms = {
    windows: { name: "Windows", icon: "app-window" },
    macos: { name: "macOS", icon: "apple" },
    linux: { name: "Linux", icon: "terminal" },
    web: { name: "网页版", icon: "globe" }
  };
  const storageKey = "ai-toolbox:favorites:v1";
  const byId = new Map(software.map(tool => [tool.id, tool]));
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const escape = value => String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  const icon = name => `<i data-lucide="${escape(name)}" aria-hidden="true"></i>`;
  const external = url => /^https:\/\//i.test(url || "") ? escape(url) : "#";
  const refreshIcons = () => window.lucide?.createIcons({ attrs: { "aria-hidden": "true" } });

  let favorites = new Set();
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
    if (Array.isArray(saved)) favorites = new Set(saved.filter(id => byId.has(id)));
  } catch { /* Storage can be unavailable in private browsing or local file mode. */ }

  const state = { query: "", category: "all", platform: "all", view: "all", layout: "grid", sort: "recommended" };
  let activeTool = null;
  let activePlatform = null;
  let toastTimer;

  function logo(tool, feature = false) {
    return `<span class="${feature ? "feature-art" : `tool-logo ${escape(tool.id)}`}" aria-hidden="true"><img src="${escape(tool.icon)}" alt="" width="${feature ? 65 : 28}" height="${feature ? 65 : 28}" loading="${feature ? "eager" : "lazy"}"><span class="logo-fallback" hidden>${escape(tool.name.slice(0, 1))}</span></span>`;
  }

  function handleImageErrors() {
    $$("img").forEach(img => {
      const fallback = () => { img.hidden = true; if (img.nextElementSibling) img.nextElementSibling.hidden = false; };
      img.addEventListener("error", fallback, { once: true });
      if (img.complete && !img.naturalWidth) fallback();
    });
  }

  function showToast(message) {
    clearTimeout(toastTimer);
    $("#toast").textContent = message;
    $("#toast").hidden = false;
    toastTimer = setTimeout(() => { $("#toast").hidden = true; }, 2800);
  }

  function favoriteButton(tool) {
    const saved = favorites.has(tool.id);
    const label = `${saved ? "取消收藏" : "收藏"} ${tool.name}`;
    return `<button class="icon-button favorite-button ${saved ? "saved" : ""}" data-favorite="${escape(tool.id)}" title="${escape(label)}" aria-label="${escape(label)}" aria-pressed="${saved}">${icon("bookmark")}</button>`;
  }

  function toolCard(tool) {
    return `<article class="tool-card" data-tool-id="${escape(tool.id)}">
      <div class="card-top">${logo(tool)}<div class="card-name"><h3><button class="tool-name-button" data-open="${escape(tool.id)}">${escape(tool.name)}</button></h3><div class="card-publisher">${escape(tool.publisher)}</div></div>${favoriteButton(tool)}</div>
      <p class="card-description">${escape(tool.description)}</p>
      <div class="card-tags"><span class="tag category">${escape(categories[tool.category])}</span><span class="tag">${escape(tool.licenseLabel)}</span></div>
      <div class="card-bottom"><div class="os-icons" aria-label="支持 ${tool.platforms.map(p => platforms[p]?.name || p).join("、")}">${tool.platforms.filter(p => platforms[p]).map(p => `<span class="os-icon" title="${platforms[p].name}">${icon(platforms[p].icon)}<span class="os-label">${platforms[p].name}</span></span>`).join("")}</div><button class="download-button" data-open="${escape(tool.id)}" aria-label="${escape(tool.name)} 下载与安装">获取工具${icon("arrow-down-to-line")}</button></div>
    </article>`;
  }

  function renderFeatured() {
    $("#featured-grid").innerHTML = software.filter(tool => ["codex", "claude"].includes(tool.id)).map(tool => `<article class="featured-card ${escape(tool.id)}">
      <span class="featured-eyebrow">${icon(tool.id === "codex" ? "terminal" : "sparkles")}${tool.id === "codex" ? "为开发而生" : "灵感随时在线"}</span>
      <h3>${escape(tool.name)}</h3><p>${escape(tool.tagline)}</p>
      <button class="feature-button" data-open="${escape(tool.id)}" aria-label="获取 ${escape(tool.name)}">获取 ${escape(tool.name)}${icon("arrow-right")}</button>${logo(tool, true)}
    </article>`).join("");
  }

  function matches(tool) {
    const query = state.query.trim().toLocaleLowerCase();
    const searchable = [tool.name, tool.publisher, tool.description, tool.tagline, categories[tool.category], ...tool.tags].join(" ").toLocaleLowerCase();
    return (state.view !== "favorites" || favorites.has(tool.id))
      && (state.category === "all" || tool.category === state.category)
      && (state.platform === "all" || tool.platforms.includes(state.platform))
      && (!query || query.split(/\s+/).every(word => searchable.includes(word)));
  }

  function render() {
    const results = software.filter(matches);
    if (state.sort === "name") results.sort((a, b) => a.name.localeCompare(b.name, "en"));
    $("#tool-grid").innerHTML = results.map(toolCard).join("");
    $("#tool-grid").classList.toggle("list-view", state.layout === "list");
    $("#empty-state").hidden = results.length !== 0;
    const emptyFavorites = state.view === "favorites" && favorites.size === 0;
    $("#empty-title").textContent = emptyFavorites ? "你的工具收藏，从这里开始" : "没有找到相关工具";
    $("#empty-description").textContent = emptyFavorites ? "还没有收藏的工具。" : "试试其他关键词，或调整筛选条件。";
    $("#result-count").textContent = results.length;
    $("#favorite-count").textContent = favorites.size;
    const title = state.view === "favorites" ? "我的收藏" : categories[state.category] || "全部工具";
    $("#catalog-title").firstChild.textContent = `${title} `;
    $("#breadcrumb-current").textContent = state.view === "favorites" ? "我的收藏" : categories[state.category] || "发现工具";
    $("#featured-section").hidden = state.view !== "all" || state.category !== "all" || state.query.trim() !== "" || state.platform !== "all";
    $("#clear-search").hidden = !state.query;
    $("#results-announcement").textContent = `${title}：${results.length} 个工具`;
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
    handleImageErrors();
  }

  function toggleFavorite(id) {
    if (!byId.has(id)) return;
    const focused = document.activeElement?.getAttribute("data-favorite");
    const removing = favorites.has(id);
    if (removing) favorites.delete(id); else favorites.add(id);
    let persisted = true;
    try { localStorage.setItem(storageKey, JSON.stringify([...favorites])); } catch { persisted = false; }
    render();
    if (focused) {
      const replacement = $$("[data-favorite]").find(button => button.dataset.favorite === focused);
      (replacement || $('[data-view="favorites"]')).focus({ preventScroll: true });
    }
    showToast(persisted ? `${removing ? "已取消收藏" : "已收藏"} ${byId.get(id).name}` : "已更新收藏；当前浏览器无法保存，关闭页面后将重置。");
  }

  function detectedPlatform() {
    const os = navigator.userAgentData?.platform || navigator.platform || "";
    if (/win/i.test(os)) return "windows";
    if (/mac|iphone|ipad/i.test(os)) return "macos";
    return "linux";
  }

  function openTool(id) {
    const tool = byId.get(id);
    if (!tool) return;
    activeTool = tool;
    const available = [...new Set(tool.downloads.map(download => download.platform))];
    const preferred = state.platform === "all" ? detectedPlatform() : state.platform;
    activePlatform = available.includes(preferred) ? preferred : available[0];
    $("#dialog-content").innerHTML = `<button class="icon-button dialog-close" data-close title="关闭" aria-label="关闭">${icon("x")}</button>
      <div class="dialog-header">${logo(tool)}<div><h2 id="dialog-title">${escape(tool.name)}</h2><p>${escape(tool.publisher)} · ${escape(tool.licenseLabel)}</p></div></div>
      <p class="dialog-description">${escape(tool.description)}</p>
      <div class="detail-links"><a href="${external(tool.website)}" target="_blank" rel="noopener noreferrer">官方网站${icon("arrow-up-right")}</a><span class="tag category">${escape(categories[tool.category])}</span></div>
      <h3 class="download-section-title">选择你的平台</h3><div class="dialog-platforms" role="group" aria-label="下载平台">${available.filter(p => platforms[p]).map(p => `<button data-download-platform="${p}" aria-pressed="false">${icon(platforms[p].icon)}${platforms[p].name}</button>`).join("")}</div>
      <div class="download-options" id="download-options"></div><p class="dialog-disclaimer">${icon("shield-check")}<span>安装来源为开发者官方渠道。版本、系统要求与账户权限以官方说明为准。</span></p>`;
    renderDownloads();
    if (!$("#tool-dialog").open) $("#tool-dialog").showModal();
    refreshIcons();
    handleImageErrors();
  }

  function renderDownloads() {
    if (!activeTool) return;
    $$("[data-download-platform]").forEach(button => {
      const active = button.dataset.downloadPlatform === activePlatform;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    $("#download-options").innerHTML = activeTool.downloads.filter(download => download.platform === activePlatform).map(download => {
      const command = download.kind === "command";
      const web = download.platform === "web";
      const action = command ? "官方安装文档" : download.kind === "installer" ? "下载安装包" : web ? "打开网页版" : "前往官方下载";
      const kind = command ? "命令行安装" : download.kind === "installer" ? "官方安装包" : web ? "在线应用" : "官方下载页面";
      return `<section class="download-option"><div class="download-option-head"><div><h4>${escape(download.label)}</h4><p class="download-kind">${kind}</p></div><a class="button ${command ? "button-secondary" : "button-primary"}" href="${external(download.url)}" target="_blank" rel="noopener noreferrer">${icon(download.kind === "installer" ? "download" : "arrow-up-right")}${action}</a></div>${command ? `<div class="install-command"><code id="install-command">${escape(download.command)}</code><button class="icon-button" data-copy-command title="复制安装命令" aria-label="复制安装命令">${icon("copy")}</button></div>` : ""}${download.note ? `<p class="download-note">${escape(download.note)}</p>` : ""}</section>`;
    }).join("");
    refreshIcons();
  }

  async function copyCommand(button) {
    const command = button.parentElement.querySelector("code").textContent;
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(command);
      else {
        const range = document.createRange();
        range.selectNodeContents(button.parentElement.querySelector("code"));
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        if (!document.execCommand("copy")) throw new Error("Clipboard unavailable");
        selection.removeAllRanges();
      }
      button.innerHTML = icon("check");
      button.title = "已复制";
      button.setAttribute("aria-label", "安装命令已复制");
      refreshIcons();
      showToast("安装命令已复制");
    } catch { showToast("复制未完成，请选择命令手动复制。"); }
  }

  function resetFilters() {
    Object.assign(state, { query: "", category: "all", platform: "all", view: "all" });
    $("#search").value = "";
    $("#platform").value = "all";
    render();
  }

  document.addEventListener("click", event => {
    const open = event.target.closest("[data-open]");
    if (open) return openTool(open.dataset.open);
    const favorite = event.target.closest("[data-favorite]");
    if (favorite) return toggleFavorite(favorite.dataset.favorite);
    const close = event.target.closest("[data-close]");
    if (close) return close.closest("dialog").close();
    const platform = event.target.closest("[data-download-platform]");
    if (platform) { activePlatform = platform.dataset.downloadPlatform; return renderDownloads(); }
    const copy = event.target.closest("[data-copy-command]");
    if (copy) return copyCommand(copy);
    const filter = event.target.closest("[data-filter], [data-category]");
    if (filter) {
      state.category = filter.dataset.filter || filter.dataset.category;
      if (filter.dataset.category) state.view = "all";
      render();
    }
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
  $$("dialog").forEach(dialog => {
    dialog.addEventListener("click", event => { if (event.target === dialog) { const bounds = dialog.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close(); } });
    dialog.addEventListener("close", () => { if (dialog.id === "tool-dialog") activeTool = null; });
  });

  const repositoryUrl = window.SITE_CONFIG?.repositoryUrl;
  if (/^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/?$/.test(repositoryUrl || "")) {
    $$(".source-link").forEach(link => { link.href = repositoryUrl; link.hidden = false; });
  }
  $("#tool-total").innerHTML = `${software.length}<span>+</span>`;
  $$("[data-count]").forEach(count => { count.textContent = software.filter(tool => tool.category === count.dataset.count).length; });
  renderFeatured();
  render();
})();
