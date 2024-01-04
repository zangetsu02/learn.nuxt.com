<script setup lang="ts">
const color = useColorMode()

function toggleDark() {
  color.value = color.value === 'dark'
    ? 'light'
    : 'dark'
}
</script>

<template>
  <div class="grid grid-cols-[1fr_2fr] h-full">
    <div class="border-r border-base p4">
      <button @click="toggleDark">
        {{ color.value }}
      </button>
    </div>

    <ThePlayground />
  </div>
</template>
