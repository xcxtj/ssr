<template>
  <Teleport to="#app">
    <div class="mask" @click="closeMask"></div>
  </Teleport>
  <ul v-if="orderData.length > 0">
    <li v-for="(item, index) in orderData" :key="index" @click="toDetail(item)">
      <img v-img-lazy="item.pictureUrl" />
      <div class="mess">
        <p class="title">{{ item.title }}</p>
        <p class="info">
          ¥{{ item.price }}/{{ t("detail.night") }} · {{ item.personNumber
          }}{{ t("detail.person") }}
        </p>
      </div>
    </li>
  </ul>
  <el-empty v-else class="loading-block" :description="t('common.empty')" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { fetchOrderApi } from "@/api/order";
import { reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { useSSRStore } from "@/stores";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const store = useSSRStore();
const count = ref(0);
const router = useRouter();
let orderData = reactive<Array<any>>([]);
function fetchOrder() {
  return new Promise(async (resolve, reject) => {
    let res = await fetchOrderApi();
    const { result, success, message } = res;
    if (success) {
      console.log("成功");
      orderData = result;
      console.log(orderData);
      resolve(result); //必须resolve，否则无法渲染数据
    } else {
      ElMessage.error(message);
    }
  });
}

if (store.userStatus) {
  console.log("submit");
 await fetchOrder();
} else {
  let { pathname } = window.location;
  router.replace({
    path: "/login",
    query: {
      redirect: pathname,
    },
  });
  closeMask();
}

function closeMask() {
  store.setOrderVisible(false);
}
function toDetail(item: any) {
  const { orderId: id } = item;
  router.push({ path: `/roomDetail/${id}` });
  store.setRoomId(id);
}
</script>

<style scoped lang="scss">
ul {
  @include placeholder-order;
}
li {
  @include flex-layout(row, space-between, center);
  border-bottom: 1px solid #eee;
  padding: 10px 0;
  &:last-child {
    border-bottom: none;
  }
  img {
    width: 65px;
    height: 45px;
    border-radius: 4px;
    margin-right: 5px;
    object-fit: cover;
  }
  .mess {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-left: 5px;
    width: 100px;
    overflow: hidden;
    p {
      line-height: 16px;
      font-weight: normal;
      margin: 5px 0;
      max-width: 100px;
    }
    .title {
      font-weight: bold;
      color: #333;
      font-size: 14px;
      display: inline-block;
      @include line-text-overflow;
    }
    .info {
      color: #666;
      font-size: 12px;
    }
  }
}
</style>
