"use strict";
const common_vendor = require("../../../../common/vendor.js");
const api_ledgerManagement_ledgerManagement = require("../../../../api/ledgerManagement/ledgerManagement.js");
const api_areaManagement_areaManagement = require("../../../../api/areaManagement/areaManagement.js");
const store_modules_user = require("../../../../store/modules/user.js");
require("../../../../utils/request.js");
require("../../../../utils/auth.js");
if (!Array) {
  const _easycom_u_switch2 = common_vendor.resolveComponent("u-switch");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_q_form_data2 = common_vendor.resolveComponent("q-form-data");
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_modal2 = common_vendor.resolveComponent("u-modal");
  const _easycom_up_text2 = common_vendor.resolveComponent("up-text");
  const _easycom_up_input2 = common_vendor.resolveComponent("up-input");
  (_easycom_u_switch2 + _easycom_u_icon2 + _easycom_q_form_data2 + _easycom_up_button2 + _easycom_u_button2 + _easycom_u_modal2 + _easycom_up_text2 + _easycom_up_input2)();
}
const _easycom_u_switch = () => "../../../../node-modules/uview-plus/components/u-switch/u-switch.js";
const _easycom_u_icon = () => "../../../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_q_form_data = () => "../../../../components/q-form-data/q-form-data.js";
const _easycom_up_button = () => "../../../../node-modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_button = () => "../../../../node-modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_modal = () => "../../../../node-modules/uview-plus/components/u-modal/u-modal.js";
const _easycom_up_text = () => "../../../../node-modules/uview-plus/components/u-text/u-text.js";
const _easycom_up_input = () => "../../../../node-modules/uview-plus/components/u-input/u-input.js";
if (!Math) {
  (_easycom_u_switch + _easycom_u_icon + _easycom_q_form_data + _easycom_up_button + _easycom_u_button + _easycom_u_modal + _easycom_up_text + _easycom_up_input)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "areaConfig",
  props: {
    orgId: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    const userUserStore = store_modules_user.userStore();
    common_vendor.onMounted(() => {
      getAccountMethod();
      if (props.orgId) {
        getAreaDetailst();
      }
    });
    const clearingConfigChange = (val, key) => {
      let param = {
        modeId: val.clearingConfigId,
        type: "00",
        "orgId": props.orgId
      };
      api_areaManagement_areaManagement.areaOrgUpdateMode(param).then((res) => {
      });
    };
    const productTypeChange11 = (val, key) => {
      console.log("多选", val, key);
    };
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
    const paymentValue = common_vendor.ref(false);
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
              title: "分账方式",
              object: {
                clearingConfigName: {
                  type: "select",
                  name: "默认分账方式",
                  clearable: false,
                  border: "none",
                  typeSet: {
                    data: [
                      { label: "两轮充", value: "01" },
                      { label: "www", value: "02" }
                    ],
                    sheetTitle: "默认分账方式",
                    cellValue: "请选择",
                    eventChange: clearingConfigChange
                  }
                },
                rechargeClearingConfigName: {
                  type: "select",
                  name: "充值订单分账方式",
                  border: "none",
                  typeSet: {
                    data: [],
                    sheetTitle: "充值订单分账方式",
                    cellValue: "请选择"
                  }
                }
              }
            },
            {
              title: "扫码支付",
              slotHeaderRight: "paymentHeaderRight",
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
                },
                depositCardRecharge: {
                  type: "customRadio",
                  name: "储蓄卡充值",
                  clearable: false,
                  border: "none",
                  typeSet: {}
                },
                virtualMonthlyCard: {
                  type: "customRadio",
                  name: "虚拟包月卡",
                  clearable: false,
                  border: "none",
                  typeSet: {}
                }
              }
            },
            {
              title: "刷卡支付",
              object: {
                yxstcxktscdl: {
                  type: "customRadio",
                  name: "允许实体储值卡同时充多辆车",
                  itemLabelWidth: "220",
                  placeholder: "请填写所属物业",
                  clearable: false,
                  border: "none",
                  typeSet: {
                    eventChange: productTypeChange11
                  }
                },
                yxstbyktscdl: {
                  type: "customRadio",
                  name: "允许实体包月卡同时充多辆车",
                  itemLabelWidth: "220",
                  border: "none",
                  typeSet: {
                    // eventChange: productTypeChange
                  }
                }
              }
            },
            {
              title: "支付页面消息制定",
              slotHeaderRight: "pageCustomSlot",
              object: {}
            },
            {
              title: "卡片充值",
              object: {
                stcxkcz: {
                  type: "customRadio",
                  name: "实体储值卡充值",
                  border: "none",
                  typeSet: {
                    // eventChange: productTypeChange
                  }
                },
                stybkcz: {
                  type: "customRadio",
                  name: "实体包月卡充值",
                  border: "none",
                  typeSet: {
                    // eventChange: productTypeChange
                  }
                },
                xnczkcz: {
                  type: "customRadio",
                  name: "虚拟储值卡充值",
                  border: "none",
                  typeSet: {
                    // eventChange: productTypeChange
                  }
                },
                xnbykcz: {
                  type: "customRadio",
                  name: "虚拟包月卡充值",
                  border: "none",
                  typeSet: {
                    // eventChange: productTypeChange
                  }
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
          // 分账方式
          clearingConfigName: "",
          clearingConfigId: "",
          // 充值分账方式
          rechargeClearingConfigName: "",
          rechargeClearingConfigId: "",
          // 扫码支付
          alipay: true,
          weChat: true,
          depositCardRecharge: true,
          virtualMonthlyCard: true,
          // 刷卡支付
          yxstcxktscdl: true,
          yxstbyktscdl: true,
          // 卡片充值
          stcxkcz: true,
          stybkcz: true,
          xnczkcz: true,
          xnbykcz: true,
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
    const getAreaDetailst = () => {
      let param = {
        "orgId": props.orgId
      };
      api_areaManagement_areaManagement.areaOrgDetail(param).then((res) => {
        let { data: data2 } = res;
        formData.value.data.clearingConfigName = data2.clearingConfigDto.clearingConfigName;
        formData.value.data.clearingConfigId = data2.clearingConfigDto.clearingConfigId;
      });
    };
    const getAccountMethod = () => {
      let param = {
        operatorId: userUserStore.operatorId
      };
      api_ledgerManagement_ledgerManagement.clearingAccountChargeConfigList(param).then((res) => {
        let { data: data2 } = res;
        data2.clearingConfigDtos.forEach((item) => {
          item.label = item.clearingConfigName;
          item.value = item.clearingConfigId;
        });
        isSetData("clearingConfigName", data2.clearingConfigDtos, 0);
      });
    };
    const pageCustomClick = () => {
      common_vendor.index.navigateTo({
        url: `/pages/areaManagement/areaManagement/components/paymentPageCustom`
      });
    };
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
    const isSetData = (key, data2, index) => {
      return formData.value.sets.list[index].object[key].typeSet.data = data2;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => common_vendor.isRef(paymentValue) ? paymentValue.value = $event : null),
        b: common_vendor.p({
          modelValue: common_vendor.unref(paymentValue)
        }),
        c: common_vendor.p({
          name: "arrow-right",
          color: "#909399"
        }),
        d: common_vendor.o(pageCustomClick),
        e: common_vendor.o(($event) => common_vendor.isRef(paymentValue) ? paymentValue.value = $event : null),
        f: common_vendor.p({
          modelValue: common_vendor.unref(paymentValue)
        }),
        g: common_vendor.sr("uForm", "a6248652-0"),
        h: common_vendor.o(($event) => common_vendor.isRef(formData) ? formData.value = $event : formData = $event),
        i: common_vendor.p({
          labelPosition: "left",
          labelWidth: "140",
          labelStyle: {
            "color": "rgb(144,146,155)",
            "padding-left": "10px"
          },
          value: common_vendor.unref(formData)
        }),
        j: common_vendor.t(`确认要${common_vendor.unref(modalContent)}吗？`),
        k: common_vendor.o(cancelClick),
        l: common_vendor.p({
          type: "success",
          plain: true,
          text: "取消",
          shape: "circle",
          customStyle: {
            "margin": "0 10px"
          }
        }),
        m: common_vendor.o(confirmClick),
        n: common_vendor.p({
          text: "确定",
          type: "success",
          shape: "circle",
          customStyle: {
            "margin": "0 10px"
          }
        }),
        o: common_vendor.p({
          show: common_vendor.unref(modalShow),
          title: "操作确认"
        }),
        p: common_vendor.p({
          text: "￥",
          margin: "0 3px 0 0",
          bold: true
        }),
        q: common_vendor.o(_ctx.change),
        r: common_vendor.o(($event) => common_vendor.isRef(prepaidAmountModalContent) ? prepaidAmountModalContent.value = $event : null),
        s: common_vendor.p({
          placeholder: "请输入预付金额",
          border: "bottom",
          type: "number",
          modelValue: common_vendor.unref(prepaidAmountModalContent)
        }),
        t: common_vendor.o(prepaidAmountCancelClick),
        v: common_vendor.p({
          type: "primary",
          plain: true,
          text: "取消",
          shape: "circle",
          customStyle: {
            "margin": "0 10px"
          }
        }),
        w: common_vendor.o(prepaidAmountConfirmClick),
        x: common_vendor.p({
          text: "确定",
          type: "primary",
          shape: "circle",
          customStyle: {
            "margin": "0 10px"
          }
        }),
        y: common_vendor.p({
          show: common_vendor.unref(prepaidAmountModalShow),
          title: "预付金额"
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a6248652"], ["__file", "/Users/guolimeng/Desktop/work/uni-preset-vue-vite-ts 2/src/pages/areaManagement/areaManagement/components/areaConfig.vue"]]);
wx.createComponent(Component);
