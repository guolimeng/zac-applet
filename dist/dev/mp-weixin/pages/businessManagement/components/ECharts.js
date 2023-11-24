"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Math) {
  LEchart();
}
const LEchart = () => "../../../components/l-echart/l-echart.js";
const _sfc_main = {
  __name: "ECharts",
  props: {
    customStyle: {
      type: String,
      default: ""
    },
    options: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const echarts = require("../../../static/echarts.min");
    let chart = common_vendor.ref();
    const state = common_vendor.reactive({
      option: {}
    });
    state.option = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: [2, 5, 4, 7, 4, 5, 10],
          type: "line"
        }
      ]
    };
    common_vendor.onMounted(() => {
      chart.value.init(echarts, (chart2) => {
        chart2.setOption(props.options);
      });
    });
    const init = () => {
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.sr(chart, "9b89c476-0", {
          "k": "chart"
        }),
        b: common_vendor.o(init),
        c: common_vendor.p({
          customStyle: props.customStyle
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9b89c476"], ["__file", "/Users/guolimeng/Desktop/work/uni-preset-vue-vite-ts 2/src/pages/businessManagement/components/ECharts.vue"]]);
wx.createComponent(Component);
