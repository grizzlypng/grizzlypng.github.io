/* ============================================================
   NENTBU OS — shell + apps engine (shared by every page)
   ============================================================
   ▼▼▼ EDIT YOUR CONTENT IN THIS CONFIG BLOCK ▼▼▼
   ============================================================ */

/* --- NENTBU TUBE videos ---------------------------------------
   Paste the ID from a YouTube URL (the part after "watch?v=").
   e.g. https://youtube.com/watch?v=dQw4w9WgXcQ  ->  "dQw4w9WgXcQ"
   Leave "VIDEO_ID_x" as-is and it shows a placeholder. --------- */
var VIDEOS = [
  { id: "VIDEO_ID_1", title: "My latest short",        views: "1.2M views", ago: "2 weeks ago",  dur: "0:38" },
  { id: "VIDEO_ID_2", title: "Brand collab — MSI",     views: "840K views",  ago: "1 month ago",  dur: "1:04" },
  { id: "VIDEO_ID_3", title: "How I grow accounts",    views: "512K views",  ago: "2 months ago", dur: "8:21" },
  { id: "VIDEO_ID_4", title: "Wacom tutorial series",  views: "377K views",  ago: "3 months ago", dur: "6:15" },
  { id: "VIDEO_ID_5", title: "Behind the strategy",    views: "203K views",  ago: "5 months ago", dur: "4:47" },
  { id: "VIDEO_ID_6", title: "Q&A: organic growth",    views: "119K views",  ago: "7 months ago", dur: "12:30" }
];

/* --- ADS -------------------------------------------------------
   Make PNGs and drop them in an "ads" folder next to these files.
   Recommended sizes: banner 468x60, pop-up 300x250.
   Until the file exists, a labelled placeholder shows instead. --- */
var ADS = {
  banner: { src: "ads/banner-468x60.png", href: "#", w: 468, h: 60,  alt: "Advertisement" },
  popup:  { src: "ads/popup-300x250.png", href: "#", w: 300, h: 250, alt: "Advertisement" }
};

/* --- WALLPAPERS ------------------------------------------------
   Upload images into a "wallpapers" folder and keep these paths,
   or rename them. "none" = solid color only. -------------------- */
var WALLPAPERS = [
  { key: "none",  name: "(None — color only)", src: "" },
  { key: "wall1", name: "Wallpaper 1",         src: "wallpapers/wall1.png" },
  { key: "wall2", name: "Wallpaper 2",         src: "wallpapers/wall2.png" },
  { key: "wall3", name: "Wallpaper 3",         src: "wallpapers/wall3.png" },
  { key: "wall4", name: "Wallpaper 4",         src: "wallpapers/wall4.png" }
];

/* --- COLOR SCHEMES (styled in style.css) ---------------------- */
var THEMES = [
  { key: "teal",     name: "NENTBU Teal (default)" },
  { key: "desert",   name: "Desert" },
  { key: "rose",     name: "Rose" },
  { key: "eggplant", name: "Eggplant" },
  { key: "spruce",   name: "Spruce" },
  { key: "storm",    name: "Storm" },
  { key: "hotdog",   name: "Hot Dog Stand" },
  { key: "midnight", name: "Midnight" }
];

var OS_NAME = "NENTBU OS";

