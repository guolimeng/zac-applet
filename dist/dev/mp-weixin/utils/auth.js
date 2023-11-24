"use strict";
const common_vendor = require("../common/vendor.js");
const TokenKey = "userTokenHead";
function setToken(token) {
  return common_vendor.index.setStorageSync(TokenKey, token);
}
function getToken() {
  return common_vendor.index.getStorageSync(TokenKey);
}
exports.getToken = getToken;
exports.setToken = setToken;
