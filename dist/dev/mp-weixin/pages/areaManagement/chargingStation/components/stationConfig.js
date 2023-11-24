"use strict";
const common_vendor = require("../../../../common/vendor.js");
const store_modules_user = require("../../../../store/modules/user.js");
require("../../../../utils/auth.js");
if (!Array) {
  const _easycom_u_switch2 = common_vendor.resolveComponent("u-switch");
  const _easycom_q_form_data2 = common_vendor.resolveComponent("q-form-data");
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_modal2 = common_vendor.resolveComponent("u-modal");
  const _easycom_up_text2 = common_vendor.resolveComponent("up-text");
  const _easycom_up_input2 = common_vendor.resolveComponent("up-input");
  (_easycom_u_switch2 + _easycom_q_form_data2 + _easycom_up_button2 + _easycom_u_button2 + _easycom_u_modal2 + _easycom_up_text2 + _easycom_up_input2)();
}
const _easycom_u_switch = () => "../../../../node-modules/uview-plus/components/u-switch/u-switch.js";
const _easycom_q_form_data = () => "../../../../components/q-form-data/q-form-data.js";
const _easycom_up_button = () => "../../../../node-modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_button = () => "../../../../node-modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_modal = () => "../../../../node-modules/uview-plus/components/u-modal/u-modal.js";
const _easycom_up_text = () => "../../../../node-modules/uview-plus/components/u-text/u-text.js";
const _easycom_up_input = () => "../../../../node-modules/uview-plus/components/u-input/u-input.js";
if (!Math) {
  (_easycom_u_switch + _easycom_q_form_data + _easycom_up_button + _easycom_u_button + _easycom_u_modal + _easycom_up_text + _easycom_up_input)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "stationConfig",
  props: {
    orgId: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    store_modules_user.userStore();
    common_vendor.onMounted(() => {
      if (props.orgId)
        ;
    });
    const formItemChange = (val, key) => {
      console.log("支付宝", val, key);
      modalContent.value = "关闭支付宝支付";
      modalShow.value = true;
    };
    const productTypeDesc1222 = () => {
      console.log("预付金额");
      prepaidAmountModalShow.value = true;
    };
    const switchType = (val, key) => {
      console.log("switch开关", val, key);
    };
    const lowConsumptionChange = (val, key) => {
      console.log("最低消费", val, key);
      common_vendor.index.navigateTo({
        url: `/pages/areaManagement/areaManagement/components/minimumConsumption`
      });
    };
    const paymentValue = common_vendor.ref(true);
    const modalShow = common_vendor.ref(false);
    const modalContent = common_vendor.ref("");
    const prepaidAmountModalShow = common_vendor.ref(false);
    const prepaidAmountModalContent = common_vendor.ref("");
    const data = common_vendor.reactive({
      formData: {
        sets: {
          showTags: true,
          list: [
            {
              title: "支付方式",
              object: {
                alipay: {
                  type: "customRadio",
                  name: "支付宝",
                  placeholder: "",
                  clearable: false,
                  border: "none",
                  typeSet: {
                    eventChange: formItemChange
                  }
                },
                weChat: {
                  type: "customRadio",
                  name: "微信",
                  clearable: false,
                  border: "none",
                  typeSet: {}
                }
              }
            },
            {
              title: "充满自停",
              slotHeaderRight: "paymentHeaderRight1",
              object: {
                prepaidAmount: {
                  type: "select",
                  name: "预付金额",
                  border: "none",
                  typeSet: {
                    cellValue: "未设置",
                    isActionShee: true,
                    customCellValueColor: "#006cff",
                    eventChange: productTypeDesc1222
                  }
                },
                minimumConsumption: {
                  type: "select",
                  name: "最低消费",
                  border: "none",
                  typeSet: {
                    cellValue: "未设置",
                    isActionShee: true,
                    customCellValueColor: "#006cff",
                    eventChange: lowConsumptionChange
                  }
                }
              }
            },
            {
              title: "按照实际消费金额退款",
              object: {
                scanCodeOrder: {
                  type: "switch",
                  name: "扫码订单",
                  border: "none",
                  typeSet: {
                    eventChange: switchType
                  }
                },
                virtualCardOrder: {
                  type: "switch",
                  name: "虚拟卡订单",
                  border: "none",
                  typeSet: {
                    // eventChange: productTypeChange
                  }
                },
                physicalCardMinimumConsumption: {
                  type: "select",
                  name: "实体卡订单最低消费",
                  border: "none",
                  typeSet: {
                    cellValue: "未设置",
                    isActionShee: true,
                    eventChange: lowConsumptionChange
                  }
                }
              }
            }
          ]
        },
        data: {
          // 扫码支付
          alipay: true,
          weChat: true,
          // 充满自停
          // 预付金额
          prepaidAmount: "",
          minimumConsumption: "",
          // 按照实际消费金额退款
          scanCodeOrder: true,
          virtualCardOrder: true,
          physicalCardMinimumConsumption: ""
        }
      }
    });
    let { formData, rules } = common_vendor.toRefs(data);
    const cancelClick = () => {
      modalShow.value = false;
    };
    const confirmClick = () => {
      cancelClick();
    };
    const prepaidAmountCancelClick = () => {
      prepaidAmountModalShow.value = false;
    };
    const prepaidAmountConfirmClick = () => {
      prepaidAmountCancelClick();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => common_vendor.isRef(paymentValue) ? paymentValue.value = $event : null),
        b: common_vendor.p({
          modelValue: common_vendor.unref(paymentValue)
        }),
        c: common_vendor.sr("uForm", "42371ee2-0"),
        d: common_vendor.o(($event) => common_vendor.isRef(formData) ? formData.value = $event : formData = $event),
        e: common_vendor.p({
          labelPosition: "left",
          labelWidth: "140",
          labelStyle: {
            "color": "rgb(144,146,155)",
            "padding-left": "10px"
          },
          value: common_vendor.unref(formData)
        }),
        f: common_vendor.t(`确认要${common_vendor.unref(modalContent)}吗？`),
        g: common_vendor.o(cancelClick),
        h: common_vendor.p({
          type: "success",
          plain: true,
          text: "取消",
          shape: "circle",
          customStyle: {
            "margin": "0 10px"
          }
        }),
        i: common_vendor.o(confirmClick),
        j: common_vendor.p({
          text: "确定",
          type: "success",
          shape: "circle",
          customStyle: {
            "margin": "0 10px"
          }
        }),
        k: common_vendor.p({
          show: common_vendor.unref(modalShow),
          title: "操作确认"
        }),
        l: common_vendor.p({
          text: "￥",
          margin: "0 3px 0 0",
          bold: true
        }),
        m: common_vendor.o(_ctx.change),
        n: common_vendor.o(($event) => common_vendor.isRef(prepaidAmountModalContent) ? prepaidAmountModalContent.value = $event : null),
        o: common_vendor.p({
          placeholder: "请输入预付金额",
          border: "bottom",
          type: "number",
          modelValue: common_vendor.unref(prepaidAmountModalContent)
        }),
        p: common_vendor.o(prepaidAmountCancelClick),
        q: common_vendor.p({
          type: "primary",
          plain: true,
          text: "取消",
          shape: "circle",
          customStyle: {
            "margin": "0 10px"
          }
        }),
        r: common_vendor.o(prepaidAmountConfirmClick),
        s: common_vendor.p({
          text: "确定",
          type: "primary",
          shape: "circle",
          customStyle: {
            "margin": "0 10px"
          }
        }),
        t: common_vendor.p({
          show: common_vendor.unref(prepaidAmountModalShow),
          title: "预付金额"
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-42371ee2"], ["__file", "/Users/guolimeng/Desktop/work/uni-preset-vue-vite-ts 2/src/pages/areaManagement/chargingStation/components/stationConfig.vue"]]);
wx.createComponent(Component);