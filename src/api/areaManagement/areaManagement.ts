/*
 * @作者: 郭莉猛
 * @Date: 2023-11-09 12:13:33
 * @FilePath: /uni-preset-vue-vite-ts 2/src/api/areaManagement/areaManagement.ts
 * @描述:片区模块
 *
 */
import request from "@/utils/request";

// 片区模块
// 片区列表
export function areaOrgList(data: object) {
  return request({
    url: `/v1/org/org-list`,
    method: "post",
    data,
  });
}

// 片区删除
export function areaOrgDelete(data: object) {
  return request({
    url: `/v1/org/org-delete`,
    method: "post",
    data,
  });
}

// 片区详情
export function areaOrgDetail(data: object) {
  return request({
    url: `/v1/org/org-detail`,
    method: "post",
    data,
  });
}

// 片区创建
export function areaOrgSave(data: object) {
  return request({
    url: `/v1/org/org-save`,
    method: "post",
    data,
  });
}

// 片区配置模版修改
export function areaOrgUpdateMode(data: object) {
  return request({
    url: `/v1/org/org-updateMode`,
    method: "post",
    data,
  });
}

// 充值列表
export function rechargeConfigList(data: object) {
  return request({
    url: `/v1/recharge-config/list`,
    method: "post",
    data,
  });
}

// 充电站列表
export function stationList(data: object) {
  return request({
    url: `/v1/station/station-list`,
    method: "post",
    data,
  });
}

// 充电站新建
export function stationSave(data: object) {
  return request({
    url: `/v1/station/station-save`,
    method: "post",
    data,
  });
}

// 多个充电站新建
export function stationSaveList(data: object) {
  return request({
    url: `/v1/station/station-saveList`,
    method: "post",
    data,
  });
}

//  充电站详情
export function stationDetail(data: object) {
  return request({
    url: `/v1/station/station-detail`,
    method: "post",
    data,
  });
}

//  充电站删除
export function stationDelete(data: object) {
  return request({
    url: `/v1/station/station-delete`,
    method: "post",
    data,
  });
}

// 设备
// 扫设备二维码 新增充电是否对应片区
export function deviceVerify(data: object) {
  return request({
    url: `/v1/device/device-verify`,
    method: "post",
    data,
  });
}

// 扫设备二维码 添加设备信息进充电站时 验证充电站是否跟设备匹配
export function deviceVerifyDevices(data: object) {
  return request({
    url: `/v1/device/device-verify-devices`,
    method: "post",
    data,
  });
}

//
// 设备列表
export function deviceList(data: object) {
  return request({
    url: `/v1/device/device-list`,
    method: "post",
    data,
  });
}

// 删除设备
export function deviceDelete(data: object) {
  return request({
    url: `/v1/device/device-delete`,
    method: "post",
    data,
  });
}

// 新建设备
export function deviceSave(data: object) {
  return request({
    url: `/v1/device/device-save`,
    method: "post",
    data,
  });
}
