/*
 * @作者: 郭莉猛
 * @Date: 2023-11-04 15:13:24
 * @FilePath: /uni-preset-vue-vite-ts 2/src/api/ledgerManagement/ledgerManagement.ts
 * @描述:
 *
 */
import request from "@/utils/request";

const BASE_API = "/api/test";

// 分账模板
// 分账配置列表
export function clearingAccountChargeConfigList(data: object) {
  return request({
    url: `/v1/clearing-config/clearing-config-list`,
    method: "post",
    data,
  });
}

// 分账配置创建
export function clearingAccountChargeConfigSave(data: object) {
  return request({
    url: `/v1/clearing-config/clearing-config-save`,
    method: "post",
    data,
  });
}

// 分账配置删除
export function clearingAccountChargeConfigDelete(data: object) {
  return request({
    url: `/v1/clearing-config/clearing-config-delete`,
    method: "post",
    data,
  });
}

// 分账配置明细
export function clearingAccountChargeConfigDetail(data: object) {
  return request({
    url: `/v1/clearing-config/clearing-config-detail`,
    method: "post",
    data,
  });
}

// 分账账户列表
export function clearingAccountList(data: object) {
  return request({
    url: `/v1/clearing-account/clearing-account-list`,
    method: "post",
    data,
  });
}
