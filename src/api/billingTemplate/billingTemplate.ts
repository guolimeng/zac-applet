/*
 * @作者: 郭莉猛
 * @Date: 2023-11-04 21:08:06
 * @FilePath: /uni-preset-vue-vite-ts 2/src/api/billingTemplate/billingTemplate.ts
 * @描述:计费模板
 *
 */
import request from "@/utils/request";

// 计费模板
// 计费模板列表
export function chargeConfigList(data: object) {
  return request({
    url: `/v1/charge-config/list`,
    method: "post",
    data,
  });
}

// 新建或修改计费模板
export function chargeConfigSave(data: object) {
  return request({
    url: `/v1/charge-config/save`,
    method: "post",
    data,
  });
}

// 逻辑删除
export function chargeConfigDelete(data: object) {
  return request({
    url: `/v1/charge-config/delete`,
    method: "post",
    data,
  });
}

// 计费模板详情
export function chargeConfigDetails(data: object) {
  return request({
    url: `/v1/charge-config/details`,
    method: "post",
    data,
  });
}
