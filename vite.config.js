import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/JPSendaiFamily2026/', // 👈 這行是白畫面救星！前後的斜線一定要有，大小寫要跟 GitHub 專案名一模一樣
})