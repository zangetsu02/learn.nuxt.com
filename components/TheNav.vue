<template>
  <nav px6 py3 text-lg border="b base" flex="~ gap-2 items-center">
    <NuxtLink to="/" flex="~ gap-2 items-center" title="Nuxt Playground">
      <NuxtLogo class="h-1.3em mt--1.8" />
      <span text-xl>Playground</span>
    </NuxtLink>
    <div class="flex-auto" />

    <ColorSchemeToggle />

    <NuxtLink
      p2 rounded
      hover="bg-active"
      to="https://github.com/zangetsu02/learn.nuxt.com" target="_blank"
    >
      <div i-carbon-logo-github text-2xl />
    </NuxtLink>
  </nav>
</template>
