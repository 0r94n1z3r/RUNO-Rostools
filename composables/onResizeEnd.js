export function onResizeEnd(callback) {
  const { width, height } = useWindowSize();

  const trigger = useDebounceFn(() => {
    callback()
  }, 200)

  watch([width, height], () => {
    trigger()
  })
}