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
  __name: "electricityStatistics",
  props: {
    dateTypeName: {
      type: String,
      default: "日"
    },
    electrictysData: {
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
        grid: {
          left: "15%"
        },
        tooltip: {
          trigger: "axis",
          formatter: function(datas) {
            var res = datas[0].axisValueLabel + "<br/>";
            var marker = '<span style="display:inline-block; margin-right: 5px; border-radius: 25px; width:25px; height:25px; background-color:' + datas[0].color + ';"></span>';
            res += marker + '<span class="font-fzNumber" style="font-size:45px">' + datas[0].data + "</span><br/>";
            return res;
          }
        },
        xAxis: {
          type: "category",
          data: ["0时", "2时", "4时", "6时", "8时", "10时", "12时", "14时", "16时", "18时", "20时", "22时", "24时"]
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: `{value} kw*h`,
            width: 150
          }
        },
        series: [
          {
            name: "耗电量",
            data: [],
            type: "line"
          }
        ]
      },
      xDataDay: ["0时", "2时", "4时", "6时", "8时", "10时", "12时", "14时", "16时", "18时", "20时", "22时", "24时"],
      xDataWeek: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      xDataMonth: ["01日", "03日", "05日", "07日", "09日", "11日", "13日", "15日", "17日", "19日", "21日", "23日", "25日", "27日", "29日"]
    });
    const { options, id, width, height, xDataDay, xDataWeek, xDataMonth } = common_vendor.toRefs(data);
    const setData = () => {
      common_vendor.nextTick$1(() => {
        EChartsRef.value.$refs.chart.setOption(options.value);
      });
    };
    common_vendor.watch(
      () => [props.dateTypeName, props.electrictysData],
      (newVal) => {
        switch (newVal[0]) {
          case "日":
            options.value.xAxis.data = xDataDay.value;
            break;
          case "周":
            options.value.xAxis.data = xDataWeek.value;
            break;
          case "月":
            options.value.xAxis.data = xDataMonth.value;
            break;
        }
        options.value.series[0].data = newVal[1];
        setData();
      },
      { deep: true, immediate: true }
    );
    common_vendor.onMounted(() => {
      setData();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          name: "red-packet",
          color: "rgb(249,199,88)",
          size: "24"
        }),
        b: common_vendor.t(props.dateTypeName),
        c: common_vendor.sr(EChartsRef, "dc44e1a9-1", {
          "k": "EChartsRef"
        }),
        d: common_vendor.p({
          options: common_vendor.unref(options),
          customStyle: "height: 400px"
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dc44e1a9"], ["__file", "/Users/guolimeng/Desktop/work/uni-preset-vue-vite-ts 2/src/pages/businessManagement/components/electricityStatistics.vue"]]);
wx.createComponent(Component);
