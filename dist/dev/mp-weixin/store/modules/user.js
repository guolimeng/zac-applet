"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_auth = require("../../utils/auth.js");
const userStore = common_vendor.defineStore({
  id: "user",
  // id必填，且需要唯一
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
      operatorId: ""
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
    paths: ["usernName", "operatorId"]
  },
  actions: {
    // 用户登录
    login(userInfo, URL) {
      return new Promise((resolve, reject) => {
        URL(userInfo).then((response) => {
          const { data } = response;
          utils_auth.setToken(data.token);
          this.operatorId = data.operatorId;
          resolve(data);
        }).catch((error) => {
          reject(error);
        });
      });
    },
    // 获取用户信息
    getInfo(Url) {
      return new Promise((resolve, reject) => {
        Url({ token: utils_auth.getToken() }).then((response) => {
          const { data } = response;
          const { operatorUserName } = data;
          this.userInfo = data;
          this.usernName = operatorUserName;
          this.isGetUserInfo = true;
          resolve(data);
        }).catch(() => {
          this.isGetUserInfo = false;
          reject();
        });
      });
    },
    getAuthsData() {
    },
    // 退出登录
    logout() {
      return new Promise((resolve, reject) => {
        this.resetToken();
      });
    },
    // 删除 token
    resetToken() {
      return new Promise((resolve) => {
        const store = userStore();
        store.$reset();
        common_vendor.index.clearStorageSync();
        resolve();
      });
    },
    setLoginType(type) {
      this.loginType = type;
    }
  }
});
exports.userStore = userStore;
