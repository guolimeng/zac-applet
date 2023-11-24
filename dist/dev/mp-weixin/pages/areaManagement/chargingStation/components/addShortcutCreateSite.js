"use strict";
const common_vendor = require("../../../../common/vendor.js");
const api_areaManagement_areaManagement = require("../../../../api/areaManagement/areaManagement.js");
require("../../../../utils/request.js");
require("../../../../utils/auth.js");
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_steps_item2 = common_vendor.resolveComponent("u-steps-item");
  const _easycom_u_steps2 = common_vendor.resolveComponent("u-steps");
  const _easycom_u_switch2 = common_vendor.resolveComponent("u-switch");
  const _easycom_u_form_item2 = common_vendor.resolveComponent("u-form-item");
  const _easycom_u_cell2 = common_vendor.resolveComponent("u-cell");
  const _easycom_u__input2 = common_vendor.resolveComponent("u--input");
  const _easycom_u__form2 = common_vendor.resolveComponent("u--form");
  (_easycom_u_icon2 + _easycom_u_steps_item2 + _easycom_u_steps2 + _easycom_u_switch2 + _easycom_u_form_item2 + _easycom_u_cell2 + _easycom_u__input2 + _easycom_u__form2)();
}
const _easycom_u_icon = () => "../../../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_steps_item = () => "../../../../node-modules/uview-plus/components/u-steps-item/u-steps-item.js";
const _easycom_u_steps = () => "../../../../node-modules/uview-plus/components/u-steps/u-steps.js";
const _easycom_u_switch = () => "../../../../node-modules/uview-plus/components/u-switch/u-switch.js";
const _easycom_u_form_item = () => "../../../../node-modules/uview-plus/components/u-form-item/u-form-item.js";
const _easycom_u_cell = () => "../../../../node-modules/uview-plus/components/u-cell/u-cell.js";
const _easycom_u__input = () => "../../../../node-modules/uview-plus/components/u-input/u-input.js";
const _easycom_u__form = () => "../../../../node-modules/uview-plus/components/u-form/u-form.js";
if (!Math) {
  (_easycom_u_icon + _easycom_u_steps_item + _easycom_u_steps + _easycom_u_switch + _easycom_u_form_item + _easycom_u_cell + _easycom_u__input + _easycom_u__form)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "addShortcutCreateSite",
  setup(__props) {
    const uForm = common_vendor.ref();
    const currentSteps = common_vendor.ref(1);
    const data = common_vendor.reactive({
      formModel: {
        personalization: false,
        orgName: "",
        orgId: "",
        stationName: "",
        deviceInfoList: []
      },
      rules: {},
      defaultRules: {
        "stationName": [{
          required: true,
          message: "请输入充电站名称",
          trigger: ["change", "blur"]
        }],
        "deviceInfoList.0.name": {
          required: true,
          message: "请输入名称",
          trigger: ["change", "blur"]
        }
      },
      // 电路状态
      circuitStatus: {
        "01": "组网版",
        "02": "独立版",
        "03": "AEP版",
        "04": "六路机",
        "05": "十二路机",
        "06": "十路机",
        "07": "汽车交流",
        "08": "汽车直流"
      },
      actions: [],
      queryData: {}
    });
    let { formModel, rules, defaultRules, actions, chargingStationTypeactions, deviceTypeActions, carDeviceTypeActions, queryData, circuitStatus } = common_vendor.toRefs(data);
    common_vendor.onLoad((option) => {
      console.log("option", option.query);
      if (option.query) {
        let item = JSON.parse(decodeURIComponent(option.query));
        detailDataFun(item);
      } else {
        currentSteps.value = 0;
      }
      console.log("dddd", queryData.value);
      rules.value = defaultRules.value;
    });
    common_vendor.onReady(() => {
      uForm.value.setRules(rules.value);
    });
    const detailDataFun = (item) => {
      if (item.name) {
        formModel.value.orgName = item.name;
        formModel.value.orgId = item.id;
      } else {
        formModel.value.orgName = item.orgName;
        formModel.value.orgId = item.orgId;
      }
      queryData.value = item;
      deviceData(item, item.device);
    };
    const deviceData = (item, device) => {
      let obj = {
        name: Number(formModel.value.deviceInfoList.length) + 1,
        manufacturer: item.manufacturer,
        facilityTypeName: circuitStatus.value[queryData.value.facilityType],
        facilityType: queryData.value.facilityType,
        deviceId: device ? item.device.chargeId : item.chargeId
      };
      formModel.value.deviceInfoList.push(obj);
    };
    const orgNameClick = () => {
      common_vendor.index.navigateTo({
        url: `/pages/areaManagement/chargingStation/components/selectArea?query=${encodeURIComponent(JSON.stringify(queryData.value))}`
      });
    };
    const rescanCodeClick = () => {
      common_vendor.index.scanCode({
        // onlyFromCamera: true,
        success: function(res) {
          getDeviceData(res.result);
        }
      });
    };
    const getDeviceData = (manufacturer) => {
      let parts = manufacturer.split("/");
      let lastPart = parts.pop();
      let param = {
        manufacturer: lastPart,
        orgId: queryData.value.orgId
      };
      api_areaManagement_areaManagement.deviceVerify(param).then((res) => {
        let { data: data2 } = res;
        queryData.value.device = data2.device;
        queryData.value.facilityTypeName = circuitStatus.value[data2.facilityType];
        queryData.value.facilityType = data2.facilityType;
        queryData.value.stationType = data2.stationType;
        formModel.value.orgName = queryData.value.orgName;
        formModel.value.orgId = queryData.value.orgId;
        formModel.value.stationName = "";
        formModel.value.personalization = false;
        currentSteps.value = 1;
        formModel.value.deviceInfoList = [];
        deviceData(queryData.value, queryData.value.device);
        resetRules();
      });
    };
    const addDeviceClick = () => {
      common_vendor.index.scanCode({
        // onlyFromCamera: true,
        success: function(res) {
          getDeviceInformation(res.result);
        }
      });
    };
    const getDeviceInformation = (manufacturer) => {
      let parts = manufacturer.split("/");
      let lastPart = parts.pop();
      let param = {
        manufacturer: lastPart,
        facilityType: queryData.value.facilityType
      };
      api_areaManagement_areaManagement.deviceVerifyDevices(param).then((res) => {
        let { data: data2 } = res;
        let isRepeat = formModel.value.deviceInfoList.some((item) => {
          return item.manufacturer == data2.device.manufacturer;
        });
        if (isRepeat) {
          common_vendor.index.showToast({
            icon: "none",
            duration: 3e3,
            title: `设备ID${data2.device.manufacturer}已经存在`
          });
        } else {
          deviceData(data2.device);
          addRules();
        }
      });
    };
    const stationNameBlur = (val) => {
      currentSteps.value = val ? 2 : 1;
    };
    const confirm = () => {
      let param = {
        ...formModel.value,
        stationType: queryData.value.stationType,
        facilityType: queryData.value.facilityType,
        detailedAddress: queryData.value.detailedAddress,
        orgId: queryData.value.orgId,
        operateType: "01"
      };
      uForm.value.validate().then((res) => {
        api_areaManagement_areaManagement.stationSave(param).then((res2) => {
          common_vendor.index.navigateTo({
            url: `/pages/areaManagement/areaManagement/areaDetails?orgId=${param.orgId}`
          });
        });
      }).catch((errors) => {
        console.log("errors", errors);
      });
    };
    const addRules = () => {
      const index = formModel.value.deviceInfoList.length - 1;
      const rule = {
        [`deviceInfoList.${index}.name`]: {
          required: true,
          message: "请输入名称",
          trigger: ["change", "blur"]
        }
      };
      rules.value = { ...rules.value, ...rule };
    };
    const resetRules = () => {
      rules.value = defaultRules.value;
    };
    return (_ctx, _cache) => {
      var _a;
      return common_vendor.e({
        a: common_vendor.t(((_a = common_vendor.unref(queryData)) == null ? void 0 : _a.facilityType) ? common_vendor.unref(circuitStatus)[common_vendor.unref(queryData).facilityType] : "请扫码添加"),
        b: common_vendor.p({
          name: "scan",
          color: "#2979ff",
          size: "18"
        }),
        c: common_vendor.o(rescanCodeClick),
        d: common_vendor.p({
          title: "扫码获取"
        }),
        e: common_vendor.p({
          title: "添加充电站"
        }),
        f: common_vendor.p({
          title: "添加设备"
        }),
        g: common_vendor.p({
          current: common_vendor.unref(currentSteps),
          dot: true
        }),
        h: common_vendor.o(($event) => common_vendor.unref(formModel).personalization = $event),
        i: common_vendor.p({
          modelValue: common_vendor.unref(formModel).personalization
        }),
        j: common_vendor.p({
          label: "充电站个性化",
          prop: `personalization`,
          borderBottom: true
        }),
        k: common_vendor.o(orgNameClick),
        l: common_vendor.p({
          title: common_vendor.unref(formModel).orgName || "请选择片区名称",
          isLink: true,
          border: false,
          titleStyle: {
            "color": common_vendor.unref(formModel).orgName ? "#000" : "#c1c4cB"
          }
        }),
        m: common_vendor.p({
          label: "片区名称",
          prop: `orgName`,
          borderBottom: true
        }),
        n: common_vendor.o(stationNameBlur),
        o: common_vendor.o(($event) => common_vendor.unref(formModel).stationName = $event),
        p: common_vendor.p({
          border: "none",
          placeholder: "请输入充电站名称",
          modelValue: common_vendor.unref(formModel).stationName
        }),
        q: common_vendor.p({
          label: "充电站名称",
          prop: `stationName`,
          borderBottom: true
        }),
        r: common_vendor.unref(formModel).personalization
      }, common_vendor.unref(formModel).personalization ? {
        s: common_vendor.o(orgNameClick),
        t: common_vendor.p({
          title: common_vendor.unref(formModel).orgName || "请选择分账模板",
          isLink: true,
          border: false,
          titleStyle: {
            "color": common_vendor.unref(formModel).orgName ? "#000" : "#c1c4cB"
          }
        }),
        v: common_vendor.p({
          label: "计费模板",
          prop: `formModel.orgName`,
          borderBottom: true
        })
      } : {}, {
        w: common_vendor.unref(formModel).personalization
      }, common_vendor.unref(formModel).personalization ? {
        x: common_vendor.o(orgNameClick),
        y: common_vendor.p({
          title: common_vendor.unref(formModel).orgName || "请选择分账模板",
          isLink: true,
          border: false,
          titleStyle: {
            "color": common_vendor.unref(formModel).orgName ? "#000" : "#c1c4cB"
          }
        }),
        z: common_vendor.p({
          label: "分账模板",
          prop: `formModel.orgName`,
          borderBottom: true
        })
      } : {}, {
        A: common_vendor.unref(formModel).stationName && !common_vendor.unref(formModel).personalization
      }, common_vendor.unref(formModel).stationName && !common_vendor.unref(formModel).personalization ? {
        B: common_vendor.p({
          name: "plus-circle-fill",
          color: "#2979ff",
          size: "16"
        }),
        C: common_vendor.o(addDeviceClick)
      } : {}, {
        D: common_vendor.unref(formModel).stationName && !common_vendor.unref(formModel).personalization
      }, common_vendor.unref(formModel).stationName && !common_vendor.unref(formModel).personalization ? {
        E: common_vendor.f(common_vendor.unref(formModel).deviceInfoList, (d, k, i0) => {
          return {
            a: "e1f2a345-18-" + i0 + "," + ("e1f2a345-17-" + i0),
            b: common_vendor.o(($event) => d.name = $event, k),
            c: common_vendor.p({
              border: "none",
              placeholder: "请输入设备号",
              modelValue: d.name
            }),
            d: "e1f2a345-17-" + i0 + ",e1f2a345-5",
            e: common_vendor.p({
              label: "设备号",
              prop: `deviceInfoList.${k}.name`,
              borderBottom: true
            }),
            f: "e1f2a345-20-" + i0 + "," + ("e1f2a345-19-" + i0),
            g: common_vendor.o(($event) => d.manufacturer = $event, k),
            h: common_vendor.p({
              border: "none",
              placeholder: "请输入设备ID",
              modelValue: d.manufacturer
            }),
            i: "e1f2a345-19-" + i0 + ",e1f2a345-5",
            j: common_vendor.p({
              label: "设备ID",
              prop: `deviceInfoList.${k}.manufacturer`,
              borderBottom: true
            }),
            k: "e1f2a345-22-" + i0 + "," + ("e1f2a345-21-" + i0),
            l: common_vendor.o(($event) => d.facilityTypeName = $event, k),
            m: common_vendor.p({
              border: "none",
              placeholder: "请输入设备标签",
              modelValue: d.facilityTypeName
            }),
            n: "e1f2a345-21-" + i0 + ",e1f2a345-5",
            o: common_vendor.p({
              label: "设备标签",
              prop: `deviceInfoList.${k}.facilityTypeName`,
              borderBottom: true
            }),
            p: k
          };
        })
      } : {}, {
        F: common_vendor.sr(uForm, "e1f2a345-5", {
          "k": "uForm"
        }),
        G: common_vendor.p({
          labelPosition: "left",
          model: common_vendor.unref(formModel),
          rules: common_vendor.unref(rules),
          labelWidth: "110"
        }),
        H: common_vendor.o(confirm)
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e1f2a345"], ["__file", "/Users/guolimeng/Desktop/work/uni-preset-vue-vite-ts 2/src/pages/areaManagement/chargingStation/components/addShortcutCreateSite.vue"]]);
wx.createPage(MiniProgramPage);
