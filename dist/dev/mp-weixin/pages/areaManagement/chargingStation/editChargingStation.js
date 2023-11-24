"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Math) {
  (stationInfo + stationConfig)();
}
const stationInfo = () => "./components/stationInfo.js";
const stationConfig = () => "./components/stationConfig.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "editChargingStation",
  setup(__props) {
    const orgId = common_vendor.ref("");
    const stationId = common_vendor.ref("");
    common_vendor.onLoad((option) => {
      orgId.value = option.orgId;
      stationId.value = option.stationId;
    });
    const defaultActive = common_vendor.ref("1");
    common_vendor.reactive({
      tabsData: [
        {
          value: "1",
          name: "基本信息"
        },
        {
          value: "2",
          name: "充电站配置"
        }
      ]
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(defaultActive) == "1"
      }, common_vendor.unref(defaultActive) == "1" ? {
        b: common_vendor.p({
          stationId: common_vendor.unref(stationId)
        })
      } : {}, {
        c: common_vendor.unref(defaultActive) == "2"
      }, common_vendor.unref(defaultActive) == "2" ? {
        d: common_vendor.p({
          stationId: common_vendor.unref(stationId),
          orgId: common_vendor.unref(orgId)
        })
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/guolimeng/Desktop/work/uni-preset-vue-vite-ts 2/src/pages/areaManagement/chargingStation/editChargingStation.vue"]]);
wx.createPage(MiniProgramPage);
