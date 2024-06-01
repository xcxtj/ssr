import { reactive, ref } from "vue";
interface IRuleForm {
  mobile: string;
  password: string;
}
export default function useFormProperties(t: any) {
  const activeName = ref("login");
  const ruleFormRef = ref();
  const loginText = ref(t("login.loginBtn"));
  const ruleForm: IRuleForm = reactive({
    mobile: "",
    password: "",
  });
  const rules = reactive({
    mobile: [
      {
        required: true,
        min: 11,
        max: 11,
        message: t("login.placeMobile"),
        trigger: "blur",
      },
    ],
    password: [
      {
        required: true,
        message: t("login.placePass"),
        trigger: "blur",
      },
    ],
  });
  return {
    rules,
    ruleForm,
    ruleFormRef,
    loginText,
    activeName,
  };
}
