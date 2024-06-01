<template>
  <div v-if="roomDetail && roomDetail.info && roomDetail.owner">
    <el-carousel
      v-if="roomDetail.imgs && roomDetail.imgs.length > 0"
      trigger="click"
      type="card"
      height="380px"
      indicator-position="none"
      :interval="3000"
    >
      <el-carousel-item v-for="(item, index) in roomDetail.imgs" :key="index">
        <img v-img-lazy="item"
      /></el-carousel-item>
    </el-carousel>
    <div class="room-detail">
      <div class="detail-part">
        <h2>{{ roomDetail.title }}</h2>
        <div class="info">
          <span class="room"
            >{{ roomDetail.info.room }} {{ t("detail.rooms") }}</span
          >
          <span class="bed"
            >{{ roomDetail.info.bed }} {{ t("detail.beds") }}</span
          >
          <span class="toilet"
            >{{ roomDetail.info.toilet }} {{ t("detail.bathrooms") }}</span
          >
          <span class="live-number"
            >{{ t("detail.living") }} {{ roomDetail.info.liveNumber }}
            {{ t("detail.personNumber") }}</span
          >
        </div>
        <div class="tags">
          <el-tag size="small"
            >{{ roomDetail.info.remarks }} {{ t("detail.remarks") }}</el-tag
          >
          <el-tag
            size="small"
            class="ml-10"
            type="danger"
            v-if="roomDetail.info.metro"
            >{{ t("detail.nearSubway") }}</el-tag
          >
          <el-tag
            size="small"
            class="ml-10"
            type="warning"
            v-if="roomDetail.info.parking"
            >{{ t("detail.freeParking") }}</el-tag
          >
          <el-tag
            size="small"
            class="ml-10"
            type="success"
            v-if="roomDetail.info.luggage"
            >{{ t("detail.luggage") }}</el-tag
          >
        </div>
        <hr />
        <div class="owner-detail">
          <img :src="roomDetail.owner.avatar" />
          <div class="info">
            <p>{{ t("detail.landlord") }}：{{ roomDetail.owner.name }}</p>
            <p>
              <span v-if="roomDetail.owner.certify">{{
                t("detail.authenticated")
              }}</span>
              <span v-if="roomDetail.info.goodOwner">{{
                t("detail.greatlandlord")
              }}</span>
            </p>
          </div>
        </div>
        <div class="introduce">{{ roomDetail.owner.introduce }}</div>
      </div>
      <div class="form-part">
        <el-form
          ref="ruleForm"
          :model="orderForm"
          label-position="top"
          class="order-ruleForm"
        >
          <el-form-item prop="personNumber" :label="t('detail.personNumber')">
            <select v-model="orderForm.personNumber">
              <option v-for="item in 3" :value="item" :key="item">
                {{ item }}
              </option>
            </select>
          </el-form-item>
          <el-form-item>
            <el-button class="btn-primary" type="primary" @click="submitForm">{{
              t("detail.order")
            }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useSSRStore } from "@/stores";
import { useI18n } from "vue-i18n";
import { saveOrderApi } from "@/api/order";
import { saveRecordApi } from "@/api/record";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const store = useSSRStore();
const ruleForm = ref();
const roomDetail = computed(() => store.roomDetail);
const orderForm = reactive({
  personNumber: 1,
});
function submitForm() {
  if (store.userStatus) {
    console.log("submit");
    saveOrder();
  } else {
    let { pathname } = window.location;
    router.replace({
      path: "/login",
      query: {
        redirect: pathname,
      },
    });
  }
}
async function saveOrder() {
  const { id: orderId } = route.params;
  const { title, price, imgs } = roomDetail.value;
  const personNumber = orderForm.personNumber;
  const params = {
    orderId,
    personNumber,
    title,
    price,
    pictureUrl: imgs[0],
  };
  let res = await saveOrderApi(params);
  let { success, message } = res;
  if (success) {
    console.log("success");
    ElMessage.success(t("detail.orderSuccess"));
  } else {
    ElMessage.error(message);
  }
}
onMounted(() => {
  saveRecord();
});
async function saveRecord() {
  const { id: recordId } = route.params;
  const { title, price, imgs, personNumber } = roomDetail.value;
  const params = {
    recordId,
    personNumber,
    title,
    price,
    pictureUrl: imgs[0],
  };
  let res = await saveRecordApi(params);
  let { success, message } = res;
  if (success) {
    console.log("success");
  } else {
    ElMessage.error(message);
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/detail/index.scss";
@import "@/assets/scss/common/toast.scss";
</style>
