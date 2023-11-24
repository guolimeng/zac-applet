"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Math) {
  (tabs + areaInfo + areaConfig)();
}
const tabs = () => "../components/tabs.js";
const areaInfo = () => "./components/areaInfo.js";
const areaConfig = () => "./components/areaConfig.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "addArea",
  setup(__props) {
    const orgId = common_vendor.ref("");
    common_vendor.onLoad((option) => {
      orgId.value = option.orgId;
      console.log("片区option", option);
    });
    const defaultActive = common_vendor.ref("1");
    const data = common_vendor.reactive({
      tabsData: [
        {
          value: "1",
          name: "基本信息"
        },
        {
          value: "2",
          name: "片区配置"
        }
      ]
    });
    const changeTab = (item) => {
      defaultActive.value = item.value;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(orgId)
      }, common_vendor.unref(orgId) ? {
        b: common_vendor.o(changeTab),
        c: common_vendor.p({
          tabsData: common_vendor.unref(data).tabsData,
          defaultActive: common_vendor.unref(defaultActive)
        })
      } : {}, {
        d: common_vendor.unref(defaultActive) == "1"
      }, common_vendor.unref(defaultActive) == "1" ? {
        e: common_vendor.p({
          orgId: common_vendor.unref(orgId)
        })
      } : {}, {
        f: common_vendor.unref(defaultActive) == "2"
      }, common_vendor.unref(defaultActive) == "2" ? {
        g: common_vendor.p({
          orgId: common_vendor.unref(orgId)
        })
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/guolimeng/Desktop/work/uni-preset-vue-vite-ts 2/src/pages/areaManagement/areaManagement/addArea.vue"]]);
wx.createPage(MiniProgramPage);
