/*
 * @作者: 郭莉猛
 * @Date: 2023-10-11 13:20:24
 * @FilePath: /uni-preset-vue-vite-ts 2/src/api/login/login.ts
 * @描述:
 *
 */
import request from "@/utils/request";

const BASE_API = "/api/test";

export function operatorLogin(data: object) {
  return request({
    url: `/v1/operator/login`,
    method: "post",
    data,
  });
}

// 运营商登录
export function getOperatorUser(data: object) {
  return request({
    url: `/v1/operator/current-user-info`,
    method: "post",
    data,
  });
}
