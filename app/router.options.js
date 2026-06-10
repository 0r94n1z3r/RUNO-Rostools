export default {
  scrollBehavior(to, from, savedPosition) {
    const html = document.documentElement;

    return new Promise((resolve) => {
      const prev = html.style.scrollBehavior;
      html.style.scrollBehavior = 'auto';

      setTimeout(() => {
        if (to.hash) {
          html.style.scrollBehavior = prev;
          resolve({
            el: to.hash,
            behavior: 'smooth',
          });
        }else if(from.path == to.path) {
          html.style.scrollBehavior = prev;
          resolve();
        } else if (savedPosition && to.meta?.saveScroll) {
          resolve(savedPosition);
        } else  {
          resolve({ top: 0 });
        }

        setTimeout(() => html.style.scrollBehavior = prev);
      });
    });
  },
};