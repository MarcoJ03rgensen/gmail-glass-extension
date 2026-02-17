// Gmail Glass - Content Script
// Detects Gmail UI elements by structure/attributes and applies glass classes.
// Runs periodically because Gmail dynamically loads its UI.
(function () {
  'use strict';

  const MARKER = 'data-gg-styled';
  let scanCount = 0;

  // ─── Helpers ───────────────────────────────────────────────
  function mark(el, cls) {
    if (!el) return;
    // skip marking if an ancestor already carries this class (avoid nested duplicates)
    try {
      if (el.parentElement && el.parentElement.closest('.' + cls)) return;
    } catch (err) {
      /* ignore */
    }

    // add the class if it's not present
    if (!el.classList.contains(cls)) el.classList.add(cls);

    // keep a marker attribute with all assigned classes (helps avoid duplicate work)
    const prev = el.getAttribute(MARKER);
    if (prev) {
      const parts = prev.split(' ');
      if (!parts.includes(cls)) parts.push(cls);
      el.setAttribute(MARKER, parts.join(' '));
    } else {
      el.setAttribute(MARKER, cls);
    }
  }

  function clearBg(el) {
    if (!el || el.tagName === 'IMG' || el.tagName === 'svg') return;
    el.style.setProperty('background-color', 'transparent', 'important');
    el.style.setProperty('background-image', 'none', 'important');
  }

  // Detect avatar vs icon images and tag them so CSS can treat them differently.
  function markImages() {
    try {
      document.querySelectorAll('img').forEach(img => {
        if (!img) return;
        // already tagged as avatar — skip
        if (img.hasAttribute(MARKER) && img.getAttribute(MARKER).includes('gg-avatar')) return;

        const rect = img.getBoundingClientRect ? img.getBoundingClientRect() : { width: img.naturalWidth || 0, height: img.naturalHeight || 0 };
        const w = Math.round(rect.width) || img.naturalWidth || 0;
        const h = Math.round(rect.height) || img.naturalHeight || 0;
        const maxDim = Math.max(w, h);

        // Do NOT treat photographic profile images as icons (check for nearby avatar wrappers)
        if (img.closest('.gb_xa, .gb_ua, [aria-label*="Account"], [data-tooltip*="Profile"]')) {
          mark(img, 'gg-avatar');
          const wrap = img.closest('div, a, span, td, li');
          if (wrap) mark(wrap, 'gg-avatar-wrap');
          return;
        }

        // Treat as avatar if it's reasonably large
        if (maxDim >= 28) {
          mark(img, 'gg-avatar');
          const wrap = img.closest('div, a, span, td, li');
          if (wrap) mark(wrap, 'gg-avatar-wrap');
          return;
        }

        // Small images/icons — treat as icon image
        if (maxDim > 0 && maxDim <= 28) {
          // avoid tagging if inside an avatar wrapper
          if (img.closest('.gg-avatar-wrap')) return;
          mark(img, 'gg-icon-img');
        }
      });
    } catch (e) {
      /* ignore */
    }
  }

  // ─── Nuclear transparency ─────────────────────────────────
  // Walk from body down through wrapper divs and force transparent
  function nukeBg() {
    let el = document.body;
    if (!el) return;
    clearBg(el);

    // Gmail typically nests 5-8 layers of wrapper divs
    for (let i = 0; i < 12; i++) {
      const children = el.children;
      if (!children || children.length === 0) break;

      for (const child of children) {
        if (child.tagName === 'DIV' || child.tagName === 'TABLE' || child.tagName === 'TBODY' || child.tagName === 'TR' || child.tagName === 'TD') {
          clearBg(child);
        }
      }
      // Follow the first block-level child
      el = children[0];
      if (el && (el.tagName === 'DIV' || el.tagName === 'TABLE')) {
        clearBg(el);
      } else {
        break;
      }
    }

    // Also nuke any element with inline background white/grey
    document.querySelectorAll('[style]').forEach(node => {
      const bg = node.style.backgroundColor || '';
      const bgImg = node.style.backgroundImage || '';
      if (bg && !bg.includes('transparent') && !bg.includes('rgba(0') && !node.hasAttribute(MARKER)) {
        // Check if it's a white/light background
        if (bg.includes('rgb(255') || bg.includes('rgb(248') || bg.includes('rgb(242') ||
            bg.includes('rgb(241') || bg.includes('rgb(244') || bg.includes('rgb(245') ||
            bg.includes('rgb(246') || bg.includes('rgb(247') || bg.includes('rgb(249') ||
            bg.includes('rgb(250') || bg.includes('rgb(251') || bg.includes('rgb(252') ||
            bg.includes('rgb(253') || bg.includes('rgb(254') || bg.includes('#fff') ||
            bg.includes('white') || bg.includes('rgb(232') || bg.includes('rgb(230')) {
          clearBg(node);
        }
      }
    });
  }

  // Fallback scanner for narrow / alternative left column layouts.
  // Finds the left-most column by bounding rect and marks its clickable
  // children as `.gg-nav-item` so the sidebar looks consistent on all sizes.
  function scanLeftSidebarFallback() {
    try {
      const candidates = Array.from(document.querySelectorAll('div, aside, nav'));
      const leftCol = candidates.find(el => {
        const r = el.getBoundingClientRect();
        return r && r.left >= 0 && r.left < 120 && r.width > 100 && r.width < 420 && r.height > 200;
      });
      if (!leftCol) return;

      mark(leftCol, 'gg-sidebar');
      clearBg(leftCol);

      const childCandidates = Array.from(leftCol.querySelectorAll('a, div, li, button, [role="button"], [role="treeitem"]'));
      childCandidates.forEach(el => {
        if (el.hasAttribute && el.hasAttribute(MARKER)) return;
        const text = (el.innerText || '').trim();
        const rect = el.getBoundingClientRect ? el.getBoundingClientRect() : null;
        if (!text || !rect || rect.height < 18 || rect.width < 40) return;

        const clickable = el.closest('a, button, [role="button"], [role="treeitem"]') || el;
        if (clickable && !clickable.hasAttribute(MARKER)) {
          mark(clickable, 'gg-nav-item');
          clearBg(clickable);
          const isActive = clickable.matches('.aiq, .nZ, [aria-selected="true"], [aria-current="page"]') || clickable.querySelector('[aria-selected="true"]');
          if (isActive) clickable.classList.add('gg-nav-active');
        }
      });

      // Remove inner backgrounds/borders so only the outer nav pill shows
      leftCol.querySelectorAll('*').forEach(ch => {
        if (ch === leftCol) return;
        ch.style && ch.style.setProperty('background', 'transparent', 'important');
        ch.style && ch.style.setProperty('border', 'none', 'important');
        ch.style && ch.style.setProperty('box-shadow', 'none', 'important');
      });
    } catch (e) {
      /* ignore */
    }
  }

  // ─── Detect & tag Gmail elements ──────────────────────────
  function scan() {
    scanCount++;

    // --- Top bar (Google header) ---
    const topbar = document.querySelector('header') ||
                   document.querySelector('[role="banner"]') ||
                   document.querySelector('.gb_Td') ||
                   document.querySelector('.gb_Fd') ||
                   document.querySelector('.gb_0d');
    if (topbar) {
      mark(topbar, 'gg-topbar');
      clearBg(topbar);
    }

    // --- Search bar ---
    const search = document.querySelector('[role="search"]') ||
                   document.querySelector('form[action*="search"]') ||
                   document.querySelector('input[aria-label*="earch"]');
    if (search) {
      const searchContainer = search.closest('form') || search.closest('[role="search"]') || search.parentElement;
      if (searchContainer) mark(searchContainer, 'gg-search');
    }

    // --- Compose button ---
    // Gmail compose button: look for the text "Compose" / "Skriv" or the pencil icon div
    const composeSelectors = [
      '.T-I.T-I-KE.L3',
      '[gh="cm"]',
      '[aria-label*="ompose"]',  // Compose in English
      '[aria-label*="kriv"]',    // Skriv in Danish
      '[aria-label*="skriv"]',
    ];
    for (const sel of composeSelectors) {
      const btn = document.querySelector(sel);
      if (btn) { mark(btn, 'gg-compose'); mark(btn, 'gg-primary-btn'); break; }
    }

    // --- Sidebar / left navigation ---
    const sidebarSelectors = [
      '[role="navigation"]',
      '.bkL',
      '.ain',
      '.aeN',
      '.ajl',
    ];
    for (const sel of sidebarSelectors) {
      document.querySelectorAll(sel).forEach(el => {
        mark(el, 'gg-sidebar');
        clearBg(el);
        // Also clear all child backgrounds
        el.querySelectorAll('div, span, table, td, tr, tbody').forEach(clearBg);
      });
    }

    // --- Nav items within sidebar ---
    const navItemSelectors = [
      '.TN',
      '.TO',
      '[role="navigation"] a',
      '[role="navigation"] [role="treeitem"]',
      '[role="navigation"] [data-tooltip]',
    ];
    for (const sel of navItemSelectors) {
      document.querySelectorAll(sel).forEach(el => {
        mark(el, 'gg-nav-item');
        // Check if it's the active item
        if (el.matches('.aiq, .nZ, [aria-selected="true"], [aria-current="page"]') ||
            el.classList.contains('aiq') || el.classList.contains('nZ')) {
          el.classList.add('gg-nav-active');
        }
      });
    }

    // Mark label chips / small pills so they visually differ from buttons
    document.querySelectorAll('.ar.as, .at').forEach(chip => {
      mark(chip, 'gg-chip');
    });

    // --- Main content area ---
    const mainSelectors = [
      '[role="main"]',
      '.AO',
      '.ae4',
      '.bkK',
    ];
    for (const sel of mainSelectors) {
      document.querySelectorAll(sel).forEach(el => {
        mark(el, 'gg-main');
        clearBg(el);
        // Clear intermediate wrappers inside main
        el.querySelectorAll(':scope > div, :scope > div > div').forEach(clearBg);
      });
    }

    // --- Email rows ---
    const rowSelectors = [
      'tr.zA',
      '.zA',
      '[role="main"] table tr[draggable]',
      '[role="main"] tr[role="row"]',
    ];
    for (const sel of rowSelectors) {
      document.querySelectorAll(sel).forEach(el => {
        mark(el, 'gg-row');
      });
    }

    // --- Toolbar ---
    const toolbarSelectors = [
      '[role="toolbar"]',
      '.G-atb',
      '.aqJ',
    ];
    for (const sel of toolbarSelectors) {
      document.querySelectorAll(sel).forEach(el => {
        mark(el, 'gg-toolbar');
        clearBg(el);
      });
    }

    // --- Buttons inside toolbars / action buttons ---
    document.querySelectorAll('[role="toolbar"], .gg-toolbar').forEach(toolbar => {
      toolbar.querySelectorAll('button, [role="button"], .T-I, .G-Ni, .aqJ, [data-tooltip]').forEach(btn => {
        const txt = (btn.innerText || '').trim();
        if (txt && txt.length > 1) {
          mark(btn, 'gg-secondary-btn');
        } else {
          mark(btn, 'gg-icon-btn');
        }
        if (btn.hasAttribute('aria-pressed')) mark(btn, 'gg-toggle-btn');
      });
    });


    // Global button styling for action buttons outside toolbars
    document.querySelectorAll('button, [role="button"], input[type="button"], input[type="submit"]').forEach(btn => {
      if (!btn || btn.closest('[role="toolbar"], .gg-toolbar')) return; // already handled above
      const txt = (btn.innerText || btn.value || '').trim();
      if (txt && txt.length > 1) mark(btn, 'gg-secondary-btn'); else mark(btn, 'gg-icon-btn');
      if (btn.hasAttribute('aria-pressed')) mark(btn, 'gg-toggle-btn');
    });

    // Ensure avatars/icons are tagged so we don't invert photographic images
    markImages();

    // --- Reading pane ---
    const readingSelectors = [
      '.adn',
      '.gs',
      '.a3s',
      '[role="main"] .nH.if',
    ];
    for (const sel of readingSelectors) {
      document.querySelectorAll(sel).forEach(el => {
        mark(el, 'gg-reading-pane');
      });
    }

    // --- Compose window (popup) ---
    const composeWindowSelectors = [
      '.aDh',
      '.M9',
      '.aoP',
      '[role="dialog"][aria-label*="ompose"]',
      '[role="dialog"][aria-label*="kriv"]',
    ];
    for (const sel of composeWindowSelectors) {
      document.querySelectorAll(sel).forEach(el => {
        mark(el, 'gg-compose-window');
      });
    }

    // --- Send button in compose ---
    const sendBtnSelectors = [
      '.T-I.T-I-atl.L3',
      '[aria-label*="end"]',
      '[data-tooltip*="end"]',
      '[aria-label*="end"]:not(.gg-compose)',
    ];
    for (const sel of sendBtnSelectors) {
      try {
        document.querySelectorAll(sel).forEach(el => {
          if (!el.classList.contains('gg-compose')) {
            mark(el, 'gg-send-btn');
            mark(el, 'gg-primary-btn');
          }
        });
      } catch(e) { /* ignore selector errors */ }
    }

    // --- Dialogs / modals ---
    document.querySelectorAll('[role="dialog"], [role="alertdialog"], .Kj-JD, .J-M').forEach(el => {
      if (!el.classList.contains('gg-compose-window')) {
        mark(el, 'gg-dialog');
      }
    });

    // --- Right-side panel (Chat, Meet icons) ---
    const rightPanelSelectors = [
      '[role="complementary"]',
      '.bAw',
      '.brC-brG',
    ];
    for (const sel of rightPanelSelectors) {
      document.querySelectorAll(sel).forEach(el => {
        mark(el, 'gg-right-panel');
        clearBg(el);
      });
    }

    // --- Nuclear nuke remaining white backgrounds ---
    nukeBg();

    // --- Additional: find any remaining opaque white elements ---
    if (scanCount <= 20) {
      document.querySelectorAll('div, td, table, header, nav, aside, section').forEach(el => {
        const computed = window.getComputedStyle(el);
        const bg = computed.backgroundColor;
        if (bg && !bg.includes('rgba(0, 0, 0, 0)') && !bg.includes('transparent')) {
          // Parse rgb values
          const match = bg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
          if (match) {
            const r = parseInt(match[1]), g = parseInt(match[2]), b = parseInt(match[3]);
            // If it's a light/white color (r,g,b all > 220)
            if (r > 220 && g > 220 && b > 220) {
              clearBg(el);
            }
          }
        }
      });
    }

    // --- Remove purely decorative small circular outlines that create visual noise ---
    (function removeDecorativeCircles() {
      try {
        document.querySelectorAll('*').forEach(el => {
          if (!el || el.matches('button, a, [role="button"], .gg-icon-btn, .gg-avatar, [contenteditable]')) return;
          const rect = el.getBoundingClientRect();
          const w = Math.round(rect.width), h = Math.round(rect.height);
          if (!w || !h) return;
          const cs = window.getComputedStyle(el);
          const br = cs.borderRadius || '';
          const bw = parseFloat(cs.borderWidth) || 0;
          const bc = cs.borderColor || '';

          // target small circular/oval elements with faint borders
          if ((w <= 64 && h <= 64) && (br.includes('50%') || Math.abs(w - h) <= 4 && (bw > 0))) {
            // if border is very light, remove it
            if (bc.includes('rgba') && (bc.includes('0.02') || bc.includes('0.03') || bc.includes('0.04') || bc.includes('0.05'))) {
              el.style.setProperty('border', 'none', 'important');
              el.style.setProperty('background', 'transparent', 'important');
            }
          }
        });
      } catch (e) { /* ignore */ }
    })();

    // Safety: if message rows exist but are completely invisible, restore visibility and remove problematic classes
    (function ensureRowsVisible() {
      try {
        const rows = Array.from(document.querySelectorAll('.zA'));
        if (rows.length === 0) return;
        const anyVisible = rows.some(r => {
          const s = window.getComputedStyle(r);
          return s && s.display !== 'none' && s.visibility !== 'hidden' && parseFloat(s.opacity || '1') > 0.02;
        });
        if (!anyVisible) {
          // restore inline styles and remove our classes that might cause issues
          rows.forEach(r => {
            r.style.removeProperty('display');
            r.style.removeProperty('visibility');
            r.style.setProperty('opacity', '1', 'important');
            r.style.removeProperty('color');
            r.classList.remove('gg-row');
            r.removeAttribute(MARKER);
          });
          document.querySelectorAll('[role="main"], .AO, .ae4').forEach(m => {
            m.style.removeProperty('display');
            m.style.removeProperty('visibility');
            m.style.setProperty('opacity', '1', 'important');
            m.classList.remove('gg-main');
            m.removeAttribute(MARKER);
          });
          console.warn('Gmail Glass: emergency visibility restore applied to message rows');
        }
      } catch (err) { /* ignore */ }
    })();
  }

  // ─── Run ──────────────────────────────────────────────────
  // Gmail loads dynamically, so we scan repeatedly
  function startScanning() {
    // Initial scans (frequent while Gmail loads)
    const earlyInterval = setInterval(() => {
      scan();
    }, 500);

    // After 15s, slow down to every 3s
    setTimeout(() => {
      clearInterval(earlyInterval);
      setInterval(scan, 3000);
    }, 15000);

    // Also observe DOM changes
    const mo = new MutationObserver(() => {
      // Debounce
      clearTimeout(mo._timer);
      mo._timer = setTimeout(scan, 300);
    });

    if (document.body) {
      mo.observe(document.body, { childList: true, subtree: true });
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        mo.observe(document.body, { childList: true, subtree: true });
      });
    }
  }

  // Wait for body to exist
  if (document.body) {
    startScanning();
  } else {
    document.addEventListener('DOMContentLoaded', startScanning);
  }

  console.debug('Gmail Glass: content script loaded');
})();
