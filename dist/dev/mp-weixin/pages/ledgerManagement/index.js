"use strict";
const common_vendor = require("../../common/vendor.js");
const api_ledgerManagement_ledgerManagement = require("../../api/ledgerManagement/ledgerManagement.js");
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
      listData: [],
      clearingConfigId: "",
      popupTitle: ""
    });
    let { listData, clearingConfigId, popupTitle } = common_vendor.toRefs(data);
    common_vendor.onMounted(() => {
      getBillingList();
    });
    const getBillingList = () => {
      let param = {
        "operatorId": userUserStore.operatorId
      };
      api_ledgerManagement_ledgerManagement.clearingAccountChargeConfigList(param).then((res) => {
        let { data: data2 } = res;
        listData.value = data2.clearingConfigDtos;
      });
    };
    const close = () => {
      popupShow.value = false;
    };
    const delClick = (item) => {
      popupTitle.value = `确认删除「${item.clearingConfigName}」`;
      common_vendor.index.$u.sleep().then(() => {
        popupShow.value = !popupShow.value;
        clearingConfigId.value = item.clearingConfigId;
      });
    };
    const cancelClick = () => {
      popupShow.value = !popupShow.value;
    };
    const confirmClick = () => {
      api_ledgerManagement_ledgerManagement.clearingAccountChargeConfigDelete({ clearingConfigId: clearingConfigId.value }).then(
        (result) => {
          cancelClick();
          getBillingList();
        }
      );
    };
    const addClick = (clearingId) => {
      common_vendor.index.navigateTo({
        url: `/pages/ledgerManagement/addTemplateList?clearingId=${clearingId || ""}`
      });
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
        b: common_vendor.f(common_vendor.unref(listData), (item1, index1, i0) => {
          return {
            a: "a9fc3251-1-" + i0,
            b: common_vendor.t(item1.clearingConfigName),
            c: common_vendor.f(item1.clearingConfigDetails, (item, index, i1) => {
              return {
                a: common_vendor.t(item.bankUserName),
                b: common_vendor.t(`${item.percent}%`),
                c: index
              };
            }),
            d: "a9fc3251-2-" + i0,
            e: common_vendor.o(($event) => delClick(item1), index1),
            f: common_vendor.o(($event) => addClick(item1.clearingConfigId), index1),
            g: index1
          };
        }),
        c: common_vendor.p({
          name: "account-fill",
          color: "#fff"
        }),
        d: common_vendor.p({
          name: "trash",
          size: "24",
          color: "rgb(191,198,206)"
        }),
        e: common_vendor.o(($event) => addClick("")),
        f: common_vendor.t(common_vendor.unref(popupTitle)),
        g: common_vendor.o(cancelClick),
        h: common_vendor.p({
          type: "info",
          plain: true,
          text: "取消",
          customStyle: {
            width: "100px"
          }
        }),
        i: common_vendor.o(confirmClick),
        j: common_vendor.p({
          type: "primary",
          text: "确定",
          customStyle: {
            width: "100px"
          }
        }),
        k: common_vendor.o(close),
        l: common_vendor.p({
          safeAreaInsetBottom: true,
          safeAreaInsetTop: true,
          mode: "center",
          overlay: true,
          closeOnClickOverlay: true,
          round: 10,
          show: popupShow.value,
          customStyle
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a9fc3251"], ["__file", "/Users/guolimeng/Desktop/work/uni-preset-vue-vite-ts 2/src/pages/ledgerManagement/index.vue"]]);
wx.createPage(MiniProgramPage);
