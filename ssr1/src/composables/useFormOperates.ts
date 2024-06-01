import { userLoginApi, userLogoutApi, userSignApi } from "@/api/login";
import type { IResultOr } from "@/api/interface";
import { getCurrentInstance } from "vue";
import { useSSRStore } from "@/stores";
import { useRoute } from "vue-router";

interface IRuleForm {
  mobile: string;
  password: string;
}

export default function useFormOperates(router: any, params: any) {
  const { proxy }: any = getCurrentInstance();
  const store = useSSRStore();
  const route = useRoute();

  const userLogin = async (params: IRuleForm) => {
    const res: IResultOr = await userLoginApi(params);
    let { success, message, result } = res;
    if (success) {
      let { status, userId } = result;

      localStorage.setItem("userId", userId);
      store.setUserStatus(status);
      let { redirect } = route.query;

      router.push({ path: redirect || "/" });
      proxy.$message.success(message);
    } else {
      proxy.$message.error(message);
    }
    console.log("res", res);
  };
  const userSign = async (params: IRuleForm) => {
    const res: IResultOr = await userSignApi(params);
    let { success, message } = res;
    if (success) {
      proxy.$message.success(message);
    } else {
      proxy.$message.error(message);
    }
    console.log("res", res);
  };
  return {
    userSign,
    userLogin,
  };
}
