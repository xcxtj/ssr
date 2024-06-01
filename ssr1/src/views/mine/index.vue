<template>
  <div>
    <p>{{ code }}</p>
  </div>
</template>

<script setup lang="ts">
import mockHttp from "@/mock/mockhttp";
import { reactive } from "vue";
function loginapi(param: any) {
  return mockHttp.post("api/login", param);
}
loginapi({ username: "admin", password: "123456" }).then((res) => {
  console.log(res);
});
function getlist() {
  return mockHttp.get("/roomList");
}
getlist().then((res) => {
  console.log(res);
  let { success, code, data } =reactive( res);
  console.log(success, code, data);
  
});
</script>

<style scoped></style>
@/mock/mockhttp
