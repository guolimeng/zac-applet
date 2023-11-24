"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../../../node-modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  _easycom_u_icon();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "statistics",
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    const data = common_vendor.reactive({
      statisticsData: [
        { title: "今日营收(元）", num: "0", color: "#006cff" },
        { title: "今日订单(笔〕", num: "0" },
        { title: "今日充电人数", num: "0" }
      ]
    });
    let { statisticsData } = common_vendor.toRefs(data);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(props.title),
        b: common_vendor.p({
          name: "arrow-right",
          size: "14px",
          top: "6",
          color: "rgb(140,142,152)"
        }),
        c: common_vendor.f(common_vendor.unref(statisticsData), (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.num),
            c: item.color,
            d: index
          };
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-18c8031b"], ["__file", "/Users/guolimeng/Desktop/work/uni-preset-vue-vite-ts 2/src/pages/areaManagement/components/statistics.vue"]]);
wx.createComponent(Component);
