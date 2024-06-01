<template>
  <div class="record-page">
    <div class="main-wrapper">
      <el-skeleton :loading="loading" animated>
        <template #template>
          <div class="column-style">
            <div class="item" v-for="i in 9" :key="i">
              <el-skeleton-item
                variant="image"
                style="width: 315px; height: 240px; border-radius: 4px"
              ></el-skeleton-item>
              <el-skeleton-item
                variant="p"
                style="width: 100%; margin-top: 15px"
              ></el-skeleton-item>
              <el-skeleton-item
                variant="p"
                style="width: 30%"
              ></el-skeleton-item>
            </div>
          </div>
        </template>
        <template #default>
          <div class="column-style" v-if="recordData.length > 0">
            <div
              class="item"
              @click="toDetail(item)"
              v-for="(item, index) in recordData"
              :key="index"
            >
              <el-image :src="item.pictureUrl"></el-image>
              <p class="title">{{ item.title }}</p>
              <p class="price">元{{ item.price }}</p>
            </div>
          </div>
          <el-empty v-else description="暂无浏览记录哦~"></el-empty>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fetchRecordApi } from "@/api/record";
import { useSSRStore } from "@/stores";
import { ElMessage } from "element-plus";
import { onMounted } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
const recordData = ref();
const router = useRouter();
const store = useSSRStore();
const loading = ref(true);
onMounted(() => {
  if (store.userStatus) {
    console.log("submit");
    fetchRecord();
  } else {
    let { pathname } = window.location;
    router.replace({
      path: "/login",
      query: {
        redirect: pathname,
      },
    });
  }
});

async function fetchRecord() {
  let res = await fetchRecordApi();
  const { result, success, message } = res;
  loading.value = false;

  if (success) {
    console.log("成功");
    recordData.value = result;
    console.log(recordData.value);

    return result;
  } else {
    ElMessage.error(message);
  }
}
function toDetail(item: any) {
  const { recordId: id } = item;
  router.push({ path: `/roomDetail/${id}` });
  store.setRoomId(id);
}
</script>

<style lang="scss">
.record-page {
  .main-wrapper {
    @include main-wapper(30px);
    .column-style {
      column-count: 3;
      .item {
        width: 315px;
        overflow: hidden;
        margin-bottom: 25px;
        cursor: pointer;
        text-align: left;
        display: inline-block;
        img {
          width: 315px;
          height: auto;
          border-radius: 4px;
        }
        .title {
          width: 315px;
          font-size: 18px;
          margin: 15px 0px;
          font-weight: bold;
        }
        .price {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
