import { defineStore, type Store } from "pinia";
import type AllStateTypes from "./interface";
import type { InjectionKey } from "vue";
import { saveLanguageApi } from "@/api/layout";
import { fetchRoomList } from "@/api/home";
import { fetchRoomDetail } from "@/api/detail";
import type { IRoomListParams, IRoomDetailParams } from "@/api/interface";
// export const key: InjectionKey<Store<AllStateTypes>> = Symbol("storekey");
export const useSSRStore = defineStore("ssr", {
  state: () => ({
    route: null,
    locale: null, //语言包
    userStatus: 0, //登录态
    roomList: [], //房间列表
    pageNo: 1, //当前页
    pageSize: 6, //每页数量
    total: 0, //总数
    cityCode: "hz", //城市编码
    roomDetail: {}, //房间详情
    roomId: null, //房间ID
    orderVisible: false, //订单弹窗
    orderList: [], //订单列表
  }),
  actions: {
    setLanguage(payload: any) {
      this.locale = payload;
      return this.locale;
    },
    setUserStatus(payload: any) {
      this.userStatus = payload;
      return this.userStatus;
    },
    setRoomList(payload: any) {
      this.roomList = payload;
      return this.roomList;
    },
    setRoomDetail(payload: any) {
      this.roomDetail = payload;
      return this.roomDetail;
    },
    setRoomId(payload: any) {
      this.roomId = payload;
      return this.roomId;
    },
    setOrderVisible(payload: any) {
      this.orderVisible = payload;
      return this.orderVisible;
    },
    setOrderList(payload: any) {
      this.orderList = payload;
      return this.orderList;
    },
    async saveLanguage(language: any) {
      let { success } = await saveLanguageApi(language);
      if (success) {
        this.setLanguage(language);
        console.log("保存成功", language);
      }
    },
    async getRoomList(payload: IRoomListParams) {
      return new Promise(async (resolve, reject) => {
        const { pageNo, cityCode = this.cityCode } = payload;
        this.pageNo = pageNo;
        const params = {
          pageNo,
          pageSize: this.pageSize,
          cityCode,
        };
        fetchRoomList(params).then((res) => {
          let { success, result } = res;
          const orders = result.orders;
          const total = result.total;
          if (success) {
            this.setRoomList(orders.data);
            this.total = total;
            resolve(true);
          }
        });
      });
    },

    async getRoomDetail(payload: IRoomDetailParams) {
      return new Promise(async (resolve, reject) => {
        let { success, result } = await fetchRoomDetail(payload);
        if (success) {
          console.log("详情页数据保存到Vuex中");
          this.setRoomDetail(result);
          resolve(true);
        }
      });
    },
  },
});
