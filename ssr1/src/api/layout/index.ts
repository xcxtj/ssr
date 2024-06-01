import airbnb from "@/db";
import type { IResultOr } from "../interface";
import { ElLoading } from "element-plus";

const storeName = Object.keys(airbnb.languageObjectStore)[0];
export const saveLanguageApi = async (lang: any) => {
  const loading = ElLoading.service({
    lock: true,
    background: "rgba(0,0,0,0.1)",
  });
  const resultOr: IResultOr = await airbnb.airbnbDB
    .getItem(storeName, 1)
    .then((res: any) => {
      return {
        code: "000000",
        message: "操作成功",
        result: res || null,
        success: true,
      };
    });
  const { success } = resultOr;
  let obj = {};
  if (success) obj = { name: lang, id: 1 };
  else obj = { name: lang };
  const result: IResultOr = await airbnb.airbnbDB
    .updateItem(storeName, 1)
    .then((res: any) => {
      setTimeout(() => {
        loading.close();
      }, 200);
      return {
        code: "000000",
        message: "操作成功",
        result: null,
        success: true,
      };
    });
  return result;
};
export const fetchLanguageApi = async () => {
  const loading = ElLoading.service({
    lock: true,
    background: "rgba(0,0,0,0.1)",
  });
  const result: IResultOr = await airbnb.airbnbDB
    .getItem(storeName, 1)
    .then((res: any) => {
      setTimeout(() => {
        loading.close();
      }, 200);
      return {
        code: "000000",
        message: "操作成功",
        result: res || null,
        success: true,
      };
    });
  return result;
};
