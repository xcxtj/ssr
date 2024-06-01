<template>
  <div>
    <RoomDetail></RoomDetail>
  </div>
</template>

<script lang="ts">
import { defineComponent, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import type { IResultOr, IRoomDetailParams } from "@/api/interface";
import RoomDetail from "./components/detail.vue";
import { useRoute, useRouter } from "vue-router";
import { useSSRStore } from "@/stores";
import { storeToRefs } from "pinia";
export default {
  components: { RoomDetail },
  setup() {
    const route = useRoute();
    const store = useSSRStore();
    const id = Number(route.params.id);
    watchEffect(() => store.getRoomDetail({ id }));
    return {
      store,
      id,
      route,
    };
  },
  asyncData({ store, id, route }: any) {
    console.log("route", route);
    const { roomId } = storeToRefs(store);
    console.log("rid", roomId);
    return store.getRoomDetail({
      id: roomId.value || id,
    } as IRoomDetailParams);
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/detail/index.scss";
</style>
