import { ElLoading } from "element-plus";
import airbnb from "../../db";
import type { IResultOr } from "../interface";

const storeName = Object.keys(airbnb.orderObjectStore)[0];

// Mock接口：立即预定
export async function saveOrderApi(params: any) {
  const userId = localStorage.getItem("userId");
  const loading = ElLoading.service({
    lock: true,
    background: "rgba(0,0,0,0.1)",
  });
  const hasOrderId = await new Promise((resolve, reject) => {
    airbnb.airbnbDB.getList(storeName).then((res: any) => {
      setTimeout(() => {
        loading.close();
      }, 200);
      res &&
        res.filter((item: any) => {
          if (item.orderId === params.orderId && item.userId === userId) {
            resolve(true);
          }
        });
      resolve(false);
    });
  });
  let result: IResultOr;
  if (hasOrderId) {
    result = await new Promise((resolve, reject) => {
      resolve({
        code: "000001",
        success: false,
        message: "订单已存在",
        result: null,
      });
    });
  } else {
    Object.assign(params, { userId });
    result = await new Promise((resolve, reject) => {
      airbnb.airbnbDB.updateItem(storeName, params).then((res: any) => {
        setTimeout(() => {
          loading.close();
        }, 200);
        resolve({
          code: "000000",
          success: true,
          message: "操作成功",
          result: null,
        });
      });
    });
  }
  return result;
}
// Mock接口：订单列表
export async function fetchOrderApi() {
  const userId = localStorage.getItem("userId");
  const loading = ElLoading.service({
    lock: true,
    background: "rgba(0,0,0,0.1)",
  });
  const result: IResultOr = await new Promise((resolve, reject) => {
    airbnb.airbnbDB.getList(storeName).then((res: any) => {
      setTimeout(() => {
        loading.close();
      }, 200);
      res = res.filter((item: any) => item.userId === userId);
      setTimeout(() => {
        // 有意延迟200毫秒，感受异步组件的效果
        resolve({
          code: "000000",
          success: true,
          message: "操作成功",
          result: res || null,
        });
      }, 200);
    });
  });
  return result;
}
