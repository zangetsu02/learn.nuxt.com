import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  shortcuts: {
    'border-base': 'border-gray:30',
    'bg-active': 'bg-gray:10',
  },
  presets: [
    presetUno(),
    presetIcons(),
    presetAttributify(),
  ],
})
