<template>
  <div class="header-common">
    <img
      class="logo"
      src="../../assets/images/layout/logo.png"
      alt="爱x迎"
      @click="router.push({ name: 'home' })"
    />
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleselect"
    >
      <el-menu-item index="orders"
        >{{ t("header.orders") }}
        <template v-if="store.orderVisible">
          <suspense>
            <template #default>
              <pop></pop>
            </template>
            <template #fallback
              ><div class="loading" v-for="item in 3">
                <el-skeleton :rows="5" animated /></div
            ></template>
          </suspense>
        </template>
      </el-menu-item>
      <el-menu-item index="records">{{ t("header.records") }}</el-menu-item>
      <el-sub-menu index="language">
        <template #title>{{ t("header.language") }}</template>
        <el-menu-item index="zh">中文</el-menu-item>
        <el-menu-item index="en">english</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="logout" v-if="store.userStatus === 1">
        <img
          class="avatar"
          src="../../assets/images/layout/avatar.jpg"
          alt="个人中心"
        />
        <p>退出</p>
      </el-menu-item>

      <el-menu-item index="login" v-else>
        {{ t("login.loginTab") }}/ {{ t("login.signTab") }}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { zhCn, en } from "element-plus/es/locale/index.mjs";
import { useRouter } from "vue-router";
import { useSSRStore } from "@/stores";
import { useI18n } from "vue-i18n";
import { ref, getCurrentInstance } from "vue";
import { userLogoutApi } from "@/api/login";
import { defineAsyncComponent } from "vue";
import type { IResultOr } from "@/api/interface";
const pop = defineAsyncComponent(() => import("@/views/order/pop.vue"));
const { proxy }: any = getCurrentInstance();
const { t, locale } = useI18n();
const router = useRouter();
const store = useSSRStore();
let activeIndex = ref("orders");
const emit = defineEmits<{ (e: "changeLanguage", language: any): void }>();
function handleselect(e: any) {
  if (e === "zh") {
    store.saveLanguage(zhCn);
    locale.value = e;
  } else if (e === "en") {
    store.saveLanguage(en);
    locale.value = e;
  } else if (e === "login") {
    router.push({ name: "login" });
  } else if (e === "logout") {
    userLogout();
  } else if (e === "orders") {
    store.setOrderVisible(true);
  } else if (e === "records") {
    router.push({ name: "record" });
  }
}
const userLogout = async () => {
  userLogoutApi().then((res: IResultOr) => {
    let { success, message } = res;
    if (success) {
      proxy.$message.success("退出成功");
      router.push({ name: "login" });
      // localStorage.setItem("userStatus", "0");
      store.setUserStatus(0);
      localStorage.setItem("userId", "");
    } else {
      store.setUserStatus(0);
      proxy.$message.error(message);
    }
  });
};
</script>

<style lang="scss">
@import "@/assets/scss/layout/commonHeader.scss";
</style>
