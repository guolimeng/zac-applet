"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_businessManagement_businessManagement = require("../../../api/businessManagement/businessManagement.js");
const store_modules_user = require("../../../store/modules/user.js");
require("../../../utils/request.js");
require("../../../utils/auth.js");
if (!Math) {
  (dateModule + collectionM + electricityStatistics + paymentStatistics)();
}
const dateModule = () => "../components/dateModule.js";
const collectionM = () => "../components/collectionM.js";
const electricityStatistics = () => "../components/electricityStatistics.js";
const paymentStatistics = () => "../components/paymentStatistics.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "totalRevenue",
  setup(__props) {
    store_modules_user.userStore();
    const defaultDateActive = common_vendor.ref("0");
    const data = common_vendor.reactive({
      dateTypeName: "日",
      endDate: `${common_vendor.dayjs().format("YYYY-MM-DD")} 24:00:00`,
      startDate: `${common_vendor.dayjs().format("YYYY-MM-DD")} 00:00:00`,
      chongz: "",
      chongd: "",
      orderData: [],
      moneyData: [],
      electrictysData: [],
      paymentStatisticsData: []
    });
    const { tabsData, dateTypeName, endDate, startDate, chongz, chongd, orderData, moneyData, electrictysData, paymentStatisticsData } = common_vendor.toRefs(data);
    common_vendor.onMounted(() => {
      getStatisticsData();
    });
    const getStatisticsData = () => {
      let param = {
        "endDate": endDate.value,
        "startDate": startDate.value
      };
      api_businessManagement_businessManagement.statisticsQuery(param).then((res) => {
        let { data: data2 } = res;
        chongz.value = data2.chongz;
        chongd.value = data2.chongd;
        switch (dateTypeName.value) {
          case "日":
            setDayDataFun(data2);
            break;
          case "周":
            setWeekDataFun(data2);
            break;
          case "月":
            setMonthDataFun(data2);
            break;
        }
        paymentData(data2.statisticsDtos);
      }).catch((err) => {
        orderData.value = [];
        moneyData.value = [];
        electrictysData.value = [];
        paymentStatisticsData.value = [];
      });
    };
    const setDayDataFun = (data2) => {
      orderData.value = data2.statisticsDtos[0].timeDates.map((item) => {
        return Number(item.orders);
      });
      moneyData.value = data2.statisticsDtos[0].timeDates.map((item) => {
        return Number(item.amounts);
      });
      electrictysData.value = data2.statisticsDtos[0].timeDates.map((item) => {
        return Number(item.electrictys);
      });
      data2.statisticsDtos[0].timeDates.map((item) => {
        return;
      });
    };
    const setWeekDataFun = (data2) => {
      let arr = data2.statisticsDtos.map((item) => {
        return {
          ...item,
          timestamp: common_vendor.dayjs(item.createdAt).valueOf()
        };
      });
      arr.sort((a, b) => a.timestamp - b.timestamp);
      orderData.value = arr.map((item) => {
        return item.orders;
      });
      weekData(orderData.value);
      moneyData.value = arr.map((item) => {
        return parseFloat(item.deviceCostAmount / 100);
      });
      weekData(moneyData.value);
      electrictysData.value = arr.map((item) => {
        return parseFloat(item.chargedElectricty / 100);
      });
      weekData(electrictysData.value);
    };
    const setMonthDataFun = (data2) => {
      let date = common_vendor.dayjs(startDate.value);
      let daysInMonth = date.daysInMonth();
      let arrMonth = data2.statisticsDtos.map((item) => {
        return {
          ...item,
          date: common_vendor.dayjs(item.createdAt).format("DD")
        };
      });
      let monthDays = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString().padStart(2, "0"));
      let newArr = monthDays.map((day) => {
        let item = arrMonth.find((item2) => item2.date === day);
        return item ? item : { date: day, orders: 0, chargedElectricty: 0, deviceCostAmount: 0 };
      });
      orderData.value = newArr.map((item) => {
        return item.orders;
      });
      moneyData.value = newArr.map((item) => {
        return parseFloat(item.deviceCostAmount / 100);
      });
      electrictysData.value = newArr.map((item) => {
        return parseFloat(item.chargedElectricty / 100);
      });
    };
    const paymentSumFun = (arr, key) => {
      return arr.reduce((total, currentItem) => total + Number(currentItem[key]), 0);
    };
    const paymentData = (arr) => {
      paymentStatisticsData.value = [
        { value: paymentSumFun(arr, "elses"), name: `其他${paymentSumFun(arr, "elses")}` },
        { value: paymentSumFun(arr, "virtualRefillCard"), name: `虚拟充值卡${paymentSumFun(arr, "virtualRefillCard")}` },
        { value: paymentSumFun(arr, "virtualMonthlyCard"), name: `虚拟充值包月卡${paymentSumFun(arr, "virtualMonthlyCard")}` },
        { value: paymentSumFun(arr, "entityMonthlyCard"), name: `实体充值卡${paymentSumFun(arr, "entityMonthlyCard")}` },
        { value: paymentSumFun(arr, "entityRefillCard"), name: `实体充值包月卡${paymentSumFun(arr, "entityRefillCard")}` },
        { value: paymentSumFun(arr, "whiteList"), name: `白名单${paymentSumFun(arr, "whiteList")}` },
        { value: paymentSumFun(arr, "alipay"), name: `支付宝充值数${paymentSumFun(arr, "alipay")}` },
        { value: paymentSumFun(arr, "vx"), name: `微信充值数${paymentSumFun(arr, "vx")}` }
      ];
    };
    const weekData = (arr) => {
      while (arr.length < 7) {
        arr.push(0);
      }
    };
    const changeDateTab = (item, val, start, end) => {
      dateTypeName.value = item.name;
      getDateFun(start, end);
    };
    const confirmDate = (start, end) => {
      getDateFun(start, end);
    };
    const getDateFun = (start, end) => {
      startDate.value = start;
      endDate.value = end;
      getStatisticsData();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(changeDateTab),
        b: common_vendor.o(confirmDate),
        c: common_vendor.p({
          defaultDateActive: defaultDateActive.value
        }),
        d: common_vendor.p({
          dateTypeName: common_vendor.unref(dateTypeName),
          chongd: common_vendor.unref(chongd),
          chongz: common_vendor.unref(chongz),
          orderData: common_vendor.unref(orderData),
          moneyData: common_vendor.unref(moneyData)
        }),
        e: common_vendor.p({
          dateTypeName: common_vendor.unref(dateTypeName),
          electrictysData: common_vendor.unref(electrictysData)
        }),
        f: common_vendor.p({
          dateTypeName: common_vendor.unref(dateTypeName),
          paymentStatisticsData: common_vendor.unref(paymentStatisticsData)
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c8c1baaa"], ["__file", "/Users/guolimeng/Desktop/work/uni-preset-vue-vite-ts 2/src/pages/businessManagement/businessManagement/totalRevenue.vue"]]);
wx.createComponent(Component);
