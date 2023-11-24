"use strict";
const utils_request = require("../../utils/request.js");
function clearingAccountChargeConfigList(data) {
  return utils_request.request({
    url: `/v1/clearing-config/clearing-config-list`,
    method: "post",
    data
  });
}
function clearingAccountChargeConfigSave(data) {
  return utils_request.request({
    url: `/v1/clearing-config/clearing-config-save`,
    method: "post",
    data
  });
}
function clearingAccountChargeConfigDelete(data) {
  return utils_request.request({
    url: `/v1/clearing-config/clearing-config-delete`,
    method: "post",
    data
  });
}
function clearingAccountChargeConfigDetail(data) {
  return utils_request.request({
    url: `/v1/clearing-config/clearing-config-detail`,
    method: "post",
    data
  });
}
function clearingAccountList(data) {
  return utils_request.request({
    url: `/v1/clearing-account/clearing-account-list`,
    method: "post",
    data
  });
}
exports.clearingAccountChargeConfigDelete = clearingAccountChargeConfigDelete;
exports.clearingAccountChargeConfigDetail = clearingAccountChargeConfigDetail;
exports.clearingAccountChargeConfigList = clearingAccountChargeConfigList;
exports.clearingAccountChargeConfigSave = clearingAccountChargeConfigSave;
exports.clearingAccountList = clearingAccountList;
