"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_datetime_picker2 = common_vendor.resolveComponent("u-datetime-picker");
  (_easycom_u_icon2 + _easycom_u_datetime_picker2)();
}
const _easycom_u_icon = () => "../../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_datetime_picker = () => "../../../node-modules/uview-plus/components/u-datetime-picker/u-datetime-picker.js";
if (!Math) {
  (_easycom_u_icon + _easycom_u_datetime_picker)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "dateModule",
  props: {
    defaultDateActive: {
      type: String,
      default: "1"
    }
  },
  emits: ["changeDateTab", "confirmDate"],
  setup(__props, { emit }) {
    const props = __props;
    const currentActive = common_vendor.ref("0");
    const data = common_vendor.reactive({
      tabsData: [
        { name: "日", value: "0" },
        { name: "周", value: "1" },
        { name: "月", value: "2" }
      ],
      dateData: {
        day: "",
        week: "",
        month: "",
        weekOfMonth: "",
        startOfWeek: "",
        endOfWeek: ""
      },
      startDate: "",
      endDate: ""
    });
    const { tabsData, dateData, startDate, endDate } = common_vendor.toRefs(data);
    const datevValue = common_vendor.ref(Date.now());
    const datesShow = common_vendor.ref(false);
    const dateBoxClick = () => {
      datesShow.value = true;
    };
    const datetimePickerClose = () => {
      datesShow.value = false;
    };
    const datetimePickerConfirm = (item) => {
      let date = common_vendor.dayjs(item.value).format("YYYY-MM-DD");
      switch (currentActive.value) {
        case "0":
          dateData.value.day = common_vendor.dayjs(item.value).format("MM月DD日");
          endDate.value = `${common_vendor.dayjs(item.value).format("YYYY-MM-DD")} 24:00:00`;
          startDate.value = `${common_vendor.dayjs(item.value).format("YYYY-MM-DD")} 00:00:00`;
          break;
        case "1":
          dateData.value.month = getWeekInfo(date).month;
          dateData.value.weekOfMonth = getWeekInfo(date).weekOfMonth;
          dateData.value.startOfWeek = getWeekInfo(date).startOfWeek;
          dateData.value.endOfWeek = getWeekInfo(date).endOfWeek;
          let year = common_vendor.dayjs(item.value).format("YYYY");
          endDate.value = `${common_vendor.dayjs(`${year}-${getWeekInfo(date).endOfWeek_}`).format("YYYY-MM-DD")} 24:00:00`;
          startDate.value = `${common_vendor.dayjs(`${year}-${getWeekInfo(date).startOfWeek_}`).format("YYYY-MM-DD")} 00:00:00`;
          break;
        case "2":
          dateData.value.week = common_vendor.dayjs(item.value).format("YYYY年MM月");
          endDate.value = common_vendor.dayjs(item.value).endOf("month").format("YYYY-MM-DD HH:mm:ss");
          startDate.value = common_vendor.dayjs(item.value).startOf("month").format("YYYY-MM-DD HH:mm:ss");
          break;
      }
      datetimePickerClose();
      emit("confirmDate", startDate.value, endDate.value);
    };
    common_vendor.watch(
      () => props.defaultDateActive,
      (newValue) => {
        currentActive.value = newValue;
        datetimePickerConfirm({ value: Date.now() });
      },
      { deep: true, immediate: true }
    );
    const changeTab = (item) => {
      currentActive.value = item.value;
      datetimePickerConfirm({ value: Date.now() });
      emit("changeDateTab", item, item.value, startDate.value, endDate.value);
    };
    const getWeekInfo = (dateStr) => {
      let date = new Date(dateStr);
      let firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
      let weekOfMonth = Math.ceil((date.getDate() + firstDayOfMonth) / 7);
      let startOfWeek = common_vendor.dayjs(new Date(date.getTime() - (date.getDay() - 1) * 24 * 60 * 60 * 1e3)).format("MM.DD");
      let startOfWeek_ = common_vendor.dayjs(new Date(date.getTime() - (date.getDay() - 1) * 24 * 60 * 60 * 1e3)).format("MM-DD");
      let endOfWeek = common_vendor.dayjs(new Date(date.getTime() + (7 - date.getDay()) * 24 * 60 * 60 * 1e3)).format("MM.DD");
      let endOfWeek_ = common_vendor.dayjs(new Date(date.getTime() + (7 - date.getDay()) * 24 * 60 * 60 * 1e3)).format("MM-DD");
      var month = common_vendor.dayjs(dateStr).month() + 1;
      return {
        month,
        weekOfMonth,
        startOfWeek,
        startOfWeek_,
        endOfWeek,
        endOfWeek_
      };
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(common_vendor.unref(tabsData), (item, k0, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: item.value,
            c: common_vendor.unref(currentActive) === item.value ? 1 : "",
            d: common_vendor.o(($event) => changeTab(item), item.value)
          };
        }),
        b: common_vendor.unref(currentActive) == "0"
      }, common_vendor.unref(currentActive) == "0" ? {
        c: common_vendor.t(common_vendor.unref(dateData).day)
      } : {}, {
        d: common_vendor.unref(currentActive) == "1"
      }, common_vendor.unref(currentActive) == "1" ? {
        e: common_vendor.t(common_vendor.unref(dateData).month),
        f: common_vendor.t(common_vendor.unref(dateData).weekOfMonth)
      } : {}, {
        g: common_vendor.unref(currentActive) == "2"
      }, common_vendor.unref(currentActive) == "2" ? {
        h: common_vendor.t(common_vendor.unref(dateData).week)
      } : {}, {
        i: common_vendor.unref(currentActive) == "1" ? "25px" : "40px",
        j: common_vendor.unref(currentActive) == "1"
      }, common_vendor.unref(currentActive) == "1" ? {
        k: common_vendor.t(common_vendor.unref(dateData).startOfWeek),
        l: common_vendor.t(common_vendor.unref(dateData).endOfWeek)
      } : {}, {
        m: common_vendor.p({
          name: "calendar-fill",
          top: "6",
          color: "#fff",
          size: "28"
        }),
        n: common_vendor.o(dateBoxClick),
        o: common_vendor.o(datetimePickerClose),
        p: common_vendor.o(datetimePickerClose),
        q: common_vendor.o(datetimePickerConfirm),
        r: common_vendor.o(($event) => common_vendor.isRef(datevValue) ? datevValue.value = $event : null),
        s: common_vendor.p({
          show: common_vendor.unref(datesShow),
          closeOnClickOverlay: true,
          mode: "date",
          modelValue: common_vendor.unref(datevValue)
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3ffb41eb"], ["__file", "/Users/guolimeng/Desktop/work/uni-preset-vue-vite-ts 2/src/pages/businessManagement/components/dateModule.vue"]]);
wx.createComponent(Component);
