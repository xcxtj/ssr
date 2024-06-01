import { fileURLToPath, URL } from "node:url";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vitePluginCompression from 'vite-plugin-compression'
import legacy from '@vitejs/plugin-legacy'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vitePluginCompression(),
    legacy()

    // AutoImport({
    //   resolvers: [ElementPlusResolver()],
    // }),
    // Components({
    //   resolvers: [ElementPlusResolver()],
    // }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css:{
    preprocessorOptions:{
      scss:{
        additionalData: `@import "@/assets/scss/main.scss";@import "@/assets/scss/variable.scss";`
      }
    }
  },
  server:{
    
    proxy:{
      '/release':{
        target:'http://110.42.184.111',
        changeOrigin:true,
        rewrite:(path)=>path.replace(/^\/release/,'')
      }
    }
  }
});
