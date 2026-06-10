import { useNuxtApp, useRouter, onBeforeUnmount } from '#imports'

let beforeEachRegistered = false;
const startHandlers = {};

export function onPageTransitionStart(key, handler) {
  startHandlers[key] = handler

  if (!beforeEachRegistered) {
    beforeEachRegistered = true

    const router = useRouter()

    router.beforeEach(async (to, from) => {
      for (const h of Object.values(startHandlers)) {
        await h(to, from)
      }
    })
  }
}

export function onPageTransitionFinish(handler) {
  const nuxtApp = useNuxtApp()
  nuxtApp.hook('page:finish', handler)
}