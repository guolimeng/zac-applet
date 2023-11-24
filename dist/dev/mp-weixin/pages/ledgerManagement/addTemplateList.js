"use strict";
const common_vendor = require("../../common/vendor.js");
const api_ledgerManagement_ledgerManagement = require("../../api/ledgerManagement/ledgerManagement.js");
require("../../utils/request.js");
require("../../utils/auth.js");
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_up_col2 = common_vendor.resolveComponent("up-col");
  const _easycom_u__input2 = common_vendor.resolveComponent("u--input");
  const _easycom_u_form_item2 = common_vendor.resolveComponent("u-form-item");
  const _easycom_up_text2 = common_vendor.resolveComponent("up-text");
  const _easycom_up_input2 = common_vendor.resolveComponent("up-input");
  const _easycom_up_row2 = common_vendor.resolveComponent("up-row");
  const _easycom_u__form2 = common_vendor.resolveComponent("u--form");
  const _easycom_q_form_data2 = common_vendor.resolveComponent("q-form-data");
  const _easycom_u_search2 = common_vendor.resolveComponent("u-search");
  const _easycom_u_action_sheet2 = common_vendor.resolveComponent("u-action-sheet");
  (_easycom_u_icon2 + _easycom_u_button2 + _easycom_up_col2 + _easycom_u__input2 + _easycom_u_form_item2 + _easycom_up_text2 + _easycom_up_input2 + _easycom_up_row2 + _easycom_u__form2 + _easycom_q_form_data2 + _easycom_u_search2 + _easycom_u_action_sheet2)();
}
const _easycom_u_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_button = () => "../../node-modules/uview-plus/components/u-button/u-button.js";
const _easycom_up_col = () => "../../node-modules/uview-plus/components/u-col/u-col.js";
const _easycom_u__input = () => "../../node-modules/uview-plus/components/u-input/u-input.js";
const _easycom_u_form_item = () => "../../node-modules/uview-plus/components/u-form-item/u-form-item.js";
const _easycom_up_text = () => "../../node-modules/uview-plus/components/u-text/u-text.js";
const _easycom_up_input = () => "../../node-modules/uview-plus/components/u-input/u-input.js";
const _easycom_up_row = () => "../../node-modules/uview-plus/components/u-row/u-row.js";
const _easycom_u__form = () => "../../node-modules/uview-plus/components/u-form/u-form.js";
const _easycom_q_form_data = () => "../../components/q-form-data/q-form-data.js";
const _easycom_u_search = () => "../../node-modules/uview-plus/components/u-search/u-search.js";
const _easycom_u_action_sheet = () => "../../node-modules/uview-plus/components/u-action-sheet/u-action-sheet.js";
if (!Math) {
  (_easycom_u_icon + _easycom_u_button + _easycom_up_col + _easycom_u__input + _easycom_u_form_item + _easycom_up_text + _easycom_up_input + _easycom_up_row + _easycom_u__form + _easycom_q_form_data + _easycom_u_search + _easycom_u_action_sheet)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "addTemplateList",
  setup(__props) {
    const uForm = common_vendor.ref();
    const subform = common_vendor.ref();
    const validatPercent = (rule, value, callback) => {
      let list = formData.value.data.clearingConfigDetails;
      let sum = null;
      if (list.length > 1) {
        list.reduce((pre, curr) => {
          sum = Number(pre.percent) + Number(curr.percent);
          return sum;
        });
      } else {
        sum = value;
      }
      if (!value) {
        callback(new Error("分账比例不可为空"));
      } else if (sum < 100 || sum > 100) {
        callback("分账比例总和要为100%");
      } else {
        callback();
      }
    };
    common_vendor.ref("");
    const searchKey = common_vendor.ref("");
    const clearingId = common_vendor.ref("");
    const customStyle = common_vendor.reactive({
      color: "rgb(20,111,249)",
      border: "0px",
      justifyContent: "flex-start"
    });
    const data = common_vendor.reactive({
      formData: {
        sets: {
          showTags: false,
          list: [
            {
              title: "基本信息",
              object: {
                clearingConfigName: {
                  type: "input",
                  name: "模板名称",
                  placeholder: "请填写模板名称",
                  clearable: false,
                  border: "none"
                },
                password: {
                  name: "",
                  typeSet: {
                    slotName: "conditionSetting"
                  }
                }
              }
            }
          ]
        },
        data: {
          clearingConfigId: "",
          clearingConfigName: "",
          serviceMode: "01",
          operateType: "01",
          clearingConfigDetails: [
            {
              percent: "",
              clearingAccountId: "",
              bankUserName: ""
            }
          ]
        }
      },
      rules: {},
      defaultRules: {
        "clearingConfigName": {
          type: "string",
          required: true,
          message: "请填写模板名称",
          trigger: ["blur", "change"]
        },
        "clearingConfigDetails.0.bankUserName": {
          required: true,
          message: "账户不可为空",
          trigger: ["change", "blur"]
        },
        "clearingConfigDetails.0.percent": {
          required: true,
          validator: validatPercent,
          trigger: ["change", "blur"]
        }
      },
      actionSheetShow: false,
      typeOptions: []
    });
    let { formData, rules, defaultRules, actionSheetShow, typeOptions } = common_vendor.toRefs(data);
    common_vendor.onMounted(() => {
      rules.value = defaultRules.value;
      getAccountListFun();
    });
    common_vendor.onLoad((option) => {
      clearingId.value = option.clearingId;
      if (option.clearingId) {
        editDetailFun(option);
      }
    });
    const editDetailFun = (option) => {
      api_ledgerManagement_ledgerManagement.clearingAccountChargeConfigDetail({ clearingConfigId: option.clearingId }).then((res) => {
        let { data: data2 } = res;
        formData.value.data = data2;
        formData.value.data.operateType = "02";
      });
    };
    const getAccountListFun = () => {
      let param = {
        "operatorId": "",
        "pageNo": 1,
        "pageSize": 99990,
        "bankUserName": searchKey.value
      };
      api_ledgerManagement_ledgerManagement.clearingAccountList(param).then((res) => {
        let { data: data2 } = res;
        typeOptions.value = data2.clearingAccountInfoDtoList.map((item) => {
          return {
            ...item,
            value: item.clearingAccountId,
            label: item.bankUserName
          };
        });
      });
    };
    const delDomain = (index) => {
      if (formData.value.data.clearingConfigDetails.length == 1) {
        common_vendor.index.showToast({
          icon: "none",
          duration: 3e3,
          title: "至少保留一个"
        });
      } else {
        formData.value.data.clearingConfigDetails.splice(index, 1);
        delRules(index, "bankUserName");
        delRules(index, "percent");
      }
    };
    const addDomain = () => {
      formData.value.data.clearingConfigDetails.push({
        percent: "",
        clearingAccountId: "",
        bankUserName: ""
      });
      addRules();
    };
    const searchKeyData = (item, index) => {
      let list = formData.value.data.clearingConfigDetails;
      let isRepeat = list.some((val) => {
        return val.clearingAccountId == item.value;
      });
      if (isRepeat) {
        common_vendor.index.$u.toast("请不要选择重复账户");
      } else {
        formData.value.data.clearingConfigDetails[showTypeIndex.value].clearingAccountId = item.value;
        formData.value.data.clearingConfigDetails[showTypeIndex.value].bankUserName = item.label;
        close();
        subform.value.validateField(`clearingConfigDetails.${showTypeIndex.value}.bankUserName`);
      }
    };
    const percentChange = (v) => {
      subform.value.validateField();
    };
    const confirm = () => {
      let formEl = uForm.value.$refs.formRef;
      let formEl1 = subform.value;
      let formDataList = formData.value.data;
      if (!formEl)
        return;
      let subformState = false;
      formEl1.validate().then((res) => {
        subformState = true;
      }).catch((errors) => {
        subformState = false;
      });
      formEl.validate().then((valid) => {
        if (valid && subformState) {
          api_ledgerManagement_ledgerManagement.clearingAccountChargeConfigSave(formDataList).then((res) => {
            common_vendor.index.navigateTo({
              url: `/pages/ledgerManagement/index`
            });
          });
        } else {
          return false;
        }
      });
    };
    const showTypeIndex = common_vendor.ref("");
    const openPopup = (index) => {
      actionSheetShow.value = true;
      showTypeIndex.value = index;
    };
    const close = (index) => {
      actionSheetShow.value = false;
      searchKey.value = "";
    };
    const addRules = () => {
      const index = formData.value.data.clearingConfigDetails.length - 1;
      const rule = {
        [`clearingConfigDetails.${index}.bankUserName`]: {
          required: true,
          message: "账户不可为空",
          trigger: ["change", "blur"]
        },
        [`clearingConfigDetails.${index}.percent`]: {
          validator: validatPercent,
          required: true,
          trigger: ["change", "blur"]
        }
      };
      rules.value = { ...rules.value, ...rule };
    };
    const delRules = (index, key) => {
      let keys = `clearingConfigDetails.${index}.${key}`;
      delete rules.value[keys];
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(formData).data.clearingConfigDetails, (domain, index, i0) => {
          return {
            a: "a8cbc7e6-5-" + i0 + "," + ("a8cbc7e6-4-" + i0),
            b: common_vendor.o(($event) => delDomain(index), domain.key),
            c: "a8cbc7e6-4-" + i0 + "," + ("a8cbc7e6-3-" + i0),
            d: "a8cbc7e6-3-" + i0 + "," + ("a8cbc7e6-2-" + i0),
            e: "a8cbc7e6-9-" + i0 + "," + ("a8cbc7e6-8-" + i0),
            f: "a8cbc7e6-8-" + i0 + "," + ("a8cbc7e6-7-" + i0),
            g: common_vendor.o(($event) => domain.bankUserName = $event, domain.key),
            h: common_vendor.p({
              disabled: true,
              disabledColor: "#ffffff",
              placeholder: "请选择账户",
              modelValue: domain.bankUserName
            }),
            i: common_vendor.o(($event) => openPopup(index), domain.key),
            j: "a8cbc7e6-7-" + i0 + "," + ("a8cbc7e6-6-" + i0),
            k: common_vendor.p({
              prop: "clearingConfigDetails." + index + ".bankUserName"
            }),
            l: "a8cbc7e6-6-" + i0 + "," + ("a8cbc7e6-2-" + i0),
            m: "a8cbc7e6-13-" + i0 + "," + ("a8cbc7e6-12-" + i0),
            n: common_vendor.o(percentChange, domain.key),
            o: "a8cbc7e6-12-" + i0 + "," + ("a8cbc7e6-11-" + i0),
            p: common_vendor.o(($event) => domain.percent = $event, domain.key),
            q: common_vendor.p({
              placeholder: "分账比例",
              type: "number",
              modelValue: domain.percent
            }),
            r: "a8cbc7e6-11-" + i0 + "," + ("a8cbc7e6-10-" + i0),
            s: common_vendor.p({
              prop: "clearingConfigDetails." + index + ".percent"
            }),
            t: "a8cbc7e6-10-" + i0 + "," + ("a8cbc7e6-2-" + i0),
            v: "a8cbc7e6-2-" + i0 + ",a8cbc7e6-1",
            w: domain.key
          };
        }),
        b: common_vendor.p({
          name: "minus-circle-fill",
          color: "red",
          size: "16"
        }),
        c: common_vendor.p({
          link: true,
          customStyle: {
            "border": "0px"
          }
        }),
        d: common_vendor.p({
          span: "1"
        }),
        e: common_vendor.p({
          name: "arrow-right",
          color: "#c1c4cB"
        }),
        f: common_vendor.p({
          span: "5"
        }),
        g: common_vendor.p({
          text: "%",
          margin: "0 3px 0 0",
          type: "tips"
        }),
        h: common_vendor.p({
          span: "5"
        }),
        i: common_vendor.p({
          gutter: "10"
        }),
        j: common_vendor.p({
          name: "plus-circle-fill",
          color: "rgb(20,111,249)",
          size: "16",
          top: "12"
        }),
        k: common_vendor.o(addDomain),
        l: common_vendor.p({
          link: true,
          text: "添加",
          customStyle: common_vendor.unref(customStyle)
        }),
        m: common_vendor.sr(subform, "a8cbc7e6-1,a8cbc7e6-0", {
          "k": "subform"
        }),
        n: common_vendor.p({
          labelPosition: "left",
          model: common_vendor.unref(formData).data,
          rules: common_vendor.unref(rules)
        }),
        o: common_vendor.sr(uForm, "a8cbc7e6-0", {
          "k": "uForm"
        }),
        p: common_vendor.o(($event) => common_vendor.isRef(formData) ? formData.value = $event : formData = $event),
        q: common_vendor.p({
          labelPosition: "left",
          rules: common_vendor.unref(rules),
          labelStyle: {
            "color": "rgb(144,146,155)",
            "padding-left": "10px"
          },
          value: common_vendor.unref(formData)
        }),
        r: common_vendor.o(getAccountListFun),
        s: common_vendor.o(($event) => common_vendor.isRef(searchKey) ? searchKey.value = $event : null),
        t: common_vendor.p({
          ["show-action"]: true,
          actionText: "搜索",
          animation: false,
          actionStyle: {
            "color": "rgb(30,102,235)"
          },
          placeholder: "请输入分账账户名称",
          modelValue: common_vendor.unref(searchKey)
        }),
        v: common_vendor.f(common_vendor.unref(typeOptions), (item, index_, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: index_,
            c: common_vendor.o(($event) => searchKeyData(item, _ctx.index), index_)
          };
        }),
        w: common_vendor.o(close),
        x: common_vendor.p({
          show: common_vendor.unref(actionSheetShow),
          closeOnClickOverlay: true,
          round: 10
        }),
        y: common_vendor.o(confirm)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a8cbc7e6"], ["__file", "/Users/guolimeng/Desktop/work/uni-preset-vue-vite-ts 2/src/pages/ledgerManagement/addTemplateList.vue"]]);
wx.createPage(MiniProgramPage);
