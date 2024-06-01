<template>
  <HomeTabs></HomeTabs>

  <div class="home-list">
    <div
      class="item"
      @click="toDetail(item)"
      v-for="(item, index) in roomList"
      :key="index"
    >
      <img :src="item.pictureUrl" :alt="item.title" />
      <p class="title">{{ item.title }}</p>
      <p class="price">￥{{ item.price }}</p>
    </div>
  </div>
  <!-- 分页 -->
  <pagination @changePage="changePage" />
</template>

<script setup lang="ts">
import { useSSRStore } from "@/stores";
import HomeTabs from "./homeTab.vue";
import type { IResultOr, IRoomListParams } from "@/api/interface";

import pagination from "@/components/pagination.vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
const store = useSSRStore();
const router = useRouter();
const { roomList } = storeToRefs(store);
function toDetail(item: any) {
  const { id } = item;
  router.push({ path: `/roomDetail/${id}` });
  store.setRoomId(id);
  console.log("click");
}
const changePage = (pageNo: number) => {
  console.log(pageNo);
  store.getRoomList({ pageNo } as IRoomListParams);
};
</script>

<style scoped></style>
