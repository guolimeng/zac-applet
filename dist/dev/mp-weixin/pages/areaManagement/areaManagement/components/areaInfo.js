"use strict";
const common_vendor = require("../../../../common/vendor.js");
const api_areaManagement_areaManagement = require("../../../../api/areaManagement/areaManagement.js");
const api_ledgerManagement_ledgerManagement = require("../../../../api/ledgerManagement/ledgerManagement.js");
const api_billingTemplate_billingTemplate = require("../../../../api/billingTemplate/billingTemplate.js");
const store_modules_user = require("../../../../store/modules/user.js");
require("../../../../utils/request.js");
require("../../../../utils/auth.js");
if (!Array) {
  const _easycom_q_form_data2 = common_vendor.resolveComponent("q-form-data");
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  (_easycom_q_form_data2 + _easycom_up_button2 + _easycom_u_popup2)();
}
const _easycom_q_form_data = () => "../../../../components/q-form-data/q-form-data.js";
const _easycom_up_button = () => "../../../../node-modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_popup = () => "../../../../node-modules/uview-plus/components/u-popup/u-popup.js";
if (!Math) {
  (_easycom_q_form_data + _easycom_up_button + _easycom_u_popup)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "areaInfo",
  props: {
    orgId: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    const userUserStore = store_modules_user.userStore();
    const popupShow = common_vendor.ref(false);
    const customStyle = common_vendor.reactive({
      width: "80%"
    });
    const uForm = common_vendor.ref();
    common_vendor.onMounted(() => {
      getBilMethod("twoBillingName", "01");
      getBilMethod("carBillingName", "02");
      getBilMethod("rechargeBillingName", "03");
      getBilMethod("tradeBillingName", "04");
      getAccountMethod();
      getRechargeConfigList("rechargeConfigBikeStoredValueName", "02");
      getRechargeConfigList("rechargeConfigCarStoredValueName", "03");
      if (props.orgId) {
        getAreaDetailst();
      }
    });
    const checkboxChange = (val) => {
      if (val.includes("01")) {
        isHidden("twoBillingName", false);
      } else {
        isHidden("twoBillingName", true);
      }
      if (val.includes("02")) {
        isHidden("carBillingName", false);
      } else {
        isHidden("carBillingName", true);
      }
      if (val.includes("03")) {
        isHidden("rechargeBillingName", false);
      } else {
        isHidden("rechargeBillingName", true);
      }
      if (val.includes("04")) {
        isHidden("tradeBillingName", false);
      } else {
        isHidden("tradeBillingName", true);
      }
    };
    const eventChangeKey = (val, key) => {
      let keys = "";
      keys = `${subKey(key, "N")}Id`;
      formData.value.data[keys] = val.value;
    };
    const subKey = (key, str) => {
      let strIndex = key.indexOf(str);
      return key.substring(0, strIndex);
    };
    const validatorFun = (rule, value, callback) => {
      if (formData.value.data.type.includes(ruleKey.value[rule.field]) && !value) {
        callback(ruleMessage.value[rule.field]);
      } else {
        callback();
      }
    };
    const data = common_vendor.reactive({
      formData: {
        sets: {
          showTags: true,
          list: [
            {
              title: "基本信息",
              object: {
                name: {
                  type: "input",
                  name: "片区名称",
                  placeholder: "请填写片区名称",
                  clearable: false,
                  border: "none"
                },
                detailedAddress: {
                  type: "input",
                  name: "详细地址",
                  border: "none",
                  placeholder: "请填写详细地址"
                },
                phone: {
                  type: "input",
                  name: "联系电话",
                  placeholder: "请填写联系电话",
                  border: "none"
                }
              }
            },
            {
              title: "物业信息",
              object: {
                realEstate: {
                  type: "input",
                  name: "所属物业",
                  placeholder: "请填写所属物业",
                  clearable: false,
                  border: "none"
                },
                estateName: {
                  type: "input",
                  name: "物业联系人",
                  placeholder: "请填写联系人姓名",
                  clearable: false,
                  border: "none"
                },
                estatePhone: {
                  type: "input",
                  name: "物业联系电话",
                  placeholder: "请填写联系人电话",
                  clearable: false,
                  border: "none"
                }
              }
            },
            {
              title: "计费方式",
              object: {
                type: {
                  type: "checkbox",
                  name: "运营产品类型",
                  placeholder: "请填写所属物业",
                  clearable: false,
                  border: "none",
                  typeSet: {
                    data: [
                      { label: "两轮充", value: "01" },
                      { label: "汽车充", value: "02" },
                      { label: "充电柜", value: "03" },
                      { label: "换电柜", value: "04" }
                    ],
                    eventChange: checkboxChange
                  }
                },
                twoBillingName: {
                  type: "select",
                  name: "两轮充计费",
                  border: "none",
                  hidden: true,
                  typeSet: {
                    data: [],
                    sheetTitle: "两轮充计费",
                    eventChange: eventChangeKey
                  }
                },
                carBillingName: {
                  type: "select",
                  name: "汽车充计费",
                  border: "none",
                  hidden: true,
                  typeSet: {
                    data: [],
                    sheetTitle: "汽车充计费",
                    eventChange: eventChangeKey
                  }
                },
                rechargeBillingName: {
                  type: "select",
                  name: "充电柜计费",
                  border: "none",
                  hidden: true,
                  typeSet: {
                    data: [],
                    sheetTitle: "充电柜计费",
                    eventChange: eventChangeKey
                  }
                },
                tradeBillingName: {
                  type: "select",
                  name: "换电柜计费",
                  border: "none",
                  hidden: true,
                  typeSet: {
                    data: [],
                    sheetTitle: "换电柜计费",
                    eventChange: eventChangeKey
                  }
                }
              }
            },
            {
              title: "分账方式",
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
            },
            {
              title: "卡片充值方式",
              object: {
                // twoRoundsCardName: {
                //   type: "select",
                //   name: '两轮充包月卡',
                //   border: 'none',
                //   typeSet: {
                //     data: [],
                //     sheetTitle: '两轮充包月卡',
                //   },
                // },
                rechargeConfigBikeStoredValueName: {
                  type: "select",
                  name: "两轮充储值卡",
                  border: "none",
                  typeSet: {
                    data: [],
                    sheetTitle: "两轮充储值卡",
                    eventChange: eventChangeKey
                  }
                },
                rechargeConfigCarStoredValueName: {
                  type: "select",
                  name: "汽车充储值卡",
                  border: "none",
                  typeSet: {
                    data: [],
                    sheetTitle: "汽车充储值卡",
                    eventChange: eventChangeKey
                  }
                }
              }
            }
          ]
        },
        data: {
          name: "",
          detailedAddress: "",
          phone: "",
          realEstate: "",
          estateName: "",
          estatePhone: "",
          type: [],
          // 两轮充计费
          twoBillingName: "",
          twoBillingId: "",
          // 汽车充计费
          carBillingName: "",
          carBillingId: "",
          // 充电柜计费
          rechargeBillingName: "",
          rechargeBillingId: "",
          // 换电柜计费
          tradeBillingName: "",
          tradeBillingId: "",
          // 分账方式
          clearingConfigName: "",
          clearingConfigId: "",
          // 两轮充包月卡
          // twoRoundsCardName: '',
          // twoRoundsCard: '',
          // 两轮充储值卡
          rechargeConfigBikeStoredValueName: "",
          rechargeConfigBikeStoredValueId: "",
          // 汽车充储值卡
          rechargeConfigCarStoredValueName: "",
          rechargeConfigCarStoredValueId: ""
        }
      },
      rules: {
        "name": [{ type: "string", required: true, message: "请填写片区名称", trigger: ["blur", "change"] }],
        "detailedAddress": { type: "string", required: true, message: "请填写详细地址", trigger: ["blur", "change"] },
        "phone": [
          { type: "string", required: true, message: "请填写联系电话", trigger: ["blur", "change"] },
          {
            // 自定义验证函数，见上说明
            validator: (rule, value, callback) => {
              return common_vendor.index.$u.test.mobile(value);
            },
            message: "手机号码不正确",
            // 触发器可以同时用blur和change
            trigger: ["change", "blur"]
          }
        ],
        "realEstate": { type: "string", required: true, message: "请填写所属物业", trigger: ["blur", "change"] },
        "estateName": { type: "string", required: true, message: "请填写联系人姓名", trigger: ["blur", "change"] },
        "estatePhone": { type: "string", required: true, message: "请填写联系人电话", trigger: ["blur", "change"] },
        "type": { type: "array", min: 0, required: true, message: "请选择运营产品类型", trigger: ["change"] },
        "twoBillingName": { type: "string", required: true, validator: validatorFun, trigger: ["change"] },
        "carBillingName": [
          {
            validator: validatorFun,
            type: "string",
            required: true,
            message: "请选择汽车充计费",
            trigger: ["change", "blur"]
          }
        ],
        "rechargeBillingName": { type: "string", required: true, validator: validatorFun, trigger: ["change"] },
        "tradeBillingName": { type: "string", required: true, validator: validatorFun, trigger: ["change"] },
        "clearingConfigName": { type: "string", required: true, message: "请选择分账模板", trigger: ["change"] }
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
        "orgId": props.orgId
      };
      api_areaManagement_areaManagement.areaOrgDetail(param).then((res) => {
        let { data: data2 } = res;
        formData.value.data = data2.orgDto;
        let arr = [];
        if (data2.orgDto.twoBillingId) {
          arr.push("01");
        }
        if (data2.orgDto.carBillingId) {
          arr.push("02");
        }
        if (data2.orgDto.rechargeBillingId) {
          arr.push("03");
        }
        if (data2.orgDto.tradeBillingName) {
          arr.push("04");
        }
        formData.value.data.type = arr;
        checkboxChange(arr);
        if (data2.reChargeConfigOrgDtos.length > 0) {
          data2.reChargeConfigOrgDtos.forEach((item) => {
            switch (item.reChargeConfigType) {
              case "02":
                formData.value.data.rechargeConfigBikeStoredValueName = item.reChargeConfigName;
                formData.value.data.rechargeConfigBikeStoredValueId = item.reChargeConfigId;
                break;
              case "03":
                formData.value.data.rechargeConfigCarStoredValueName = item.reChargeConfigName;
                formData.value.data.rechargeConfigCarStoredValueId = item.reChargeConfigId;
                break;
            }
          });
        } else {
          formData.value.data.rechargeConfigBikeStoredValueName = "";
          formData.value.data.rechargeConfigBikeStoredValueId = "";
          formData.value.data.rechargeConfigCarStoredValueName = "";
          formData.value.data.rechargeConfigCarStoredValueId = "";
        }
      });
    };
    const getBilMethod = (key, productType) => {
      let params = {
        operatorId: userUserStore.operatorId,
        productType
      };
      api_billingTemplate_billingTemplate.chargeConfigList(params).then((res) => {
        let { data: data2 } = res;
        data2.chargeConfigInfoList.forEach((item) => {
          item.label = item.templateName;
          item.value = item.chargeConfigId;
        });
        isSetData(key, data2.chargeConfigInfoList, 2);
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
    const getRechargeConfigList = (key, type) => {
      let params = {
        operatorId: userUserStore.operatorId,
        reChargeConfigType: type
      };
      api_areaManagement_areaManagement.rechargeConfigList(params).then((res) => {
        let { data: data2 } = res;
        data2.reChargeConfigDtoList.forEach((item) => {
          item.label = item.reChargeConfigName;
          item.value = item.reChargeConfigId;
        });
        isSetData(key, data2.reChargeConfigDtoList, 4);
      });
    };
    const confirm = () => {
      let formEl = uForm.value.$refs.formRef;
      let formDataList = formData.value.data;
      formDataList.operateType = props.orgId ? "02" : "01";
      if (!formEl)
        return;
      formEl.validate().then((valid) => {
        if (valid) {
          api_areaManagement_areaManagement.areaOrgSave(formDataList).then((res) => {
            jumpRoute();
          });
          console.log("成功");
        } else {
          return false;
        }
      });
    };
    const areaDeleteClick = () => {
      popupTitle.value = `确认删除「${formData.value.data.name}」`;
      common_vendor.index.$u.sleep().then(() => {
        popupShow.value = !popupShow.value;
      });
    };
    const jumpRoute = () => {
      common_vendor.index.switchTab({
        url: `/pages/areaManagement/areaManagement/areaList`,
        success: (res) => {
          let page = getCurrentPages().pop();
          if (page == void 0 || page == null)
            return;
          page.onLoad();
        }
      });
    };
    const close = () => {
      popupShow.value = false;
    };
    const cancelClick = () => {
      popupShow.value = !popupShow.value;
    };
    const confirmClick = () => {
      api_areaManagement_areaManagement.areaOrgDelete({ orgId: props.orgId }).then(
        (result) => {
          cancelClick();
          jumpRoute();
        }
      );
    };
    const isHidden = (key, state) => {
      return formData.value.sets.list[2].object[key].hidden = state;
    };
    const isSetData = (key, data2, index) => {
      return formData.value.sets.list[index].object[key].typeSet.data = data2;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.sr(uForm, "6586fac2-0", {
          "k": "uForm"
        }),
        b: common_vendor.o(($event) => common_vendor.isRef(formData) ? formData.value = $event : formData = $event),
        c: common_vendor.p({
          labelPosition: "left",
          labelWidth: "110",
          rules: common_vendor.unref(rules),
          labelStyle: {
            "color": "rgb(144,146,155)",
            "padding-left": "10px"
          },
          value: common_vendor.unref(formData)
        }),
        d: __props.orgId
      }, __props.orgId ? {
        e: common_vendor.o(areaDeleteClick)
      } : {}, {
        f: common_vendor.o(confirm),
        g: common_vendor.t(common_vendor.unref(popupTitle)),
        h: common_vendor.o(cancelClick),
        i: common_vendor.p({
          type: "info",
          plain: true,
          text: "取消",
          customStyle: {
            width: "100px"
          }
        }),
        j: common_vendor.o(confirmClick),
        k: common_vendor.p({
          type: "primary",
          text: "确定",
          customStyle: {
            width: "100px"
          }
        }),
        l: common_vendor.o(close),
        m: common_vendor.p({
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
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6586fac2"], ["__file", "/Users/guolimeng/Desktop/work/uni-preset-vue-vite-ts 2/src/pages/areaManagement/areaManagement/components/areaInfo.vue"]]);
wx.createComponent(Component);
