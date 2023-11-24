"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_areaManagement_areaManagement = require("../../../api/areaManagement/areaManagement.js");
const store_modules_user = require("../../../store/modules/user.js");
require("../../../utils/request.js");
require("../../../utils/auth.js");
if (!Array) {
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  const _easycom_u_search2 = common_vendor.resolveComponent("u-search");
  const _easycom_u_action_sheet2 = common_vendor.resolveComponent("u-action-sheet");
  (_easycom_up_button2 + _easycom_u_search2 + _easycom_u_action_sheet2)();
}
const _easycom_up_button = () => "../../../node-modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_search = () => "../../../node-modules/uview-plus/components/u-search/u-search.js";
const _easycom_u_action_sheet = () => "../../../node-modules/uview-plus/components/u-action-sheet/u-action-sheet.js";
if (!Math) {
  (_easycom_up_button + _easycom_u_search + templateList + _easycom_u_action_sheet)();
}
const templateList = () => "../components/templateList.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "chargingStationList",
  props: {
    orgId: {
      type: String,
      default: ""
    },
    orgDto: {
      type: Object,
      default: {}
    }
  },
  setup(__props) {
    const props = __props;
    const userUserStore = store_modules_user.userStore();
    const keyword = common_vendor.ref("");
    const data = common_vendor.reactive({
      listData: [],
      total: 1,
      parameter: {
        pageNo: 1,
        pageSize: 10
      },
      sheetList: [
        {
          name: "扫码添加",
          value: "00"
        },
        {
          name: "手动添加",
          value: "01"
        }
      ]
    });
    const { listData, parameter, total, sheetList } = common_vendor.toRefs(data);
    common_vendor.onReachBottom(() => {
      if (total.value <= listData.value.length) {
        common_vendor.index.showToast({
          title: "已加载全部数据",
          icon: "none"
        });
      } else {
        parameter.value.pageNo++;
        getStationList();
      }
    });
    common_vendor.onMounted(() => {
      console.log("onMounted", props.orgId);
      getStationList();
    });
    const getStationList = () => {
      let param = {
        "orgId": props.orgId,
        "operatorId": userUserStore.operatorId,
        "pageNo": parameter.value.pageNo,
        "pageSize": parameter.value.pageSize
      };
      api_areaManagement_areaManagement.stationList(param).then((res) => {
        let { data: data2 } = res;
        listData.value = data2.stationDtos;
        total.value = data2.total;
      });
    };
    const listItemClick = (item) => {
      common_vendor.index.navigateTo({
        url: `/pages/areaManagement/chargingStation/chargingStationDetails?stationId=${item.stationId}&orgId=${props.orgId}`
      });
    };
    const actionSheetShow = common_vendor.ref(false);
    const addStationClick = () => {
      actionSheetShow.value = true;
    };
    const getDeviceData = (manufacturer) => {
      let parts = manufacturer.split("/");
      let lastPart = parts.pop();
      let param = {
        manufacturer: lastPart,
        orgId: props.orgDto.orgId
      };
      api_areaManagement_areaManagement.deviceVerify(param).then((res) => {
        let { data: data2 } = res;
        let queyr = {
          orgName: props.orgDto.name,
          orgId: props.orgDto.orgId,
          detailedAddress: props.orgDto.detailedAddress,
          manufacturer: lastPart,
          ...data2
        };
        common_vendor.index.navigateTo({
          url: `/pages/areaManagement/chargingStation/components/addShortcutCreateSite?query=${encodeURIComponent(JSON.stringify(queyr))}`
        });
      });
    };
    const selectClick = (val) => {
      switch (val.value) {
        case "00":
          common_vendor.index.scanCode({
            success: function(res) {
              getDeviceData(res.result);
            }
          });
          break;
        case "01":
          common_vendor.index.navigateTo({
            url: `/pages/areaManagement/chargingStation/components/addChargingStation?orgId=${props.orgDto.orgId}&orgName=${props.orgDto.name}`
          });
          break;
      }
    };
    const close = () => {
      actionSheetShow.value = false;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(addStationClick),
        b: common_vendor.p({
          type: "primary",
          size: "small",
          color: "#006cff",
          text: "新增充电站"
        }),
        c: common_vendor.o(($event) => common_vendor.isRef(keyword) ? keyword.value = $event : null),
        d: common_vendor.p({
          placeholder: "搜索充电站",
          showAction: false,
          modelValue: common_vendor.unref(keyword)
        }),
        e: common_vendor.f(common_vendor.unref(listData), (item, index, i0) => {
          return {
            a: common_vendor.o(listItemClick, index),
            b: "e302c235-2-" + i0,
            c: common_vendor.p({
              listItemData: item
            }),
            d: index
          };
        }),
        f: common_vendor.o(($event) => close(_ctx.key)),
        g: common_vendor.o(selectClick),
        h: common_vendor.p({
          title: "添加方式",
          show: common_vendor.unref(actionSheetShow),
          closeOnClickOverlay: true,
          actions: common_vendor.unref(sheetList),
          round: 10
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e302c235"], ["__file", "/Users/guolimeng/Desktop/work/uni-preset-vue-vite-ts 2/src/pages/areaManagement/chargingStation/chargingStationList.vue"]]);
wx.createComponent(Component);
