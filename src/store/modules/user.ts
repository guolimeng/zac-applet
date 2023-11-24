/*
 * @作者: 郭莉猛
 * @Date: 2023-09-07 16:16:10
 * @FilePath: /uni-preset-vue-vite-ts 2/src/store/modules/user.ts
 * @描述:
 *
 */
import { defineStore } from "pinia";
import { getToken, setToken } from "@/utils/auth";

export const userStore: any = defineStore({
  id: "user", // id必填，且需要唯一
  state: () => {
    return {
      tooken: "",
      baseURL: "",
      themeColor: "#3B87FC",
      RoleRouterData: [],
      version: "v1",
      defaultRouter: "",
      domainTitle: "测试环境",
      isGetUserInfo: false,
      usernName: "",
      userInfo: {},
      loginType: "operator",
      operatorId: "",
    };
  },
  // 开启数据缓存
  getters: {
    // fullName: (state) => {
    //   return state.name + '丰'
    // }
  },
  // 开启数据缓存
  persist: {
    paths: ["usernName", "operatorId"],
  },
  actions: {
    // 用户登录
    login(userInfo: any, URL: any) {
      return new Promise((resolve, reject) => {
        URL(userInfo)
          .then((response: any) => {
            const { data } = response;

            setToken(data.token);
            this.operatorId = data.operatorId;
            resolve(data);
          })
          .catch((error: any) => {
            reject(error);
          });
      });
    },
    // 获取用户信息
    getInfo(Url: any) {
      return new Promise((resolve, reject) => {
        Url({ token: getToken() })
          .then((response) => {
            const { data } = response;

            const { operatorUserName } = data;

            this.userInfo = data;
            this.usernName = operatorUserName;

            this.isGetUserInfo = true;
            resolve(data);
          })
          .catch(() => {
            this.isGetUserInfo = false;
            reject();
          });
      });
    },
    getAuthsData() {
      // currentUserAuths({}).then((res) => {
      //   // console.log("获取用户权限", res);
      //   let authsData = res.data.loginUserAuths.map((item) => {
      //     return item.key;
      //   });
      //   // const authsData = res.data.loginUserAuths.reduce((item, cur) => {
      //   //   item[cur.key] = true;
      //   //   return item;
      //   // }, {});
      //   // console.log("obj", obj);
      //   // console.log("authsData", authsData);
      //   localStorage.setItem("authsData", JSON.stringify(authsData));
      // });
    },
    // 退出登录
    logout() {
      return new Promise<void>((resolve, reject) => {
        this.resetToken();
        // router.push({
        //   path: `/login`,
        // });
        // logout({ userToken: getToken() })
        //   .then((response) => {
        //     const { data } = response;
        //     this.resetToken();
        //     resolve(data);
        //   })
        //   .catch((error) => {
        //     reject(error);
        //   });
      });
    },
    // 删除 token
    resetToken() {
      return new Promise<void>((resolve) => {
        const store = userStore();
        // 将store中的状态重置到初始状态
        store.$reset();
        uni.clearStorageSync();
        resolve();
      });
    },
    setLoginType(type: string) {
      this.loginType = type;
    },
  },
});
