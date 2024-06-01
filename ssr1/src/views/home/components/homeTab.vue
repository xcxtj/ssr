<template>
  <div>
    <el-tabs v-model="cityCode" @tab-click="cityClick" type="card">
      <el-tab-pane
        v-for="(item, index) in cityArr"
        :key="index"
        :label="item.cityName"
        :name="item.cityCode"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useSSRStore } from "@/stores";
import type { IResultOr, IRoomListParams } from "@/api/interface";

const store = useSSRStore();
const cityCode = ref(store.cityCode);
const cityArr = [
  {
    cityCode: "hz",
    cityName: "杭州",
  },
  {
    cityCode: "sh",
    cityName: "上海",
  },
  {
    cityCode: "nj",
    cityName: "南京",
  },
  {
    cityCode: "cd",
    cityName: "成都",
  },
  {
    cityCode: "cq",
    cityName: "重庆",
  },
  {
    cityCode: "bj",
    cityName: "北京",
  },
  {
    cityCode: "sz",
    cityName: "苏州",
  },
];
const cityClick = (tab: any) => {
  const { name } = tab.props;
  cityCode.value = name;
  store.getRoomList({ cityCode: name, pageNo: 1 } as IRoomListParams);
};
</script>

<style scoped></style>
