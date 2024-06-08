import { createApp, asyncDataFilter } from "./main";
import { renderToString } from "vue/server-renderer";
export async function render(url: string, manifest: any) {
  const { app, router, store } = createApp();
  // 在渲染之前设置路由到所需的URL
  await router.push(url);
  await router.isReady();
  // 匹配路由组件
  const matchedComponents = router.currentRoute.value.matched.flatMap(
    (record) => Object.values(record.components)
  );
  // 对所有匹配的路由组件调用里面的 asyncData 函数
  await asyncDataFilter(matchedComponents, store, router.currentRoute);
  // 传递 SSR 上下文对象，可以通过 useSSRContext() 方法访问
  // @vitejs/plugin-vue 在组件的 setup() 中注入代码，将自己注册到 context.modules 上。
  // 渲染后，context.modules 将包含在此渲染调用期间实例化的所有组件。
  const context: any = {};
  const appHtml = await renderToString(app, context);
  // 当我们将状态附加到上下文，
  // 并且 `template` 选项用于 renderer 时，
  // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
  const state = store.$state;
  if (import.meta.env.PROD) {
    // Vite 生成的 SSR manifest 包含模块到块/资源的映射，
    // 我们可以使用它来确定需要预加载哪些文件以响应此请求。
    const preloadLinks = renderLinks(context.modules, manifest);
    return { appHtml, state, preloadLinks };
  } else {
    return { appHtml, state };
  }
}
function renderLinks(modules: any, manifest: any) {
  let links = "";
  modules.forEach((id: any) => {
    const files = manifest[id];
    if (files) {
      files.forEach((file: any) => {
        links += renderPreloadLink(file);
      });
    }
  });
  return links;
}
function renderPreloadLink(file: any) {
  if (file.endsWith(".js")) {
    return `<link rel="modulepreload" crossorigin href="${file}">`;
  } else if (file.endsWith(".css")) {
    return `<link rel="stylesheet" href="${file}">`;
  } else if (file.endsWith(".woff")) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`;
  } else if (file.endsWith(".woff2")) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`;
  } else if (file.endsWith(".gif")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/gif">`;
  } else if (file.endsWith(".jpg") || file.endsWith(".jpeg")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`;
  } else if (file.endsWith(".png")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/png">`;
  } else {
    // TODO
    return "";
  }
}
