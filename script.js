/* ============================================================
   Shared behaviour for the Win95 portfolio (linked by every page)
   ============================================================ */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- taskbar clock ---- */
  function tick() {
    var el = document.querySelector(".clock");
    if (!el) return;
    var d = new Date();
    var h = d.getHours(), m = d.getMinutes();
    var ap = h >= 12 ? "PM" : "AM";
    h = h % 12; if (h === 0) h = 12;
    el.textContent = h + ":" + (m < 10 ? "0" + m : m) + " " + ap;
  }
  tick();
  setInterval(tick, 1000 * 15);

  /* ---- Start menu ---- */
  var startBtn = document.querySelector(".start-btn");
  var startMenu = document.querySelector(".start-menu");
  function closeStart() {
    if (!startMenu) return;
    startMenu.hidden = true;
    if (startBtn) startBtn.setAttribute("aria-expanded", "false");
  }
  if (startBtn && startMenu) {
    startBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = startMenu.hidden;
      startMenu.hidden = !open;
      startBtn.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("click", function (e) {
      if (!startMenu.hidden && !startMenu.contains(e.target)) closeStart();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeStart();
    });
  }

  /* ---- window controls: minimize (roll up), maximize, close ---- */
  var win = document.querySelector(".window");
  document.querySelectorAll("[data-action]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var a = btn.getAttribute("data-action");
      if (!win) return;
      if (a === "min") win.classList.toggle("rolled");
      else if (a === "max") win.classList.toggle("maximized");
      else if (a === "close") {
        var home = btn.getAttribute("data-home");
        if (home === "shutdown") showShutdown();
        else window.location.href = "index.html";
      }
    });
  });

  /* ---- draggable window (pointer, desktop only) ---- */
  var titleBar = document.querySelector(".title-bar");
  if (win && titleBar && window.matchMedia("(min-width: 721px)").matches) {
    var dragging = false, sx = 0, sy = 0, ox = 0, oy = 0;
    titleBar.addEventListener("pointerdown", function (e) {
      if (e.target.closest(".title-bar-controls")) return;
      if (win.classList.contains("maximized")) return;
      dragging = true;
      sx = e.clientX; sy = e.clientY;
      titleBar.setPointerCapture(e.pointerId);
    });
    titleBar.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      var nx = ox + (e.clientX - sx);
      var ny = oy + (e.clientY - sy);
      // keep it loosely on-screen
      nx = Math.max(-260, Math.min(260, nx));
      ny = Math.max(-40, Math.min(360, ny));
      win.style.transform = "translate(" + nx + "px," + ny + "px)";
    });
    function endDrag(e) {
      if (!dragging) return;
      dragging = false;
      ox += (e.clientX - sx); oy += (e.clientY - sy);
      ox = Math.max(-260, Math.min(260, ox));
      oy = Math.max(-40, Math.min(360, oy));
    }
    titleBar.addEventListener("pointerup", endDrag);
    titleBar.addEventListener("pointercancel", endDrag);
  }

  /* ---- shutdown easter egg ---- */
  function showShutdown() {
    var s = document.querySelector(".shutdown");
    if (s) { s.hidden = false; closeStart(); }
  }
  var shutItem = document.querySelector("[data-shutdown]");
  if (shutItem) shutItem.addEventListener("click", showShutdown);
  var shutScreen = document.querySelector(".shutdown");
  if (shutScreen) shutScreen.addEventListener("click", function () { shutScreen.hidden = true; });

  /* ---- boot splash (only where .boot exists = index) ---- */
  var boot = document.querySelector(".boot");
  if (boot) {
    if (reduce) {
      boot.hidden = true;
    } else {
      window.setTimeout(function () { boot.hidden = true; }, 1700);
    }
  }
})();
