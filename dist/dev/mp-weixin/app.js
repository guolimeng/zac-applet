"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const utils_auth = require("./utils/auth.js");
if (!Math) {
  "./pages/home/index.js";
  "./pages/areaManagement/areaManagement/areaList.js";
  "./pages/areaManagement/areaManagement/addArea.js";
  "./pages/areaManagement/areaManagement/areaDetails.js";
  "./pages/areaManagement/areaManagement/components/paymentPageCustom.js";
  "./pages/areaManagement/areaManagement/components/minimumConsumption.js";
  "./pages/areaManagement/chargingStation/chargingStationDetails.js";
  "./pages/areaManagement/chargingStation/components/addChargingStation.js";
  "./pages/areaManagement/chargingStation/components/addShortcutCreateSite.js";
  "./pages/areaManagement/chargingStation/components/selectArea.js";
  "./pages/areaManagement/chargingStation/editChargingStation.js";
  "./pages/areaManagement/deviceMg/leaveDevice.js";
  "./pages/businessManagement/businessManagement/businessList.js";
  "./pages/mine/index.js";
  "./pages/login/login.js";
  "./pages/billingTemplate/index.js";
  "./pages/billingTemplate/addTemplateList.js";
  "./pages/ledgerManagement/index.js";
  "./pages/ledgerManagement/addTemplateList.js";
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "App",
  setup(__props) {
    common_vendor.onLaunch(() => {
      console.log("App Launch");
      if (!utils_auth.getToken()) {
        common_vendor.index.navigateTo({
          url: "/pages/login/login"
        });
      }
    });
    common_vendor.onShow(() => {
      console.log("App Show");
    });
    common_vendor.onHide(() => {
      console.log("App Hide");
    });
    return () => {
    };
  }
});
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/guolimeng/Desktop/work/uni-preset-vue-vite-ts 2/src/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  const pinia = common_vendor.createPinia();
  pinia.use(
    common_vendor.createPersistedState({
      storage: {
        getItem(key) {
          return common_vendor.index.getStorageSync(key);
        },
        setItem(key, value) {
          common_vendor.index.setStorageSync(key, value);
        }
      },
      auto: true
      // 启用所有Store默认持久化
    })
  );
  app.use(pinia);
  app.use(common_vendor.uviewPlus);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
