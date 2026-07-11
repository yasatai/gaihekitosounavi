import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages はリポジトリ名のサブパス配信のため、本番のみ base を設定。
  // 例: https://yasatai.github.io/gaihekitosounavi/
  base: process.env.GITHUB_PAGES ? '/gaihekitosounavi/' : '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        privacy: 'privacy-policy/index.html',
      },
    },
  },
})
