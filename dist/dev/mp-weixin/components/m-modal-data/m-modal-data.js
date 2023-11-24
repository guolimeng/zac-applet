"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_modal2 = common_vendor.resolveComponent("u-modal");
  (_easycom_u_button2 + _easycom_u_modal2)();
}
const _easycom_u_button = () => "../../node-modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_modal = () => "../../node-modules/uview-plus/components/u-modal/u-modal.js";
if (!Math) {
  (_easycom_u_button + _easycom_u_modal)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "m-modal-data",
  props: {
    modalShow: {
      type: Boolean,
      default: false,
      required: true
    },
    title: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    }
  },
  emits: ["handleClose", "handleConfirm"],
  setup(__props, { emit }) {
    const props = __props;
    const isModalShow = common_vendor.ref(false);
    common_vendor.ref("");
    common_vendor.watch(
      () => props.modalShow,
      (newVal) => {
        console.log("newVal", newVal);
        isModalShow.value = newVal;
      },
      { deep: true, immediate: true }
    );
    const close = () => {
      emit("handleClose");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(close),
        b: common_vendor.p({
          text: "确定",
          type: "success",
          customStyle: {
            width: "100px"
          }
        }),
        c: common_vendor.p({
          show: common_vendor.unref(isModalShow),
          title: props.title,
          content: __props.content
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/guolimeng/Desktop/work/uni-preset-vue-vite-ts 2/src/components/m-modal-data/m-modal-data.vue"]]);
wx.createComponent(Component);
