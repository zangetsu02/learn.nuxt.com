<script lang="ts" setup>
import { Terminal } from 'xterm'
import 'xterm/css/xterm.css'

const props = defineProps<{
  stream?: ReadableStream
}>()

const root = ref<HTMLDivElement>()
const terminal = new Terminal()

watch(
  () => props.stream,
  (s) => {
    if (!s)
      return

    const reader = s.getReader()
    function read() {
      reader.read().then(({ done, value }) => {
        terminal.write(value)
        if (!done)
          read()
      })
    }
    read()
  },
  { flush: 'sync', immediate: true },
)

onMounted(() => {
  terminal.open(root.value!)
})
</script>

<template>
  <div ref="root" />
</template>
