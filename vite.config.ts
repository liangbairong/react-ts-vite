import { defineConfig } from 'vite'
const { resolve } = require('path')
import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { viteMockServe } from 'vite-plugin-mock';
import { minifyHtml, injectHtml } from 'vite-plugin-html'

import importToCDN, { autoComplete } from 'vite-plugin-cdn-import'

const imageHttpBase = '/assets/';
let proxy = {}
if (process.env.PROXY) {
  proxy = {
    '/api': {
      // target: 'http://192.168.50.5:10031',
      target: 'http://together02.svc.elelive.cn',
      changeOrigin: true,
      rewrite: (path: any) => path.replace(/^\/api/, '')
    },
  }
}
export default defineConfig({
  root: './src',
  base: './',
  server: {
    host: '0.0.0.0',
    port: 4000, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    proxy
  },
  // publicDir:'./public',
  // define: {
  //   wRes: {}
  // },
  css:{
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/app/scss/common.scss";
        @mixin bg($url,$name,$format){
            background-image: url($url+'/images/'+$name+'.'+$format);
        }
        ` 
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // 设置 `@` 指向 `src` 目录
      '@Utils': resolve(__dirname,'src/app/utils'),
      '@Stores': resolve(__dirname,'src/app/stores'),
      '@Components': resolve(__dirname,'src/app/components'),
      '@Context': resolve(__dirname,'src/app/context'),
      '@Assets': resolve(__dirname,'src/assets'),
      '@Lib': resolve(__dirname,'src/app/lib'),
    }
  },
  build: {
    assetsInlineLimit: 0,  //禁止资源转换为base64 
    target: ['es2015'],
    sourcemap: process.env.TYPE !== 'production',
    outDir: '../artifact',
    rollupOptions: {
      input: {
        main: resolve(__dirname, './src/index.html'),
      },
    }
  },
  plugins: [
    react(),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      polyfills: ['es.promise.finally', 'es/map', 'es/set'],
      modernPolyfills: ['es.promise.finally']
    }),
    viteMockServe({
      mockPath: './src/mock',
      localEnabled: !!process.env.MOCK,
      prodEnabled: !!process.env.MOCK,
    }),
    minifyHtml(),
    injectHtml({
      data: {
        injectScript: process.env.TYPE !== 'production' ? '<script src="http://cdn.bootcdn.net/ajax/libs/vConsole/3.9.1/vconsole.min.js"></script><script>new VConsole()</script>' : '',
        testScript:process.env.TYPE !== 'production' ? `
        <script>
            console.log('测试代码')
        
        </script>
        `:''
      },
    }),
    importToCDN({
      modules: [
        {
          name: 'react',
          var: 'React',
          path: '//cdn-web.elelive.net/lib/react/17.0.2/react.production.min.js'
        },
        {
          name: 'react-dom',
          var: 'ReactDOM',
          path: '//cdn-web.elelive.net/lib/react-dom/17.0.2/react-dom.production.min.js'
        },
        {
          name: 'mobx',
          var: 'mobx',
          path: '//cdn-web.elelive.net/lib/mobx/6.3.2/mobx.umd.production.min.js'
        },
      ]
    })
  ],
})

