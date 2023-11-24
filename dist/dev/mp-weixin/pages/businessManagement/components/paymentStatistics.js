"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../../../node-modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  (_easycom_u_icon + ECharts)();
}
const ECharts = () => "./ECharts.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "paymentStatistics",
  props: {
    dateTypeName: {
      type: String,
      default: "日"
    },
    paymentStatisticsData: {
      type: Array,
      default: []
    }
  },
  setup(__props) {
    const props = __props;
    const EChartsRef = common_vendor.ref();
    const data = common_vendor.reactive({
      id: "ECharts1",
      width: "100%",
      height: "400px",
      options: {
        tooltip: {
          trigger: "item"
        },
        series: [
          {
            type: "pie",
            radius: "50%",
            data: [],
            label: {
              // alignTo: "edge",
              // edgeDistance: "18%",
              // bleedMargin: 16
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      }
    });
    const { options, id, width, height } = common_vendor.toRefs(data);
    const setData = () => {
      common_vendor.nextTick$1(() => {
        EChartsRef.value.$refs.chart.setOption(options.value);
      });
    };
    common_vendor.watch(
      () => [props.dateTypeName, props.paymentStatisticsData],
      (newVal) => {
        options.value.series[0].data = newVal[1];
        setData();
      },
      { deep: true, immediate: true }
    );
    common_vendor.onMounted(() => {
      setData();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          name: "red-packet",
          color: "rgb(249,199,88)",
          size: "24"
        }),
        b: common_vendor.t(props.dateTypeName),
        c: props.paymentStatisticsData.length > 0
      }, props.paymentStatisticsData.length > 0 ? {
        d: common_vendor.sr(EChartsRef, "3a1c3804-1", {
          "k": "EChartsRef"
        }),
        e: common_vendor.p({
          options: common_vendor.unref(options),
          customStyle: "height: 400px"
        })
      } : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3a1c3804"], ["__file", "/Users/guolimeng/Desktop/work/uni-preset-vue-vite-ts 2/src/pages/businessManagement/components/paymentStatistics.vue"]]);
wx.createComponent(Component);
