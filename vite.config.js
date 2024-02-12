import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['front/src/assets/pic/Logo.jpg'], // เพิ่ม path ของไฟล์รูปภาพที่นี่
  },
})
