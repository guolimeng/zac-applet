"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_areaManagement_areaManagement = require("../../../api/areaManagement/areaManagement.js");
const store_modules_user = require("../../../store/modules/user.js");
require("../../../utils/request.js");
require("../../../utils/auth.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "leaveDevice",
  setup(__props) {
    const userUserStore = store_modules_user.userStore();
    const data = common_vendor.reactive({
      listData: [],
      total: 1,
      parameter: {
        pageNo: 1,
        pageSize: 20
      },
      winHeight: 0
      // 页面高度
    });
    const { listData, parameter, total } = common_vendor.toRefs(data);
    common_vendor.onMounted(() => {
      getDeviceList();
    });
    const getDeviceList = () => {
      let param = {
        "stationId": "",
        "operatorId": userUserStore.operatorId,
        "pageNo": parameter.value.pageNo,
        "pageSize": parameter.value.pageSize,
        "status": "N"
      };
      api_areaManagement_areaManagement.deviceList(param).then((res) => {
        let { data: data2 } = res;
        listData.value = data2.deviceDtoList || [];
        total.value = data2.total;
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(listData), (item, index, i0) => {
          return {
            a: common_vendor.t(item.deviceId),
            b: common_vendor.t(item.statusDesc),
            c: common_vendor.t(item.name),
            d: common_vendor.t(Array.isArray(item.gunStatus) ? item.gunStatus.length : 0),
            e: common_vendor.t(item.manufacturer),
            f: common_vendor.t(item.createdDate),
            g: common_vendor.t(item.orgName),
            h: common_vendor.t(item.stationName),
            i: index
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a14980fe"], ["__file", "/Users/guolimeng/Desktop/work/uni-preset-vue-vite-ts 2/src/pages/areaManagement/deviceMg/leaveDevice.vue"]]);
wx.createPage(MiniProgramPage);
