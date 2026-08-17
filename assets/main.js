/* DOT Oracle Guide — site scripts: mobile menu, FAQ accordion, smooth scroll, cookie banner, forms, news filter */
(function () {
  'use strict';

  /* ---------- Mobile / navbar menu ---------- */
  function initNavMenu() {
    var nav = document.querySelector('nav[data-section="navbar"]');
    if (!nav) return;
    var toggle = nav.querySelector('.primary-button');
    var menu = document.getElementById('nav-menu');
    if (!toggle || !menu) return;

    toggle.setAttribute('role', 'button');
    toggle.setAttribute('tabindex', '0');
    toggle.setAttribute('aria-controls', 'nav-menu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Toggle navigation menu');

    var icon = toggle.querySelector('svg');

    function setOpen(open) {
      menu.classList.toggle('hidden', !open);
      menu.classList.toggle('flex', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (icon) {
        icon.classList.toggle('rotate-45', open);
        icon.classList.toggle('rotate-0', !open);
      }
    }

    function isOpen() {
      return !menu.classList.contains('hidden');
    }

    toggle.addEventListener('click', function () {
      setOpen(!isOpen());
    });
    toggle.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setOpen(!isOpen());
      }
    });

    // Close menu when a link inside it is clicked or when clicking outside
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('click', function (e) {
      if (isOpen() && !nav.contains(e.target)) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) setOpen(false);
    });
  }

  /* ---------- FAQ accordion ---------- */
  function initFaqAccordion() {
    var items = document.querySelectorAll('[data-faq-item]');
    items.forEach(function (item) {
      var toggle = item.querySelector('[data-faq-toggle]');
      var answer = item.querySelector('[data-faq-answer]');
      var icon = item.querySelector('svg');
      if (!toggle || !answer) return;

      toggle.setAttribute('aria-expanded', 'false');

      toggle.addEventListener('click', function () {
        var open = answer.classList.contains('hidden');
        // close others in the same group
        var group = item.parentElement;
        if (group) {
          group.querySelectorAll('[data-faq-item]').forEach(function (other) {
            if (other === item) return;
            var oa = other.querySelector('[data-faq-answer]');
            var ot = other.querySelector('[data-faq-toggle]');
            var oi = other.querySelector('svg');
            if (oa) oa.classList.add('hidden');
            if (ot) ot.setAttribute('aria-expanded', 'false');
            if (oi) oi.classList.remove('rotate-45');
          });
        }
        answer.classList.toggle('hidden', !open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (icon) icon.classList.toggle('rotate-45', open);
      });
    });
  }

  /* ---------- Smooth scrolling for in-page anchors ---------- */
  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;
      var id = link.getAttribute('href').slice(1);
      if (!id) return;
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      var offset = 90; // clear the fixed navbar
      var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
      history.pushState(null, '', '#' + id);
    });
  }

  /* ---------- Cookie consent banner ---------- */
  function initCookieBanner() {
    var banner = document.getElementById('cookie-banner');
    if (!banner) return;
    var decided = null;
    try {
      decided = window.localStorage.getItem('cookie-consent');
    } catch (err) {
      decided = null;
    }
    if (decided) return;

    banner.classList.remove('hidden');

    function decide(value) {
      try {
        window.localStorage.setItem('cookie-consent', value);
      } catch (err) { /* storage unavailable */ }
      banner.classList.add('hidden');
    }

    var accept = document.getElementById('cookie-accept');
    var decline = document.getElementById('cookie-decline');
    if (accept) accept.addEventListener('click', function () { decide('accepted'); });
    if (decline) decline.addEventListener('click', function () { decide('declined'); });
  }

  /* ---------- Forms (contact / subscribe): no backend, show confirmation ---------- */
  function initForms() {
    document.querySelectorAll('form[data-form]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }
        var note = form.querySelector('[data-form-status]');
        if (!note) {
          note = document.createElement('p');
          note.setAttribute('data-form-status', '');
          note.className = 'text-sm opacity-75 leading-relaxed mt-2';
          note.setAttribute('role', 'status');
          form.appendChild(note);
        }
        note.textContent =
          'Thank you. Your message has been recorded locally. Please also email us at ' +
          'editorial@dot-oracle.guide for a guaranteed response.';
        form.reset();
      });
    });
  }

  /* ---------- News filter ---------- */
  function initNewsFilter() {
    var buttons = document.querySelectorAll('[data-filter]');
    var cards = document.querySelectorAll('[data-category]');
    if (!buttons.length || !cards.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var value = btn.getAttribute('data-filter');
        buttons.forEach(function (b) {
          b.classList.toggle('primary-button', b === btn);
          b.classList.toggle('text-primary-cta-text', b === btn);
          b.classList.toggle('card', b !== btn);
          b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
        });
        cards.forEach(function (card) {
          var show = value === 'all' || card.getAttribute('data-category') === value;
          card.classList.toggle('hidden', !show);
        });
      });
    });
  }

  function init() {
    initNavMenu();
    initFaqAccordion();
    initSmoothScroll();
    initCookieBanner();
    initForms();
    initNewsFilter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
