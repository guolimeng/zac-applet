"use strict";
const utils_request = require("../../utils/request.js");
function chargeConfigList(data) {
  return utils_request.request({
    url: `/v1/charge-config/list`,
    method: "post",
    data
  });
}
function chargeConfigSave(data) {
  return utils_request.request({
    url: `/v1/charge-config/save`,
    method: "post",
    data
  });
}
function chargeConfigDelete(data) {
  return utils_request.request({
    url: `/v1/charge-config/delete`,
    method: "post",
    data
  });
}
function chargeConfigDetails(data) {
  return utils_request.request({
    url: `/v1/charge-config/details`,
    method: "post",
    data
  });
}
exports.chargeConfigDelete = chargeConfigDelete;
exports.chargeConfigDetails = chargeConfigDetails;
exports.chargeConfigList = chargeConfigList;
exports.chargeConfigSave = chargeConfigSave;
