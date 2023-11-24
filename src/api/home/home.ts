/*
 * @作者: 郭莉猛
 * @Date: 2023-11-17 18:25:42
 * @FilePath: /uni-preset-vue-vite-ts 2/src/api/home/home.ts
 * @描述:
 *
 */
import request from "@/utils/request";

const BASE_API = "/api/test";

// 统计数据总览
export function statisticsQueryALl(data: object) {
  return request({
    url: `/v1/statistics/statistics-queryAll`,
    method: "post",
    data,
  });
}
