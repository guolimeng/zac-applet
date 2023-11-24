"use strict";
const common_vendor = require("../../common/vendor.js");
const store_modules_user = require("../../store/modules/user.js");
require("../../utils/auth.js");
if (!Array) {
  const _easycom_u_form_item2 = common_vendor.resolveComponent("u-form-item");
  const _easycom_u__input2 = common_vendor.resolveComponent("u--input");
  const _easycom_u_cell2 = common_vendor.resolveComponent("u-cell");
  const _easycom_u_action_sheet2 = common_vendor.resolveComponent("u-action-sheet");
  const _easycom_u_cell_group2 = common_vendor.resolveComponent("u-cell-group");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_switch2 = common_vendor.resolveComponent("u-switch");
  const _easycom_u_radio2 = common_vendor.resolveComponent("u-radio");
  const _easycom_u_radio_group2 = common_vendor.resolveComponent("u-radio-group");
  const _easycom_u_checkbox2 = common_vendor.resolveComponent("u-checkbox");
  const _easycom_u_checkbox_group2 = common_vendor.resolveComponent("u-checkbox-group");
  const _easycom_u__textarea2 = common_vendor.resolveComponent("u--textarea");
  const _easycom_u__form2 = common_vendor.resolveComponent("u--form");
  (_easycom_u_form_item2 + _easycom_u__input2 + _easycom_u_cell2 + _easycom_u_action_sheet2 + _easycom_u_cell_group2 + _easycom_u_icon2 + _easycom_u_switch2 + _easycom_u_radio2 + _easycom_u_radio_group2 + _easycom_u_checkbox2 + _easycom_u_checkbox_group2 + _easycom_u__textarea2 + _easycom_u__form2)();
}
const _easycom_u_form_item = () => "../../node-modules/uview-plus/components/u-form-item/u-form-item.js";
const _easycom_u__input = () => "../../node-modules/uview-plus/components/u-input/u-input.js";
const _easycom_u_cell = () => "../../node-modules/uview-plus/components/u-cell/u-cell.js";
const _easycom_u_action_sheet = () => "../../node-modules/uview-plus/components/u-action-sheet/u-action-sheet.js";
const _easycom_u_cell_group = () => "../../node-modules/uview-plus/components/u-cell-group/u-cell-group.js";
const _easycom_u_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_switch = () => "../../node-modules/uview-plus/components/u-switch/u-switch.js";
const _easycom_u_radio = () => "../../node-modules/uview-plus/components/u-radio/u-radio.js";
const _easycom_u_radio_group = () => "../../node-modules/uview-plus/components/u-radio-group/u-radio-group.js";
const _easycom_u_checkbox = () => "../../node-modules/uview-plus/components/u-checkbox/u-checkbox.js";
const _easycom_u_checkbox_group = () => "../../node-modules/uview-plus/components/u-checkbox-group/u-checkbox-group.js";
const _easycom_u__textarea = () => "../../node-modules/uview-plus/components/u-textarea/u-textarea.js";
const _easycom_u__form = () => "../../node-modules/uview-plus/components/u-form/u-form.js";
if (!Math) {
  (_easycom_u_form_item + _easycom_u__input + _easycom_u_cell + _easycom_u_action_sheet + _easycom_u_cell_group + _easycom_u_icon + _easycom_u_switch + _easycom_u_radio + _easycom_u_radio_group + _easycom_u_checkbox + _easycom_u_checkbox_group + _easycom_u__textarea + _easycom_u__form)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "q-form-data",
  props: {
    // 操作栏
    value: {
      type: Object,
      default: () => {
      }
    },
    rules: {
      type: Object,
      default: () => {
      }
    },
    labelWidth: {
      type: [String, Number],
      default: ""
    },
    labelPosition: {
      type: String,
      default: "top"
    },
    labelStyle: {
      type: Object,
      default: () => {
      }
    },
    inline: {
      type: Boolean,
      default: false
    },
    // 是否展示重置
    showReset: {
      type: Boolean,
      default: false
    },
    // 是否展示取消
    showCancel: {
      type: Boolean,
      default: false
    },
    // 是否展示确认
    showSubmit: {
      type: Boolean,
      default: false
    },
    scrollbarHeight: {
      type: [String, Number],
      default: ""
    },
    footerShow: {
      type: Boolean,
      default: false
    },
    formBorder: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    store_modules_user.userStore();
    const formRef = common_vendor.ref();
    common_vendor.ref("表单");
    common_vendor.ref(false);
    const data = common_vendor.reactive({
      formValue: {
        sets: [],
        data: {}
      },
      dataRules: {},
      actionSheetShow: []
    });
    const { formValue, actionSheetShow } = common_vendor.toRefs(data);
    common_vendor.watch(
      () => [props.value, props.rules],
      (newVal) => {
        let realValue = props.value;
        if (!realValue)
          return;
        formValue.value = realValue;
        if (newVal[1])
          ;
      },
      { deep: true, immediate: true }
    );
    common_vendor.onMounted(() => {
      if (props.rules) {
        formRef.value.setRules(props.rules);
      }
    });
    const openPopup = (eventName, typeSet, key, isActionShee) => {
      let event = typeSet && typeSet[eventName];
      if (isActionShee) {
        if (event) {
          event(key);
        }
      } else {
        actionSheetShow.value[key] = true;
      }
    };
    const close = (key) => {
      actionSheetShow.value[key] = false;
      actionSheetShow.value = [];
    };
    const eventChange = (eventName, typeSet, key, e, type) => {
      let event = typeSet && typeSet[eventName];
      if (type === "select") {
        formValue.value.data[key] = e.label;
        actionSheetShow.value[key] = false;
      }
      if (event) {
        event(e, key);
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(formValue).sets.list, (set, index, i0) => {
          return common_vendor.e({
            a: !(set == null ? void 0 : set.hidden)
          }, !(set == null ? void 0 : set.hidden) ? common_vendor.e({
            b: common_vendor.unref(formValue).sets.showTags
          }, common_vendor.unref(formValue).sets.showTags ? common_vendor.e({
            c: common_vendor.t(set.title),
            d: set == null ? void 0 : set.slotHeaderRight
          }, (set == null ? void 0 : set.slotHeaderRight) ? {
            e: common_vendor.d(set.slotHeaderRight)
          } : {}) : {}, {
            f: common_vendor.f(set.object, (obj, key, index2) => {
              var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
              return common_vendor.e({
                a: (_a = obj == null ? void 0 : obj.typeSet) == null ? void 0 : _a.slotName
              }, ((_b = obj == null ? void 0 : obj.typeSet) == null ? void 0 : _b.slotName) ? common_vendor.e({
                b: !(obj == null ? void 0 : obj.hidden)
              }, !(obj == null ? void 0 : obj.hidden) ? {
                c: common_vendor.d(obj.typeSet.slotName),
                d: "78bdb8ec-1-" + i0 + "-" + index2 + ",78bdb8ec-0",
                e: common_vendor.p({
                  label: obj.name,
                  prop: key,
                  leftIconStyle: obj.leftIconStyle
                })
              } : {}) : common_vendor.e({
                f: !(obj == null ? void 0 : obj.hidden)
              }, !(obj == null ? void 0 : obj.hidden) ? common_vendor.e({
                g: obj.type == "input"
              }, obj.type == "input" ? common_vendor.e({
                h: (_c = obj == null ? void 0 : obj.typeSet) == null ? void 0 : _c.inputPrefix
              }, ((_d = obj == null ? void 0 : obj.typeSet) == null ? void 0 : _d.inputPrefix) ? {
                i: common_vendor.d(obj.typeSet.inputPrefix)
              } : {}, {
                j: (_e = obj == null ? void 0 : obj.typeSet) == null ? void 0 : _e.inputSuffix
              }, ((_f = obj == null ? void 0 : obj.typeSet) == null ? void 0 : _f.inputSuffix) ? {
                k: common_vendor.d(obj.typeSet.inputSuffix)
              } : {}, {
                l: "78bdb8ec-3-" + i0 + "-" + index2 + "," + ("78bdb8ec-2-" + i0 + "-" + index2),
                m: common_vendor.o(($event) => common_vendor.unref(formValue).data[key] = $event, key),
                n: common_vendor.p({
                  placeholder: obj.placeholder,
                  type: obj.inputType,
                  border: obj.border,
                  disabledColor: obj.disabledColor,
                  clearable: obj.clearable,
                  disabled: obj.disabled,
                  prefixIcon: (_g = obj == null ? void 0 : obj.typeSet) == null ? void 0 : _g.prefixIcon,
                  prefixIconStyle: (_h = obj == null ? void 0 : obj.typeSet) == null ? void 0 : _h.prefixIconStyle,
                  suffixIcon: (_i = obj == null ? void 0 : obj.typeSet) == null ? void 0 : _i.suffixIcon,
                  suffixIconStyle: (_j = obj == null ? void 0 : obj.typeSet) == null ? void 0 : _j.suffixIconStyle,
                  modelValue: common_vendor.unref(formValue).data[key]
                })
              }) : {}, {
                o: obj.type == "select"
              }, obj.type == "select" ? common_vendor.e({
                p: (_k = obj == null ? void 0 : obj.typeSet) == null ? void 0 : _k.cellValue
              }, ((_l = obj == null ? void 0 : obj.typeSet) == null ? void 0 : _l.cellValue) ? {
                q: common_vendor.t(common_vendor.unref(formValue).data[key] ? common_vendor.unref(formValue).data[key] : (_m = obj == null ? void 0 : obj.typeSet) == null ? void 0 : _m.cellValue),
                r: common_vendor.unref(formValue).data[key] ? ((_n = obj == null ? void 0 : obj.typeSet) == null ? void 0 : _n.customCellValueColor) ? (_o = obj == null ? void 0 : obj.typeSet) == null ? void 0 : _o.customCellValueColor : "#000" : "#c1c4cB"
              } : {}, {
                s: common_vendor.o(($event) => {
                  var _a2;
                  return openPopup("eventChange", obj.typeSet, key, (_a2 = obj == null ? void 0 : obj.typeSet) == null ? void 0 : _a2.isActionShee);
                }, key),
                t: "78bdb8ec-5-" + i0 + "-" + index2 + "," + ("78bdb8ec-4-" + i0 + "-" + index2),
                v: common_vendor.p({
                  title: ((_p = obj == null ? void 0 : obj.typeSet) == null ? void 0 : _p.cellValue) ? "" : common_vendor.unref(formValue).data[key] || "请选择",
                  border: false,
                  isLink: true,
                  titleStyle: {
                    "color": common_vendor.unref(formValue).data[key] ? "#000" : "#c1c4cB"
                  }
                }),
                w: common_vendor.f(obj.typeSet.data, (item, index_, i2) => {
                  return {
                    a: common_vendor.t(item.label),
                    b: index_,
                    c: common_vendor.o(($event) => eventChange("eventChange", obj.typeSet, key, item, obj.type), index_)
                  };
                }),
                x: common_vendor.o(($event) => close(key), key),
                y: "78bdb8ec-6-" + i0 + "-" + index2 + "," + ("78bdb8ec-4-" + i0 + "-" + index2),
                z: common_vendor.p({
                  title: (_q = obj == null ? void 0 : obj.typeSet) == null ? void 0 : _q.sheetTitle,
                  show: common_vendor.unref(actionSheetShow)[key],
                  closeOnClickOverlay: true,
                  round: 10
                }),
                A: "78bdb8ec-4-" + i0 + "-" + index2 + "," + ("78bdb8ec-2-" + i0 + "-" + index2),
                B: common_vendor.p({
                  border: false
                })
              }) : {}, {
                C: obj.type == "customRadio"
              }, obj.type == "customRadio" ? {
                D: "78bdb8ec-7-" + i0 + "-" + index2 + "," + ("78bdb8ec-2-" + i0 + "-" + index2),
                E: common_vendor.p({
                  name: "checkbox-mark",
                  color: "#fff"
                }),
                F: common_vendor.unref(formValue).data[key] ? "#006cff" : "#fff",
                G: common_vendor.unref(formValue).data[key] ? "rgb(200, 201, 204)" : "",
                H: common_vendor.o(($event) => eventChange("eventChange", obj.typeSet, key, common_vendor.unref(formValue).data[key]), key)
              } : {}, {
                I: obj.type == "switch"
              }, obj.type == "switch" ? {
                J: common_vendor.o(($event) => eventChange("eventChange", obj.typeSet, key, $event), key),
                K: "78bdb8ec-8-" + i0 + "-" + index2 + "," + ("78bdb8ec-2-" + i0 + "-" + index2),
                L: common_vendor.o(($event) => common_vendor.unref(formValue).data[key] = $event, key),
                M: common_vendor.p({
                  modelValue: common_vendor.unref(formValue).data[key]
                })
              } : {}, {
                N: obj.type == "radio"
              }, obj.type == "radio" ? {
                O: common_vendor.f(obj.typeSet.data, (radioItem, radioIndex, i2) => {
                  var _a2, _b2;
                  return {
                    a: radioIndex,
                    b: "78bdb8ec-10-" + i0 + "-" + index2 + "-" + i2 + "," + ("78bdb8ec-9-" + i0 + "-" + index2),
                    c: common_vendor.p({
                      customStyle: ((_a2 = obj == null ? void 0 : obj.typeSet) == null ? void 0 : _a2.customStyle) ? (_b2 = obj == null ? void 0 : obj.typeSet) == null ? void 0 : _b2.customStyle : {
                        marginRight: "8px"
                      },
                      label: radioItem.label,
                      name: radioItem.value,
                      disabled: obj.disabled || radioItem.disabled
                    })
                  };
                }),
                P: common_vendor.o(($event) => eventChange("eventChange", obj.typeSet, key, $event), key),
                Q: "78bdb8ec-9-" + i0 + "-" + index2 + "," + ("78bdb8ec-2-" + i0 + "-" + index2),
                R: common_vendor.o(($event) => common_vendor.unref(formValue).data[key] = $event, key),
                S: common_vendor.p({
                  placement: (_r = obj == null ? void 0 : obj.typeSet) == null ? void 0 : _r.placement,
                  modelValue: common_vendor.unref(formValue).data[key]
                })
              } : {}, {
                T: obj.type == "checkbox"
              }, obj.type == "checkbox" ? {
                U: common_vendor.f(obj.typeSet.data, (radioItem, radioIndex, i2) => {
                  var _a2, _b2;
                  return {
                    a: radioIndex,
                    b: "78bdb8ec-12-" + i0 + "-" + index2 + "-" + i2 + "," + ("78bdb8ec-11-" + i0 + "-" + index2),
                    c: common_vendor.p({
                      customStyle: ((_a2 = obj == null ? void 0 : obj.typeSet) == null ? void 0 : _a2.customStyle) ? (_b2 = obj == null ? void 0 : obj.typeSet) == null ? void 0 : _b2.customStyle : {
                        marginRight: "8px"
                      },
                      label: radioItem.label,
                      name: radioItem.value,
                      disabled: obj.disabled || radioItem.disabled
                    })
                  };
                }),
                V: common_vendor.o(($event) => eventChange("eventChange", obj.typeSet, key, $event), key),
                W: "78bdb8ec-11-" + i0 + "-" + index2 + "," + ("78bdb8ec-2-" + i0 + "-" + index2),
                X: common_vendor.o(($event) => common_vendor.unref(formValue).data[key] = $event, key),
                Y: common_vendor.p({
                  placement: (_s = obj == null ? void 0 : obj.typeSet) == null ? void 0 : _s.placement,
                  size: obj.size,
                  activeColor: (_t = obj == null ? void 0 : obj.typeSet) == null ? void 0 : _t.activeColor,
                  modelValue: common_vendor.unref(formValue).data[key]
                })
              } : {}, {
                Z: obj.type == "textarea"
              }, obj.type == "textarea" ? {
                aa: "78bdb8ec-13-" + i0 + "-" + index2 + "," + ("78bdb8ec-2-" + i0 + "-" + index2),
                ab: common_vendor.o(($event) => common_vendor.unref(formValue).data[key] = $event, key),
                ac: common_vendor.p({
                  placeholder: obj.placeholder,
                  disabled: obj.disabled,
                  count: obj.count,
                  border: obj.border,
                  autoHeight: (_u = obj == null ? void 0 : obj.typeSet) == null ? void 0 : _u.autoHeight,
                  formatter: (_v = obj == null ? void 0 : obj.typeSet) == null ? void 0 : _v.formatter,
                  maxlength: (_w = obj == null ? void 0 : obj.typeSet) == null ? void 0 : _w.maxlength,
                  modelValue: common_vendor.unref(formValue).data[key]
                })
              } : {}, {
                ad: (_x = obj == null ? void 0 : obj.typeSet) == null ? void 0 : _x.formItemRight
              }, ((_y = obj == null ? void 0 : obj.typeSet) == null ? void 0 : _y.formItemRight) ? {
                ae: common_vendor.d(obj.typeSet.formItemRight)
              } : {}, {
                af: "78bdb8ec-2-" + i0 + "-" + index2 + ",78bdb8ec-0",
                ag: common_vendor.p({
                  label: obj.name,
                  prop: key,
                  borderBottom: true,
                  labelWidth: obj.itemLabelWidth
                })
              }) : {}), {
                ah: key
              });
            })
          }) : {}, {
            g: index
          });
        }),
        b: common_vendor.sr(formRef, "78bdb8ec-0", {
          "k": "formRef"
        }),
        c: common_vendor.p({
          model: common_vendor.unref(formValue).data,
          rules: props.rules,
          labelWidth: props.labelWidth,
          labelPosition: props.labelPosition,
          labelStyle: props.labelStyle
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-78bdb8ec"], ["__file", "/Users/guolimeng/Desktop/work/uni-preset-vue-vite-ts 2/src/components/q-form-data/q-form-data.vue"]]);
wx.createComponent(Component);
