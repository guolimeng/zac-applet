"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_areaManagement_areaManagement = require("../../../api/areaManagement/areaManagement.js");
require("../../../utils/request.js");
require("../../../utils/auth.js");
if (!Math) {
  (basicInformation + statistics + chargingStationList)();
}
const basicInformation = () => "../components/basicInformation.js";
const statistics = () => "../components/statistics.js";
const chargingStationList = () => "../chargingStation/chargingStationList.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "areaDetails",
  setup(__props) {
    const orgId = common_vendor.ref("");
    const data = common_vendor.reactive({
      detailData: {}
    });
    const { detailData } = common_vendor.toRefs(data);
    common_vendor.onLoad((option) => {
      orgId.value = option.orgId;
      if (option.orgId) {
        getAreaDetailst(option);
      }
    });
    const getAreaDetailst = (option) => {
      let param = {
        "orgId": option.orgId
      };
      api_areaManagement_areaManagement.areaOrgDetail(param).then((res) => {
        let { data: data2 } = res;
        detailData.value = data2;
      });
    };
    const settingClick = () => {
      common_vendor.index.navigateTo({
        url: `/pages/areaManagement/areaManagement/addArea?orgId=${orgId.value}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(settingClick),
        b: common_vendor.p({
          orgDto: common_vendor.unref(detailData).orgDto
        }),
        c: common_vendor.p({
          title: "片区营收统计"
        }),
        d: common_vendor.p({
          orgId: orgId.value,
          orgDto: common_vendor.unref(detailData).orgDto
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-279cf0b4"], ["__file", "/Users/guolimeng/Desktop/work/uni-preset-vue-vite-ts 2/src/pages/areaManagement/areaManagement/areaDetails.vue"]]);
wx.createPage(MiniProgramPage);
