import { createRouter, createWebHistory,createMemoryHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/home/index.vue"),
    meta: {
      title: "爱此迎-全球大型房屋租赁平台",
      keywords: "爱此迎，特价房源，品质房源，租赁平台",
      description:
        "爱此迎（Aircnb）是房屋租赁平台。爱此迎（Aircnb）的房屋涉及上海、北京、杭州、苏州等60个城市，覆盖了特价房源、品质房源，帮助用户实现从线上房屋预定和浏览功能。 ",
      keepAlive: false,
    },
  },
  {
    path: "/mine",
    name: "mine",
    component: () => import("@/views/mine/index.vue"),
    meta: {
      title: "",
      keywords: "",
      description: "",
      keepAlive: false,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
      keywords: "",
      description: "",
      keepAlive: false,
    },
  },
  {
    path: "/record",
    name: "record",
    component: () => import("@/views/record/index.vue"),
    meta: {
      title: "",
      keywords: "",
      description: "",
      keepAlive: false,
    },
  },
  {
    path: "/roomDetail/:id",
    name: "roomDetail",
    component: () => import("@/views/detail/index.vue"),
    meta: {
      title: "爱此迎-",
      keywords: "",
      description: "",
      keepAlive: false,
    },
  },
];
export const createSSRRouter = () => {
  return createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
      window.scrollTo(0, 0);
    },
  });
};
