"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_areaManagement_areaManagement = require("../../../api/areaManagement/areaManagement.js");
const store_modules_user = require("../../../store/modules/user.js");
require("../../../utils/request.js");
require("../../../utils/auth.js");
if (!Array) {
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_checkbox2 = common_vendor.resolveComponent("u-checkbox");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  const _easycom_up_input2 = common_vendor.resolveComponent("up-input");
  (_easycom_up_button2 + _easycom_u_icon2 + _easycom_u_checkbox2 + _easycom_u_popup2 + _easycom_up_input2)();
}
const _easycom_up_button = () => "../../../node-modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_icon = () => "../../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_checkbox = () => "../../../node-modules/uview-plus/components/u-checkbox/u-checkbox.js";
const _easycom_u_popup = () => "../../../node-modules/uview-plus/components/u-popup/u-popup.js";
const _easycom_up_input = () => "../../../node-modules/uview-plus/components/u-input/u-input.js";
if (!Math) {
  (_easycom_up_button + _easycom_u_icon + templateList + _easycom_u_checkbox + _easycom_u_popup + _easycom_up_input)();
}
const templateList = () => "../components/templateList.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "deviceList",
  props: {
    orgId: {
      type: String,
      default: ""
    },
    stationId: {
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
    common_vendor.ref("");
    const currentActive = common_vendor.ref(0);
    const deviceStatus = common_vendor.ref("");
    const data = common_vendor.reactive({
      tab: [
        {
          num: 3,
          name: "全部",
          status: ""
        },
        {
          num: 9,
          name: "在线",
          status: "Y"
        },
        {
          num: 0,
          name: "离线",
          status: "N"
        }
      ],
      listData: [],
      total: 1,
      parameter: {
        pageNo: 1,
        pageSize: 20
      },
      popupTitle: ""
    });
    const { listData, parameter, total, tab, popupTitle } = common_vendor.toRefs(data);
    const popupShow = common_vendor.ref(false);
    common_vendor.reactive({
      width: "80%"
    });
    common_vendor.onMounted(() => {
      console.log("onMounted", props.orgDto.facilityType);
      getDeviceList();
    });
    common_vendor.onReachBottom(() => {
      if (total.value <= listData.value.length) {
        common_vendor.index.showToast({
          title: "已加载全部数据",
          icon: "none"
        });
      } else {
        parameter.value.pageNo++;
        getDeviceList();
      }
    });
    const getDeviceList = () => {
      let param = {
        "stationId": props.stationId,
        "operatorId": userUserStore.operatorId,
        "pageNo": parameter.value.pageNo,
        "pageSize": parameter.value.pageSize,
        "status": deviceStatus.value
      };
      api_areaManagement_areaManagement.deviceList(param).then((res) => {
        let { data: data2 } = res;
        listData.value = data2.deviceDtoList || [];
        if (Array.isArray(data2.deviceDtoList) && data2.deviceDtoList.length > 0) {
          data2.deviceDtoList.forEach((item) => {
            item.checked = [];
          });
        }
        tab.value.forEach((val) => {
          switch (val.status) {
            case "":
              val.num = listData.value.length;
              break;
            case "Y":
              val.num = listData.value.filter((item) => item.status === "Y").length;
              break;
            case "N":
              val.num = listData.value.filter((item) => item.status === "N").length;
              break;
          }
        });
        total.value = data2.total;
      });
    };
    const handTab = (item, index) => {
      currentActive.value = index;
      deviceStatus.value = item.status;
      getDeviceList();
    };
    const listItemClick = () => {
    };
    common_vendor.ref("");
    const addDeviceNumPopupShow = common_vendor.ref(false);
    const addDeviceClick = () => {
      addDeviceNumPopupShow.value = true;
    };
    const addScanCode = () => {
      common_vendor.index.scanCode({
        // onlyFromCamera: true,
        success: function(res) {
          getDeviceInformation(res.result);
        }
      });
    };
    const getDeviceInformation = (manufacturer) => {
      let parts = manufacturer.split("/");
      let lastPart = parts.pop();
      let param = {
        manufacturer: lastPart,
        stationId: props.stationId
      };
      api_areaManagement_areaManagement.deviceSave(param).then((res) => {
        let { data: data2 } = res;
        let isRepeat = listData.value.length > 0 ? listData.value.some((item) => {
          return item.manufacturer == data2.device.manufacturer;
        }) : false;
        console.log("isRepeat", isRepeat);
        if (isRepeat) {
          common_vendor.index.showToast({
            icon: "none",
            duration: 3e3,
            title: `设备ID${data2.device.manufacturer}已经存在`
          });
        } else {
          getDeviceList();
          cancelClick("add");
        }
      });
    };
    const deviceId = common_vendor.ref("");
    const delClick = (item) => {
      console.log("删除设备", item);
      deviceId.value = item.deviceId;
      popupTitle.value = `确认删除「${item.name}」`;
      common_vendor.index.$u.sleep().then(() => {
        cancelClick("del");
      });
    };
    const close = (type) => {
      switch (type) {
        case "del":
          popupShow.value = false;
          break;
        case "add":
          addDeviceNumPopupShow.value = false;
          break;
      }
    };
    const cancelClick = (type) => {
      switch (type) {
        case "del":
          popupShow.value = !popupShow.value;
          break;
        case "add":
          addDeviceNumPopupShow.value = !addDeviceNumPopupShow.value;
          break;
      }
    };
    const confirmClick = () => {
      api_areaManagement_areaManagement.deviceDelete({ deviceId: deviceId.value }).then(
        (result) => {
          cancelClick("del");
          getDeviceList();
        }
      );
    };
    const selection = common_vendor.ref(false);
    const isBatches = common_vendor.ref(false);
    common_vendor.ref(false);
    const batchesClick = () => {
      isBatches.value = !isBatches.value;
      selection.value = !selection.value;
    };
    const selectAll = common_vendor.ref(false);
    const selectedNum = common_vendor.ref(0);
    const checkboxChange = (val) => {
      listData.value.forEach((item) => {
        item.checked = val ? [item.deviceId] : [];
      });
      selectedNum.value = val ? listData.value.length : 0;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !isBatches.value
      }, !isBatches.value ? {
        b: common_vendor.p({
          type: "primary",
          plain: true,
          size: "small",
          color: "#006cff",
          colo: true,
          text: "批量模式"
        }),
        c: common_vendor.o(batchesClick)
      } : {}, {
        d: !isBatches.value
      }, !isBatches.value ? {
        e: common_vendor.p({
          type: "primary",
          size: "small",
          color: "#006cff",
          text: "新增设备"
        }),
        f: common_vendor.o(addDeviceClick)
      } : {}, {
        g: isBatches.value
      }, isBatches.value ? {
        h: common_vendor.p({
          type: "error",
          plain: true,
          size: "small",
          text: "退出批量模式"
        }),
        i: common_vendor.o(batchesClick)
      } : {}, {
        j: common_vendor.f(data.tab, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.num),
            c: index,
            d: currentActive.value === index ? 1 : "",
            e: common_vendor.o(($event) => handTab(item, index), index)
          };
        }),
        k: common_vendor.p({
          name: "reload",
          color: "#006cff",
          top: "5px",
          size: "20px"
        }),
        l: common_vendor.o(getDeviceList),
        m: common_vendor.f(common_vendor.unref(listData), (item, index, i0) => {
          return {
            a: common_vendor.o(listItemClick, index),
            b: common_vendor.o(delClick, index),
            c: "85d2de2f-4-" + i0,
            d: common_vendor.p({
              type: "device",
              selection: selection.value,
              listItemData: item
            }),
            e: index
          };
        }),
        n: isBatches.value
      }, isBatches.value ? {
        o: common_vendor.o(checkboxChange),
        p: common_vendor.o(common_vendor.m(($event) => selectAll.value = $event, {
          value: true
        }, true)),
        q: common_vendor.p({
          shape: "circle",
          label: "全选",
          disabled: common_vendor.unref(listData).length > 0 ? false : true,
          modelValue: selectAll.value
        }),
        r: common_vendor.t(selectedNum.value),
        s: common_vendor.p({
          type: "primary",
          plain: true,
          size: "small",
          color: "#006cff",
          colo: true,
          text: "检修",
          disabled: selectedNum.value > 0 ? false : true
        })
      } : {}, {
        t: common_vendor.t(common_vendor.unref(popupTitle)),
        v: common_vendor.o(($event) => cancelClick("del")),
        w: common_vendor.p({
          type: "info",
          plain: true,
          text: "取消",
          customStyle: {
            width: "100px"
          }
        }),
        x: common_vendor.o(confirmClick),
        y: common_vendor.p({
          type: "primary",
          text: "确定",
          customStyle: {
            width: "100px"
          }
        }),
        z: common_vendor.o(($event) => close("edl")),
        A: common_vendor.p({
          safeAreaInsetBottom: true,
          safeAreaInsetTop: true,
          mode: "center",
          overlay: true,
          closeOnClickOverlay: true,
          round: 10,
          show: popupShow.value,
          customStyle: {
            width: "80%"
          }
        }),
        B: common_vendor.o(_ctx.change),
        C: common_vendor.o(($event) => _ctx.value = $event),
        D: common_vendor.p({
          placeholder: "请输入设备号",
          border: "bottom",
          inputAlign: "center",
          modelValue: _ctx.value
        }),
        E: common_vendor.o(addScanCode),
        F: common_vendor.p({
          type: "primary",
          text: "扫码添加设备",
          customStyle: {
            margin: "0px 20px"
          }
        }),
        G: common_vendor.o(($event) => close("add")),
        H: common_vendor.p({
          safeAreaInsetBottom: true,
          safeAreaInsetTop: true,
          mode: "bottom",
          overlay: true,
          closeOnClickOverlay: true,
          round: 10,
          show: addDeviceNumPopupShow.value
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-85d2de2f"], ["__file", "/Users/guolimeng/Desktop/work/uni-preset-vue-vite-ts 2/src/pages/areaManagement/deviceMg/deviceList.vue"]]);
wx.createComponent(Component);
