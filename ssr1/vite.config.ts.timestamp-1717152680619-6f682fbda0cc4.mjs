// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///D:/Desktop/v3/ssr1/ssr1/node_modules/.pnpm/vite@5.2.12_@types+node@20.12.12_sass@1.77.2/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/Desktop/v3/ssr1/ssr1/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.2.12_@types+node@20.12.12_sass@1.77.2__vue@3.4.27_typescript@5.4.5_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vitePluginCompression from "file:///D:/Desktop/v3/ssr1/ssr1/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@5.2.12_@types+node@20.12.12_sass@1.77.2_/node_modules/vite-plugin-compression/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///D:/Desktop/v3/ssr1/ssr1/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    vitePluginCompression()
    // AutoImport({
    //   resolvers: [ElementPlusResolver()],
    // }),
    // Components({
    //   resolvers: [ElementPlusResolver()],
    // }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/scss/main.scss";@import "@/assets/scss/variable.scss";`
      }
    }
  },
  server: {
    proxy: {
      "/release": {
        target: "http://110.42.184.111",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/release/, "")
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxEZXNrdG9wXFxcXHYzXFxcXHNzcjFcXFxcc3NyMVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcRGVza3RvcFxcXFx2M1xcXFxzc3IxXFxcXHNzcjFcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L0Rlc2t0b3AvdjMvc3NyMS9zc3IxL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSBcIm5vZGU6dXJsXCI7XG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tIFwidW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZVwiO1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGVcIjtcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XG5pbXBvcnQgdml0ZVBsdWdpbkNvbXByZXNzaW9uIGZyb20gJ3ZpdGUtcGx1Z2luLWNvbXByZXNzaW9uJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHZ1ZSgpLFxuICAgIHZpdGVQbHVnaW5Db21wcmVzc2lvbigpLFxuXG4gICAgLy8gQXV0b0ltcG9ydCh7XG4gICAgLy8gICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxuICAgIC8vIH0pLFxuICAgIC8vIENvbXBvbmVudHMoe1xuICAgIC8vICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcbiAgICAvLyB9KSxcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogZmlsZVVSTFRvUGF0aChuZXcgVVJMKFwiLi9zcmNcIiwgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgfSxcbiAgfSxcbiAgY3NzOntcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOntcbiAgICAgIHNjc3M6e1xuICAgICAgICBhZGRpdGlvbmFsRGF0YTogYEBpbXBvcnQgXCJAL2Fzc2V0cy9zY3NzL21haW4uc2Nzc1wiO0BpbXBvcnQgXCJAL2Fzc2V0cy9zY3NzL3ZhcmlhYmxlLnNjc3NcIjtgXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBzZXJ2ZXI6e1xuICAgIFxuICAgIHByb3h5OntcbiAgICAgICcvcmVsZWFzZSc6e1xuICAgICAgICB0YXJnZXQ6J2h0dHA6Ly8xMTAuNDIuMTg0LjExMScsXG4gICAgICAgIGNoYW5nZU9yaWdpbjp0cnVlLFxuICAgICAgICByZXdyaXRlOihwYXRoKT0+cGF0aC5yZXBsYWNlKC9eXFwvcmVsZWFzZS8sJycpXG4gICAgICB9XG4gICAgfVxuICB9XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVEsU0FBUyxlQUFlLFdBQVc7QUFJcFMsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sMkJBQTJCO0FBTjZILElBQU0sMkNBQTJDO0FBU2hOLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLHNCQUFzQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBUXhCO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBSTtBQUFBLElBQ0YscUJBQW9CO0FBQUEsTUFDbEIsTUFBSztBQUFBLFFBQ0gsZ0JBQWdCO0FBQUEsTUFDbEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBTztBQUFBLElBRUwsT0FBTTtBQUFBLE1BQ0osWUFBVztBQUFBLFFBQ1QsUUFBTztBQUFBLFFBQ1AsY0FBYTtBQUFBLFFBQ2IsU0FBUSxDQUFDLFNBQU8sS0FBSyxRQUFRLGNBQWEsRUFBRTtBQUFBLE1BQzlDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
