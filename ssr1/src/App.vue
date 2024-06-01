<script setup lang="ts">
// import { ref } from "vue";
// import { reqCategoryList } from "./api";
import { useSSRStore } from "./stores";
import { useRoute } from "vue-router";
import headercommon from "@/components/layout/commonHeader.vue";
import footercommon from "@/components/layout/commonFooter.vue";

const route=useRoute();
const SSRStore=useSSRStore();

</script>

<template>
<el-config-provider :locale="SSRStore.locale">
  <headercommon
      v-show="route.fullPath.indexOf('login') === -1"
    ></headercommon>
    <div class="container">
      <router-view></router-view>
    </div>
    <footercommon
      v-show="route.fullPath.indexOf('login') === -1"
    ></footercommon>
</el-config-provider>
</template>

<style scoped lang="scss"></style>
