"use strict";
const common_vendor = require("../../../../common/vendor.js");
const api_areaManagement_areaManagement = require("../../../../api/areaManagement/areaManagement.js");
const api_ledgerManagement_ledgerManagement = require("../../../../api/ledgerManagement/ledgerManagement.js");
const api_billingTemplate_billingTemplate = require("../../../../api/billingTemplate/billingTemplate.js");
const store_modules_user = require("../../../../store/modules/user.js");
require("../../../../utils/request.js");
require("../../../../utils/auth.js");
if (!Array) {
  const _easycom_u_switch2 = common_vendor.resolveComponent("u-switch");
  const _easycom_q_form_data2 = common_vendor.resolveComponent("q-form-data");
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  (_easycom_u_switch2 + _easycom_q_form_data2 + _easycom_up_button2 + _easycom_u_popup2)();
}
const _easycom_u_switch = () => "../../../../node-modules/uview-plus/components/u-switch/u-switch.js";
const _easycom_q_form_data = () => "../../../../components/q-form-data/q-form-data.js";
const _easycom_up_button = () => "../../../../node-modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_popup = () => "../../../../node-modules/uview-plus/components/u-popup/u-popup.js";
if (!Math) {
  (_easycom_u_switch + _easycom_q_form_data + _easycom_up_button + _easycom_u_popup)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "stationInfo",
  props: {
    stationId: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    const userUserStore = store_modules_user.userStore();
    const paymentValue = common_vendor.ref(false);
    const popupShow = common_vendor.ref(false);
    const customStyle = common_vendor.reactive({
      width: "80%"
    });
    const uForm = common_vendor.ref();
    common_vendor.onMounted(() => {
      getAreaList();
      getBilMethod();
      getAccountMethod();
      if (props.stationId) {
        getAreaDetailst();
      }
    });
    const eventChangeKey = (val, key) => {
      let keys = "";
      keys = `${subKey(key, "N")}Id`;
      formData.value.data[keys] = val.value;
    };
    const subKey = (key, str) => {
      let strIndex = key.indexOf(str);
      return key.substring(0, strIndex);
    };
    const data = common_vendor.reactive({
      formData: {
        sets: {
          showTags: true,
          list: [
            {
              title: "基本信息",
              object: {
                stationName: {
                  type: "input",
                  name: "充电站名称",
                  placeholder: "请填写充电站名称",
                  clearable: false,
                  border: "none"
                },
                orgName: {
                  type: "select",
                  name: "所属片区",
                  border: "none",
                  typeSet: {
                    data: [],
                    sheetTitle: "所属片区",
                    eventChange: eventChangeKey
                  }
                },
                ip: {
                  type: "input",
                  name: "网关ID",
                  placeholder: "请填写网关ID",
                  border: "none"
                }
              }
            },
            {
              title: "充电站个性化",
              slotHeaderRight: "stationIndividuation",
              object: {}
            },
            {
              title: "计费方式",
              hidden: true,
              object: {
                twoBillingName: {
                  type: "select",
                  name: "计费模板",
                  border: "none",
                  typeSet: {
                    data: [],
                    sheetTitle: "两轮充计费",
                    eventChange: eventChangeKey
                  }
                }
              }
            },
            {
              title: "分账方式",
              hidden: true,
              object: {
                clearingConfigName: {
                  type: "select",
                  name: "分账模板",
                  border: "none",
                  typeSet: {
                    data: [],
                    sheetTitle: "分账模板",
                    eventChange: eventChangeKey
                  }
                }
              }
            }
          ]
        },
        data: {
          stationName: "",
          orgName: "",
          orgId: "",
          ip: "",
          // 两轮充计费
          twoBillingName: "",
          twoBillingId: "",
          // 分账方式
          clearingConfigName: "",
          clearingConfigId: ""
        }
      },
      rules: {
        "stationName": [{ type: "string", required: true, message: "请填写充电站名称", trigger: ["blur", "change"] }],
        "orgName": { type: "string", required: true, message: "请选择所属片区", trigger: ["blur", "change"] }
      },
      // 分账模板的下拉数据
      optionsNameType: [],
      ruleKey: {
        "twoBillingName": "01",
        "carBillingName": "02",
        "rechargeBillingName": "03",
        "tradeBillingName": "04"
      },
      ruleMessage: {
        "twoBillingName": "请选择两轮充计费",
        "carBillingName": "请选择汽车充计费",
        "rechargeBillingName": "请选择充电柜计费",
        "tradeBillingName": "请选择换电柜计费"
      },
      popupTitle: ""
    });
    let { formData, rules, optionsNameType, ruleKey, ruleMessage, popupTitle } = common_vendor.toRefs(data);
    const getAreaDetailst = () => {
      let param = {
        "stationId": props.stationId
      };
      api_areaManagement_areaManagement.stationDetail(param).then((res) => {
        let { data: data2 } = res;
        formData.value.data = data2;
      });
    };
    const switchChange = (val) => {
      if (val) {
        formData.value.sets.list[2].hidden = false;
        formData.value.sets.list[3].hidden = false;
      } else {
        formData.value.sets.list[2].hidden = true;
        formData.value.sets.list[3].hidden = true;
      }
    };
    const getAreaList = () => {
      let params = {
        operatorId: userUserStore.operatorId,
        "pageNo": 1,
        "pageSize": 30
      };
      api_areaManagement_areaManagement.areaOrgList(params).then((res) => {
        let { data: data2 } = res;
        data2.orgDtos.forEach((item) => {
          item.label = item.name;
          item.value = item.orgId;
        });
        isSetData("orgName", data2.orgDtos, 0);
      });
    };
    const getBilMethod = () => {
      let params = {
        operatorId: userUserStore.operatorId
      };
      api_billingTemplate_billingTemplate.chargeConfigList(params).then((res) => {
        let { data: data2 } = res;
        data2.chargeConfigInfoList.forEach((item) => {
          item.label = item.templateName;
          item.value = item.chargeConfigId;
        });
        isSetData("twoBillingName", data2.chargeConfigInfoList, 2);
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
        isSetData("clearingConfigName", data2.clearingConfigDtos, 3);
      });
    };
    const confirm = () => {
      let formEl = uForm.value.$refs.formRef;
      let formDataList = formData.value.data;
      formDataList.operateType = props.stationId ? "02" : "01";
      if (!formEl)
        return;
      formEl.validate().then((valid) => {
        if (valid) {
          api_areaManagement_areaManagement.stationSave(formDataList).then((res) => {
            common_vendor.index.navigateTo({
              url: `/pages/areaManagement/chargingStation/chargingStationDetails?stationId=${formDataList.stationId}&orgId=${formDataList.orgId}`
            });
          });
        } else {
          return false;
        }
      });
    };
    const areaDeleteClick = () => {
      popupTitle.value = `确认删除「${formData.value.data.stationName}」`;
      common_vendor.index.$u.sleep().then(() => {
        popupShow.value = !popupShow.value;
      });
    };
    const jumpRoute = () => {
      common_vendor.index.navigateTo({
        url: `/pages/areaManagement/areaManagement/areaDetails?orgId=${formData.value.data.orgId}`
      });
    };
    const close = () => {
      popupShow.value = false;
    };
    const cancelClick = () => {
      popupShow.value = !popupShow.value;
    };
    const confirmClick = () => {
      api_areaManagement_areaManagement.stationDelete({ stationId: props.stationId }).then(
        (result) => {
          cancelClick();
          jumpRoute();
        }
      );
    };
    const isSetData = (key, data2, index) => {
      return formData.value.sets.list[index].object[key].typeSet.data = data2;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(switchChange),
        b: common_vendor.o(($event) => common_vendor.isRef(paymentValue) ? paymentValue.value = $event : null),
        c: common_vendor.p({
          modelValue: common_vendor.unref(paymentValue)
        }),
        d: common_vendor.sr(uForm, "32f03f87-0", {
          "k": "uForm"
        }),
        e: common_vendor.o(($event) => common_vendor.isRef(formData) ? formData.value = $event : formData = $event),
        f: common_vendor.p({
          labelPosition: "left",
          labelWidth: "110",
          rules: common_vendor.unref(rules),
          labelStyle: {
            "color": "rgb(144,146,155)",
            "padding-left": "10px"
          },
          value: common_vendor.unref(formData)
        }),
        g: __props.stationId
      }, __props.stationId ? {
        h: common_vendor.o(areaDeleteClick)
      } : {}, {
        i: common_vendor.o(confirm),
        j: common_vendor.t(common_vendor.unref(popupTitle)),
        k: common_vendor.o(cancelClick),
        l: common_vendor.p({
          type: "info",
          plain: true,
          text: "取消",
          customStyle: {
            width: "100px"
          }
        }),
        m: common_vendor.o(confirmClick),
        n: common_vendor.p({
          type: "primary",
          text: "确定",
          customStyle: {
            width: "100px"
          }
        }),
        o: common_vendor.o(close),
        p: common_vendor.p({
          safeAreaInsetBottom: true,
          safeAreaInsetTop: true,
          mode: "center",
          overlay: true,
          closeOnClickOverlay: true,
          round: 10,
          show: common_vendor.unref(popupShow),
          customStyle: common_vendor.unref(customStyle)
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-32f03f87"], ["__file", "/Users/guolimeng/Desktop/work/uni-preset-vue-vite-ts 2/src/pages/areaManagement/chargingStation/components/stationInfo.vue"]]);
wx.createComponent(Component);
