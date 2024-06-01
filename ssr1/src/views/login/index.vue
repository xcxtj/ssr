<template>
  <div class="login-page">
    <div class="left-part"></div>
    <!-- tabs -- -->

    <!-- <!-表单组件 -->

    <div class="right-part">
      <div class="login-panel">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane :label="t('login.loginTab')" name="login"></el-tab-pane>
          <el-tab-pane :label="t('login.signTab')" name="sign"></el-tab-pane>
        </el-tabs>
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
          <el-form-item prop="mobile">
            <el-input
              v-model="ruleForm.mobile"
              :placeholder="t('login.placeMobile')"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="ruleForm.password"
              :placeholder="t('login.placePass')"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="submitForm" class="login-btn" type="primary">{{
              loginText
            }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import "@/assets/scss/login/index.scss";
</style>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useSSRStore } from "@/stores";
import { useI18n } from "vue-i18n";
import useFormProperties from "@/composables/useFormProperties";
import useFormOperates from "@/composables/useFormOperates";

const { t, locale } = useI18n();
const router = useRouter();
const store = useSSRStore();
const { ruleForm, loginText, ruleFormRef, activeName, rules } =
  useFormProperties(t);
const { userLogin, userSign } = useFormOperates(router, ruleForm);
const handleClick = (e: any) => {
  const { name } = e.props;
  loginText.value = t(`login['${name}Btn']`);
};
const submitForm = () => {
 let res= ruleFormRef.value.validate((valid: any) => {
    if (valid) {
      if (activeName.value === "login") {
        userLogin(ruleForm);
      }
      if (activeName.value === "sign") {
        userSign(ruleForm);
      }
    } else {
      return false;
    }
  });
  if(res) router.push('/')
};
</script>
