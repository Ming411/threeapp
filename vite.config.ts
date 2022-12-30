import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
// const path = require('path');
import {resolve} from 'path';
import glsl from 'rollup-plugin-glsl';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    glsl({
      // By default, everything gets included
      include: '**/*.glsl',
      // Undefined by default
      exclude: ['**/index.html']
      // Source maps are on by default
      // sourceMap: false,
    })
  ],
  resolve: {
    //设置路径别名
    alias: {
      '@': resolve(__dirname, './src'),
      '*': resolve('')
    }
  }
});
