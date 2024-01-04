<script lang="ts" setup>
const iframe = ref<HTMLIFrameElement>()
const wcUrl = ref<string>()

type Status = 'init' | 'mount' | 'install' | 'start' | 'ready' | 'error'

const status = ref<Status>('init')
const error = shallowRef<{ message: string }>()

const stream = ref<ReadableStream>()

async function startDevServer() {
  const rawFiles = import.meta.glob([
    '../templates/basic/*.*',
    '!**/node_modules/**',
  ], {
    as: 'raw',
    eager: true,
  })

  const files = Object.fromEntries(
    Object.entries(rawFiles).map(([path, content]) => {
      return [path.replace('../templates/basic/', ''), {
        file: {
          contents: content,
        },
      }]
    }),
  )

  const wc = await useWebContainer()

  wc.on('server-ready', (port, url) => {
    status.value = 'ready'
    wcUrl.value = url
  })

  wc.on('error', (e) => {
    status.value = 'error'
    error.value = e
  })

  status.value = 'mount'
  await wc.mount(files)

  status.value = 'install'
  const installProcess = await wc.spawn('pnpm', ['install'])
  stream.value = installProcess.output
  const installExitCode = await installProcess.exit

  if (installExitCode !== 0) {
    status.value = 'error'
    error.value = {
      message: `Unable to run npm install, exit as ' + ${installExitCode}`,
    }
  }

  status.value = 'start'
  const devProcess = await wc.spawn('pnpm', ['run', 'dev'])
  stream.value = devProcess.output
}

watchEffect(() => {
  if (iframe.value && wcUrl.value)
    iframe.value.src = wcUrl.value
})

onMounted(startDevServer)
</script>

<template>
  <div h-full w-full grid="~ rows[2fr_1fr]" of-hidden>
    <iframe v-show="status === 'ready'" ref="iframe" w-full h-full />

    <div v-if="status !== 'ready'" w-full h-full flex="~ items-center justify-center" capitalize text-lg>
      <div class="i-svg-spinners-90-ring-with-bg" />
      {{ status }}ing...
    </div>

    <TheTerminalOutput :stream="stream" />
  </div>
</template>
