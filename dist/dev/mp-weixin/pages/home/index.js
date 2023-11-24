"use strict";
const common_vendor = require("../../common/vendor.js");
const api_home_home = require("../../api/home/home.js");
require("../../utils/request.js");
require("../../utils/auth.js");
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_m_modal_data2 = common_vendor.resolveComponent("m-modal-data");
  (_easycom_u_icon2 + _easycom_m_modal_data2)();
}
const _easycom_u_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_m_modal_data = () => "../../components/m-modal-data/m-modal-data.js";
if (!Math) {
  (_easycom_u_icon + _easycom_m_modal_data)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const data = common_vendor.reactive({
      deviceTotalData: [
        {
          title: "设备总量（台）",
          deviceNum: 0,
          question: false,
          stateDataList: [
            {
              state: "1",
              stateName: "在线",
              stateNum: 0
            },
            {
              state: "3",
              stateName: "离线",
              stateNum: 0
            }
          ]
        },
        {
          title: "端口总量（个）",
          deviceNum: 0,
          question: true,
          stateDataList: [
            {
              state: "2",
              stateName: "使用中",
              stateNum: 0
            },
            {
              state: "0",
              stateName: "空闲中",
              stateNum: 0
            }
          ]
        }
      ],
      totalData: [
        {
          title: "片区总量",
          num: "",
          key: "orgs"
        },
        {
          title: "充电站总量",
          num: "",
          key: "stations"
        },
        {
          title: "卡片总量",
          num: "0"
        }
      ],
      efficiencyData: [
        {
          title: "近7日使用率",
          num: "0",
          unit: "%"
        },
        {
          title: "近7日客单价",
          num: "0",
          unit: "元/单"
        }
      ],
      menuData: [
        {
          title: "新建片区",
          icon: "/static/home/area.png",
          path: "/pages/areaManagement/areaManagement/addArea"
        },
        {
          title: "新建充电站",
          icon: "/static/home/station.png",
          path: "/pages/areaManagement/chargingStation/components/addShortcutCreateSite"
        },
        {
          title: "查看订单",
          icon: "/static/home/order.png"
        },
        {
          title: "查看分账",
          icon: "/static/home/accounts.png"
        }
      ],
      roundBg: {
        "0": "#409eff",
        "1": "#67c23a",
        "2": "#e6a23c",
        "3": "#f56c6c"
      },
      modalTitle: "端口总量",
      modalContent: "端口数量即为所有插座插孔数量、充电桩电枪数量、充电柜仓口数量、换电柜仓口数量等的总和"
    });
    const modalShow = common_vendor.ref(false);
    let { deviceTotalData, roundBg, totalData, efficiencyData, menuData, modalTitle, modalContent } = common_vendor.toRefs(data);
    common_vendor.onMounted(() => {
      console.log("数据", deviceTotalData.value);
    });
    common_vendor.onLoad(() => {
      queryDataAll();
    });
    const queryDataAll = () => {
      api_home_home.statisticsQueryALl({}).then((res) => {
        let { data: data2 } = res;
        deviceTotalData.value[0].deviceNum = (Number(data2.ydevices) || 0) + (Number(data2.ndevices) || 0);
        deviceTotalData.value[0].stateDataList[0].stateNum = data2.ydevices || 0;
        deviceTotalData.value[0].stateDataList[1].stateNum = data2.ndevices || 0;
        deviceTotalData.value[1].deviceNum = (Number(data2.nport) || 0) + (Number(data2.yport) || 0);
        deviceTotalData.value[1].stateDataList[0].stateNum = data2.nport || 0;
        deviceTotalData.value[1].stateDataList[1].stateNum = data2.yport || 0;
        totalData.value[0].num = data2.orgs || 0;
        totalData.value[1].num = data2.stations || 0;
      });
    };
    const stateClick = (item) => {
      common_vendor.index.navigateTo({
        url: `/pages/areaManagement/deviceMg/leaveDevice`
      });
    };
    const menuClick = (item) => {
      console.log("item", item);
      if (item.path) {
        common_vendor.index.navigateTo({
          url: item.path
        });
      }
    };
    const clickBox = (item) => {
      if (item.question) {
        modalShow.value = true;
      }
    };
    const handleClose = () => {
      modalShow.value = false;
    };
    const handleConfirm = () => {
      modalShow.value = false;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(deviceTotalData), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.deviceNum),
            c: item.question
          }, item.question ? {
            d: "2c5296db-0-" + i0,
            e: common_vendor.p({
              name: "question-circle",
              color: "rgb(140,142,152)",
              size: "14",
              top: "5"
            })
          } : {}, {
            f: common_vendor.o(($event) => clickBox(item), index),
            g: common_vendor.f(item.stateDataList, (val, v_index, i1) => {
              return common_vendor.e({
                a: common_vendor.unref(roundBg)[val.state],
                b: common_vendor.t(val.stateName),
                c: val.state == "3"
              }, val.state == "3" ? {
                d: "2c5296db-1-" + i0 + "-" + i1,
                e: common_vendor.p({
                  name: "arrow-right",
                  size: "14px",
                  top: "8",
                  color: "rgb(140,142,152)"
                })
              } : {}, {
                f: common_vendor.t(val.stateNum),
                g: v_index,
                h: common_vendor.o(($event) => stateClick(), v_index)
              });
            }),
            h: index
          });
        }),
        b: common_vendor.f(common_vendor.unref(totalData), (t_val, t_index, i0) => {
          return {
            a: common_vendor.t(t_val.title),
            b: "2c5296db-2-" + i0,
            c: common_vendor.t(t_val.num),
            d: t_index
          };
        }),
        c: common_vendor.p({
          name: "arrow-right",
          color: "rgb(140,142,152)",
          size: "14",
          top: "5"
        }),
        d: common_vendor.f(common_vendor.unref(efficiencyData), (e_val, e_index, i0) => {
          return {
            a: common_vendor.t(e_val.title),
            b: common_vendor.t(e_val.num),
            c: common_vendor.t(e_val.unit),
            d: e_index
          };
        }),
        e: common_vendor.f(common_vendor.unref(menuData), (m_val, m_index, i0) => {
          return {
            a: m_val.icon,
            b: common_vendor.t(m_val.title),
            c: m_index,
            d: common_vendor.o(($event) => menuClick(m_val), m_index)
          };
        }),
        f: common_vendor.o(handleClose),
        g: common_vendor.o(handleConfirm),
        h: common_vendor.p({
          modalShow: modalShow.value,
          title: common_vendor.unref(modalTitle),
          content: common_vendor.unref(modalContent)
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2c5296db"], ["__file", "/Users/guolimeng/Desktop/work/uni-preset-vue-vite-ts 2/src/pages/home/index.vue"]]);
wx.createPage(MiniProgramPage);
