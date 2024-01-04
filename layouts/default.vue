<template>
  <div class="w-screen h-screen h-100dvh">
    <div
      class="w-screen h-screen h-100dvh of-hidden"
      grid="~ rows-[max-content_1fr]"
    >
      <TheNav />
      <slot />
    </div>
  </div>
</template>
