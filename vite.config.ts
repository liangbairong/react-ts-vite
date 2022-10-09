import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { join, resolve } from 'path';
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import { viteMockServe } from 'vite-plugin-mock';
import { minifyHtml, injectHtml } from 'vite-plugin-html';
import importToCDN from 'vite-plugin-cdn-import';
// @ts-ignore
import autoprefixer from 'autoprefixer';
import { webpPlugins, publicScss } from './config/webp';
import viteEslint from 'vite-plugin-eslint';
const fs = require('fs');

const otherPlugins = [];

const initLoading = fs.readFileSync(join(__dirname, 'config/initLoading.html')).toString();
const testCode = process.env.TYPE !== 'production' ? fs.readFileSync(join(__dirname, 'config/testCode.html')).toString() : '';

const version = Date.now();
const fd = fs.openSync(join(__dirname, 'src/.env'), 'w');
fs.writeFileSync(fd, 'VITE_VERSION=' + version, 'utf8');
fs.closeSync(fd);

if (webpPlugins) {
    otherPlugins.push(webpPlugins);
}

let proxy = {};
if (process.env.TYPE === 'dev') {
    proxy = {
        '/api': {
            // target: 'http://192.168.50.5:10031',
            target: 'http://together02.svc.elelive.cn',
            changeOrigin: true,
            rewrite: (path: any) => path.replace(/^\/api/, ''),
        },
    };
}
export default defineConfig({
    root: resolve(__dirname, 'src'),
    base: './',
    server: {
        host: '0.0.0.0',
        port: 4000, // 设置服务启动端口号
        open: true, // 设置服务启动时是否自动打开浏览器
        proxy,
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: publicScss,
            },
        },
        postcss: {
            plugins: [
                autoprefixer({
                    overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11'],
                }),
            ],
        },
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'), // 设置 `@` 指向 `src` 目录
            '@Utils': resolve(__dirname, 'src/app/utils'),
            '@Stores': resolve(__dirname, 'src/app/stores'),
            '@Components': resolve(__dirname, 'src/app/components'),
            '@Context': resolve(__dirname, 'src/app/context'),
            '@Assets': resolve(__dirname, 'src/assets'),
            '@Lib': resolve(__dirname, 'src/app/lib'),
        },
    },
    esbuild: {
        loader: 'tsx',
    },
    build: {
        assetsInlineLimit: 0, //禁止资源转换为base64
        target: ['es2015'],
        cssCodeSplit: true,
        sourcemap: process.env.TYPE !== 'production',
        outDir: resolve(__dirname, './artifact'),
        rollupOptions: {
            input: {
                main: resolve(__dirname, './src/index.html'),
            },
        },
        assetsDir: 'assets',

        // terserOptions: {
        //     compress: {
        //         // warnings: false,
        //         drop_console: true,  //打包时删除console
        //         drop_debugger: true, //打包时删除 debugger
        //         pure_funcs: ['console.log'],
        //     },
        //     output: {
        //         // 去掉注释内容
        //         comments: true,
        //     },
        // },
    },
    plugins: [
        // 分包
        splitVendorChunkPlugin(),
        react(),
        viteMockServe({
            mockPath: './src/mock',
            localEnabled: process.env.TYPE === 'mock',
            // prodEnabled: true,
        }),
        legacy({
            targets: ['ie >= 11'],
            additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
            polyfills: ['es.promise.finally', 'es/map', 'es/set'],
            modernPolyfills: ['es.promise.finally'],
        }),
        injectHtml({
            data: {
                initLoading,
                injectScript: process.env.VCONSOLE ? '<script src="//cdn.bootcdn.net/ajax/libs/vConsole/3.9.1/vconsole.min.js"></script><script>new VConsole()</script>' : '',
                testScript: testCode,
            },
        }),
        minifyHtml(),
        importToCDN({
            modules: [
                {
                    name: 'react',
                    var: 'React',
                    path: '//cdn-web.elelive.net/lib/react/17.0.2/react.production.min.js',
                },
                {
                    name: 'react-dom',
                    var: 'ReactDOM',
                    path: '//cdn-web.elelive.net/lib/react-dom/17.0.2/react-dom.production.min.js',
                },
                {
                    name: 'mobx',
                    var: 'mobx',
                    path: '//cdn-web.elelive.net/lib/mobx/6.3.2/mobx.umd.production.min.js',
                },
            ],
        }),
        viteEslint({
            failOnError: true,
            include: ['./src/**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'],
            emitWarning: false,
        }),
        ...otherPlugins,
    ],
});
