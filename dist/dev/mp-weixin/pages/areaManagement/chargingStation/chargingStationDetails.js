"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_areaManagement_areaManagement = require("../../../api/areaManagement/areaManagement.js");
const store_modules_user = require("../../../store/modules/user.js");
require("../../../utils/request.js");
require("../../../utils/auth.js");
if (!Math) {
  (basicInformation + statistics + deviceList)();
}
const basicInformation = () => "../components/basicInformation.js";
const statistics = () => "../components/statistics.js";
const deviceList = () => "../deviceMg/deviceList.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "chargingStationDetails",
  props: {
    stationDto: {
      type: Object,
      default: {}
    }
  },
  setup(__props) {
    store_modules_user.userStore();
    const data = common_vendor.reactive({
      detailData: {}
    });
    const { detailData } = common_vendor.toRefs(data);
    const stationId = common_vendor.ref();
    const orgId = common_vendor.ref("");
    common_vendor.onLoad((option) => {
      stationId.value = option.stationId;
      orgId.value = option.orgId;
      console.log("充电站option", option);
      if (option.stationId) {
        getStationIdDetailst(option);
      }
    });
    const getStationIdDetailst = (option) => {
      let param = {
        "stationId": option.stationId
      };
      api_areaManagement_areaManagement.stationDetail(param).then((res) => {
        let { data: data2 } = res;
        detailData.value = data2;
      });
    };
    const settingClick = () => {
      common_vendor.index.navigateTo({
        url: `/pages/areaManagement/chargingStation/editChargingStation?orgId=${orgId.value}&stationId=${stationId.value}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(settingClick),
        b: common_vendor.p({
          type: "1",
          orgDto: common_vendor.unref(detailData)
        }),
        c: common_vendor.p({
          title: "充电站营收统计"
        }),
        d: common_vendor.p({
          stationId: common_vendor.unref(stationId),
          orgId: common_vendor.unref(orgId),
          orgDto: common_vendor.unref(detailData)
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cdb6beb2"], ["__file", "/Users/guolimeng/Desktop/work/uni-preset-vue-vite-ts 2/src/pages/areaManagement/chargingStation/chargingStationDetails.vue"]]);
wx.createPage(MiniProgramPage);
