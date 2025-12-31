import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 关键配置：必须设置 base 为你的仓库名，前后都要加斜杠
  // 你的仓库是 yuanda，所以这里填 '/yuanda/'
  base: '/yuanda/',
})