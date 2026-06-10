import { ref, onMounted, onBeforeUnmount } from 'vue';

export function useHeaderTheme(headerRef, options = {}) {
  const selector = options.selector || '.header-state-dark';
  const theme = ref('light');

  let io = null, mo = null, ro = null;
  let rafId = 0;
  const targets = new Set();

  const rectAinB = (a, b, tol = 0) =>
    a.left   >= b.left   - tol &&
    a.right  <= b.right  + tol &&
    a.top    >= b.top    - tol &&
    a.bottom <= b.bottom + tol;

  const compute = () => {
    if(useProdTransition().state != 'idle') {
        theme.value = 'light';
        return;
    }

    if (!headerRef.value) return;
    const hRect = headerRef.value.getBoundingClientRect();

    let contained = false;
    targets.forEach(el => {
        if (contained) return; // early out
        const r = el.getBoundingClientRect();
        if (rectAinB(hRect, r, 1)) contained = true;
    });

    theme.value = contained ? 'transparent' : 'light';
  };

  const scheduleCompute = () => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      rafId = 0;
      compute();
    });
  };

  const setupIO = () => {
    if (io) io.disconnect();
    io = new IntersectionObserver(
      (entries) => {
        // entries fire on viewport enter/exit; we still recompute overlap every time
        // because the element might move under the header without crossing thresholds
        scheduleCompute();
      },
      { root: null, threshold: [0] } // viewport
    );

    targets.clear();
    document.querySelectorAll(selector).forEach((el) => {
      targets.add(el);
      io.observe(el);
    });

    // initial compute
    scheduleCompute();
  };

  const rescan = () => setupIO();

  const onScroll = () => scheduleCompute();
  const onResize = () => scheduleCompute();

  onMounted(() => {
    setupIO();

    // react to DOM/class changes (add/remove/toggle .header-state--dark)
    mo = new MutationObserver((muts) => {
      // only rescan if nodes added/removed or class changed relevantly
      let needRescan = false;
      for (const m of muts) {
        if (m?.type === 'childList') { needRescan = true; break; }
        if (m?.type === 'attributes' && m.attributeName === 'class') { needRescan = true; break; }
      }
      needRescan ? rescan() : scheduleCompute();
    });
    mo.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['class'],
    });

    // header size changes
    ro = new ResizeObserver(scheduleCompute);
    if (headerRef.value) ro.observe(headerRef.value);

    // scroll/resize to catch movement under fixed header
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
  });

  onBeforeUnmount(() => {
    io && io.disconnect();
    mo && mo.disconnect();
    ro && ro.disconnect();
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
    if (rafId) cancelAnimationFrame(rafId);
  });

  return { headerRef, theme, refresh: rescan };
}
