"use strict";
const common_vendor = require("../../common/vendor.js");
const api_billingTemplate_billingTemplate = require("../../api/billingTemplate/billingTemplate.js");
require("../../utils/request.js");
require("../../utils/auth.js");
if (!Array) {
  const _easycom_up_text2 = common_vendor.resolveComponent("up-text");
  const _easycom_up_input2 = common_vendor.resolveComponent("up-input");
  const _easycom_u_form_item2 = common_vendor.resolveComponent("u-form-item");
  const _easycom_u__form2 = common_vendor.resolveComponent("u--form");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_up_col2 = common_vendor.resolveComponent("up-col");
  const _easycom_up_row2 = common_vendor.resolveComponent("up-row");
  const _easycom_u__input2 = common_vendor.resolveComponent("u--input");
  const _easycom_q_form_data2 = common_vendor.resolveComponent("q-form-data");
  const _easycom_u_datetime_picker2 = common_vendor.resolveComponent("u-datetime-picker");
  (_easycom_up_text2 + _easycom_up_input2 + _easycom_u_form_item2 + _easycom_u__form2 + _easycom_u_icon2 + _easycom_u_button2 + _easycom_up_col2 + _easycom_up_row2 + _easycom_u__input2 + _easycom_q_form_data2 + _easycom_u_datetime_picker2)();
}
const _easycom_up_text = () => "../../node-modules/uview-plus/components/u-text/u-text.js";
const _easycom_up_input = () => "../../node-modules/uview-plus/components/u-input/u-input.js";
const _easycom_u_form_item = () => "../../node-modules/uview-plus/components/u-form-item/u-form-item.js";
const _easycom_u__form = () => "../../node-modules/uview-plus/components/u-form/u-form.js";
const _easycom_u_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_button = () => "../../node-modules/uview-plus/components/u-button/u-button.js";
const _easycom_up_col = () => "../../node-modules/uview-plus/components/u-col/u-col.js";
const _easycom_up_row = () => "../../node-modules/uview-plus/components/u-row/u-row.js";
const _easycom_u__input = () => "../../node-modules/uview-plus/components/u-input/u-input.js";
const _easycom_q_form_data = () => "../../components/q-form-data/q-form-data.js";
const _easycom_u_datetime_picker = () => "../../node-modules/uview-plus/components/u-datetime-picker/u-datetime-picker.js";
if (!Math) {
  (_easycom_up_text + _easycom_up_input + _easycom_u_form_item + _easycom_u__form + _easycom_u_icon + _easycom_u_button + _easycom_up_col + _easycom_up_row + _easycom_u__input + _easycom_q_form_data + _easycom_u_datetime_picker)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "addTemplateList",
  setup(__props) {
    const uForm = common_vendor.ref();
    const candidateAmountForm = common_vendor.ref();
    const chargingFeesForm = common_vendor.ref();
    const serviceFeeForm = common_vendor.ref();
    const timeParagraphForm = common_vendor.ref();
    const validatEmaxPower = (rule, value, callback) => {
      if (!value && formData.value.data.billingMode == "03") {
        callback(new Error("功率不可为空"));
      } else if (value < 1) {
        callback("最大功率不得低于1W");
      } else {
        callback();
      }
    };
    const validateEndTime = (rule, value, callback) => {
      formData.value.data.chargingCostList;
      if (!value) {
        callback(new Error("结束时间不可为空"));
      } else {
        callback();
      }
    };
    const validatCardPrepaidAmount = (rule, value, callback) => {
      if (!value && formData.value.data.productType == "02") {
        callback(new Error("卡片预付金额不可为空"));
      } else {
        callback();
      }
    };
    const validatMinPaymentAmount = (rule, value, callback) => {
      if (!value && (formData.value.data.billingMode == "03" || formData.value.data.billingMode == "06")) {
        callback(new Error("最小支付金额不可为空"));
      } else {
        callback();
      }
    };
    common_vendor.ref("");
    const chargeConfigId = common_vendor.ref("");
    const customStyle = common_vendor.reactive({
      color: "rgb(20,111,249)",
      border: "0px",
      justifyContent: "flex-start"
    });
    const productTypeChange = (item) => {
      let val = item.value;
      switch (val) {
        case "01":
          formData.value.sets.list[0].object.billingModeDesc.typeSet.data = billingModeOptionTwoWheels.value;
          billingModeChange({ label: "按时计费", value: "01" });
          formData.value.data.candidateAmount = [1, 2, 3, 4, 5];
          break;
        case "02":
          formData.value.sets.list[0].object.billingModeDesc.typeSet.data = billingModeOptionCar.value;
          billingModeChange({ label: "汽车充服务费模板", value: "06" });
          formData.value.data.candidateAmount = [20, 50, 100, 200, 500];
          break;
      }
      formData.value.data.productType = val;
      formData.value.data.productTypeDesc = item.label;
    };
    const billingModeChange = (item) => {
      let val = item.value;
      if (val == "03" || val == "06") {
        isHidden("searchWords6", false);
        isHidden("minPaymentAmount", false);
      } else {
        isHidden("searchWords6", true);
        isHidden("minPaymentAmount", true);
      }
      if (val == "02" || val == "03") {
        isHidden("chargingInformation", false);
      } else {
        isHidden("chargingInformation", true);
      }
      if (val == "01" || val == "02" || val == "03") {
        isHidden("searchWords3", false);
      } else {
        isHidden("searchWords3", true);
      }
      if (val == "05") {
        isHidden("searchWords9", false);
      } else {
        isHidden("searchWords9", true);
      }
      if (val == "06") {
        isHidden("cardPrepaidAmount", false);
        isHidden("searchWords10", false);
      } else {
        isHidden("cardPrepaidAmount", true);
        isHidden("searchWords10", true);
      }
      emptyForm();
      formData.value.data.billingMode = val;
      formData.value.data.billingModeDesc = item.label;
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
                  type: "input",
                  name: "模板名称",
                  placeholder: "请填写模板名称",
                  clearable: false,
                  border: "none"
                },
                productTypeDesc: {
                  type: "select",
                  name: "运营产品",
                  border: "none",
                  typeSet: {
                    data: [
                      { label: "两轮充", value: "01" },
                      { label: "汽车充", value: "02" }
                      // { label: "充电柜", value: "03" },
                      // { label: "换电柜", value: "04" },
                      // { label: "道闸", value: "05" },
                    ],
                    sheetTitle: "产品类型",
                    eventChange: productTypeChange
                  }
                },
                billingModeDesc: {
                  type: "select",
                  name: "计费模式",
                  border: "none",
                  typeSet: {
                    data: [
                      { label: "按时计费", value: "01" },
                      // { label: "按量计费", value: "02" },
                      { label: "按功率计费", value: "03" },
                      { label: "两轮车免费模版", value: "04" },
                      { label: "两轮车服务费模板", value: "05" }
                      // { label: "汽车充服务费模板", value: "06" },
                      // { label: "汽车充免费模板", value: "07" },
                    ],
                    sheetTitle: "计费模式",
                    eventChange: billingModeChange
                  }
                },
                chargingInformation: {
                  type: "radio",
                  name: "计费信息",
                  placeholder: "请填写模板名称",
                  clearable: false,
                  hidden: true,
                  border: "none",
                  typeSet: {
                    data: [
                      { label: "展示", value: "Y" },
                      { label: "不展示", value: "N" }
                    ]
                  }
                },
                searchWords6: {
                  name: "候选金额",
                  hidden: true,
                  leftIconStyle: {
                    paddingTop: "10px",
                    alignItems: "end"
                  },
                  typeSet: {
                    slotName: "candidateMmount"
                  }
                },
                minPaymentAmount: {
                  type: "input",
                  name: "最小支付金额",
                  placeholder: "请输入最小支付金额",
                  clearable: false,
                  border: "none",
                  hidden: true,
                  typeSet: {
                    suffixIcon: "元"
                  }
                },
                cardPrepaidAmount: {
                  type: "input",
                  name: "卡片预付金额",
                  placeholder: "请输入卡片预付金额",
                  clearable: false,
                  border: "none",
                  hidden: true,
                  typeSet: {
                    suffixIcon: "元"
                  }
                },
                searchWords3: {
                  name: "",
                  hidden: true,
                  typeSet: {
                    slotName: "conditionSetting"
                  }
                },
                searchWords9: {
                  name: "",
                  hidden: true,
                  typeSet: {
                    slotName: "serviceFeeTemplate"
                  }
                },
                searchWords10: {
                  name: "",
                  hidden: true,
                  typeSet: {
                    slotName: "timeTemplate"
                  }
                }
              }
            }
          ]
        },
        data: {
          templateName: "",
          productType: "01",
          productTypeDesc: "两轮充",
          billingMode: "01",
          billingModeDesc: "按时计费",
          chargingInformation: "Y",
          candidateAmount: [1, 2, 3, 4, 5],
          cardPrepaidAmount: "",
          minPaymentAmount: "0.01",
          chargingCostList: [
            {
              minPower: 0,
              maxPower: "",
              hour: "",
              amount: ""
            }
          ],
          serviceTemplate: {
            advanceServiceAmount: "",
            advanceTotalAmount: "",
            electricityPrice: "",
            servicePrice: "",
            serviceTimeLimit: ""
          },
          timePeriods: [
            {
              startTime: "00:00",
              endTime: "23:59",
              electricityPrice: "",
              servicePrice: "",
              disabled: true
            }
          ]
        }
      },
      rules: {},
      defaultRules: {
        "templateName": { type: "string", required: true, message: "请填写模板名称", trigger: ["blur", "change"] },
        "candidateAmount.0": {
          required: true,
          message: "金额不可为空",
          trigger: ["change"]
        },
        "candidateAmount.1": {
          required: true,
          message: "金额不可为空",
          trigger: ["change"]
        },
        "candidateAmount.2": {
          required: true,
          message: "金额不可为空",
          trigger: ["change"]
        },
        "candidateAmount.3": {
          required: true,
          message: "金额不可为空",
          trigger: ["change"]
        },
        "candidateAmount.4": {
          required: true,
          message: "金额不可为空",
          trigger: ["change"]
        },
        minPaymentAmount: [
          { required: true, validator: validatMinPaymentAmount, trigger: ["blur", "change"] }
        ],
        cardPrepaidAmount: [
          { required: true, validator: validatCardPrepaidAmount, trigger: ["blur", "change"] }
        ],
        chargingCostList: {
          maxPower: { required: true, validator: validatEmaxPower, trigger: ["change"] },
          // hour: {required: true,message: '时间不能为空',trigger: ['change']},
          amount: { required: true, message: "定价不能为空", trigger: ["change"] }
        },
        "chargingCostList.0.maxPower": {
          required: true,
          validator: validatEmaxPower,
          // message: '功率不可为空',
          trigger: ["change", "blur"]
        },
        "chargingCostList.0.hour": {
          required: true,
          message: "时间不能为空",
          trigger: ["change", "blur"]
        },
        "chargingCostList.0.amount": {
          required: true,
          message: "定价不能为空",
          trigger: ["change", "blur"]
        },
        "serviceTemplate.electricityPrice": { required: true, message: "电费单价不可为空", trigger: ["blur", "change"] },
        "serviceTemplate.servicePrice": { required: true, message: "服务费单价不可为空", trigger: ["blur", "change"] },
        "serviceTemplate.advanceTotalAmount": { required: true, message: "预支付总额不可为空", trigger: ["blur", "change"] },
        "serviceTemplate.advanceServiceAmount": { required: true, message: "服务费预支付金额不可为空", trigger: ["blur", "change"] },
        "serviceTemplate.serviceTimeLimit": { required: true, message: "服务费时间限制不可为空", trigger: ["blur", "change"] },
        "timePeriods.0.startTime": { required: true, message: "开始时间不能为空", trigger: ["change", "blur"] },
        "timePeriods.0.endTime": { required: true, validator: validateEndTime, trigger: ["change", "blur"] },
        "timePeriods.0.electricityPrice": { required: true, message: "电费不能为空", trigger: ["change", "blur"] },
        "timePeriods.0.servicePrice": { required: true, message: "服务费不能为空", trigger: ["change", "blur"] }
      },
      selectOptions: [
        { label: "选项一", value: "1" },
        { label: "选项二", value: "2" },
        { label: "选项三", value: "3" }
      ],
      billingModeOptionTwoWheels: [
        { label: "按时计费", value: "01" },
        // { label: "按量计费", value: "02" },
        { label: "按功率计费", value: "03" },
        { label: "两轮车免费模版", value: "04" },
        { label: "两轮车服务费模板", value: "05" }
      ],
      billingModeOptionCar: [
        { label: "汽车充服务费模板", value: "06" },
        { label: "汽车充免费模板", value: "07" }
      ],
      productTypeOption: {
        "01": "两轮充",
        "02": "汽车充",
        "03": "充电柜",
        "04": "换电柜",
        "05": "道闸"
      },
      billingOption: {
        "01": "按时计费",
        "02": "按量计费",
        "03": "按功率计费",
        "04": "两轮车免费模版",
        "05": "两轮车服务费模板",
        "06": "汽车充服务费模板",
        "07": "汽车充免费模板"
      },
      pickerShow: false
    });
    let { formData, rules, defaultRules, selectOptions, billingModeOptionTwoWheels, billingModeOptionCar, pickerShow, billingOption, productTypeOption } = common_vendor.toRefs(data);
    common_vendor.onMounted(() => {
      rules.value = defaultRules.value;
      productTypeChange({ label: "两轮充", value: "01" });
      billingModeChange({ label: "按时计费", value: "01" });
    });
    common_vendor.onLoad((option) => {
      chargeConfigId.value = option.chargeConfigId;
      if (option.chargeConfigId) {
        editDetailFun(option);
      }
    });
    const editDetailFun = (option) => {
      api_billingTemplate_billingTemplate.chargeConfigDetails({ chargeConfigId: option.chargeConfigId }).then((res) => {
        let { data: data2 } = res;
        productTypeChange({ value: data2.productType, label: productTypeOption.value[data2.productType] });
        billingModeChange({ value: data2.billingMode, label: billingOption.value[data2.billingMode] });
        if (data2.billingMode == "06" && data2.timePeriods.length > 0) {
          data2.timePeriods.forEach((item) => {
            item.disabled = true;
            item.electricityPrice = calculateAmount(item.electricityPrice);
            item.servicePrice = calculateAmount(item.servicePrice);
          });
        }
        data2 = formAllFun(data2, calculateAmount);
        candidateAmountFun(data2, calculateAmount);
        chargingCostFun(data2, calculateAmount);
        formData.value.data = data2;
      });
    };
    const delDomain = (index, key) => {
      if (formData.value.data[key].length == 1) {
        common_vendor.index.showToast({
          icon: "none",
          duration: 3e3,
          title: "至少保留一个"
        });
      } else {
        formData.value.data[key].splice(index, 1);
        if (key == "chargingCostList") {
          let previous = index !== 0 ? formData.value.data[key][index - 1] : null;
          if (formData.value.data.billingMode == "03") {
            formData.value.data[key][index].minPower = previous ? Number(previous.maxPower) + 1 : 0;
          }
          delRules("chargingCostList", index, "maxPower");
          delRules("chargingCostList", index, "hour");
          delRules("chargingCostList", index, "amount");
          console.log("收费规则删除", rules.value);
        } else {
          let previousItem = index !== 0 ? formData.value.data[key][index - 1] : null;
          if (formData.value.data[key].length == index) {
            formData.value.data[key][index - 1].endTime = "23:59";
            formData.value.data[key][index - 1].disabled = true;
          }
          if (previousItem) {
            datetimePickerConfirm({ value: previousItem.endTime });
          } else {
            formData.value.data[key][index].startTime = "00:00";
          }
          delRules("timePeriods", index, "startTime");
          delRules("timePeriods", index, "endTime");
          delRules("timePeriods", index, "electricityPrice");
          delRules("timePeriods", index, "servicePrice");
          console.log("收费规则删除", rules.value);
        }
      }
    };
    const addDomain = () => {
      const length = formData.value.data.chargingCostList.length;
      const lastValue = formData.value.data.chargingCostList[length - 1];
      formData.value.data.chargingCostList.push({
        minPower: Number(lastValue.maxPower) + 1,
        maxPower: "",
        hour: "",
        amount: ""
      });
      addChargeRules();
      console.log("收费规则添加", rules.value);
    };
    const addTimeTemplate = () => {
      let len = formData.value.data.timePeriods.length;
      let lastValue = formData.value.data.timePeriods[len - 1];
      formData.value.data.timePeriods.push({
        startTime: lastValue.startTime == "00:00" ? "" : "",
        endTime: "23:59",
        electricityPrice: "",
        servicePrice: "",
        disabled: true
      });
      lastValue.endTime = "结束时间";
      lastValue.disabled = false;
      addTimePeriodsRules();
      console.log("时间段规则添加", rules.value);
    };
    const confirm = () => {
      let formEl = uForm.value.$refs.formRef;
      candidateAmountForm.value;
      chargingFeesForm.value;
      serviceFeeForm.value;
      timeParagraphForm.value;
      let formDataList = submitData();
      console.log("formEl", formDataList);
      if (!formEl)
        return;
      formEl.validate().then((valid) => {
        if (valid) {
          api_billingTemplate_billingTemplate.chargeConfigSave(formDataList).then((res) => {
            common_vendor.index.navigateTo({
              url: `/pages/billingTemplate/index`
            });
          });
          console.log("成功");
        } else {
          return false;
        }
      });
    };
    const submitData = () => {
      let formDataList = formData.value.data;
      formDataList.operateType = chargeConfigId.value ? "02" : "01";
      if (formDataList.billingMode == "06" && formDataList.timePeriods.length > 0) {
        formDataList.timePeriods.forEach((item) => {
          item.electricityPrice = upCalculateAmount(item.electricityPrice);
          item.servicePrice = upCalculateAmount(item.servicePrice);
        });
      }
      formDataList = formAllFun(formDataList, upCalculateAmount);
      candidateAmountFun(formDataList, upCalculateAmount);
      chargingCostFun(formDataList, upCalculateAmount);
      return formDataList;
    };
    const isProof = (key, val) => {
      return formData.value.data[key] == val;
    };
    const isHidden = (key, state) => {
      return formData.value.sets.list[0].object[key].hidden = state;
    };
    const emptyForm = () => {
      formData.value.data.chargingCostList = [
        {
          minPower: 0,
          maxPower: "",
          hour: "",
          amount: ""
        }
      ];
      formData.value.data.serviceTemplate = {
        advanceServiceAmount: "",
        advanceTotalAmount: "",
        electricityPrice: "",
        servicePrice: "",
        serviceTimeLimit: ""
      };
      formData.value.data.candidateAmount = [1, 2, 3, 4, 5];
      formData.value.data.timePeriods = [
        {
          startTime: "00:00",
          endTime: "23:59",
          electricityPrice: "",
          servicePrice: "",
          disabled: true
        }
      ];
    };
    const timePeriodsEndTime = common_vendor.ref("");
    const timePeriodsIndex = common_vendor.ref("");
    const openPopup = (index, endTime) => {
      pickerShow.value = true;
      timePeriodsEndTime.value = endTime;
      timePeriodsIndex.value = index;
    };
    const datetimePickerConfirm = (item) => {
      var parts = item.value.split(":");
      let h = parts[0];
      let m = parts[1];
      let time1 = "";
      if (m == "59") {
        time1 = `${h == "23" ? "00" : Number(h) + 1}:00`;
      } else {
        if (m) {
          let mm = m.charAt("0") == "0" ? `0${Number(m) + 1}` : Number(m) + 1;
          time1 = `${h}:${mm}`;
        }
      }
      let startTime = formData.value.data.timePeriods[timePeriodsIndex.value].startTime;
      let newStartTime = `${common_vendor.dayjs().format("YYYY.MM.DD")} ${startTime}`;
      let newEndTime = `${common_vendor.dayjs().format("YYYY.MM.DD")} ${item.value}`;
      let start = common_vendor.dayjs(newStartTime).unix();
      let end = common_vendor.dayjs(newEndTime).unix();
      console.log("newStartTime", newStartTime, start, end);
      if (start > end) {
        common_vendor.index.$u.toast("结束时间不能大于开始时间");
        return;
      }
      if (formData.value.data.timePeriods.length !== timePeriodsIndex.value + 1) {
        formData.value.data.timePeriods[timePeriodsIndex.value + 1].startTime = time1;
      }
      formData.value.data.timePeriods[timePeriodsIndex.value].endTime = item.value;
      console.log("ddddd", timePeriodsIndex.value, formData.value.data.timePeriods);
      datetimePickerClose();
    };
    const datetimePickerClose = () => {
      pickerShow.value = false;
      timePeriodsEndTime.value = "";
      timePeriodsIndex.value = "";
    };
    const formAllFun = (form, fun) => {
      return {
        ...form,
        minPaymentAmount: fun(form.minPaymentAmount),
        cardPrepaidAmount: fun(form.cardPrepaidAmount),
        serviceTemplate: {
          ...form.serviceTemplate,
          advanceServiceAmount: fun(form.serviceTemplate.advanceServiceAmount),
          advanceTotalAmount: fun(form.serviceTemplate.advanceTotalAmount),
          electricityPrice: fun(form.serviceTemplate.electricityPrice),
          servicePrice: fun(form.serviceTemplate.servicePrice)
        }
      };
    };
    const candidateAmountFun = (form, fun) => {
      form.candidateAmount = form.candidateAmount.map((item) => {
        return fun(item);
      });
    };
    const chargingCostFun = (form, fun) => {
      form.chargingCostList = form.chargingCostList.map((val) => {
        return {
          ...val,
          amount: fun(val.amount)
        };
      });
    };
    const calculateAmount = (num) => {
      return num ? parseFloat((num / 100).toPrecision(12)) : "";
    };
    const upCalculateAmount = (num) => {
      return num ? parseFloat((num * 100).toPrecision(12)) : "";
    };
    const addChargeRules = () => {
      const index = formData.value.data.chargingCostList.length - 1;
      const rule = {
        [`chargingCostList.${index}.maxPower`]: {
          required: true,
          validator: validatEmaxPower,
          trigger: ["change", "blur"]
        },
        [`chargingCostList.${index}.hour`]: {
          message: "时间不能为空",
          required: true,
          trigger: ["change", "blur"]
        },
        [`chargingCostList.${index}.amount`]: {
          message: "定价不能为空",
          required: true,
          trigger: ["change", "blur"]
        }
      };
      rules.value = { ...rules.value, ...rule };
    };
    const addTimePeriodsRules = () => {
      const index = formData.value.data.timePeriods.length - 1;
      const rule = {
        [`timePeriods.${index}.startTime`]: {
          required: true,
          message: "开始时间不能为空",
          trigger: ["change", "blur"]
        },
        [`timePeriods.${index}.endTime`]: {
          validator: validateEndTime,
          required: true,
          trigger: ["change", "blur"]
        },
        [`timePeriods.${index}.electricityPrice`]: {
          message: "电费不能为空",
          required: true,
          trigger: ["change", "blur"]
        },
        [`timePeriods.${index}.servicePrice`]: {
          message: "服务费不能为空",
          required: true,
          trigger: ["change", "blur"]
        }
      };
      rules.value = { ...rules.value, ...rule };
    };
    const delRules = (listKey, index, key) => {
      let keys = `${listKey}.${index}.${key}`;
      delete rules.value[keys];
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(formData).data.candidateAmount, (domain1, index, i0) => {
          return {
            a: "a5cb7800-4-" + i0 + "," + ("a5cb7800-3-" + i0),
            b: "a5cb7800-3-" + i0 + "," + ("a5cb7800-2-" + i0),
            c: common_vendor.o(($event) => common_vendor.unref(formData).data.candidateAmount[index] = $event, index),
            d: common_vendor.p({
              placeholder: "金额",
              type: "number",
              modelValue: common_vendor.unref(formData).data.candidateAmount[index]
            }),
            e: "a5cb7800-2-" + i0 + ",a5cb7800-1",
            f: common_vendor.p({
              prop: "candidateAmount." + index,
              rules: common_vendor.unref(rules).candidateAmount
            }),
            g: index
          };
        }),
        b: common_vendor.p({
          text: "元",
          margin: "0 3px 0 0",
          type: "tips"
        }),
        c: common_vendor.sr(candidateAmountForm, "a5cb7800-1,a5cb7800-0", {
          "k": "candidateAmountForm"
        }),
        d: common_vendor.p({
          labelPosition: "left",
          model: common_vendor.unref(formData).data,
          rules: common_vendor.unref(rules)
        }),
        e: common_vendor.f(common_vendor.unref(formData).data.chargingCostList, (domain, index, i0) => {
          return common_vendor.e({
            a: "a5cb7800-9-" + i0 + "," + ("a5cb7800-8-" + i0),
            b: common_vendor.o(($event) => delDomain(index, "chargingCostList"), domain.key),
            c: "a5cb7800-8-" + i0 + "," + ("a5cb7800-7-" + i0),
            d: "a5cb7800-7-" + i0 + "," + ("a5cb7800-6-" + i0)
          }, isProof("billingMode", "03") ? {
            e: "a5cb7800-13-" + i0 + "," + ("a5cb7800-12-" + i0),
            f: common_vendor.o(($event) => domain.minPower = $event, domain.key),
            g: common_vendor.p({
              placeholder: "0",
              suffixIcon: "W",
              suffixIconStyle: "font-size: 12px;color: #909399",
              disabled: true,
              modelValue: domain.minPower
            }),
            h: "a5cb7800-12-" + i0 + "," + ("a5cb7800-11-" + i0),
            i: common_vendor.p({
              prop: "chargingCostList." + index + ".minPower"
            }),
            j: "a5cb7800-11-" + i0 + "," + ("a5cb7800-10-" + i0),
            k: common_vendor.p({
              span: "5"
            })
          } : {}, isProof("billingMode", "03") ? {} : {}, isProof("billingMode", "03") ? {
            l: "a5cb7800-16-" + i0 + "," + ("a5cb7800-15-" + i0),
            m: common_vendor.o(($event) => domain.maxPower = $event, domain.key),
            n: common_vendor.p({
              placeholder: "功率",
              suffixIcon: "W",
              suffixIconStyle: "font-size: 12px;color: #909399",
              modelValue: domain.maxPower
            }),
            o: "a5cb7800-15-" + i0 + "," + ("a5cb7800-14-" + i0),
            p: common_vendor.p({
              prop: "chargingCostList." + index + ".maxPower"
            }),
            q: "a5cb7800-14-" + i0 + "," + ("a5cb7800-10-" + i0),
            r: common_vendor.p({
              span: "5"
            })
          } : {}, {
            s: "a5cb7800-19-" + i0 + "," + ("a5cb7800-18-" + i0),
            t: common_vendor.o(($event) => domain.hour = $event, domain.key),
            v: common_vendor.p({
              placeholder: "时间",
              suffixIcon: "小时",
              suffixIconStyle: "font-size: 12px;color: #909399",
              modelValue: domain.hour
            }),
            w: "a5cb7800-18-" + i0 + "," + ("a5cb7800-17-" + i0),
            x: common_vendor.p({
              prop: "chargingCostList." + index + ".hour"
            }),
            y: "a5cb7800-17-" + i0 + "," + ("a5cb7800-10-" + i0),
            z: "a5cb7800-22-" + i0 + "," + ("a5cb7800-21-" + i0),
            A: common_vendor.o(($event) => domain.amount = $event, domain.key),
            B: common_vendor.p({
              placeholder: "定价",
              suffixIcon: "元",
              suffixIconStyle: "font-size: 12px;color: #909399",
              modelValue: domain.amount
            }),
            C: "a5cb7800-21-" + i0 + "," + ("a5cb7800-20-" + i0),
            D: common_vendor.p({
              prop: "chargingCostList." + index + ".amount"
            }),
            E: "a5cb7800-20-" + i0 + "," + ("a5cb7800-10-" + i0),
            F: "a5cb7800-10-" + i0 + "," + ("a5cb7800-6-" + i0),
            G: "a5cb7800-6-" + i0 + ",a5cb7800-5",
            H: domain.key
          });
        }),
        f: common_vendor.p({
          name: "minus-circle-fill",
          color: "red",
          size: "16"
        }),
        g: common_vendor.p({
          link: true,
          customStyle: {
            "border": "0px"
          }
        }),
        h: common_vendor.p({
          span: "1"
        }),
        i: isProof("billingMode", "03"),
        j: isProof("billingMode", "03"),
        k: isProof("billingMode", "03"),
        l: common_vendor.p({
          span: "5"
        }),
        m: common_vendor.p({
          span: "5"
        }),
        n: common_vendor.p({
          span: "11"
        }),
        o: common_vendor.p({
          gutter: "10",
          customStyle: "align-items: baseline"
        }),
        p: common_vendor.p({
          name: "plus-circle-fill",
          color: "rgb(20,111,249)",
          size: "16",
          top: "12"
        }),
        q: common_vendor.o(addDomain),
        r: common_vendor.p({
          link: true,
          text: "添加收费规则",
          customStyle: common_vendor.unref(customStyle)
        }),
        s: common_vendor.sr(chargingFeesForm, "a5cb7800-5,a5cb7800-0", {
          "k": "chargingFeesForm"
        }),
        t: common_vendor.p({
          labelPosition: "left",
          model: common_vendor.unref(formData).data,
          rules: common_vendor.unref(rules)
        }),
        v: common_vendor.p({
          text: "电费单价"
        }),
        w: common_vendor.p({
          span: "6"
        }),
        x: common_vendor.p({
          text: "元/度",
          color: "rgb(138,140,150)"
        }),
        y: common_vendor.o(($event) => common_vendor.unref(formData).data.serviceTemplate.electricityPrice = $event),
        z: common_vendor.p({
          modelValue: common_vendor.unref(formData).data.serviceTemplate.electricityPrice
        }),
        A: common_vendor.p({
          prop: "serviceTemplate.electricityPrice"
        }),
        B: common_vendor.p({
          span: "6"
        }),
        C: common_vendor.p({
          text: "服务费单价"
        }),
        D: common_vendor.p({
          span: "6"
        }),
        E: common_vendor.p({
          text: "元/小时",
          color: "rgb(138,140,150)"
        }),
        F: common_vendor.o(($event) => common_vendor.unref(formData).data.serviceTemplate.servicePrice = $event),
        G: common_vendor.p({
          modelValue: common_vendor.unref(formData).data.serviceTemplate.servicePrice
        }),
        H: common_vendor.p({
          prop: "serviceTemplate.servicePrice"
        }),
        I: common_vendor.p({
          span: "6"
        }),
        J: common_vendor.p({
          text: "预支付总额"
        }),
        K: common_vendor.p({
          span: "6"
        }),
        L: common_vendor.p({
          text: "元",
          color: "rgb(138,140,150)"
        }),
        M: common_vendor.o(($event) => common_vendor.unref(formData).data.serviceTemplate.advanceTotalAmount = $event),
        N: common_vendor.p({
          modelValue: common_vendor.unref(formData).data.serviceTemplate.advanceTotalAmount
        }),
        O: common_vendor.p({
          prop: "serviceTemplate.advanceTotalAmount"
        }),
        P: common_vendor.p({
          span: "6"
        }),
        Q: common_vendor.p({
          text: "服务费预支付金额"
        }),
        R: common_vendor.p({
          span: "6"
        }),
        S: common_vendor.p({
          text: "元",
          color: "rgb(138,140,150)"
        }),
        T: common_vendor.o(($event) => common_vendor.unref(formData).data.serviceTemplate.advanceServiceAmount = $event),
        U: common_vendor.p({
          modelValue: common_vendor.unref(formData).data.serviceTemplate.advanceServiceAmount
        }),
        V: common_vendor.p({
          prop: "serviceTemplate.advanceServiceAmount"
        }),
        W: common_vendor.p({
          span: "6"
        }),
        X: common_vendor.p({
          text: "服务费时间限制"
        }),
        Y: common_vendor.p({
          span: "6"
        }),
        Z: common_vendor.p({
          text: "分钟",
          color: "rgb(138,140,150)"
        }),
        aa: common_vendor.o(($event) => common_vendor.unref(formData).data.serviceTemplate.serviceTimeLimit = $event),
        ab: common_vendor.p({
          modelValue: common_vendor.unref(formData).data.serviceTemplate.serviceTimeLimit
        }),
        ac: common_vendor.p({
          prop: "serviceTemplate.serviceTimeLimit"
        }),
        ad: common_vendor.p({
          span: "6"
        }),
        ae: common_vendor.sr(uForm, "a5cb7800-26,a5cb7800-0", {
          "k": "uForm"
        }),
        af: common_vendor.p({
          labelPosition: "left",
          model: common_vendor.unref(formData).data,
          rules: common_vendor.unref(rules)
        }),
        ag: common_vendor.f(common_vendor.unref(formData).data.timePeriods, (domain, index, i0) => {
          return {
            a: "a5cb7800-66-" + i0 + "," + ("a5cb7800-65-" + i0),
            b: common_vendor.o(($event) => delDomain(index, "timePeriods"), domain.key),
            c: "a5cb7800-65-" + i0 + "," + ("a5cb7800-64-" + i0),
            d: "a5cb7800-64-" + i0 + "," + ("a5cb7800-63-" + i0),
            e: "a5cb7800-70-" + i0 + "," + ("a5cb7800-69-" + i0),
            f: common_vendor.o(($event) => domain.startTime = $event, domain.key),
            g: common_vendor.p({
              placeholder: "开始时间",
              disabled: true,
              modelValue: domain.startTime
            }),
            h: "a5cb7800-69-" + i0 + "," + ("a5cb7800-68-" + i0),
            i: common_vendor.p({
              prop: "timePeriods." + index + ".startTime"
            }),
            j: "a5cb7800-68-" + i0 + "," + ("a5cb7800-67-" + i0),
            k: "a5cb7800-74-" + i0 + "," + ("a5cb7800-73-" + i0),
            l: "a5cb7800-73-" + i0 + "," + ("a5cb7800-72-" + i0),
            m: common_vendor.o(($event) => domain.endTime = $event, domain.key),
            n: common_vendor.p({
              disabled: domain.disabled,
              placeholder: "请选择",
              modelValue: domain.endTime
            }),
            o: common_vendor.o(($event) => openPopup(index, domain.endTime), domain.key),
            p: "a5cb7800-72-" + i0 + "," + ("a5cb7800-71-" + i0),
            q: common_vendor.p({
              prop: "timePeriods." + index + ".endTime"
            }),
            r: "a5cb7800-71-" + i0 + "," + ("a5cb7800-67-" + i0),
            s: "a5cb7800-78-" + i0 + "," + ("a5cb7800-77-" + i0),
            t: "a5cb7800-77-" + i0 + "," + ("a5cb7800-76-" + i0),
            v: common_vendor.o(($event) => domain.electricityPrice = $event, domain.key),
            w: common_vendor.p({
              placeholder: "电费",
              modelValue: domain.electricityPrice
            }),
            x: "a5cb7800-76-" + i0 + "," + ("a5cb7800-75-" + i0),
            y: common_vendor.p({
              prop: "timePeriods." + index + ".electricityPrice"
            }),
            z: "a5cb7800-75-" + i0 + "," + ("a5cb7800-67-" + i0),
            A: "a5cb7800-82-" + i0 + "," + ("a5cb7800-81-" + i0),
            B: "a5cb7800-81-" + i0 + "," + ("a5cb7800-80-" + i0),
            C: common_vendor.o(($event) => domain.servicePrice = $event, domain.key),
            D: common_vendor.p({
              placeholder: "服务费",
              modelValue: domain.servicePrice
            }),
            E: "a5cb7800-80-" + i0 + "," + ("a5cb7800-79-" + i0),
            F: common_vendor.p({
              prop: "timePeriods." + index + ".servicePrice"
            }),
            G: "a5cb7800-79-" + i0 + "," + ("a5cb7800-67-" + i0),
            H: "a5cb7800-67-" + i0 + "," + ("a5cb7800-63-" + i0),
            I: "a5cb7800-63-" + i0 + ",a5cb7800-62",
            J: domain.key
          };
        }),
        ah: common_vendor.p({
          name: "minus-circle-fill",
          color: "red",
          size: "16"
        }),
        ai: common_vendor.p({
          link: true,
          customStyle: {
            "border": "0px"
          }
        }),
        aj: common_vendor.p({
          span: "1"
        }),
        ak: common_vendor.p({
          span: "5"
        }),
        al: common_vendor.p({
          name: "arrow-right",
          color: "#c1c4cB"
        }),
        am: common_vendor.p({
          span: "5"
        }),
        an: common_vendor.p({
          text: "元/度",
          size: "12",
          color: "rgb(138,140,150)"
        }),
        ao: common_vendor.p({
          span: "5"
        }),
        ap: common_vendor.p({
          text: "元/度",
          size: "12",
          color: "rgb(138,140,150)"
        }),
        aq: common_vendor.p({
          span: "5"
        }),
        ar: common_vendor.p({
          span: "11"
        }),
        as: common_vendor.p({
          gutter: "10",
          customStyle: "align-items: baseline"
        }),
        at: common_vendor.p({
          name: "plus-circle-fill",
          color: "rgb(20,111,249)",
          size: "16",
          top: "12"
        }),
        av: common_vendor.o(addTimeTemplate),
        aw: common_vendor.p({
          link: true,
          text: "添加收费规则",
          customStyle: common_vendor.unref(customStyle)
        }),
        ax: common_vendor.sr(timeParagraphForm, "a5cb7800-62,a5cb7800-0", {
          "k": "timeParagraphForm"
        }),
        ay: common_vendor.p({
          labelPosition: "left",
          model: common_vendor.unref(formData).data,
          rules: common_vendor.unref(rules)
        }),
        az: common_vendor.sr(uForm, "a5cb7800-0", {
          "k": "uForm"
        }),
        aA: common_vendor.o(($event) => common_vendor.isRef(formData) ? formData.value = $event : formData = $event),
        aB: common_vendor.p({
          labelPosition: "left",
          rules: common_vendor.unref(rules),
          labelStyle: {
            "color": "rgb(144,146,155)",
            "padding-left": "10px"
          },
          value: common_vendor.unref(formData)
        }),
        aC: common_vendor.o(confirm),
        aD: common_vendor.o((value) => datetimePickerConfirm(value)),
        aE: common_vendor.o(datetimePickerClose),
        aF: common_vendor.o(datetimePickerClose),
        aG: common_vendor.o(($event) => common_vendor.isRef(timePeriodsEndTime) ? timePeriodsEndTime.value = $event : null),
        aH: common_vendor.p({
          show: common_vendor.unref(pickerShow),
          mode: "time",
          closeOnClickOverlay: true,
          modelValue: common_vendor.unref(timePeriodsEndTime)
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a5cb7800"], ["__file", "/Users/guolimeng/Desktop/work/uni-preset-vue-vite-ts 2/src/pages/billingTemplate/addTemplateList.vue"]]);
wx.createPage(MiniProgramPage);
