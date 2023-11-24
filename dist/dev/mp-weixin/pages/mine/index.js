"use strict";
const common_vendor = require("../../common/vendor.js");
const store_modules_user = require("../../store/modules/user.js");
require("../../utils/auth.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const userUserStore = store_modules_user.userStore();
    common_vendor.ref("17702185150");
    const data = common_vendor.reactive({
      menuData: [
        {
          title: "订单管理",
          icon: "/static/mine/order.png"
        },
        {
          title: "计费模板",
          icon: "/static/mine/charging.png",
          path: "/pages/billingTemplate/index"
        },
        {
          title: "分账管理",
          icon: "/static/mine/accounts.png",
          path: "/pages/ledgerManagement/index"
        },
        {
          title: "卡片管理",
          icon: "/static/mine/card.png"
        },
        {
          title: "退款管理",
          icon: "/static/mine/refund.png"
        },
        {
          title: "电池管理",
          icon: "/static/mine/battery.png"
        },
        {
          title: "充电站审核",
          icon: "/static/mine/examine.png"
        },
        {
          title: "常见问题",
          icon: "/static/mine/issue.png"
        },
        {
          title: "个人设置",
          icon: "/static/mine/setup.png"
        }
      ]
    });
    let { menuData } = common_vendor.toRefs(data);
    const menuClick = (item) => {
      if (item.path) {
        common_vendor.index.navigateTo({
          url: item.path
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(userUserStore).usernName),
        b: common_vendor.f(common_vendor.unref(menuData), (item, index, i0) => {
          return {
            a: item.icon,
            b: common_vendor.t(item.title),
            c: index,
            d: common_vendor.o(($event) => menuClick(item), index)
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9023ef44"], ["__file", "/Users/guolimeng/Desktop/work/uni-preset-vue-vite-ts 2/src/pages/mine/index.vue"]]);
wx.createPage(MiniProgramPage);
