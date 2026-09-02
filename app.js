(() => {
  "use strict";

  const DATA = window.TRIP_DATA;
  const REQUIRED_TAB_IDS = ["itinerary", "packing", "links"];
  let userPackingItems = [];

  if (!DATA) {
    document.body.innerHTML = '<p style="padding:2rem">trip-data.js を読み込めませんでした。</p>';
    return;
  }

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHtml = (value = "") => String(value)
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;").replaceAll("'", "&#039;");

  const storageKey = (kind) => `${DATA.storageKeyPrefix || DATA.id || "trip"}:${kind}`;

  function init() {
    applyTheme();
    renderMeta();
    renderNav();
    renderTabs();
    loadPacking();
    loadUserPackingItems();
    switchTab("itinerary", false);
  }

  function applyTheme() {
    const t = DATA.theme || {};
    const root = document.documentElement;
    const map = { main: "--theme-main", dark: "--theme-dark", deep: "--theme-deep", navy: "--theme-navy", light: "--theme-light", accent: "--theme-accent", yellow: "--theme-yellow" };
    Object.entries(map).forEach(([key, cssVar]) => { if (t[key]) root.style.setProperty(cssVar, t[key]); });
    const themeMeta = $('meta[name="theme-color"]');
    if (themeMeta && t.main) themeMeta.content = t.main;
  }

  function renderMeta() {
    const m = DATA.meta || {};
    document.title = m.documentTitle || m.title || "旅のしおり";
    $("#hero-badge").innerHTML = `${m.badgeIcon ? `<i class="${escapeHtml(m.badgeIcon)} mr-1"></i>` : ""}${escapeHtml(m.badge || "Travel Planner")}`;
    $("#hero-title").textContent = m.title || "旅のしおり";
    $("#hero-dates").innerHTML = `${escapeHtml(m.dates || "")}<br>${escapeHtml(m.subtitle || "旅のしおり")}`;
    $("#footer-title").textContent = m.footerTitle || m.title || "旅のしおり";
    $("#footer-text").textContent = m.footerText || "Have a nice trip!";

    if (m.appIcon) {
      $("#app-icon-link").href = m.appIcon;
      $("#favicon-link").href = m.appIcon;
    }

    const hero = $("#hero-image");
    if (m.heroImage) {
      hero.src = m.heroImage;
      hero.alt = m.heroAlt || "旅行イメージ";
      hero.classList.remove("hidden");
    } else {
      hero.classList.add("hidden");
    }
  }

  function enabledTabs() {
    const configured = Array.isArray(DATA.tabs) ? DATA.tabs : [];
    const byId = new Map(configured.map(t => [t.id, t]));
    REQUIRED_TAB_IDS.forEach(id => {
      if (!byId.has(id)) byId.set(id, { id, label: id, enabled: true, required: true });
      byId.get(id).enabled = true;
    });
    return [...byId.values()].filter(t => t.enabled !== false);
  }

  function renderNav() {
    const nav = $("#tab-nav");
    nav.innerHTML = enabledTabs().map(tab => `
      <button class="tab-btn" id="tab-${escapeHtml(tab.id)}" data-tab="${escapeHtml(tab.id)}">
        <i class="${escapeHtml(tab.icon || "fa-solid fa-circle")}"></i>${escapeHtml(tab.label || tab.id)}
      </button>`).join("");
    $$(".tab-btn", nav).forEach(btn => btn.addEventListener("click", () => switchTab(btn.dataset.tab)));
  }

  function renderTabs() {
    const main = $("#app-main");
    main.innerHTML = enabledTabs().map(tab => `<section id="content-${escapeHtml(tab.id)}" class="tab-content"></section>`).join("");
    if ($("#content-itinerary")) renderItinerary();
    if ($("#content-escape")) renderEmergency();
    if ($("#content-ai")) renderAi();
    if ($("#content-packing")) renderPacking();
    if ($("#content-links")) renderLinks();
  }

  function switchTab(tabId, smooth = true) {
    $$(".tab-content").forEach(section => section.classList.remove("active"));
    $$(".tab-btn").forEach(btn => btn.classList.remove("active"));
    $(`#content-${tabId}`)?.classList.add("active");
    $(`#tab-${tabId}`)?.classList.add("active");
    window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
  }

  function renderItinerary() {
    const container = $("#content-itinerary");
    const days = DATA.itinerary?.days || [];
    const daySelect = days.length ? `
      <div class="day-select-nav">
        <label class="day-select-wrap" for="itinerary-day-select">
          <span class="day-select-label"><i class="fa-solid fa-calendar-day"></i>日程を選択</span>
          <select id="itinerary-day-select" class="day-select">
            ${days.map(day => `<option value="${escapeHtml(day.id)}">${escapeHtml(`${day.quickLabel || day.label} ${day.title || ""}`.trim())}</option>`).join("")}
          </select>
        </label>
      </div>` : "";

    container.innerHTML = `<div class="space-y-6">${daySelect}${days.map(renderDay).join("")}</div>`;
    $("#itinerary-day-select")?.addEventListener("change", event => scrollToDay(event.currentTarget.value));
  }

  function scrollToDay(dayId) {
    document.getElementById(dayId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderDay(day) {
    return `<div id="${escapeHtml(day.id)}" class="card day-card">
      <div class="day-head">
        <div class="day-title-wrap">
          <span class="day-label">${escapeHtml(day.label)}</span>
          <h2 class="font-pop text-lg md:text-xl font-bold leading-snug min-w-0 m-0">
            <span class="day-date">${escapeHtml(day.date)}</span>
            <span class="day-title">${escapeHtml(day.title)}</span>
          </h2>
        </div>
        ${day.summary ? `<span class="day-summary">${day.summaryIcon ? `<i class="${escapeHtml(day.summaryIcon)} mr-1"></i>` : ""}${escapeHtml(day.summary)}</span>` : ""}
      </div>
      <div class="timeline">${(day.items || []).map(renderItineraryItem).join("")}</div>
    </div>`;
  }

  function renderItineraryItem(item) {
    return `<div class="timeline-item" data-itinerary-id="${escapeHtml(item.id)}">
      <div class="timeline-dot"></div>
      <div class="item-top">
        <span class="item-time">${escapeHtml(item.time)}</span>
        <h3 class="item-title">${escapeHtml(item.title)}</h3>
      </div>
      <p class="item-desc">${escapeHtml(item.description)}</p>
    </div>`;
  }

  function renderEmergency() {
    const e = DATA.emergency || {};
    const container = $("#content-escape");
    container.innerHTML = `<div class="space-y-6">
      <div class="card">
        <h2 class="section-title"><i class="${escapeHtml(e.icon || "fa-solid fa-umbrella")}"></i>${escapeHtml(e.title || "雨天・緊急")}</h2>
        <p class="text-xs text-gray-600 font-bold leading-relaxed mb-4">${escapeHtml(e.intro || "")}</p>
        <div class="escape-grid">${(e.alternatives || []).map(item => `<div class="info-card"><span class="small-badge">${escapeHtml(item.badge)}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p></div>`).join("")}</div>
      </div>
      <div class="card">
        <h2 class="section-title"><i class="fa-solid fa-heart-pulse"></i>${escapeHtml(e.healthTitle || "体調不良時")}</h2>
        <p class="text-xs text-gray-600 font-bold leading-relaxed mb-4">${escapeHtml(e.healthText || "")}</p>
        <div class="phone-grid">${(e.phones || []).map(p => `<a class="phone-link" href="tel:${escapeHtml(p.phone).replaceAll("-","")}"><i class="${escapeHtml(p.icon || "fa-solid fa-phone")}"></i><div><div class="text-[10px] text-gray-400">${escapeHtml(p.label)}</div><strong>${escapeHtml(p.phone)}</strong></div></a>`).join("")}</div>
      </div>
    </div>`;
  }

  function renderAi() {
    const a = DATA.ai || {};
    const container = $("#content-ai");
    container.innerHTML = `<div class="card">
      <h2 class="section-title"><i class="${escapeHtml(a.icon || "fa-solid fa-robot")}"></i>${escapeHtml(a.title || "AI相談")}</h2>
      <p class="text-xs text-gray-600 font-bold leading-relaxed mb-5">${escapeHtml(a.intro || "")}</p>
      <div class="form-box">
        <div class="form-grid">
          <div><label class="form-label">現在のタイミング ⏰</label><select id="ai-timing" class="form-control">${(a.timings || []).map(x => `<option value="${escapeHtml(x.value)}">${escapeHtml(x.label)}</option>`).join("")}</select></div>
          <div><label class="form-label">相談したいこと 💬</label><select id="ai-request" class="form-control">${(a.requestTypes || []).map(x => `<option value="${escapeHtml(x.value)}">${escapeHtml(x.label)}</option>`).join("")}</select></div>
        </div>
        <div><label class="form-label">詳しい相談内容・現在地・条件（任意） ✏️</label><input id="ai-details" class="form-control" type="text" placeholder="例：いま勝浦港です。22時まで開いている店を探しています。"></div>
        <button id="generate-ai-prompt" class="primary-btn"><i class="fa-solid fa-wand-magic-sparkles mr-2"></i>AIに貼り付ける相談文を作成する</button>
      </div>
      <div id="ai-result" class="ai-result hidden"></div>
      <div class="prompt-box">
        <h3 class="font-pop font-bold text-sm mb-2"><i class="fa-solid fa-copy mr-2" style="color:var(--theme-accent)"></i>生成AIに貼り付ける相談文</h3>
        <p class="text-[11px] text-gray-500 font-bold mb-3">選択内容と自由入力を反映して自動生成します。</p>
        <div class="prompt-shell custom-scrollbar"><button id="copy-prompt" class="copy-btn"><i class="fa-solid fa-copy mr-1"></i>コピー</button><pre id="prompt-area" class="prompt-pre">上のフォームを入力して相談文を作成してください。</pre></div>
      </div>
    </div>`;
    $("#generate-ai-prompt").addEventListener("click", generateAiPrompt);
    $("#copy-prompt").addEventListener("click", () => copyText($("#prompt-area").textContent));
  }

  function itinerarySummary() {
    return (DATA.itinerary?.days || []).map(day => {
      const items = (day.items || []).map(i => `${i.time} ${i.title.replace(/[\u{1F300}-\u{1FAFF}]/gu, "").trim()}`).join("\n");
      return `【${day.label} ${day.date}】\n${items}`;
    }).join("\n\n");
  }

  function generateAiPrompt() {
    const a = DATA.ai || {};
    const timing = a.timings?.find(x => x.value === $("#ai-timing").value) || {};
    const request = a.requestTypes?.find(x => x.value === $("#ai-request").value) || {};
    const details = $("#ai-details").value.trim() || "特になし";
    const prompt = `現在、旅行の途中です。以下の旅程を前提に、現在の状況に合わせて旅行中の相談に答えてください。\n\n${itinerarySummary()}\n\n【現在のタイミング】\n${timing.label || "未指定"}\n\n【相談したいこと】\n${request.label || "未指定"}\n\n【詳しい相談内容・現在地・条件】\n${details}\n\n【確認ポイント】\n${request.advice || "現在地・時刻・条件・次の予定を整理してください。"}\n\n【AIへの依頼】\n今の旅行中に最も現実的で使いやすい答えを出してください。候補を出す場合は、最新の営業時間・移動時間・駐車場・次の予定への影響も確認してください。`;
    $("#prompt-area").textContent = prompt;
    $("#ai-result").innerHTML = `<p class="font-bold" style="color:var(--theme-accent)">相談文を作成しました</p><p class="text-xs mt-2"><strong>現在：</strong>${escapeHtml(timing.label || "未指定")}</p><p class="text-xs mt-2"><strong>相談：</strong>${escapeHtml(request.label || "未指定")}</p><p class="text-xs mt-2"><strong>補足：</strong>${escapeHtml(details)}</p>`;
    $("#ai-result").classList.remove("hidden");
    $("#ai-result").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function renderPacking() {
    const p = DATA.packing || {};
    const container = $("#content-packing");
    container.innerHTML = `<div class="card">
      <div class="flex items-center justify-between gap-3 mb-4 pb-3" style="border-bottom:2px dashed var(--theme-light)">
        <h2 class="section-title !mb-0 !pb-0 !border-0"><i class="fa-solid fa-clipboard-check"></i>${escapeHtml(p.title || "持ち物")}</h2>
        <button id="reset-packing" class="delete-btn text-xs font-black"><i class="fa-solid fa-rotate-left mr-1"></i>全クリア</button>
      </div>
      <p class="text-xs text-gray-500 font-bold leading-relaxed mb-5">${escapeHtml(p.intro || "")}</p>
      <div class="space-y-6">${(p.categories || []).map(renderPackingCategory).join("")}</div>
      ${p.allowCustomItems !== false ? `<div class="mt-6 pt-4" style="border-top:2px dashed var(--theme-light)"><h3 class="text-xs font-black mb-3"><i class="fa-solid fa-plus mr-2" style="color:var(--theme-main)"></i>わたしだけの持ち物を追加</h3><div class="add-row"><input id="new-item-text" class="form-control" type="text" placeholder="例：御朱印帳、常備薬など"><button id="add-user-item" class="small-btn">追加</button></div><div id="user-items-container" class="packing-grid mt-4"></div></div>` : ""}
    </div>`;
    $$(".pack-item", container).forEach(item => item.addEventListener("change", savePacking));
    $("#reset-packing")?.addEventListener("click", resetPacking);
    $("#add-user-item")?.addEventListener("click", addUserPackingItem);
  }

  function renderPackingCategory(cat) {
    return `<div><h3 class="category-title"><i class="${escapeHtml(cat.icon || "fa-solid fa-check") } mr-2"></i>${escapeHtml(cat.title)}</h3><div class="packing-grid">${(cat.items || []).map(item => `<label class="packing-label"><input type="checkbox" class="pack-item app-check" data-key="${escapeHtml(cat.id)}:${escapeHtml(item.id)}"><span>${escapeHtml(item.text)}</span></label>`).join("")}</div></div>`;
  }

  function savePacking() {
    const state = {};
    $$(".pack-item").forEach(item => state[item.dataset.key] = item.checked);
    localStorage.setItem(storageKey("packing"), JSON.stringify(state));
  }

  function loadPacking() {
    const state = readJson(storageKey("packing"), {});
    $$(".pack-item").forEach(item => item.checked = Boolean(state[item.dataset.key]));
  }

  function loadUserPackingItems() {
    userPackingItems = readJson(storageKey("user-packing"), []);
    renderUserPackingItems();
  }

  function saveUserPackingItems() { localStorage.setItem(storageKey("user-packing"), JSON.stringify(userPackingItems)); }

  function addUserPackingItem() {
    const input = $("#new-item-text");
    const text = input?.value.trim();
    if (!text) return;
    userPackingItems.push({ id: `${Date.now()}`, text, checked: false });
    saveUserPackingItems();
    input.value = "";
    renderUserPackingItems();
  }

  function renderUserPackingItems() {
    const container = $("#user-items-container");
    if (!container) return;
    container.innerHTML = userPackingItems.map(item => `<div class="user-item"><label class="flex items-center gap-2"><input class="app-check user-pack-check" type="checkbox" data-id="${escapeHtml(item.id)}" ${item.checked ? "checked" : ""}><span>${escapeHtml(item.text)}</span></label><button class="delete-btn user-pack-delete" data-id="${escapeHtml(item.id)}"><i class="fa-regular fa-trash-can"></i></button></div>`).join("");
    $$(".user-pack-check", container).forEach(check => check.addEventListener("change", () => { const item = userPackingItems.find(x => x.id === check.dataset.id); if (item) { item.checked = check.checked; saveUserPackingItems(); } }));
    $$(".user-pack-delete", container).forEach(btn => btn.addEventListener("click", () => { userPackingItems = userPackingItems.filter(x => x.id !== btn.dataset.id); saveUserPackingItems(); renderUserPackingItems(); }));
  }

  function resetPacking() {
    localStorage.removeItem(storageKey("packing"));
    localStorage.removeItem(storageKey("user-packing"));
    userPackingItems = [];
    $$(".pack-item").forEach(item => item.checked = false);
    renderUserPackingItems();
  }

  function renderLinks() {
    const l = DATA.links || {};
    const categories = l.categories || [];
    const container = $("#content-links");
    const navColumns = Math.max(1, Math.min(categories.length, 5));
    container.innerHTML = `<div class="quick-nav"><div class="quick-nav-grid" style="grid-template-columns:repeat(${navColumns},minmax(0,1fr))">${categories.map(c => `<a class="quick-link" href="#link-${escapeHtml(c.id)}">${escapeHtml(c.icon || "🔗")}${escapeHtml(c.label)}</a>`).join("")}</div></div><div class="card"><h2 class="section-title"><i class="fa-solid fa-link"></i>${escapeHtml(l.title || "リンク先一覧")}</h2><p class="text-xs text-gray-500 font-bold leading-relaxed mb-5">${escapeHtml(l.intro || "")}</p><div class="space-y-6">${categories.map(renderLinkCategory).join("")}</div></div>`;
  }

  function renderLinkCategory(cat) {
    return `<div id="link-${escapeHtml(cat.id)}" style="scroll-margin-top:150px"><h3 class="category-title">${escapeHtml(cat.icon || "🔗")} ${escapeHtml(cat.label)}</h3>${(cat.groups || []).map(group => `<div><h4 class="subgroup-title">●${escapeHtml(group.label)}</h4><ul class="link-list">${(group.items || []).map(item => `<li class="link-item">・${item.url ? `<a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.name)}</a>` : `<span class="link-name">${escapeHtml(item.name)}</span>`}${item.note ? `<span class="link-note"> ※${escapeHtml(item.note)}</span>` : ""}</li>`).join("")}</ul></div>`).join("")}</div>`;
  }

  async function copyText(text) {
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(text);
      else fallbackCopy(text);
      showToast("相談文をコピーしました");
    } catch {
      fallbackCopy(text);
      showToast("相談文をコピーしました");
    }
  }

  function fallbackCopy(text) {
    const area = document.createElement("textarea");
    area.value = text; document.body.appendChild(area); area.select(); document.execCommand("copy"); area.remove();
  }

  function showToast(message) {
    $("#copy-toast-text").textContent = message;
    $("#copy-toast").classList.remove("hidden");
    setTimeout(() => $("#copy-toast").classList.add("hidden"), 2500);
  }

  function readJson(key, fallback) {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }
    catch { return fallback; }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
