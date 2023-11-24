"use strict";
const common_vendor = require("../../../../common/vendor.js");
const api_areaManagement_areaManagement = require("../../../../api/areaManagement/areaManagement.js");
require("../../../../utils/request.js");
require("../../../../utils/auth.js");
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u__input2 = common_vendor.resolveComponent("u--input");
  const _easycom_u_form_item2 = common_vendor.resolveComponent("u-form-item");
  const _easycom_u__form2 = common_vendor.resolveComponent("u--form");
  const _easycom_u_action_sheet2 = common_vendor.resolveComponent("u-action-sheet");
  (_easycom_u_icon2 + _easycom_u__input2 + _easycom_u_form_item2 + _easycom_u__form2 + _easycom_u_action_sheet2)();
}
const _easycom_u_icon = () => "../../../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u__input = () => "../../../../node-modules/uview-plus/components/u-input/u-input.js";
const _easycom_u_form_item = () => "../../../../node-modules/uview-plus/components/u-form-item/u-form-item.js";
const _easycom_u__form = () => "../../../../node-modules/uview-plus/components/u-form/u-form.js";
const _easycom_u_action_sheet = () => "../../../../node-modules/uview-plus/components/u-action-sheet/u-action-sheet.js";
if (!Math) {
  (_easycom_u_icon + _easycom_u__input + _easycom_u_form_item + _easycom_u__form + _easycom_u_action_sheet)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "addChargingStation",
  setup(__props) {
    const uForm = common_vendor.ref();
    const validatorFun = (rule, value, callback) => {
      formModel.value.stationLists.forEach((item) => {
        if (rule.field == "ip") {
          if (item.facilityTypeName == "组网版" && !value) {
            callback("请输入网关ID");
          } else {
            callback();
          }
        } else if (rule.field == "facilityTypeName") {
          if ((item.stationTypeName == "两轮充" || item.stationTypeName == "汽车充") && !value) {
            callback("请选择设备类型");
          } else {
            callback();
          }
        } else {
          callback();
        }
      });
    };
    const data = common_vendor.reactive({
      formModel: {
        // name: '',
        stationLists: [
          {
            stationName: "",
            stationTypeName: "",
            stationType: "",
            facilityTypeName: "",
            facilityType: "",
            ip: ""
          }
        ]
      },
      rules: {},
      defaultRules: {
        "stationLists.0.stationName": {
          required: true,
          message: "请输入充电站名称",
          trigger: ["change", "blur"]
        },
        "stationLists.0.stationTypeName": {
          required: true,
          message: "请选择充电站类型",
          trigger: ["change", "blur"]
        },
        "stationLists.0.facilityTypeName": {
          required: true,
          validator: validatorFun,
          // message: '请选择设备类型',
          trigger: ["change", "blur"]
        },
        "stationLists.0.ip": [{
          validator: validatorFun,
          required: true,
          // message: '请输入网关ID',
          trigger: ["change", "blur"]
        }]
      },
      actions: [],
      chargingStationTypeactions: [
        { name: "两轮充", value: "01" },
        { name: "汽车充", value: "02" },
        { name: "充电柜", value: "03" },
        { name: "换电柜", value: "04" }
      ],
      facilityTypeActions: [
        { name: "组网版", value: "01" },
        { name: "独立版", value: "02" },
        { name: "AEP版", value: "03" },
        { name: "六路机", value: "04" },
        { name: "十二路机", value: "05" },
        { name: "十路机", value: "06" }
      ],
      carFacilityTypeActions: [
        { name: "汽车交流充", value: "07" },
        { name: "汽车直流充", value: "08" }
      ],
      model: {
        name: "",
        list: [
          { hour: "", price: "" }
        ]
      },
      rules1: {
        "list.0.hour": {
          required: true,
          message: "请输入时间",
          trigger: ["change", "blur"]
        },
        "list.0.price": {
          required: true,
          message: "请输入价格",
          trigger: ["change", "blur"]
        }
      }
    });
    let { formModel, rules, defaultRules, actions, chargingStationTypeactions, facilityTypeActions, carFacilityTypeActions, model, rules1 } = common_vendor.toRefs(data);
    common_vendor.onMounted(() => {
      rules.value = defaultRules.value;
    });
    const orgId = common_vendor.ref("");
    const orgName = common_vendor.ref("");
    common_vendor.onLoad((option) => {
      orgId.value = option.orgId;
      orgName.value = option.orgName;
      console.log("片区option", orgId.value, option);
    });
    const addChargingStationClick = () => {
      formModel.value.stationLists.push({
        stationName: "",
        stationTypeName: "",
        stationType: "",
        facilityTypeName: "",
        facilityType: "",
        ip: ""
      });
      addRules();
    };
    const showType = common_vendor.ref(false);
    const showTypeKey = common_vendor.ref("");
    const showTypeIndex = common_vendor.ref("");
    const actionSheetTitle = common_vendor.ref("充电站类型");
    const actionSheetClick = (key, index) => {
      showTypeKey.value = key;
      showTypeIndex.value = index;
      switch (key) {
        case "stationTypeName":
          actionSheetTitle.value = "充电站类型";
          actions.value = chargingStationTypeactions.value;
          break;
        case "facilityTypeName":
          actionSheetTitle.value = "设备类型";
          switch (formModel.value.stationLists[showTypeIndex.value].stationType) {
            case "01":
              actions.value = facilityTypeActions.value;
              break;
            case "02":
              actions.value = carFacilityTypeActions.value;
              break;
          }
          break;
      }
      showType.value = true;
    };
    const actionSheetCloseClick = () => {
      showType.value = false;
      showTypeKey.value = "";
      showTypeIndex.value = "";
    };
    const sheetSelect = (e) => {
      let keys = subKey(showTypeKey.value, "N");
      formModel.value.stationLists[showTypeIndex.value][showTypeKey.value] = e.name;
      formModel.value.stationLists[showTypeIndex.value][keys] = e.value;
      switch (showTypeKey.value) {
        case "stationTypeName":
          formModel.value.stationLists[showTypeIndex.value].facilityTypeName = "";
          formModel.value.stationLists[showTypeIndex.value].facilityType = "";
          break;
      }
      uForm.value.validateField(`stationLists.${showTypeIndex.value}.${showTypeKey.value}`);
      actionSheetCloseClick();
    };
    const delStationClick = (index) => {
      formModel.value.stationLists.splice(index, 1);
      delRules(index, "stationName");
      delRules(index, "stationTypeName");
      delRules(index, "facilityTypeName");
      delRules(index, "ip");
    };
    const confirm = () => {
      let param = {
        ...formModel.value,
        orgId: orgId.value
      };
      uForm.value.validate().then((res) => {
        api_areaManagement_areaManagement.stationSaveList(param).then((res2) => {
          common_vendor.index.navigateTo({
            url: `/pages/areaManagement/areaManagement/areaDetails?orgId=${param.orgId}`
          });
        });
      }).catch((errors) => {
        common_vendor.index.$u.toast("校验失败");
      });
    };
    const subKey = (key, str) => {
      let strIndex = key.indexOf(str);
      return key.substring(0, strIndex);
    };
    const addRules = () => {
      const index = formModel.value.stationLists.length - 1;
      const rule = {
        [`stationLists.${index}.stationName`]: {
          required: true,
          message: "请输入充电站名称",
          trigger: ["change", "blur"]
        },
        [`stationLists.${index}.stationTypeName`]: {
          required: true,
          message: "请选择充电站类型",
          trigger: ["change", "blur"]
        },
        [`stationLists.${index}.facilityTypeName`]: {
          validator: validatorFun,
          required: true,
          // message: '请选择设备类型',
          trigger: ["change", "blur"]
        },
        [`stationLists.${index}.ip`]: {
          validator: validatorFun,
          required: true,
          // message: '请输入网关ID',
          trigger: ["change", "blur"]
        }
      };
      rules.value = { ...rules.value, ...rule };
    };
    const delRules = (index, key) => {
      let keys = `stationLists.${index}.${key}`;
      delete rules.value[keys];
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(orgName)),
        b: common_vendor.p({
          name: "plus-circle-fill",
          color: "#2979ff",
          size: "18"
        }),
        c: common_vendor.o(addChargingStationClick),
        d: common_vendor.p({
          name: "trash",
          size: "25"
        }),
        e: common_vendor.f(common_vendor.unref(formModel).stationLists, (d, k, i0) => {
          return common_vendor.e({
            a: "ac7ee6fa-5-" + i0 + "," + ("ac7ee6fa-4-" + i0),
            b: common_vendor.o(($event) => delStationClick(k), k),
            c: "ac7ee6fa-4-" + i0 + "," + ("ac7ee6fa-3-" + i0),
            d: common_vendor.o(($event) => d.stationName = $event, k),
            e: common_vendor.p({
              border: "none",
              placeholder: "请输入充电站名称",
              modelValue: d.stationName
            }),
            f: "ac7ee6fa-3-" + i0 + ",ac7ee6fa-1",
            g: common_vendor.p({
              label: "充电站名称：",
              prop: `stationLists.${k}.stationName`,
              borderBottom: true
            }),
            h: "ac7ee6fa-7-" + i0 + "," + ("ac7ee6fa-6-" + i0),
            i: common_vendor.o(($event) => d.stationTypeName = $event, k),
            j: common_vendor.p({
              disabled: true,
              disabledColor: "#ffffff",
              placeholder: "请选择充电站类型",
              border: "none",
              modelValue: d.stationTypeName
            }),
            k: "ac7ee6fa-8-" + i0 + "," + ("ac7ee6fa-6-" + i0),
            l: common_vendor.o(($event) => actionSheetClick("stationTypeName", k), k),
            m: "ac7ee6fa-6-" + i0 + ",ac7ee6fa-1",
            n: common_vendor.p({
              label: "充电站类型",
              prop: `stationLists.${k}.stationTypeName`,
              borderBottom: true
            }),
            o: d.stationTypeName == "两轮充" || d.stationTypeName == "汽车充"
          }, d.stationTypeName == "两轮充" || d.stationTypeName == "汽车充" ? {
            p: "ac7ee6fa-10-" + i0 + "," + ("ac7ee6fa-9-" + i0),
            q: common_vendor.o(($event) => d.facilityTypeName = $event, k),
            r: common_vendor.p({
              disabled: true,
              disabledColor: "#ffffff",
              placeholder: "请选择设备类型",
              border: "none",
              modelValue: d.facilityTypeName
            }),
            s: "ac7ee6fa-11-" + i0 + "," + ("ac7ee6fa-9-" + i0),
            t: common_vendor.p({
              name: "arrow-right",
              color: "#c1c4cB"
            }),
            v: common_vendor.o(($event) => actionSheetClick("facilityTypeName", k), k),
            w: "ac7ee6fa-9-" + i0 + ",ac7ee6fa-1",
            x: common_vendor.p({
              label: "设备类型",
              prop: `stationLists.${k}.facilityTypeName`,
              borderBottom: true
            })
          } : {}, {
            y: d.facilityTypeName == "组网版"
          }, d.facilityTypeName == "组网版" ? {
            z: "ac7ee6fa-13-" + i0 + "," + ("ac7ee6fa-12-" + i0),
            A: common_vendor.o(($event) => d.ip = $event, k),
            B: common_vendor.p({
              border: "none",
              placeholder: "请输入网关ID",
              modelValue: d.ip
            }),
            C: "ac7ee6fa-12-" + i0 + ",ac7ee6fa-1",
            D: common_vendor.p({
              label: "网关ID",
              prop: `stationLists.${k}.ip`,
              borderBottom: true
            })
          } : {}, {
            E: k
          });
        }),
        f: common_vendor.p({
          name: "trash",
          size: "25"
        }),
        g: common_vendor.p({
          name: "arrow-right",
          color: "#c1c4cB"
        }),
        h: common_vendor.sr(uForm, "ac7ee6fa-1", {
          "k": "uForm"
        }),
        i: common_vendor.p({
          labelPosition: "left",
          model: common_vendor.unref(formModel),
          rules: common_vendor.unref(rules),
          labelWidth: "110"
        }),
        j: common_vendor.o(confirm),
        k: common_vendor.o(actionSheetCloseClick),
        l: common_vendor.o(sheetSelect),
        m: common_vendor.p({
          show: common_vendor.unref(showType),
          actions: common_vendor.unref(actions),
          title: common_vendor.unref(actionSheetTitle)
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ac7ee6fa"], ["__file", "/Users/guolimeng/Desktop/work/uni-preset-vue-vite-ts 2/src/pages/areaManagement/chargingStation/components/addChargingStation.vue"]]);
wx.createPage(MiniProgramPage);
