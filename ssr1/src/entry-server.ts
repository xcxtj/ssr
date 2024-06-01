import { createApp, asyncDataFilter } from "./main";
import { renderToString } from "vue/server-renderer";
export async function render(url: string) {
  const { app, router, store } = createApp();
  await router.push(url);
  await router.isReady();
  // 匹配路由组件
  const matchedComponents = router.currentRoute.value.matched.flatMap(
    (record) => Object.values(record.components)
  );
  // 对所有匹配的路由组件调用里面的 asyncData 函数
  await asyncDataFilter(matchedComponents, store, router.currentRoute);
  const context: any = {};
  const appHtml = await renderToString(app, context);
  const state = store.$state;
  return { appHtml, state };
}
