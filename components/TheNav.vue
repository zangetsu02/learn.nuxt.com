<template>
  <nav px6 py4 border="b base" flex="~ gap-2 items-center">
    <div i-logos-nuxt-icon text-4xl />
    <span text-2xl>learn.nuxt.com</span>
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
