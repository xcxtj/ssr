<template>
  <el-pagination
    v-model:currentPage="pageNo"
    :page-size="pageSize"
    :total="total"
    background
    layout="prev,pager,next"
    prev-text="<<"
    next-text=">>"
    @current-change="changePage"
  >
  </el-pagination>
</template>

<script setup lang="ts">
import { useSSRStore } from "@/stores";
import { storeToRefs } from "pinia";
const store = useSSRStore();
let { pageNo, pageSize, total } = storeToRefs(store);
const emit = defineEmits<{ (e: "changePage", pageNo: number): any }>();
const changePage = (pageNo: number) => {
  emit("changePage", pageNo);
};
</script>

<style scoped></style>
