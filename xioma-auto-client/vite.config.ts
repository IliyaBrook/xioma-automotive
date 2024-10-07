import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path';
const rootDir = resolve(__dirname);
const srcDir = resolve(rootDir, 'src');


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['js-big-decimal']
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  resolve: {
    alias:{
      '@src': srcDir,
      '@root': rootDir,
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/api/tasks': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path
      },
      '/api/notifications': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path
      },
      '/api/auth': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path
      },
    },
  },
})
