"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_up_text2 = common_vendor.resolveComponent("up-text");
  (_easycom_u_icon2 + _easycom_up_text2)();
}
const _easycom_u_icon = () => "../../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_up_text = () => "../../../node-modules/uview-plus/components/u-text/u-text.js";
if (!Math) {
  (_easycom_u_icon + _easycom_up_text)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "basicInformation",
  props: {
    type: {
      type: String,
      default: ""
    },
    orgDto: {
      type: Object,
      default: {}
    }
  },
  emits: ["settingClick"],
  setup(__props, { emit }) {
    const props = __props;
    const data = common_vendor.reactive({});
    common_vendor.toRefs(data);
    const settingClick = () => {
      emit("settingClick");
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(props.type ? props.orgDto.stationName : props.orgDto.name),
        b: props.type
      }, props.type ? {
        c: common_vendor.t(props.orgDto.facilityTypeDesc)
      } : {}, {
        d: common_vendor.p({
          name: "setting",
          size: "20px"
        }),
        e: common_vendor.o(settingClick),
        f: common_vendor.p({
          text: "0",
          size: "12",
          margin: "0px 0px 0px 5px"
        }),
        g: common_vendor.p({
          type: "success",
          text: "0",
          size: "12",
          margin: "0px 0px 0px 5px"
        }),
        h: common_vendor.p({
          type: "error",
          text: props.orgDto.ndevices || 0,
          size: "12",
          margin: "0px 0px 0px 5px"
        }),
        i: common_vendor.p({
          text: props.orgDto.ports || 0,
          size: "12",
          margin: "0px 0px 0px 5px"
        }),
        j: common_vendor.p({
          type: "success",
          text: props.orgDto.yports || 0,
          size: "12",
          margin: "0px 0px 0px 5px"
        }),
        k: common_vendor.p({
          type: "primary",
          text: (props.orgDto.ports || 0) - (props.orgDto.yports || 0),
          size: "12",
          margin: "0px 0px 0px 5px"
        }),
        l: common_vendor.t(props.orgDto.syl ? `${props.orgDto.syl}%` : "-"),
        m: common_vendor.t(props.orgDto.kdj ? `${props.orgDto.kdj}元/单` : "-")
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-62da0bfc"], ["__file", "/Users/guolimeng/Desktop/work/uni-preset-vue-vite-ts 2/src/pages/areaManagement/components/basicInformation.vue"]]);
wx.createComponent(Component);
