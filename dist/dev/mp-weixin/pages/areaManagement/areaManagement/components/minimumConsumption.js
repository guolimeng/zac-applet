"use strict";
const common_vendor = require("../../../../common/vendor.js");
if (!Array) {
  const _easycom_q_form_data2 = common_vendor.resolveComponent("q-form-data");
  const _easycom_up_text2 = common_vendor.resolveComponent("up-text");
  const _easycom_up_input2 = common_vendor.resolveComponent("up-input");
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_modal2 = common_vendor.resolveComponent("u-modal");
  (_easycom_q_form_data2 + _easycom_up_text2 + _easycom_up_input2 + _easycom_up_button2 + _easycom_u_button2 + _easycom_u_modal2)();
}
const _easycom_q_form_data = () => "../../../../components/q-form-data/q-form-data.js";
const _easycom_up_text = () => "../../../../node-modules/uview-plus/components/u-text/u-text.js";
const _easycom_up_input = () => "../../../../node-modules/uview-plus/components/u-input/u-input.js";
const _easycom_up_button = () => "../../../../node-modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_button = () => "../../../../node-modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_modal = () => "../../../../node-modules/uview-plus/components/u-modal/u-modal.js";
if (!Math) {
  (_easycom_q_form_data + _easycom_up_text + _easycom_up_input + _easycom_up_button + _easycom_u_button + _easycom_u_modal)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "minimumConsumption",
  setup(__props) {
    const productTypeChange = (val, key) => {
      if (formData.value.data.templateName) {
        prepaidAmountModalShow.value = true;
      }
    };
    const prepaidAmountModalShow = common_vendor.ref(false);
    const prepaidAmountModalContent = common_vendor.ref("");
    const data = common_vendor.reactive({
      formData: {
        sets: {
          showTags: false,
          list: [
            {
              title: "基本信息",
              object: {
                templateName: {
                  type: "switch",
                  name: "启用支付页消息定制",
                  border: "none",
                  itemLabelWidth: "220",
                  typeSet: {
                    // eventChange: productTypeChange
                  }
                },
                templateName2: {
                  type: "select",
                  name: "最低消费金额",
                  border: "none",
                  typeSet: {
                    cellValue: "关闭",
                    isActionShee: false,
                    customCellValueColor: "#006cff",
                    eventChange: productTypeChange
                  }
                }
              }
            }
          ]
        },
        data: {
          templateName: false,
          templateName2: ""
        }
      },
      rules: {
        "templateName": { type: "string", required: true, message: "请填写模板名称", trigger: ["blur", "change"] }
      }
    });
    let { formData, rules } = common_vendor.toRefs(data);
    const prepaidAmountCancelClick = () => {
      prepaidAmountModalShow.value = false;
    };
    const prepaidAmountConfirmClick = () => {
      prepaidAmountCancelClick();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.sr("uForm", "9d040c9b-0"),
        b: common_vendor.o(($event) => common_vendor.isRef(formData) ? formData.value = $event : formData = $event),
        c: common_vendor.p({
          labelPosition: "left",
          rules: common_vendor.unref(rules),
          labelStyle: {
            "color": "rgb(144,146,155)",
            "padding-left": "10px"
          },
          value: common_vendor.unref(formData)
        }),
        d: common_vendor.o(
          //@ts-ignore
          (...args) => _ctx.confirm && _ctx.confirm(...args)
        ),
        e: common_vendor.p({
          text: "￥",
          margin: "0 3px 0 0",
          bold: true
        }),
        f: common_vendor.o(_ctx.change),
        g: common_vendor.o(($event) => common_vendor.isRef(prepaidAmountModalContent) ? prepaidAmountModalContent.value = $event : null),
        h: common_vendor.p({
          placeholder: "请输入预付金额",
          border: "bottom",
          type: "number",
          modelValue: common_vendor.unref(prepaidAmountModalContent)
        }),
        i: common_vendor.o(prepaidAmountCancelClick),
        j: common_vendor.p({
          type: "primary",
          plain: true,
          text: "取消",
          shape: "circle",
          customStyle: {
            "margin": "0 10px"
          }
        }),
        k: common_vendor.o(prepaidAmountConfirmClick),
        l: common_vendor.p({
          text: "确定",
          type: "primary",
          shape: "circle",
          customStyle: {
            "margin": "0 10px"
          }
        }),
        m: common_vendor.p({
          show: common_vendor.unref(prepaidAmountModalShow),
          title: "预付金额"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9d040c9b"], ["__file", "/Users/guolimeng/Desktop/work/uni-preset-vue-vite-ts 2/src/pages/areaManagement/areaManagement/components/minimumConsumption.vue"]]);
wx.createPage(MiniProgramPage);
