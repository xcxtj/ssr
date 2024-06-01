import { createSSRI18n } from "./language/i18n";
import { createSSRApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import '@/mock'
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { useSSRStore } from "./stores";
import { createSSRRouter } from "./router";
import { lazyPlugin } from './composables/lazy'
export function createApp() {
  const pinia = createPinia();
  const i18n = createSSRI18n();
  const app = createSSRApp(App);
  app.use(pinia);
  const store = useSSRStore();
  const router = createSSRRouter();
  router.afterEach((to, from) => {
    store.$patch({ route: to });
  });
  app.use(router);
  app.use(ElementPlus);
  app.use(i18n);
  app.use(lazyPlugin);
  // app.mount("#app");
  return {
    app,
    store,
    router,
  };
}

export function asyncDataFilter(actived: any, store: any, router: any) {
  return Promise.all(
    actived.map(function (Component: any) {
      if (Component.asyncData) {
        return Component.asyncData({ store, route: router.currentRoute });
      }
    })
  );
}
