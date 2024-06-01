import airbnb from "@/db";
import { http } from "@/utils/http";
import { ElLoading } from "element-plus";
export const reqCategoryList = () => {
  return http.httpRequestGet(
    "http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList",
    {}
  );
};
export const fetchMock = async () => {
  const loading = ElLoading.service({
    lock: true, //是否锁定屏幕
    background: "rgba(0,0,0,0.1)", //背景颜色
  });
  const result = await airbnb.airbnbDB.getList("room");
  setTimeout(() => {
    loading.close();
  }, 1000);
  if (result) return { code: 200, data: result, message: "success" };
  else return { code: 204, data: [], message: "error" };
};
