"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_u_checkbox2 = common_vendor.resolveComponent("u-checkbox");
  const _easycom_u_checkbox_group2 = common_vendor.resolveComponent("u-checkbox-group");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_up_text2 = common_vendor.resolveComponent("up-text");
  (_easycom_u_checkbox2 + _easycom_u_checkbox_group2 + _easycom_u_icon2 + _easycom_up_text2)();
}
const _easycom_u_checkbox = () => "../../../node-modules/uview-plus/components/u-checkbox/u-checkbox.js";
const _easycom_u_checkbox_group = () => "../../../node-modules/uview-plus/components/u-checkbox-group/u-checkbox-group.js";
const _easycom_u_icon = () => "../../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_up_text = () => "../../../node-modules/uview-plus/components/u-text/u-text.js";
if (!Math) {
  (_easycom_u_checkbox + _easycom_u_checkbox_group + _easycom_u_icon + _easycom_up_text)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "templateList",
  props: {
    selection: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ""
    },
    listItemData: {
      type: Object,
      default: {}
    }
  },
  emits: ["listItemClick", "delClick"],
  setup(__props, { emit }) {
    const props = __props;
    const checkboxChange = (v) => {
      console.log("checkboxChange", v);
    };
    const listItemClick = () => {
      emit("listItemClick", props.listItemData);
    };
    const delClick = () => {
      emit("delClick", props.listItemData);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: props.selection
      }, props.selection ? {
        b: common_vendor.p({
          shape: "circle",
          name: props.listItemData.deviceId
        }),
        c: common_vendor.o(checkboxChange),
        d: common_vendor.o(($event) => props.listItemData.checked = $event),
        e: common_vendor.p({
          placement: "column",
          modelValue: props.listItemData.checked
        })
      } : {}, {
        f: common_vendor.t(props.type == "device" ? props.listItemData.name : props.listItemData.stationName),
        g: common_vendor.t(props.listItemData.facilityTypeDesc),
        h: common_vendor.p({
          name: "arrow-right",
          size: "14px",
          top: "6",
          color: "rgb(140,142,152)"
        }),
        i: common_vendor.t(props.listItemData.ip),
        j: props.type != "device"
      }, props.type != "device" ? {
        k: common_vendor.p({
          text: "0",
          size: "12",
          margin: "0px 0px 0px 5px"
        }),
        l: common_vendor.p({
          type: "success",
          text: "0",
          size: "12",
          margin: "0px 0px 0px 5px"
        }),
        m: common_vendor.p({
          type: "error",
          text: "0",
          size: "12",
          margin: "0px 0px 0px 5px"
        })
      } : {}, {
        n: common_vendor.p({
          text: props.listItemData.ports || 0,
          size: "12",
          margin: "0px 0px 0px 5px"
        }),
        o: common_vendor.p({
          type: "success",
          text: "0",
          size: "12",
          margin: "0px 0px 0px 5px"
        }),
        p: common_vendor.p({
          type: "primary",
          text: "0",
          size: "12",
          margin: "0px 0px 0px 5px"
        }),
        q: common_vendor.t(props.listItemData.syl ? `${props.listItemData.syl}%` : "-"),
        r: common_vendor.t(props.listItemData.kdj ? `${props.listItemData.kdj}元/单` : "-"),
        s: props.type == "device"
      }, props.type == "device" ? {
        t: common_vendor.p({
          name: "trash",
          size: "24px",
          color: "#f56c6c"
        }),
        v: common_vendor.o(delClick)
      } : {}, {
        w: common_vendor.o(listItemClick)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-30c23290"], ["__file", "/Users/guolimeng/Desktop/work/uni-preset-vue-vite-ts 2/src/pages/areaManagement/components/templateList.vue"]]);
wx.createComponent(Component);
