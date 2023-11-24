<!--
 * @作者: 郭莉猛
 * @Date: 2023-08-25 19:45:55
 * @FilePath: /uni-preset-vue-vite-ts 2/src/App.vue
 * @描述: 
 * 
-->
<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";

import { getToken } from "@/utils/auth";

onLaunch(() => {
  console.log("App Launch");
  if(!getToken()) {
    uni.navigateTo({
      url: '/pages/login/login',
    });
  }
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="scss">
@import "uview-plus/index.scss";
</style>
