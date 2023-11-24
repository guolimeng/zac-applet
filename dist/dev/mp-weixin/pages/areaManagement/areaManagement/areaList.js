"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_areaManagement_areaManagement = require("../../../api/areaManagement/areaManagement.js");
const store_modules_user = require("../../../store/modules/user.js");
require("../../../utils/request.js");
require("../../../utils/auth.js");
if (!Array) {
  const _easycom_u_search2 = common_vendor.resolveComponent("u-search");
  const _easycom_up_text2 = common_vendor.resolveComponent("up-text");
  const _component_uni_load_more = common_vendor.resolveComponent("uni-load-more");
  (_easycom_u_search2 + _easycom_up_text2 + _component_uni_load_more)();
}
const _easycom_u_search = () => "../../../node-modules/uview-plus/components/u-search/u-search.js";
const _easycom_up_text = () => "../../../node-modules/uview-plus/components/u-text/u-text.js";
if (!Math) {
  (_easycom_u_search + _easycom_up_text)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "areaList",
  setup(__props) {
    const userUserStore = store_modules_user.userStore();
    const name = common_vendor.ref("");
    const data = common_vendor.reactive({
      listData: [],
      total: 1,
      parameter: {
        pageNo: 1,
        pageSize: 10
      },
      loadStatus: "loading",
      isLoadMore: false
      //是否加载中
    });
    const { listData, parameter, total, loadStatus, isLoadMore } = common_vendor.toRefs(data);
    common_vendor.onLoad(() => {
      getAreaList();
      console.log("onLoad");
    });
    common_vendor.onMounted(() => {
      console.log("onMounted");
    });
    common_vendor.onReachBottom(() => {
      if (total.value <= listData.value.length) {
        common_vendor.index.showToast({
          title: "已加载全部数据",
          icon: "none"
        });
      } else {
        parameter.value.pageNo++;
        getAreaList();
      }
    });
    common_vendor.onPullDownRefresh(() => {
      listData.value = [];
      parameter.value.pageNo = 1;
      getAreaList();
      setTimeout(function() {
        common_vendor.index.stopPullDownRefresh();
      }, 1e3);
    });
    const getAreaList = () => {
      let param = {
        "name": name.value,
        "operatorId": userUserStore.operatorId,
        "pageNo": parameter.value.pageNo,
        "pageSize": parameter.value.pageSize
      };
      api_areaManagement_areaManagement.areaOrgList(param).then((res) => {
        let { data: data2 } = res;
        listData.value = [...listData.value, ...data2.orgDtos];
        total.value = data2.total;
      });
    };
    const detailsClick = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/areaManagement/areaManagement/areaDetails?orgId=${id}`
      });
    };
    const addClick = (id) => {
      common_vendor.index.redirectTo({
        url: `/pages/areaManagement/areaManagement/addArea`
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(getAreaList),
        b: common_vendor.o(($event) => name.value = $event),
        c: common_vendor.p({
          ["show-action"]: false,
          animation: false,
          actionStyle: {
            "color": "#006cff"
          },
          placeholder: "请输入片区名称",
          modelValue: name.value
        }),
        d: common_vendor.f(common_vendor.unref(listData), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.detailedAddress),
            c: "61528d8d-1-" + i0,
            d: "61528d8d-2-" + i0,
            e: "61528d8d-3-" + i0,
            f: common_vendor.p({
              type: "error",
              text: item.ndevices,
              size: "12",
              margin: "0px 0px 0px 5px"
            }),
            g: "61528d8d-4-" + i0,
            h: common_vendor.p({
              text: item.ports,
              size: "12",
              margin: "0px 0px 0px 5px"
            }),
            i: "61528d8d-5-" + i0,
            j: common_vendor.p({
              type: "success",
              text: item.yports,
              size: "12",
              margin: "0px 0px 0px 5px"
            }),
            k: "61528d8d-6-" + i0,
            l: common_vendor.p({
              type: "primary",
              text: item.ports - item.yports,
              size: "12",
              margin: "0px 0px 0px 5px"
            }),
            m: common_vendor.t(item.syl ? `${item.syl}%` : "-"),
            n: common_vendor.t(item.kdj ? `${item.kdj}%` : "-"),
            o: index,
            p: common_vendor.o(($event) => detailsClick(item.orgId), index)
          };
        }),
        e: common_vendor.p({
          text: "0",
          size: "12",
          margin: "0px 0px 0px 5px"
        }),
        f: common_vendor.p({
          type: "success",
          text: "0",
          size: "12",
          margin: "0px 0px 0px 5px"
        }),
        g: common_vendor.o(addClick),
        h: common_vendor.unref(isLoadMore)
      }, common_vendor.unref(isLoadMore) ? {
        i: common_vendor.p({
          status: common_vendor.unref(loadStatus)
        })
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-61528d8d"], ["__file", "/Users/guolimeng/Desktop/work/uni-preset-vue-vite-ts 2/src/pages/areaManagement/areaManagement/areaList.vue"]]);
wx.createPage(MiniProgramPage);