/* ============================================================
   ▲▲▲ END CONFIG — engine below ▲▲▲
   ============================================================ */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var ICONS = {
    monitor: "<svg viewBox='0 0 32 32'><rect x='4' y='6' width='24' height='16' fill='#c0c0c0' stroke='#000'/><rect x='6' y='8' width='20' height='12' fill='#008080'/><rect x='13' y='23' width='6' height='3' fill='#c0c0c0' stroke='#000'/><rect x='9' y='26' width='14' height='2' fill='#808080' stroke='#000'/></svg>",
    person:  "<svg viewBox='0 0 32 32'><circle cx='16' cy='12' r='6' fill='#ffd9a8' stroke='#000'/><path d='M5 29 C5 20 11 18 16 18 C21 18 27 20 27 29 Z' fill='#3a6ea5' stroke='#000'/></svg>",
    folder:  "<svg viewBox='0 0 32 32'><path d='M4 9 h8 l3 3 h13 v14 h-24 z' fill='#f6d55c' stroke='#000'/><path d='M4 12 h24' stroke='#000' fill='none'/></svg>",
    tube:    "<svg viewBox='0 0 32 32'><rect x='4' y='8' width='24' height='16' rx='4' fill='#cc0000' stroke='#000'/><path d='M14 13 L14 19 L20 16 Z' fill='#fff'/></svg>",
    mail:    "<svg viewBox='0 0 32 32'><rect x='4' y='9' width='24' height='15' fill='#fff' stroke='#000'/><path d='M4 9 L16 18 L28 9' fill='none' stroke='#000'/></svg>",
    display: "<svg viewBox='0 0 32 32'><rect x='4' y='6' width='24' height='16' fill='#c0c0c0' stroke='#000'/><rect x='6' y='8' width='7' height='12' fill='#e84393'/><rect x='13' y='8' width='6' height='12' fill='#5a7edc'/><rect x='19' y='8' width='7' height='12' fill='#f6d55c'/><rect x='13' y='23' width='6' height='3' fill='#c0c0c0' stroke='#000'/><rect x='9' y='26' width='14' height='2' fill='#808080' stroke='#000'/></svg>",
    ie:      "<svg viewBox='0 0 32 32'><circle cx='16' cy='16' r='12' fill='#2b6fd6' stroke='#000'/><ellipse cx='16' cy='16' rx='13' ry='5' fill='none' stroke='#f4c020' stroke-width='2' transform='rotate(-20 16 16)'/><text x='16' y='21' font-size='13' font-family='Georgia' font-style='italic' fill='#fff' text-anchor='middle'>e</text></svg>",
    power:   "<svg viewBox='0 0 32 32'><circle cx='16' cy='17' r='10' fill='#c0c0c0' stroke='#000'/><rect x='15' y='6' width='2' height='11' fill='#000'/></svg>"
  };

  var APPS = [
    { id: "home",     label: "Home",     href: "index.html",    icon: "monitor" },
    { id: "about",    label: "About Me", href: "about.html",    icon: "person"  },
    { id: "work",     label: "My Work",  href: "work.html",     icon: "folder"  },
    { id: "videos",   label: "My Videos",href: "videos.html",   icon: "tube"    },
    { id: "settings", label: "Display",  href: "settings.html", icon: "display" },
    { id: "contact",  label: "Contact",  href: "contact.html",  icon: "mail"    }
  ];

  /* ---------- storage ---------- */
  function save(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function read(k)    { try { return localStorage.getItem(k); } catch (e) { return null; } }

  /* ---------- theme / wallpaper API ---------- */
  function findWall(key) { for (var i = 0; i < WALLPAPERS.length; i++) if (WALLPAPERS[i].key === key) return WALLPAPERS[i]; return WALLPAPERS[0]; }
  function applyTheme(key) { document.documentElement.setAttribute("data-theme", key); }
  function applyWallpaperSrc(src) { document.documentElement.style.setProperty("--wallpaper-img", src ? ('url("' + src + '")') : "none"); }
  function setTheme(key) { applyTheme(key); save("nentbu-theme", key); }
  function setWallpaper(key) { var w = findWall(key); applyWallpaperSrc(w.src); save("nentbu-wallpaper", key); save("nentbu-wallpaper-src", w.src || ""); }
  function getTheme() { return document.documentElement.getAttribute("data-theme") || "teal"; }
  function getWallpaperKey() { return read("nentbu-wallpaper") || "none"; }
  window.OS = { setTheme: setTheme, setWallpaper: setWallpaper, getTheme: getTheme, getWallpaperKey: getWallpaperKey, THEMES: THEMES, WALLPAPERS: WALLPAPERS, VIDEOS: VIDEOS };

  function el(html) { var d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstChild; }

  /* ---------- desktop icons ---------- */
  function buildIcons(page) {
    var screen = document.querySelector(".screen");
    if (!screen) return;
    var nav = document.createElement("nav");
    nav.className = "desktop-icons";
    nav.setAttribute("aria-label", "Desktop shortcuts");
    APPS.forEach(function (a) {
      var active = a.id === page ? " active" : "";
      var cur = a.id === page ? ' aria-current="page"' : "";
      nav.appendChild(el('<a class="desktop-icon' + active + '" href="' + a.href + '"' + cur + '>' + ICONS[a.icon] + '<span>' + a.label.replace(/ /g, "&nbsp;") + '</span></a>'));
    });
    screen.insertBefore(nav, screen.firstChild);
  }

  /* ---------- taskbar ---------- */
  function buildTaskbar(page) {
    var app = null; APPS.forEach(function (a) { if (a.id === page) app = a; });
    var title = document.body.getAttribute("data-win-title") || (app ? app.label : "");
    var icon = app ? ICONS[app.icon] : ICONS.monitor;
    var href = app ? app.href : "index.html";
    var bar = el(
      '<div class="taskbar">' +
        '<button class="start-btn" aria-expanded="false" aria-haspopup="true">' +
          "<span class='logo'><svg viewBox='0 0 18 18'><rect x='1' y='1' width='7' height='7' fill='#ff3e9a'/><rect x='10' y='1' width='7' height='7' fill='#35c2e6'/><rect x='1' y='10' width='7' height='7' fill='#f6d55c'/><rect x='10' y='10' width='7' height='7' fill='#4caf50'/></svg></span> Start" +
        "</button>" +
        '<div class="task-btns"><a class="task-btn active" href="' + href + '">' + icon + '<span class="lbl">' + title + "</span></a></div>" +
        '<div class="tray"><span class="clock">--:--</span></div>' +
      "</div>"
    );
    document.body.appendChild(bar);
  }

  /* ---------- start menu ---------- */
  function buildStartMenu() {
    var items = "";
    APPS.forEach(function (a) { items += '<li><a href="' + a.href + '">' + ICONS[a.icon] + " " + a.label + "</a></li>"; });
    var menu = el(
      '<div class="start-menu" hidden>' +
        '<div class="spine"><b>' + OS_NAME + "</b></div>" +
        "<ul>" + items +
          '<div class="sep"></div>' +
          "<li><button data-shutdown>" + ICONS.power + " Shut Down&hellip;</button></li>" +
        "</ul>" +
      "</div>"
    );
    document.body.appendChild(menu);
  }

  function buildShutdown() {
    if (document.querySelector(".shutdown")) return;
    document.body.appendChild(el('<div class="shutdown" hidden><div>It\'s now safe to turn off NENTBU OS.<small>Click anywhere to come back.</small></div></div>'));
  }

  /* ---------- ads ---------- */
  function adMedia(cfg) {
    var a = document.createElement("a");
    a.href = cfg.href || "#"; a.className = "ad-media"; a.target = "_blank"; a.rel = "noopener";
    var img = new Image();
    img.src = cfg.src; img.alt = cfg.alt || "Advertisement"; img.width = cfg.w; img.height = cfg.h;
    img.onerror = function () {
      var ph = document.createElement("div");
      ph.className = "ad-placeholder";
      ph.style.width = cfg.w + "px"; ph.style.height = cfg.h + "px";
      ph.textContent = "Your ad here — " + cfg.w + "×" + cfg.h + "  (" + cfg.src + ")";
      if (a.contains(img)) a.replaceChild(ph, img);
    };
    a.appendChild(img);
    return a;
  }
  function buildAds() {
    var mount = document.querySelector(".ie-content .doc");
    if (mount && ADS.banner) {
      var b = document.createElement("div"); b.className = "ad-banner";
      var x = document.createElement("button"); x.className = "ad-close"; x.setAttribute("aria-label", "Close ad"); x.innerHTML = "&#10005;";
      x.addEventListener("click", function () { b.remove(); });
      b.appendChild(x); b.appendChild(adMedia(ADS.banner));
      mount.insertBefore(b, mount.firstChild);
    }
    if (ADS.popup) {
      var show = function () {
        var p = el('<div class="ad-popup"><div class="title-bar"><div class="title-bar-text">Advertisement</div><div class="title-bar-controls"><button class="ad-x" aria-label="Close"><span class="g-close">&#10005;</span></button></div></div><div class="body"></div></div>');
        p.querySelector(".body").appendChild(adMedia(ADS.popup));
        p.querySelector(".ad-x").addEventListener("click", function () { p.remove(); });
        document.body.appendChild(p);
      };
      if (reduce) show(); else setTimeout(show, 1300);
    }
  }

  /* ---------- NENTBU TUBE ---------- */
  function isPlaceholder(id) { return !id || id.indexOf("VIDEO_ID") === 0; }
  function buildTube() {
    var mount = document.getElementById("tube-mount");
    if (!mount) return;
    var player = el(
      '<div class="tube-player"><div class="tube-ph"><div class="big-play"></div><div>Select a video below to play it here.<br><small>(Add real YouTube IDs in script.js to load your uploads.)</small></div></div></div>'
    );
    var meta = el('<div class="tube-meta"><h2 id="tube-title">Your uploads</h2><div class="stats" id="tube-stats">' + VIDEOS.length + " videos</div></div>");
    var shelf = el('<div class="tube-shelf">Uploads</div>');
    var grid = document.createElement("div"); grid.className = "tube-grid";

    function loadVideo(v) {
      player.innerHTML = "";
      if (isPlaceholder(v.id)) {
        player.appendChild(el('<div class="tube-ph"><div class="big-play"></div><div>This is a placeholder.<br><small>Replace "' + v.id + '" in script.js with a real YouTube ID.</small></div></div>'));
      } else {
        var f = document.createElement("iframe");
        f.src = "https://www.youtube-nocookie.com/embed/" + v.id + "?rel=0&autoplay=1";
        f.title = v.title; f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        f.setAttribute("allowfullscreen", "");
        player.appendChild(f);
      }
      document.getElementById("tube-title").textContent = v.title;
      document.getElementById("tube-stats").textContent = v.views + " · " + v.ago;
    }

    VIDEOS.forEach(function (v) {
      var thumbInner;
      if (isPlaceholder(v.id)) {
        thumbInner = '<div class="play-s"></div>';
      } else {
        thumbInner = '<img src="https://img.youtube.com/vi/' + v.id + '/hqdefault.jpg" alt="" onerror="this.style.display=\'none\'"><div class="play-s"></div>';
      }
      var card = el('<div class="tube-card" tabindex="0" role="button"><div class="tube-thumb">' + thumbInner + '<span class="dur">' + v.dur + '</span></div><h4>' + v.title + "</h4><small>" + v.views + " · " + v.ago + "</small></div>");
      card.addEventListener("click", function () { loadVideo(v); });
      card.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); loadVideo(v); } });
      grid.appendChild(card);
    });

    mount.appendChild(player); mount.appendChild(meta); mount.appendChild(shelf); mount.appendChild(grid);
  }

  /* ---------- DISPLAY PROPERTIES ---------- */
  function buildSettings() {
    var mount = document.getElementById("settings-mount");
    if (!mount) return;
    var pendingTheme = getTheme();
    var pendingWall = getWallpaperKey();

    var monitor = el('<div class="dp-monitor"><div class="dp-screen"><div class="mini-title"></div><div class="mini-win"></div></div></div>');
    function refreshPreview() {
      monitor.setAttribute("data-theme", pendingTheme);
      var w = findWall(pendingWall);
      monitor.querySelector(".dp-screen").style.setProperty("--wallpaper-img", w.src ? ('url("' + w.src + '")') : "none");
    }

    /* tabs */
    var tabs = el('<div class="dp-tabs"><button class="dp-tab active" data-tab="bg">Background</button><button class="dp-tab" data-tab="ap">Appearance</button></div>');

    /* background panel */
    var swatches = "";
    WALLPAPERS.forEach(function (w) {
      var sel = w.key === pendingWall ? " sel" : "";
      var bg = w.src ? "background-image:url('" + w.src + "')" : "";
      swatches += '<button class="dp-swatch' + sel + '" data-wall="' + w.key + '"><div class="thumb" style="' + bg + '">' + (w.src ? "" : "no image") + '</div>' + w.name + "</button>";
    });
    var bgPanel = el('<div class="dp-panel" data-panel="bg"><div class="dp-two"><div><span class="panel-label">Wallpaper</span><div class="dp-swatches">' + swatches + '</div><p style="font-size:12px;color:#444;margin-top:10px;">Upload your images to a <b>wallpapers</b> folder to fill these in.</p></div><div><span class="panel-label">Preview</span></div></div></div>');
    bgPanel.querySelector(".dp-two > div:last-child").appendChild(monitor);

    /* appearance panel */
    var themeBtns = "";
    THEMES.forEach(function (t) { themeBtns += '<button data-theme-key="' + t.key + '"' + (t.key === pendingTheme ? ' class="sel"' : "") + ">" + t.name + "</button>"; });
    var apPanel = el('<div class="dp-panel" data-panel="ap" hidden><div class="dp-two"><div><span class="panel-label">Color scheme</span><div class="dp-list">' + themeBtns + '</div></div><div><span class="panel-label">Preview</span><div id="ap-preview-slot"></div></div></div></div>');

    /* actions */
    var actions = el('<div class="dp-actions"><button class="btn95 primary" data-act="ok">OK</button><button class="btn95" data-act="cancel">Cancel</button><button class="btn95" data-act="apply">Apply</button></div>');

    mount.appendChild(tabs); mount.appendChild(bgPanel); mount.appendChild(apPanel); mount.appendChild(actions);
    refreshPreview();

    /* tab switching (moves the single monitor preview between panels) */
    tabs.querySelectorAll(".dp-tab").forEach(function (t) {
      t.addEventListener("click", function () {
        tabs.querySelectorAll(".dp-tab").forEach(function (x) { x.classList.remove("active"); });
        t.classList.add("active");
        var which = t.getAttribute("data-tab");
        bgPanel.hidden = which !== "bg"; apPanel.hidden = which !== "ap";
        var slot = which === "bg" ? bgPanel.querySelector(".dp-two > div:last-child") : document.getElementById("ap-preview-slot");
        slot.appendChild(monitor);
      });
    });

    bgPanel.querySelectorAll(".dp-swatch").forEach(function (s) {
      s.addEventListener("click", function () {
        pendingWall = s.getAttribute("data-wall");
        bgPanel.querySelectorAll(".dp-swatch").forEach(function (x) { x.classList.remove("sel"); });
        s.classList.add("sel"); refreshPreview();
      });
    });
    apPanel.querySelectorAll("[data-theme-key]").forEach(function (b) {
      b.addEventListener("click", function () {
        pendingTheme = b.getAttribute("data-theme-key");
        apPanel.querySelectorAll("[data-theme-key]").forEach(function (x) { x.classList.remove("sel"); });
        b.classList.add("sel"); refreshPreview();
      });
    });
    actions.querySelectorAll("[data-act]").forEach(function (b) {
      b.addEventListener("click", function () {
        var act = b.getAttribute("data-act");
        if (act === "cancel") { window.location.href = "index.html"; return; }
        setTheme(pendingTheme); setWallpaper(pendingWall);
        if (act === "ok") window.location.href = "index.html";
      });
    });
  }

  /* ---------- clock ---------- */
  function tick() {
    var el2 = document.querySelector(".clock");
    if (!el2) return;
    var d = new Date(), h = d.getHours(), m = d.getMinutes(), ap = h >= 12 ? "PM" : "AM";
    h = h % 12; if (h === 0) h = 12;
    el2.textContent = h + ":" + (m < 10 ? "0" + m : m) + " " + ap;
  }

  /* ---------- start menu toggle ---------- */
  function wireStart() {
    var btn = document.querySelector(".start-btn"), menu = document.querySelector(".start-menu");
    if (!btn || !menu) return;
    function close() { menu.hidden = true; btn.setAttribute("aria-expanded", "false"); }
    btn.addEventListener("click", function (e) { e.stopPropagation(); var open = menu.hidden; menu.hidden = !open; btn.setAttribute("aria-expanded", String(open)); });
    document.addEventListener("click", function (e) { if (!menu.hidden && !menu.contains(e.target)) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }

  /* ---------- window controls + drag ---------- */
  function wireControls() {
    var win = document.querySelector(".window");
    document.querySelectorAll("[data-action]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (!win) return;
        var a = btn.getAttribute("data-action");
        if (a === "min") win.classList.toggle("rolled");
        else if (a === "max") win.classList.toggle("maximized");
        else if (a === "close") {
          if (btn.getAttribute("data-home") === "shutdown") { var s = document.querySelector(".shutdown"); if (s) s.hidden = false; }
          else window.location.href = "index.html";
        }
      });
    });
    var tb = document.querySelector(".title-bar");
    if (win && tb && window.matchMedia("(min-width: 761px)").matches) {
      var drag = false, sx = 0, sy = 0, ox = 0, oy = 0;
      tb.addEventListener("pointerdown", function (e) {
        if (e.target.closest(".title-bar-controls")) return;
        if (win.classList.contains("maximized")) return;
        drag = true; sx = e.clientX; sy = e.clientY; tb.setPointerCapture(e.pointerId);
      });
      tb.addEventListener("pointermove", function (e) {
        if (!drag) return;
        var nx = Math.max(-280, Math.min(280, ox + (e.clientX - sx)));
        var ny = Math.max(-40, Math.min(360, oy + (e.clientY - sy)));
        win.style.transform = "translate(" + nx + "px," + ny + "px)";
      });
      function end(e) { if (!drag) return; drag = false; ox = Math.max(-280, Math.min(280, ox + (e.clientX - sx))); oy = Math.max(-40, Math.min(360, oy + (e.clientY - sy))); }
      tb.addEventListener("pointerup", end); tb.addEventListener("pointercancel", end);
    }
  }

  function wireShutdown() {
    var item = document.querySelector("[data-shutdown]"), screen = document.querySelector(".shutdown");
    if (item && screen) item.addEventListener("click", function () { screen.hidden = false; });
    if (screen) screen.addEventListener("click", function () { screen.hidden = true; });
  }

  function handleBoot() {
    var boot = document.querySelector(".boot");
    if (!boot) return;
    if (reduce) { boot.hidden = true; return; }
    setTimeout(function () { boot.hidden = true; }, 1700);
  }

  /* ---------- init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    var page = document.body.getAttribute("data-page") || "";
    buildIcons(page);
    buildTaskbar(page);
    buildStartMenu();
    buildShutdown();
    if (document.body.getAttribute("data-ads")) buildAds();
    if (page === "videos") buildTube();
    if (page === "settings") buildSettings();
    tick(); setInterval(tick, 15000);
    wireStart(); wireControls(); wireShutdown(); handleBoot();
  });
})();
