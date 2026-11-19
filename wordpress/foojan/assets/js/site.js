(function () {
  var settings = window.fzSite || {};
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function on(target, type, handler, options) {
    if (target) target.addEventListener(type, handler, options);
  }

  function initHeader() {
    var header = document.querySelector("[data-fz-header]");
    if (!header) return;
    var toggle = header.querySelector("[data-fz-menu-toggle]");
    var mobile = header.querySelector("#site-menu");
    var groups = Array.prototype.slice.call(header.querySelectorAll("[data-fz-group]"));
    var mobileGroups = Array.prototype.slice.call(header.querySelectorAll("[data-fz-mobile-group]"));

    function setMenu(open) {
      if (!toggle || !mobile) return;
      mobile.hidden = !open;
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      toggle.querySelector("[data-fz-icon-open]").classList.toggle("hidden", open);
      toggle.querySelector("[data-fz-icon-close]").classList.toggle("hidden", !open);
    }

    function setGroup(group, open) {
      var dropdown = group.querySelector("[data-fz-dropdown]");
      var button = group.querySelector("[data-fz-group-toggle]");
      dropdown.classList.toggle("block", open);
      dropdown.classList.toggle("hidden", !open);
      button.setAttribute("aria-expanded", open ? "true" : "false");
    }

    function setMobileGroup(group, open) {
      var links = group.querySelector("[data-fz-mobile-links]");
      var button = group.querySelector("[data-fz-mobile-toggle]");
      if (!links || !button) return;
      links.hidden = !open;
      button.setAttribute("aria-expanded", open ? "true" : "false");
      var icon = button.querySelector("svg");
      if (icon) icon.classList.toggle("rotate-180", open);
    }

    function closeAll() {
      setMenu(false);
      groups.forEach(function (group) { setGroup(group, false); });
      mobileGroups.forEach(function (group) { setMobileGroup(group, false); });
      if (document.activeElement instanceof HTMLElement && header.contains(document.activeElement)) document.activeElement.blur();
    }

    on(toggle, "click", function () { setMenu(mobile.hidden); });

    groups.forEach(function (group) {
      on(group.querySelector("[data-fz-group-toggle]"), "click", function () {
        var open = group.querySelector("[data-fz-group-toggle]").getAttribute("aria-expanded") !== "true";
        groups.forEach(function (other) { setGroup(other, other === group ? open : false); });
      });
      on(group, "mouseenter", function () {
        groups.forEach(function (other) { if (other !== group) setGroup(other, false); });
      });
    });

    mobileGroups.forEach(function (group) {
      on(group.querySelector("[data-fz-mobile-toggle]"), "click", function () {
        var open = group.querySelector("[data-fz-mobile-toggle]").getAttribute("aria-expanded") !== "true";
        mobileGroups.forEach(function (other) { setMobileGroup(other, other === group ? open : false); });
      });
    });

    header.querySelectorAll("a").forEach(function (link) { on(link, "click", closeAll); });
    on(document, "pointerdown", function (event) { if (!header.contains(event.target)) closeAll(); });
    on(document, "keydown", function (event) { if (event.key === "Escape") closeAll(); });
  }

  function initLogo() {
    document.querySelectorAll("[data-fz-top]").forEach(function (link) {
      on(link, "click", function (event) {
        if (!settings.isHome) return;
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
        if (window.location.hash) window.history.replaceState(null, "", window.location.pathname + window.location.search);
      });
    });
  }

  function initReveal() {
    var items = document.querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (item) { item.classList.add("in"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    items.forEach(function (item) { observer.observe(item); });

    function showAll() {
      var root = document.documentElement;
      root.classList.add("fz-instant");
      document.querySelectorAll(".reveal:not(.in)").forEach(function (item) {
        item.classList.add("in");
        observer.unobserve(item);
      });
      window.setTimeout(function () { root.classList.remove("fz-instant"); }, 100);
    }

    function isSection(hash) {
      return hash.length > 1 && hash !== "#contact";
    }

    function scrollToHash(hash) {
      var target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return false;
      var root = document.documentElement;
      var offset = parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0;
      var start = window.scrollY;
      var distance = target.getBoundingClientRect().top + start - offset - start;
      var duration = reduceMotion ? 0 : Math.min(500, 200 + Math.abs(distance) / 25);
      var began = null;
      root.style.scrollBehavior = "auto";
      function frame(now) {
        if (began === null) began = now;
        var progress = duration ? Math.min(1, (now - began) / duration) : 1;
        window.scrollTo(0, start + distance * (1 - Math.pow(1 - progress, 3)));
        if (progress < 1) window.requestAnimationFrame(frame);
        else root.style.scrollBehavior = "";
      }
      window.requestAnimationFrame(frame);
      return true;
    }

    if (isSection(window.location.hash)) showAll();
    on(document, "click", function (event) {
      var link = event.target.closest ? event.target.closest("a[href]") : null;
      if (!link) return;
      var url = new URL(link.href, window.location.href);
      if (url.origin === window.location.origin && url.pathname === window.location.pathname && isSection(url.hash)) showAll();
    }, true);
    on(document, "click", function (event) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      var link = event.target.closest ? event.target.closest("a[href]") : null;
      if (!link || link.target === "_blank") return;
      var url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !isSection(url.hash)) return;
      if (!scrollToHash(url.hash)) return;
      event.preventDefault();
      window.history.pushState(null, "", url.hash);
    });
  }

  function initCarousels() {
    document.querySelectorAll("[data-fz-carousel]").forEach(function (carousel) {
      var track = carousel.querySelector("[data-fz-track]");
      var dots = Array.prototype.slice.call(carousel.querySelectorAll("[data-fz-dot]"));
      if (!track || !dots.length) return;

      function step() {
        var card = track.firstElementChild;
        if (!card) return 0;
        return card.offsetWidth + (parseFloat(getComputedStyle(track).columnGap) || 0);
      }

      function setActive(index) {
        dots.forEach(function (dot, i) {
          var bar = dot.firstElementChild;
          var active = i === index;
          if (active) dot.setAttribute("aria-current", "true");
          else dot.removeAttribute("aria-current");
          bar.classList.toggle("w-10", active);
          bar.classList.toggle("bg-[#13294F]", active);
          bar.classList.toggle("w-1.5", !active);
          bar.classList.toggle("bg-[#C9C3CA]", !active);
        });
      }

      on(track, "scroll", function () {
        var size = step();
        if (!size) return;
        var last = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
        setActive(last ? dots.length - 1 : Math.round(track.scrollLeft / size));
      }, { passive: true });

      dots.forEach(function (dot, index) {
        on(dot, "click", function () { track.scrollTo({ left: index * step(), behavior: "smooth" }); });
      });
    });
  }

  function initInvite() {
    var modal = document.querySelector("[data-fz-invite]");
    if (!modal) return;
    var form = modal.querySelector("[data-fz-invite-form]");
    var done = modal.querySelector("[data-fz-invite-done]");
    var doneMessage = modal.querySelector("[data-fz-invite-message]");
    var error = modal.querySelector("[data-fz-invite-error]");
    var submit = modal.querySelector("[data-fz-invite-submit]");
    var submitLabel = modal.querySelector("[data-fz-submit-label]");
    var closeButton = modal.querySelector("[data-fz-invite-close]");
    var date = modal.querySelector("[data-fz-date]");
    var datePlaceholder = modal.querySelector("[data-fz-date-placeholder]");
    var dateClear = modal.querySelector("[data-fz-date-clear]");
    var startedAt = 0;

    function syncDate() {
      var has = Boolean(date.value);
      date.classList.toggle("fz-date-empty", !has);
      datePlaceholder.hidden = has;
      dateClear.hidden = !has;
    }

    function show() {
      startedAt = Date.now();
      modal.hidden = false;
      document.documentElement.classList.add("fz-locked");
      closeButton.focus();
    }

    function close() {
      modal.hidden = true;
      document.documentElement.classList.remove("fz-locked");
      if (window.location.hash === "#contact") window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    on(document, "click", function (event) {
      var link = event.target.closest && event.target.closest("a");
      if (!link || !link.href) return;
      var url = new URL(link.href, window.location.href);
      if (url.hash !== "#contact" || url.origin !== window.location.origin) return;
      event.preventDefault();
      show();
    });
    on(document, "keydown", function (event) { if (event.key === "Escape" && !modal.hidden) close(); });
    on(modal, "click", function (event) { if (event.target === modal) close(); });
    on(closeButton, "click", close);
    on(date, "change", syncDate);
    on(date, "input", syncDate);
    on(dateClear, "click", function () { date.value = ""; syncDate(); });

    on(form, "submit", function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;
      var data = new FormData(form);
      var payload = { started_at: startedAt };
      ["name", "email", "phone", "organization", "date", "details", "website"].forEach(function (key) {
        payload[key] = String(data.get(key) || "");
      });
      submit.disabled = true;
      submitLabel.textContent = "Sending…";
      error.hidden = true;
      fetch(settings.inquiryUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(function (response) {
          return response.json().catch(function () { return {}; }).then(function (body) {
            if (!response.ok) throw new Error(body.message || "Your inquiry could not be sent. Please try again.");
            return body;
          });
        })
        .then(function (body) {
          doneMessage.textContent = body.message || "Thank you. Your message has been sent.";
          form.hidden = true;
          done.hidden = false;
        })
        .catch(function (err) {
          error.textContent = err.message || "Your inquiry could not be sent. Please try again.";
          error.hidden = false;
        })
        .finally(function () {
          submit.disabled = false;
          submitLabel.textContent = submitLabel.getAttribute("data-label");
        });
    });

    if (window.location.hash === "#contact") show();
  }

  function initScrollTop() {
    var button = document.querySelector("[data-fz-scroll-top]");
    if (!button) return;
    function update() {
      var visible = window.scrollY > 600;
      button.classList.toggle("opacity-0", !visible);
      button.classList.toggle("translate-y-3", !visible);
      button.classList.toggle("pointer-events-none", !visible);
      button.tabIndex = visible ? 0 : -1;
      button.setAttribute("aria-hidden", visible ? "false" : "true");
    }
    update();
    on(window, "scroll", update, { passive: true });
    on(button, "click", function () { window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); });
  }

  function initLibrary() {
    document.querySelectorAll("[data-fz-library]").forEach(function (root) {
      var items = [].slice.call(root.querySelectorAll("[data-fz-item]"));
      var buttons = [].slice.call(root.querySelectorAll("[data-fz-topic]"));
      var search = root.querySelector("[data-fz-search]");
      var count = root.querySelector("[data-fz-count]");
      var empty = root.querySelector("[data-fz-empty]");
      var topic = "";
      function apply() {
        var query = search ? search.value.trim().toLowerCase() : "";
        var shown = 0;
        items.forEach(function (item) {
          var match = (topic === "" || item.getAttribute("data-topic") === topic) && item.textContent.toLowerCase().indexOf(query) > -1;
          item.hidden = !match;
          if (match) {
            shown++;
            var num = item.querySelector("[data-fz-num]");
            if (num) num.textContent = (shown < 10 ? "0" : "") + shown;
          }
        });
        var noun = root.getAttribute("data-fz-noun") || "results";
        if (count) count.textContent = shown + " " + (shown === 1 ? noun.replace(/s$/, "") : noun) + " found";
        if (empty) empty.hidden = shown !== 0;
      }
      buttons.forEach(function (button) {
        on(button, "click", function () {
          topic = button.getAttribute("data-fz-topic");
          buttons.forEach(function (other) { other.setAttribute("aria-pressed", String(other === button)); });
          apply();
        });
      });
      if (search) on(search, "input", apply);
      apply();
    });
  }

  function init() {
    initHeader();
    initLogo();
    initReveal();
    initCarousels();
    initInvite();
    initLibrary();
    initScrollTop();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
