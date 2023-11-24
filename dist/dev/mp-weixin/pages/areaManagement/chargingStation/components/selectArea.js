"use strict";
const common_vendor = require("../../../../common/vendor.js");
const api_areaManagement_areaManagement = require("../../../../api/areaManagement/areaManagement.js");
const store_modules_user = require("../../../../store/modules/user.js");
require("../../../../utils/request.js");
require("../../../../utils/auth.js");
if (!Array) {
  const _easycom_u_search2 = common_vendor.resolveComponent("u-search");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  (_easycom_u_search2 + _easycom_u_icon2)();
}
const _easycom_u_search = () => "../../../../node-modules/uview-plus/components/u-search/u-search.js";
const _easycom_u_icon = () => "../../../../node-modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  (_easycom_u_search + _easycom_u_icon)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "selectArea",
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
      queryData: {}
    });
    const { listData, parameter, total, queryData } = common_vendor.toRefs(data);
    common_vendor.onLoad((option) => {
      queryData.value = JSON.parse(decodeURIComponent(option.query));
      console.log("选择片区", queryData.value);
    });
    common_vendor.onMounted(() => {
      console.log("onMounted");
      getAreaList();
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
        listData.value = data2.orgDtos;
        total.value = data2.total;
      });
    };
    const currentActive = common_vendor.ref();
    const currentItem = common_vendor.ref();
    const changeTab = (item) => {
      currentActive.value = item.orgId;
      currentItem.value = item;
    };
    const confirm = () => {
      let queyr = {
        ...queryData.value,
        name: currentItem.value.name,
        id: currentItem.value.orgId
      };
      console.log("queyr", queyr, queryData.value);
      common_vendor.index.navigateTo({
        url: `/pages/areaManagement/chargingStation/components/addShortcutCreateSite?query=${encodeURIComponent(JSON.stringify(queyr))}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => common_vendor.isRef(name) ? name.value = $event : null),
        b: common_vendor.p({
          placeholder: "请输入片区名称",
          showAction: true,
          actionStyle: {
            "color": "rgb(30,102,235)"
          },
          modelValue: common_vendor.unref(name)
        }),
        c: common_vendor.p({
          name: "plus-circle-fill",
          color: "#2979ff",
          size: "16"
        }),
        d: common_vendor.f(common_vendor.unref(listData), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: index,
            c: common_vendor.unref(currentActive) === item.orgId ? 1 : "",
            d: common_vendor.o(($event) => changeTab(item), index)
          };
        }),
        e: common_vendor.o(confirm)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-08661948"], ["__file", "/Users/guolimeng/Desktop/work/uni-preset-vue-vite-ts 2/src/pages/areaManagement/chargingStation/components/selectArea.vue"]]);
wx.createPage(MiniProgramPage);
