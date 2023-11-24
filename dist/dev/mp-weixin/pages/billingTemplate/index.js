"use strict";
const common_vendor = require("../../common/vendor.js");
const api_billingTemplate_billingTemplate = require("../../api/billingTemplate/billingTemplate.js");
const store_modules_user = require("../../store/modules/user.js");
require("../../utils/request.js");
require("../../utils/auth.js");
if (!Array) {
  const _easycom_u_search2 = common_vendor.resolveComponent("u-search");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  (_easycom_u_search2 + _easycom_u_icon2 + _easycom_up_button2 + _easycom_u_popup2)();
}
const _easycom_u_search = () => "../../node-modules/uview-plus/components/u-search/u-search.js";
const _easycom_u_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_up_button = () => "../../node-modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_popup = () => "../../node-modules/uview-plus/components/u-popup/u-popup.js";
if (!Math) {
  (_easycom_u_search + _easycom_u_icon + _easycom_up_button + _easycom_u_popup)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const userUserStore = store_modules_user.userStore();
    const popupShow = common_vendor.ref(false);
    const customStyle = common_vendor.reactive({
      width: "80%"
    });
    const data = common_vendor.reactive({
      tableHeadeHour: [
        { label: "时长", prop: "hourData" },
        { label: "收费", prop: "amount" }
      ],
      tableDataHour: [],
      tableHeadePower: [
        { label: "功率", prop: "powerData" },
        { label: "收费", prop: "amount" }
      ],
      tableDataPower: [],
      tableHeadeService: [
        { label: "配置", prop: "config" },
        { label: "值", prop: "value" }
      ],
      tableDataService: [],
      // 按量
      tableHeadeMeasure: [
        { label: "电量", prop: "measure" },
        { label: "收费", prop: "amount" }
      ],
      tableDataMeasure: [],
      // 汽车服务费
      tableHeadeCarService: [
        { label: "时间段", prop: "timeInterval" },
        { label: "电费单价", prop: "electricityPrice" },
        { label: "服务费单价", prop: "servicePrice" }
      ],
      tableDataCarService: [],
      listDataHeader: [
        { label: "时间", prop: "hourData" },
        { label: "定价", prop: "amount" },
        { label: "定价1", prop: "amount1" }
      ],
      listData: [
        {
          hourData: "牛超",
          amount: "100",
          amount1: "100"
        },
        {
          hourData: "刘薇",
          amount: "10",
          amount1: "100"
        }
      ],
      listData111: [],
      popupTitle: "",
      chargeConfigId: ""
    });
    let { listData, listData111, listDataHeader, popupTitle, chargeConfigId, tableHeadeHour, tableHeadePower, tableHeadeService, tableHeadeMeasure, tableHeadeCarService } = common_vendor.toRefs(data);
    common_vendor.onMounted(() => {
      getBillingList();
    });
    const getBillingList = () => {
      let param = {
        "operatorId": userUserStore.operatorId
      };
      api_billingTemplate_billingTemplate.chargeConfigList(param).then((res) => {
        let { data: data2 } = res;
        listData111.value = data2.chargeConfigInfoList;
      });
    };
    const delClick = (item) => {
      popupTitle.value = `确认删除「${item.templateName}」`;
      common_vendor.index.$u.sleep().then(() => {
        popupShow.value = !popupShow.value;
        chargeConfigId.value = item.chargeConfigId;
      });
    };
    const addClick = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/billingTemplate/addTemplateList?chargeConfigId=${id || ""}`
      });
    };
    const close = () => {
      popupShow.value = false;
    };
    const cancelClick = () => {
      popupShow.value = !popupShow.value;
    };
    const confirmClick = () => {
      api_billingTemplate_billingTemplate.chargeConfigDelete({ chargeConfigId: chargeConfigId.value }).then(
        (result) => {
          cancelClick();
          getBillingList();
        }
      );
    };
    const isTableHeade = (type) => {
      switch (type) {
        case "01":
          return tableHeadeHour.value;
        case "02":
          return tableHeadeMeasure.value;
        case "03":
          return tableHeadePower.value;
        case "05":
          return tableHeadeService.value;
        case "06":
          return tableHeadeCarService.value;
      }
    };
    const isTableData = (type, item) => {
      let serviceList = [];
      switch (type) {
        case "01":
        case "02":
        case "03":
          return item.chargingCostList;
        case "05":
          serviceList = [
            { config: "服务费单价", value: `${parseFloat((item.serviceTemplate.servicePrice / 100).toPrecision(12))}元/小时` },
            { config: "服务费时间限制", value: `${item.serviceTemplate.serviceTimeLimit}分钟` },
            { config: "电费单价", value: `${parseFloat((item.serviceTemplate.electricityPrice / 100).toPrecision(12))}元/度` },
            { config: "预支付总额", value: `${parseFloat((item.serviceTemplate.advanceTotalAmount / 100).toPrecision(12))}元` },
            { config: "预支付服务费金额", value: `${parseFloat((item.serviceTemplate.advanceServiceAmount / 100).toPrecision(12))}元` }
          ];
          return serviceList;
        case "06":
          return item.timePeriods;
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["show-action"]: true,
          actionText: "搜索",
          animation: false,
          actionStyle: {
            "color": "rgb(30,102,235)"
          },
          placeholder: "请输入模板名称"
        }),
        b: common_vendor.f(common_vendor.unref(listData111), (item1, index1, i0) => {
          return common_vendor.e({
            a: "f8c99844-1-" + i0,
            b: common_vendor.t(item1.templateName),
            c: common_vendor.t(item1.billingModeDesc),
            d: common_vendor.f(isTableHeade(item1.billingMode), (item, index, i1) => {
              return {
                a: common_vendor.t(item.label),
                b: index
              };
            }),
            e: item1.billingMode == "04" || item1.billingMode == "07"
          }, item1.billingMode == "04" || item1.billingMode == "07" ? {
            f: "f8c99844-2-" + i0,
            g: common_vendor.p({
              name: "account-fill",
              size: "18",
              color: "rgb(191,198,206)"
            })
          } : {
            h: common_vendor.f(isTableData(item1.billingMode, item1), (item, index, i1) => {
              return common_vendor.e(item1.billingMode == "01" ? {
                a: common_vendor.t(`${item.hour}小时`),
                b: `1`
              } : {}, item1.billingMode == "03" ? {
                c: common_vendor.t(`${item.minPower}W ~ ${item.maxPower}W`),
                d: `1`
              } : {}, item1.billingMode == "05" ? {
                e: common_vendor.t(item.config),
                f: `1`
              } : {}, item1.billingMode == "06" ? {
                g: common_vendor.t(`${item.startTime} ~ ${item.endTime}`),
                h: `1`
              } : {}, item1.billingMode == "01" ? {
                i: common_vendor.t(`${Number((item.amount / 100).toFixed(2))}元`),
                j: `1`
              } : {}, item1.billingMode == "03" ? {
                k: common_vendor.t(`${Number((item.amount / 100).toFixed(2))}元/${item.hour}小时`),
                l: `1`
              } : {}, item1.billingMode == "05" ? {
                m: common_vendor.t(item.value),
                n: `1`
              } : {}, item1.billingMode == "06" ? {
                o: common_vendor.t(`${parseFloat((item.electricityPrice / 100).toPrecision(12))}元/度`),
                p: `1`
              } : {}, isTableHeade(item1.billingMode).length > 2 ? {} : {}, item1.billingMode == "06" ? {
                q: common_vendor.t(`${parseFloat((item.servicePrice / 100).toPrecision(12))}元/度`),
                r: `1`
              } : {}, {
                s: index
              });
            }),
            i: item1.billingMode == "01",
            j: item1.billingMode == "03",
            k: item1.billingMode == "05",
            l: item1.billingMode == "06",
            m: item1.billingMode == "01",
            n: item1.billingMode == "03",
            o: item1.billingMode == "05",
            p: item1.billingMode == "06",
            q: isTableHeade(item1.billingMode).length > 2,
            r: item1.billingMode == "06"
          }, {
            s: "f8c99844-3-" + i0,
            t: common_vendor.o(($event) => delClick(item1), index1),
            v: common_vendor.o(($event) => addClick(item1.chargeConfigId), index1),
            w: index1
          });
        }),
        c: common_vendor.p({
          name: "rmb",
          color: "#fff",
          bold: true,
          top: "2px"
        }),
        d: `1`,
        e: common_vendor.p({
          name: "trash",
          size: "24",
          color: "rgb(191,198,206)"
        }),
        f: common_vendor.o(($event) => addClick("")),
        g: common_vendor.t(common_vendor.unref(popupTitle)),
        h: common_vendor.o(cancelClick),
        i: common_vendor.p({
          type: "info",
          plain: true,
          text: "取消",
          customStyle: {
            width: "100px"
          }
        }),
        j: common_vendor.o(confirmClick),
        k: common_vendor.p({
          type: "primary",
          text: "确定",
          customStyle: {
            width: "100px"
          }
        }),
        l: common_vendor.o(close),
        m: common_vendor.p({
          safeAreaInsetBottom: true,
          safeAreaInsetTop: true,
          mode: "center",
          overlay: true,
          closeOnClickOverlay: true,
          round: 10,
          show: common_vendor.unref(popupShow),
          customStyle: common_vendor.unref(customStyle)
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f8c99844"], ["__file", "/Users/guolimeng/Desktop/work/uni-preset-vue-vite-ts 2/src/pages/billingTemplate/index.vue"]]);
wx.createPage(MiniProgramPage);
