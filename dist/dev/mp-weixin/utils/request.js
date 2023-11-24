"use strict";
const common_vendor = require("../common/vendor.js");
const utils_auth = require("./auth.js");
const BASE_URL = "https://power.zoomore.net";
const request = ({
  url,
  // 请求url
  method,
  // 请求方式：get/post/put/delete
  params,
  // get请求提交参数
  data,
  // post/put请求提交参数
  headers
  // 请求头
}) => {
  return new Promise((resolve, reject) => {
    if (!headers) {
      headers = {
        "Content-Type": "application/json;charset=utf-8",
        // Authorization: getToken(),
        token: utils_auth.getToken(),
        TENANT_ID: 1
      };
    }
    common_vendor.index.request({
      url: BASE_URL + url,
      data: method === "get" ? params : data,
      method,
      header: headers,
      // 收到开发者服务器成功返回的回调函数
      success: (res) => {
        const { code, message } = res.data;
        if (code == "000000") {
          return resolve(res.data);
        }
        if (code == "000001") {
          common_vendor.index.navigateTo({
            url: "/pages/login/login"
          });
          return resolve(res.data);
        }
        common_vendor.index.showToast({
          icon: "none",
          duration: 3e3,
          title: message
        });
        return reject(message);
      },
      // 接口调用失败的回调函数
      fail(error) {
        console.log("请求错误：", error);
        common_vendor.index.showToast({
          icon: "none",
          duration: 3e3,
          title: "网络异常，请稍后重试！"
        });
        return reject(error);
      },
      // 接口调用结束的回调函数（调用成功、失败都会执行）
      complete() {
      }
    });
  });
};
exports.request = request;
