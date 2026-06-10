export default defineNuxtRouteMiddleware((to) => {
  const singleSlash = to.path.replace(/\/{2,}/g, '/')
  const [tpl, act] = [to.matched?.[0]?.path, singleSlash].map(p => p?.split('/') ?? [])
  let normalized = act.map((p, i) => (tpl[i]?.startsWith(':') ? p : p.toLowerCase())).join('/')
  normalized = normalized.startsWith('/') ? normalized : '/' + normalized
  const final = normalized.length > 1 ? normalized.replace(/\/+$/, '') : normalized
  if (final !== to.path)return navigateTo(final, { redirectCode: 301 })
})