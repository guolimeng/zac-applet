"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Math) {
  (tabs + totalRevenue)();
}
const totalRevenue = () => "./totalRevenue.js";
const tabs = () => "../components/tabs.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "businessList",
  setup(__props) {
    const defaultActive = common_vendor.ref("0");
    const data = common_vendor.reactive({
      tabsData: [
        { name: "总营收", value: "0" },
        { name: "片区营收", value: "1" },
        { name: "充电站营收", value: "2" }
      ]
    });
    const { tabsData } = common_vendor.toRefs(data);
    const changeTab = (item, val) => {
      defaultActive.value = val;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(changeTab),
        b: common_vendor.p({
          tabsData: common_vendor.unref(tabsData),
          defaultActive: defaultActive.value
        }),
        c: defaultActive.value === "0"
      }, defaultActive.value === "0" ? {} : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2cdc3592"], ["__file", "/Users/guolimeng/Desktop/work/uni-preset-vue-vite-ts 2/src/pages/businessManagement/businessManagement/businessList.vue"]]);
wx.createPage(MiniProgramPage);
