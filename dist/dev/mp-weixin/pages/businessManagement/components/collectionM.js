"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_m_modal_data2 = common_vendor.resolveComponent("m-modal-data");
  (_easycom_u_icon2 + _easycom_m_modal_data2)();
}
const _easycom_u_icon = () => "../../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_m_modal_data = () => "../../../components/m-modal-data/m-modal-data.js";
if (!Math) {
  (_easycom_u_icon + ECharts + _easycom_m_modal_data)();
}
const ECharts = () => "./ECharts.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "collectionM",
  props: {
    dateTypeName: {
      type: String,
      default: "日"
    },
    chongd: {
      type: Number,
      default: 0
    },
    chongz: {
      type: Number,
      default: 0
    },
    orderData: {
      type: Array,
      default: []
    },
    moneyData: {
      type: Array,
      default: []
    }
  },
  setup(__props) {
    const props = __props;
    const EChartsOrderRef = common_vendor.ref();
    const EChartsMoneyRef = common_vendor.ref();
    const modalShow = common_vendor.ref(false);
    const data = common_vendor.reactive({
      id: "ECharts1",
      width: "100%",
      height: "400px",
      options: {
        grid: {
          left: "15%"
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: "category",
          data: ["0时", "2时", "4时", "6时", "8时", "10时", "12时", "14时", "16时", "18时", "20时", "22时", "24时"]
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: `{value} 笔`
          }
        },
        series: [
          {
            name: "订单数",
            data: [],
            type: "line",
            // zlevel: 1,
            itemStyle: {
              // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              //   { offset: 0, color: '#83bff6' },
              //   { offset: 0.5, color: '#188df0' },
              //   { offset: 1, color: '#188df0' }
              // ])
            }
          }
        ]
      },
      options2: {
        grid: {
          left: "15%"
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: "category",
          data: ["0时", "2时", "4时", "6时", "8时", "10时", "12时", "14时", "16时", "18时", "20时", "22时", "24时"]
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: `{value} 元`
          }
        },
        series: [
          {
            name: "流水金额",
            data: [],
            // data: [0, 20, 50, 30, 70, 130, 180],
            type: "line"
          }
        ]
      },
      modalTitle: "流水金额",
      modalContent: "包含微信、支付宝支付的扫码充电流水和储值卡、包月卡充值流水，即实际总收入，已扣除过手续费",
      xDataDay: ["0时", "2时", "4时", "6时", "8时", "10时", "12时", "14时", "16时", "18时", "20时", "22时", "24时"],
      xDataWeek: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      xDataMonth: ["01日", "03日", "05日", "07日", "09日", "11日", "13日", "15日", "17日", "19日", "21日", "23日", "25日", "27日", "29日"]
    });
    const { options, options2, modalTitle, modalContent, xDataDay, xDataWeek, xDataMonth } = common_vendor.toRefs(data);
    const setData = () => {
      common_vendor.nextTick$1(() => {
        EChartsOrderRef.value.$refs.chart.setOption(options.value);
        EChartsMoneyRef.value.$refs.chart.setOption(options.value);
      });
    };
    common_vendor.watch(
      () => [props.dateTypeName, props.orderData, props.moneyData],
      (newVal) => {
        switch (newVal[0]) {
          case "日":
            options.value.xAxis.data = xDataDay.value;
            options2.value.xAxis.data = xDataDay.value;
            break;
          case "周":
            options.value.xAxis.data = xDataWeek.value;
            options2.value.xAxis.data = xDataWeek.value;
            break;
          case "月":
            options.value.xAxis.data = xDataMonth.value;
            options2.value.xAxis.data = xDataMonth.value;
            break;
        }
        options.value.series[0].data = newVal[1];
        options2.value.series[0].data = newVal[2];
        setData();
      },
      { deep: true, immediate: true }
    );
    common_vendor.onMounted(() => {
      setData();
    });
    const clickBox = (type) => {
      switch (type) {
        case "0":
          modalTitle.value = "流水金额";
          modalContent.value = "包含微信、支付宝支付的扫码充电流水和储值卡、包月卡充值流水，即实际总收入，已扣除过手续费";
          break;
        case "1":
          modalTitle.value = "扫码流水";
          modalContent.value = "包含微信、支付宝支付的扫码充电流水，按当天订单结算时间为统计口径，已扣除过手续费";
          break;
        case "2":
          modalTitle.value = "充值流水";
          modalContent.value = "包含实体储值卡、实体包月卡、电子储值卡、电子包月卡的充值流水，按当天订单结算时间为统计口径，已扣除过手续费";
          break;
      }
      modalShow.value = true;
    };
    const handleClose = () => {
      modalShow.value = false;
    };
    const handleConfirm = () => {
      modalShow.value = false;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          name: "red-packet",
          color: "rgb(249,199,88)",
          size: "24"
        }),
        b: common_vendor.t(props.dateTypeName),
        c: common_vendor.p({
          name: "question-circle",
          color: "rgb(144, 147, 153)",
          top: "7",
          size: "16"
        }),
        d: common_vendor.t(parseFloat(props.chongd / 100) + parseFloat(props.chongz / 100)),
        e: common_vendor.o(($event) => clickBox("0")),
        f: common_vendor.p({
          name: "question-circle",
          color: "rgb(144, 147, 153)",
          top: "7",
          size: "16"
        }),
        g: common_vendor.t(parseFloat(props.chongd / 100)),
        h: common_vendor.o(($event) => clickBox("1")),
        i: common_vendor.p({
          name: "question-circle",
          color: "rgb(144, 147, 153)",
          top: "7",
          size: "16"
        }),
        j: common_vendor.t(parseFloat(props.chongz / 100)),
        k: common_vendor.o(($event) => clickBox("2")),
        l: common_vendor.sr(EChartsOrderRef, "a42885f6-4", {
          "k": "EChartsOrderRef"
        }),
        m: common_vendor.p({
          id: "echartsID",
          options: common_vendor.unref(options),
          customStyle: "height: 200px"
        }),
        n: common_vendor.sr(EChartsMoneyRef, "a42885f6-5", {
          "k": "EChartsMoneyRef"
        }),
        o: common_vendor.p({
          id: "echartsID",
          options: common_vendor.unref(options2),
          customStyle: "height: 200px"
        }),
        p: common_vendor.o(handleClose),
        q: common_vendor.o(handleConfirm),
        r: common_vendor.p({
          modalShow: modalShow.value,
          title: common_vendor.unref(modalTitle),
          content: common_vendor.unref(modalContent)
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a42885f6"], ["__file", "/Users/guolimeng/Desktop/work/uni-preset-vue-vite-ts 2/src/pages/businessManagement/components/collectionM.vue"]]);
wx.createComponent(Component);
