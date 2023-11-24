"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tabs",
  props: {
    tabsData: {
      type: Array,
      default: () => [],
      required: true
    },
    defaultActive: {
      type: String,
      default: "1"
    }
  },
  emits: ["changeTab"],
  setup(__props, { emit }) {
    const props = __props;
    const currentActive = common_vendor.ref("1");
    common_vendor.onMounted(() => {
      console.log("tabs数据", props.tabsData);
    });
    common_vendor.watch(
      () => props.defaultActive,
      (newValue) => {
        currentActive.value = newValue;
      },
      { deep: true, immediate: true }
    );
    const changeTab = (item) => {
      currentActive.value = item.value;
      emit("changeTab", item, item.value);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(props.tabsData, (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: common_vendor.unref(currentActive) === item.value ? 1 : "",
            c: common_vendor.unref(currentActive) === item.value
          }, common_vendor.unref(currentActive) === item.value ? {} : {}, {
            d: item.value,
            e: common_vendor.o(($event) => changeTab(item), item.value)
          });
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a918e749"], ["__file", "/Users/guolimeng/Desktop/work/uni-preset-vue-vite-ts 2/src/pages/areaManagement/components/tabs.vue"]]);
wx.createComponent(Component);
