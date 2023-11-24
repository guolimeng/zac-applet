/*
 * @作者: 郭莉猛
 * @Date: 2023-08-25 19:45:55
 * @FilePath: /uni-preset-vue-vite-ts 2/src/main.ts
 * @描述:
 *
 */
import { createSSRApp } from "vue";
import App from "./App.vue";
import uviewPlus from "uview-plus";
import { createPinia } from "pinia";
// import piniaPersist from "pinia-plugin-persist";
import { createPersistedState } from "pinia-plugin-persistedstate";

// import api from "@/api/index.js";

export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();
  pinia.use(
    createPersistedState({
      storage: {
        getItem(key: string): string | null {
          return uni.getStorageSync(key);
        },
        setItem(key: string, value: string) {
          uni.setStorageSync(key, value);
        },
      },
      auto: true, // 启用所有Store默认持久化
    })
  );
  // 配置全局api
  // app.config.globalProperties.$api = api;
  app.use(pinia); // 挂载pinia
  app.use(uviewPlus);
  return {
    app,
  };
}
