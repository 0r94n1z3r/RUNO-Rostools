<!-- components/ParallaxWrap.vue -->
<template>
  <component
    :is="as"
    ref="el"
    class="parallax-wrapper"
    :style="{
      transform: `translate3d(0, ${tY}px, 0)`,
      willChange: 'transform',
    }"
  >
    <slot />
  </component>
</template>

<script setup>
import {
  useWindowScroll,
  useWindowSize,
  useMediaQuery,
  useRafFn,
} from '@vueuse/core'

const props = defineProps({
  // scroll
  zShift: { type: Number, default: 300 },
  inertia: {                                     // inertia tuning
    type: Object,
    default: () => ({ stiffness: .22, stopEps: .1 }) // higher stiffness = snappier
  },
  as: { type: String, default: 'div' },
})

const el = ref(null)
const prefersReduce = useMediaQuery('(prefers-reduced-motion: reduce)')

// ---------- helpers: tiny inertia (lerp on RAF) ----------
function useInertia(targetRef, opts = { stiffness: 0.22, stopEps: 0.1 }) {
  const v = ref(0)
  const t = targetRef

  const k   = Math.max(0, Math.min(1, opts.stiffness ?? 0.22))
  const eps = opts.stopEps ?? 0.1

  let active = true
  let enabled = true

  const { pause, resume } = useRafFn(() => {
    if (!M().allowed || !active /*|| !enabled*/) return

    const next = v.value + (t.value - v.value) * k

    if (
      Math.abs(next - v.value) < eps &&
      Math.abs(t.value - next) < eps
    ) {
      v.value = t.value
      pause()
      return
    }

    v.value = next
  }, { immediate: false })

  const stopWatch = watch(
    t,
    () => {
      if (active && enabled) resume()
    },
    { flush: 'sync' }
  )

  function setEnabled(val) {
    enabled = val
    if (!val) pause()
  }

  onScopeDispose(() => {
    active = false
    stopWatch()
    pause()
  })

  return { value: v, setEnabled }
}

// ---------- SCROLL ----------
const { y: winY } = useWindowScroll()
const { height: vh, width: vw } = useWindowSize()

const rect = ref(null)
useRafFn(() => {
  if (!el.value) return
  rect.value = el.value.getBoundingClientRect()
})

const normScrollY = computed(() => {
  void winY.value

  if (!el.value || !rect.value) return 0

  const r = rect.value;
  const viewH = vh.value || 1

  const elemCenter = r.top + r.height / 2
  const viewCenter = viewH / 2

  const zone = viewH * 1.5

  const value = (viewCenter - elemCenter) / zone

  return Math.max(-1, Math.min(1, value))
})

const rawScrollY = computed(() =>
  prefersReduce.value
    ? 0
    : normScrollY.value * props.zShift
)

// eased scroll
const easeY = useInertia(rawScrollY, props.inertia)

// ---------- TOTAL ----------
const tY = computed(() => easeY?.value?.value || 0)

</script>

<style lang="scss" scoped>
  .parallax-wrapper{
    pointer-events: none;
    width: 100%;
    height: 100%;
    position: relative;
    @include flex-c;
  }
</style>
