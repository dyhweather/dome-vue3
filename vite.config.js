/* eslint-disable */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    host: '0.0.0.0',
    port: 9099,
    hmr: true,
    proxy: {
      '/api': {
        target: 'http://175.178.58.224:31629',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 这个是自己配置的图标路径
      iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
      // 这个表示id，按这个来就对了
      symbolId: 'icon-[name]'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyvars: {
          'primary-color': '#1DA57A',
          'link-color': '#1DA57A',
          'border-radius-base': '2px',
        }
      }
    },
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-plugin-px2rem')({
            // 以设计稿1920为例， 1920 / 24 = 80
            rootValue: 80,
            propBlackList: ['border', 'min-width', 'max-width'],
            // exclude: /(node_module)/ // 如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
          })
        ]
      }
    }
  }
})
