"use strict";
const utils_request = require("../../utils/request.js");
function areaOrgList(data) {
  return utils_request.request({
    url: `/v1/org/org-list`,
    method: "post",
    data
  });
}
function areaOrgDelete(data) {
  return utils_request.request({
    url: `/v1/org/org-delete`,
    method: "post",
    data
  });
}
function areaOrgDetail(data) {
  return utils_request.request({
    url: `/v1/org/org-detail`,
    method: "post",
    data
  });
}
function areaOrgSave(data) {
  return utils_request.request({
    url: `/v1/org/org-save`,
    method: "post",
    data
  });
}
function areaOrgUpdateMode(data) {
  return utils_request.request({
    url: `/v1/org/org-updateMode`,
    method: "post",
    data
  });
}
function rechargeConfigList(data) {
  return utils_request.request({
    url: `/v1/recharge-config/list`,
    method: "post",
    data
  });
}
function stationList(data) {
  return utils_request.request({
    url: `/v1/station/station-list`,
    method: "post",
    data
  });
}
function stationSave(data) {
  return utils_request.request({
    url: `/v1/station/station-save`,
    method: "post",
    data
  });
}
function stationSaveList(data) {
  return utils_request.request({
    url: `/v1/station/station-saveList`,
    method: "post",
    data
  });
}
function stationDetail(data) {
  return utils_request.request({
    url: `/v1/station/station-detail`,
    method: "post",
    data
  });
}
function stationDelete(data) {
  return utils_request.request({
    url: `/v1/station/station-delete`,
    method: "post",
    data
  });
}
function deviceVerify(data) {
  return utils_request.request({
    url: `/v1/device/device-verify`,
    method: "post",
    data
  });
}
function deviceVerifyDevices(data) {
  return utils_request.request({
    url: `/v1/device/device-verify-devices`,
    method: "post",
    data
  });
}
function deviceList(data) {
  return utils_request.request({
    url: `/v1/device/device-list`,
    method: "post",
    data
  });
}
function deviceDelete(data) {
  return utils_request.request({
    url: `/v1/device/device-delete`,
    method: "post",
    data
  });
}
function deviceSave(data) {
  return utils_request.request({
    url: `/v1/device/device-save`,
    method: "post",
    data
  });
}
exports.areaOrgDelete = areaOrgDelete;
exports.areaOrgDetail = areaOrgDetail;
exports.areaOrgList = areaOrgList;
exports.areaOrgSave = areaOrgSave;
exports.areaOrgUpdateMode = areaOrgUpdateMode;
exports.deviceDelete = deviceDelete;
exports.deviceList = deviceList;
exports.deviceSave = deviceSave;
exports.deviceVerify = deviceVerify;
exports.deviceVerifyDevices = deviceVerifyDevices;
exports.rechargeConfigList = rechargeConfigList;
exports.stationDelete = stationDelete;
exports.stationDetail = stationDetail;
exports.stationList = stationList;
exports.stationSave = stationSave;
exports.stationSaveList = stationSaveList;
