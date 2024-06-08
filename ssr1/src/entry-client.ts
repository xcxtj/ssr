import { createApp,asyncDataFilter } from "./main";
import airbnb from "@/db";
const { app, router, store } = createApp();
if ((window as any).__INITIAL_STATE__) {
  store.$patch((window as any).__INITIAL_STATE__);
}
router.beforeEach((to, from, next) => {
  airbnb.airbnbDB
    .openStore({
      ...airbnb.languageObjectStore,
      ...airbnb.userObjectStore,
      ...airbnb.recordObjectStore,
      ...airbnb.orderObjectStore,
    })
    .then(() => {
      console.log("数据库初始化成功");
      localStorage.getItem("userId") && store.setUserStatus(1);
      next();
    });
});
router.isReady().then(() => {
  // 实现路由组件在不刷新的路由跳转下也能执行asyncData函数
  router.beforeResolve((to, from, next) => {
    const toComponents = router
      .resolve(to)
      .matched.flatMap((record) => Object.values(record.components));
    const fromComponents = router
      .resolve(from)
      .matched.flatMap((record) => Object.values(record.components));
    // 获取跳转前后不重复的组件
    const actived = toComponents.filter((c, i) => {
      return fromComponents[i] !== c;
    });
    if (!actived.length) {
      return next();
    }
    // 对所有匹配的路由组件调用 `asyncData()`
    asyncDataFilter(actived, store, router.currentRoute).then(function () {
      // 结束loading
      next();
    });
  });

  app.mount("#app");
});
// 实现在不刷新的路由跳转下也能匹配mate信息
//SEO优化
router.afterEach((to, from, next) => {
  const { roomDetail } = store;
  const { title: roomTitle = "", owner } = roomDetail || {};
  const { introduce = "" } = owner || {};
  const { meta } = to;
  const { title, keywords, description } = meta;
  if (title) {
    document.title = `${title}${roomTitle}`;
  } else {
    document.title = "";
  }
  const keywordsMeta = document.querySelector('meta[name="keywords"]')
  keywordsMeta && keywordsMeta.setAttribute("content",`${keywords}${introduce}`)

  const descriptionMeta = document.querySelector('meta[name="description"]')
  descriptionMeta?.setAttribute("content",`${description}${introduce}`)


});
