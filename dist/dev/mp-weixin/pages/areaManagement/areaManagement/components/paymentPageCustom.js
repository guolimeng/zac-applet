"use strict";
const common_vendor = require("../../../../common/vendor.js");
if (!Array) {
  const _easycom_q_form_data2 = common_vendor.resolveComponent("q-form-data");
  _easycom_q_form_data2();
}
const _easycom_q_form_data = () => "../../../../components/q-form-data/q-form-data.js";
if (!Math) {
  _easycom_q_form_data();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "paymentPageCustom",
  setup(__props) {
    const productTypeChange = (val, key) => {
      if (val) {
        isHidden("templateName2", false);
      } else {
        isHidden("templateName2", true);
      }
    };
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
                    eventChange: productTypeChange
                  }
                },
                templateName2: {
                  type: "textarea",
                  name: "",
                  placeholder: "请输入支付页定制消息内容",
                  border: "none",
                  itemLabelWidth: "220",
                  count: true,
                  hidden: true,
                  typeSet: {
                    maxlength: "99"
                    // eventChange: productTypeChange
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
    const isHidden = (key, state) => {
      return formData.value.sets.list[0].object[key].hidden = state;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.sr("uForm", "d4134222-0"),
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
        )
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d4134222"], ["__file", "/Users/guolimeng/Desktop/work/uni-preset-vue-vite-ts 2/src/pages/areaManagement/areaManagement/components/paymentPageCustom.vue"]]);
wx.createPage(MiniProgramPage);
