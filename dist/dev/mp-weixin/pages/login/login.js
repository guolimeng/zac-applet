"use strict";
const common_vendor = require("../../common/vendor.js");
const api_login_login = require("../../api/login/login.js");
const store_modules_user = require("../../store/modules/user.js");
require("../../utils/request.js");
require("../../utils/auth.js");
if (!Array) {
  const _easycom_up_text2 = common_vendor.resolveComponent("up-text");
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  const _easycom_q_form_data2 = common_vendor.resolveComponent("q-form-data");
  (_easycom_up_text2 + _easycom_up_button2 + _easycom_q_form_data2)();
}
const _easycom_up_text = () => "../../node-modules/uview-plus/components/u-text/u-text.js";
const _easycom_up_button = () => "../../node-modules/uview-plus/components/u-button/u-button.js";
const _easycom_q_form_data = () => "../../components/q-form-data/q-form-data.js";
if (!Math) {
  (_easycom_up_text + _easycom_up_button + _easycom_q_form_data)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "login",
  setup(__props) {
    const userUserStore = store_modules_user.userStore();
    const title = common_vendor.ref("运营商登录");
    const uForm = common_vendor.ref();
    const data = common_vendor.reactive({
      formDataValidata: {
        sets: {
          showTags: false,
          list: [
            {
              title: "基本信息",
              object: {
                username: {
                  type: "input",
                  placeholder: "请输入账号",
                  clearable: false,
                  typeSet: {
                    // formItemRight: 'inputPrefix1'
                  }
                },
                password: {
                  type: "input",
                  inputType: "password",
                  placeholder: "请输入密码",
                  clearable: false,
                  typeSet: {
                    // prefixIcon: Lock,
                  }
                }
              }
            }
          ]
        },
        data: {
          username: "",
          password: ""
        }
      },
      rules: {
        "username": { required: true, message: "请输入姓名", trigger: ["blur", "change"] },
        "password": { required: true, message: "请输入密码", trigger: ["blur", "change"] }
      }
    });
    const { formDataValidata, rules } = common_vendor.toRefs(data);
    const submit = () => {
      let formEl = uForm.value.$refs.formRef;
      formDataValidata.value.data;
      let param = {
        username: formDataValidata.value.data.username,
        password: common_vendor.md5(formDataValidata.value.data.password)
      };
      if (!formEl)
        return;
      formEl.validate().then((res) => {
        userUserStore.login(param, api_login_login.operatorLogin).then((res2) => {
          userUserStore.getInfo(api_login_login.getOperatorUser);
          common_vendor.index.switchTab({
            url: "/pages/home/index",
            success: (res3) => {
              let page = getCurrentPages().pop();
              if (page == void 0 || page == null)
                return;
              page.onLoad();
            }
          });
        });
      }).catch((errors) => {
        console.log("校验失败");
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(title.value),
        b: common_vendor.p({
          text: "http://",
          margin: "0 3px 0 0",
          type: "tips"
        }),
        c: common_vendor.o(submit),
        d: common_vendor.p({
          type: "primary",
          text: "登录"
        }),
        e: common_vendor.sr(uForm, "cdfe2409-0", {
          "k": "uForm"
        }),
        f: common_vendor.o(($event) => common_vendor.unref(data).formDataValidata = $event),
        g: common_vendor.p({
          rules: common_vendor.unref(rules),
          value: common_vendor.unref(data).formDataValidata
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cdfe2409"], ["__file", "/Users/guolimeng/Desktop/work/uni-preset-vue-vite-ts 2/src/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
