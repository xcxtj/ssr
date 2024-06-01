<template>
  <div class="home-page">
    <div class="banner"></div>
    <div class="main-wapper">
      <h2 class="title">{{ t("home.h2Title") }}</h2>
      <p class="sub-title">{{ t("home.subTitle") }}</p>
      <!-- 首页列表 -->
      <HomeList />
    </div>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import HomeList from "./components/homeList.vue";
export default {
  components: {
    HomeList,
  },
  setup() {
    const { t } = useI18n();
    return { t };
  },
  asyncData({ store }: any) {
    const { pageNo } = storeToRefs(store);
    return store.getRoomList(pageNo.value = 1);
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/home/index.scss";
</style>
